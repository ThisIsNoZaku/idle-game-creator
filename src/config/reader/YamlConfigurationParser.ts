import AchievementConfiguration from "../model/AchievementConfiguration";
import ButtonConfiguration from "../model/ButtonConfiguration";
import GameConfiguration from "../model/GameConfiguration";
import GeneratorConfiguration from "../model/GeneratorConfiguration";
import SectionConfiguration from "../model/layout/SectionConfiguration";
import PurchasableConfiguration from "../model/PurchasableConfiguration";
import UpgradeConfiguration from "../model/UpgradeConfiguration";

import AchievementConfigurationReader from "./elements/AchievementConfigurationReader";
import ButtonConfigurationReader from "./elements/ButtonConfigurationReader";
import GeneratorConfigurationReader from "./elements/GeneratorConfigurationReader";
import LayoutConfigurationReader from "./elements/LayoutConfigurationReader";
import UpgradeConfigurationReader from "./elements/UpgradeConfigurationReader";

import ConfigurationParser, {ReadingConfiguration} from "./ConfigurationParser";

import {safeLoad} from "js-yaml";

function generateInvalidConfigurationError(message: string) {
    throw new Error(`Invalid Configuration File - ${message}`);
}

export default class YamlConfigurationParser implements ConfigurationParser {

    private static validateMetaConfiguration(parsed: any) {
        const meta = parsed.meta;
        if (!meta) {
            generateInvalidConfigurationError("File is missing top level 'meta' section.");
        } else {
            ["name", "author", "version"].forEach((property: string) => {
                if (meta[property] === undefined) {
                    generateInvalidConfigurationError(`meta section is missing required property '${property}'.`);
                }
            });
            if (typeof meta.version !== "string") {
                generateInvalidConfigurationError("'version' in the meta section must be a string. " +
                    "Try putting it in quotes.");
            }
        }
    }

    private static validateButtonConfiguration(parsed: any, readingConfiguration?: ReadingConfiguration) {
        const buttons = parsed.buttons;
        if (!buttons) {
            if (!readingConfiguration ||
                (readingConfiguration && readingConfiguration.requireButtonConfiguration !== false)) {
                generateInvalidConfigurationError("File is missing top level 'buttons' section. If you're sure it " +
                    "exists, it might be empty.");
            }
        }
    }

    private static validateLayoutConfiguration(parsed: any) {
        const layout = parsed.layout;
        if (!layout) {
            generateInvalidConfigurationError("File is missing top level 'layout' section.");
        } else if (typeof layout !== "object") {
            generateInvalidConfigurationError("Layout is of the wrong type, must be an object.");
        }
    }

    private static transform(parsed: any) {
        parsed.buttons = Object.keys(parsed.buttons)
            .reduce((mapped: { [key: string]: ButtonConfiguration },
                buttonKey) => {
                    if (!parsed.buttons[buttonKey]) {
                        throw new Error("parsed.buttons is undefined");
                    }
                    mapped[buttonKey] = ButtonConfigurationReader.instance()
                        .read(buttonKey, parsed.buttons[buttonKey]);
                return mapped;
            }, {});
        parsed.layout = Object.keys(parsed.layout)
            .map((sectionKey: string) => {
                return LayoutConfigurationReader.instance()
                    .read(sectionKey, parsed.layout[sectionKey]);
            }).reduce((mapped: { [key: string]: SectionConfiguration },
                    sectionConfig: SectionConfiguration, index: number,
                    source: SectionConfiguration[]) => {
                const parentLayout = source
                    .find((config: SectionConfiguration) => {
                        return config.contains.includes(sectionConfig.key);
                    });
                if (parentLayout) {
                    sectionConfig.root = false;
                }
                mapped[sectionConfig.key] = sectionConfig;
                return mapped;
            }, {});
        parsed.generators = Object.keys(parsed.generators)
            .reduce((mapped: { [key: string]: GeneratorConfiguration}, generatorKey) => {
                mapped[generatorKey] = GeneratorConfigurationReader.instance()
                    .read(generatorKey, parsed.generators[generatorKey]);
                return mapped;
            }, {});
        parsed.upgrades = parsed.upgrades ? Object.keys(parsed.upgrades)
            .reduce((mapped: { [key: string]: UpgradeConfiguration}, upgradeKey) => {
                mapped[upgradeKey] = UpgradeConfigurationReader.instance()
                    .read(upgradeKey, parsed.upgrades[upgradeKey]);
                return mapped;
            }, {}) : {};
        parsed.achievements = parsed.achievements ? Object.keys(parsed.achievements)
            .reduce((mapped: {[key: string]: AchievementConfiguration}, achievementKey) => {
                mapped[achievementKey] = AchievementConfigurationReader.instance()
                    .read(achievementKey, parsed.achievements[achievementKey]);
                return mapped;
            }, {}) : {};
        return parsed;
    }

    public parse(data: string, readingConfiguration?: ReadingConfiguration): GameConfiguration {
        const parsed = safeLoad(data);
        if (!parsed) {
            generateInvalidConfigurationError("Input file was empty.");
        }
        YamlConfigurationParser.validateMetaConfiguration(parsed);
        YamlConfigurationParser.validateButtonConfiguration(parsed);
        YamlConfigurationParser.validateLayoutConfiguration(parsed);
        return YamlConfigurationParser.transform(parsed);
    }
}
