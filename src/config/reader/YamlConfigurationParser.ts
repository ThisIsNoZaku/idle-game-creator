import ButtonConfiguration from "../model/ButtonConfiguration";
import GameConfiguration from "../model/GameConfiguration";
import GeneratorConfiguration from "../model/GeneratorConfiguration";
import SectionConfiguration from "../model/layout/SectionConfiguration";
import UpgradeConfiguration from "../model/UpgradeConfiguration";
import PurchasableConfiguration from "../model/PurchasableConfiguration";

import ConfigurationParser, {ReadingConfiguration} from "./ConfigurationParser";

import {safeLoad} from "js-yaml";

function generateInvalidConfigurationError(message: string) {
    throw new Error(`Invalid Configuration File - ${message}`);
}

function processPurchaseableConfig(parsed: any): PurchasableConfiguration {
    console.log(parsed);
    return {...parsed, ...{
        costs: Object.keys(parsed.costs).reduce((previous: any, current: string) => {
            previous[current] = parsed.costs[current]
            return previous;
        }, {})
    }, ...{
        requirements: Object.keys(parsed.requirements || {}).reduce((previous: any, current: string) => {
            previous[current] = parsed.requirements[current]
            return previous;
        }, {})
    }};
}

function processGeneratorConfig(parsed: any) {
    return processPurchaseableConfig(parsed);
};

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
            .reduce((mapped: { [key: string]: ButtonConfiguration }, buttonKey) => {
                mapped[buttonKey] = ButtonConfiguration.copyFrom(buttonKey, 
                    parsed.buttons[buttonKey]);
                return mapped;
            }, {});
        parsed.layout = Object.keys(parsed.layout)
            .map((sectionKey: string) => {
                return SectionConfiguration.copyFrom(sectionKey, 
                    parsed.layout[sectionKey]);
            }).reduce((mapped: { [key: string]: SectionConfiguration },
                    sectionConfig: SectionConfiguration, index: number,
                    source: SectionConfiguration[]) => {
                const parentLayout = source.find((config: SectionConfiguration) => {
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
                mapped[generatorKey] = 
                    GeneratorConfiguration.copyFrom(generatorKey, 
                    processGeneratorConfig(parsed.generators[generatorKey]));
                return mapped;
            }, {});
        parsed.upgrades = parsed.upgrades ? Object.keys(parsed.upgrades)
            .reduce((mapped: { [key: string]: UpgradeConfiguration}, upgradeKey) => {
                mapped[upgradeKey] = UpgradeConfiguration.copyFrom(upgradeKey, 
                    parsed.upgrades[upgradeKey]);
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
