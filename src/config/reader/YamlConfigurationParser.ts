import GameConfiguration, {LetsMakeAGame} from "../model/GameConfiguration";
import {ButtonConfiguration} from "../model/ButtonConfiguration";
import ConfigurationParser, {ReadingConfiguration} from "./ConfigurationParser";
import {safeLoad} from "js-yaml";

function generateInvalidConfigurationError(message: string) {
    throw new Error(`Invalid Configuration File - ${message}`);
}

class Sections {
    meta: { begins?: number, ends?: number } = {}
    buttons : { begins?: number, ends?: number } = {}
}

export default class YamlConfigurationParser implements ConfigurationParser{

    parse(data: string, readingConfiguration?:ReadingConfiguration):GameConfiguration {
        let parsed = safeLoad(data);
        if(!parsed){
            generateInvalidConfigurationError("Input file was empty.");
        }
        YamlConfigurationParser.validateMetaConfiguration(parsed);
        YamlConfigurationParser.validateButtonConfiguration(parsed, readingConfiguration);
        return parsed;
    }

    private static validateMetaConfiguration(parsed:any){
        let meta = parsed.meta;
        if(!meta){
            generateInvalidConfigurationError("File is missing top level 'meta' section.");
        } else {
            ["name", "author", "version"].forEach(property=>{
                if(meta[property] === undefined){
                    generateInvalidConfigurationError(`meta section is missing required property '${property}'.`);
                }
            })
        }
    }

    private static validateButtonConfiguration(parsed: any, readingConfiguration?: ReadingConfiguration){
        let buttons = parsed.buttons;
        if(!buttons){
            if(!readingConfiguration || (readingConfiguration && readingConfiguration.requireButtonConfiguration !== false)){
                generateInvalidConfigurationError("File is missing top level 'buttons' section. If you're sure it exists, it might be empty.");
            }
        } else {
            if(!buttons.length){
                generateInvalidConfigurationError("Configuration doesn't define any buttons.");
            }
        }
    }
};