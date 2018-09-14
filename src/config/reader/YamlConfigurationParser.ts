import GameConfiguration from "../model/GameConfiguration";
import ConfigurationParser, {ReadingConfiguration} from "./ConfigurationParser";
import {safeLoad} from "js-yaml";
import {ButtonConfiguration} from "../model/ButtonConfiguration";
import LayoutConfiguration from "../model/layout/LayoutConfiguration";
import SectionConfiguration from "../model/layout/SectionConfiguration";

function generateInvalidConfigurationError(message: string) {
    throw new Error(`Invalid Configuration File - ${message}`);
}

class Sections {
    meta: { begins?: number, ends?: number } = {}
    buttons: { begins?: number, ends?: number } = {}
}

export default class YamlConfigurationParser implements ConfigurationParser {

    parse(data: string, readingConfiguration?: ReadingConfiguration): GameConfiguration {
        let parsed = safeLoad(data);
        if (!parsed) {
            generateInvalidConfigurationError("Input file was empty.");
        }
        YamlConfigurationParser.validateMetaConfiguration(parsed);
        YamlConfigurationParser.validateButtonConfiguration(parsed);
        YamlConfigurationParser.validateLayoutConfiguration(parsed);
        console.log(parsed);
        return YamlConfigurationParser.transform(parsed);
    }

    private static transform(parsed: any) {
        parsed.buttons = Object.keys(parsed.buttons).reduce((mapped, buttonKey) => {
            mapped[buttonKey] = new ButtonConfiguration(buttonKey, parsed.buttons[buttonKey].name,
                parsed.buttons[buttonKey].description, parsed.buttons[buttonKey].onClick,
                parsed.buttons[buttonKey].showClicks);
            return mapped;
        }, {});
        parsed.layout = Object.keys(parsed.layout).reduce((mapped, sectionKey) => {
            mapped[sectionKey] = new SectionConfiguration(sectionKey, parsed.layout[sectionKey].header, parsed.layout[sectionKey].contains);
            return mapped;
        }, {});
        return parsed;
    }

    private static validateMetaConfiguration(parsed: any) {
        let meta = parsed.meta;
        if (!meta) {
            generateInvalidConfigurationError("File is missing top level 'meta' section.");
        } else {
            ["name", "author", "version"].forEach(property => {
                if (meta[property] === undefined) {
                    generateInvalidConfigurationError(`meta section is missing required property '${property}'.`);
                }
            });
            if (typeof meta.version !== "string") {
                generateInvalidConfigurationError("'version' in the meta section must be a string. Try putting it in quotes.");
            }
        }
    }

    private static validateButtonConfiguration(parsed: any, readingConfiguration?: ReadingConfiguration) {
        let buttons = parsed.buttons;
        if (!buttons) {
            if (!readingConfiguration || (readingConfiguration && readingConfiguration.requireButtonConfiguration !== false)) {
                generateInvalidConfigurationError("File is missing top level 'buttons' section. If you're sure it exists, it might be empty.");
            }
        } else {
            if (!Object.keys(buttons).length) {
                generateInvalidConfigurationError("Configuration doesn't define any buttons.");
            }
        }
    }

    private static validateLayoutConfiguration(parsed: any) {
        let layout = parsed.layout;
        if (!layout) {
            generateInvalidConfigurationError("File is missing top level 'layout' section.");
        }
    }
};