import Model, {LetsMakeAGame} from "../model/Model";
import {ButtonConfiguration} from "../model/ButtonConfiguration";
import ConfigurationParser, {ReadingConfiguration, generateInvalidConfigurationError} from "./ConfigurationParser";
class Sections {
    meta: { begins?: number, ends?: number } = {}
    buttons : { begins?: number, ends?: number } = {}
}

export default class TextConfigurationParser implements ConfigurationParser {

    parse(data: string, readingConfiguration?:ReadingConfiguration):Model {
        let split = data.split("\n");
        let sections = new Sections();
        // Find all top-level entries
        let currentSection: string | null = null;
        split.forEach((line: string, index: number) => {
            if (line === "Let's make a game!") {
                console.info("Found 'Let's make a game!'");
                sections.meta.begins = index + 1;
                currentSection = "meta";
            } else if(line.trim().toLowerCase() === "buttons") {
                console.info("Found 'buttons'");
                if(currentSection){
                    console.info(`Ending ${currentSection} section on line ${index}`);
                    sections[currentSection].ends = index -1;
                    currentSection = null;
                }
                sections.buttons.begins = index + 1;
                currentSection = "buttons";
            } else if (currentSection !== null && (line.trim() === '' || line.trimLeft().length > line.length)) {
                console.info(`Ending section on line ${index}`);
                sections[currentSection].ends = index -1;
                currentSection = null;
            }
        });
        if (currentSection) {
            sections[currentSection].ends = split.length - 1;
        }

        console.info(`Generating meta configuration from ${sections.meta.begins} to ${sections.meta.ends}`);
        if (!sections.meta.begins) {
            generateInvalidConfigurationError("File doesn't begin with the required 'Let's make a game!' on the first line.");
            console.info(split[0]);
        }
        let metaConfiguration = TextConfigurationParser.metaConfiguration(split.slice(sections.meta.begins, sections.meta.ends! + 1));

        console.info(`Generating button configuration from ${sections.buttons.begins} to ${sections.buttons.ends}`);
        if(sections.buttons.begins >= sections.buttons.ends){
            generateInvalidConfigurationError(`Button section begins on line ${sections.buttons.begins} and ends on ${sections.buttons.ends}.`);
        }
        if(!sections.buttons.begins && (!readingConfiguration || (readingConfiguration && readingConfiguration.requireButtonConfiguration !== false)){
            generateInvalidConfigurationError("File doesn't contain the required 'Buttons' entry.");
        }
        let buttonConfiguration = TextConfigurationParser.buttonConfiguration(split.splice(sections.buttons.begins!, sections.buttons.ends! + 1), readingConfiguration);

        return new Model(metaConfiguration, buttonConfiguration);
    }

    static metaConfiguration(data: string[]) {
        let name: string | null = null;
        let author: string | null = null;
        let description: string | null = null;
        let version: string | null = null;

        data.forEach((line: string) => {
            if(line.trim() === ''){
                return;
            }
            let split = line.split(":");
            if (split.length && split.length !== 2) {
                generateInvalidConfigurationError(`The line "${line}" is malformed, must contain a key and value separated by a ':'`);
            }
            let key = split[0].trim();
            let value = split[1] ? split[1].trim() : "";
            switch (key) {
                case "name":
                    console.info(`Found name configuration: ${value}`);
                    name = value;
                    break;
                case "by":
                    console.info(`Found author configuration: ${value}`);
                    author = value;
                    break;
                case "desc":
                    console.info(`Found description configuration: ${value}`);
                    description = value;
                    break;
                case "version":
                    console.info(`Found version configuration: ${value}`);
                    version = value;
                    break;
                default:
                    console.warn(`Key ${key} is not supported and will be ignored.`);
            }
        });
        if (!name) {
            console.log(data);
            generateInvalidConfigurationError("name must have a value.")
        }
        if (!version) {
            generateInvalidConfigurationError("version must have a value.")
        }
        if (!description) {
            generateInvalidConfigurationError("desc must have a value.")
        }
        if (!author) {
            generateInvalidConfigurationError("by must have a value.")
        }
        return new LetsMakeAGame(name!, author!, description!, version!);
    }

    static buttonConfiguration(data: string[], readingConfigurtion:ReadingConfiguration){
        if(data.length == 0 && readingConfigurtion && readingConfigurtion.requireButtonConfiguration !== false){
            generateInvalidConfigurationError("Buttons configuration is empty.");
        }
        let indentation:string = /^(\s*).*$/.exec(data[0])![1];
        let groupings:string[][] = [];
        let minimumIndentationLevel = -1;
        data.forEach((line:string, index:number)=>{
            let indentationLevel = (line.match(new RegExp(indentation, "g")) || []).length;
            if(minimumIndentationLevel === -1){
                minimumIndentationLevel = indentationLevel;
            }
            let normalizedIndentationLevel = indentationLevel - minimumIndentationLevel;
            if(normalizedIndentationLevel < 0){
                generateInvalidConfigurationError(`Found invalid indentation on line ${index} inside the button configuration.`)
            }
            // FIXME: Generalize.
            switch (normalizedIndentationLevel) {
                case 0:
                    if(!line.trimLeft().startsWith("*")){
                        generateInvalidConfigurationError(`${line.trimLeft()} looks like it should be an identifier but doesn't begin with a *.`);
                    }
                    groupings.push([]);
                    groupings[groupings.length-1].key = line.trim();
                    break;
                case 1:
                    groupings[groupings.length-1].push(line);
                    break;
            }
        });
        return groupings.map(group=>{
            let name;
            let description;
            group.forEach(line=>{
                let split = line.split(":");
                let key = split[0];
                let value = split[1];
                switch (key.trimLeft()) {
                    case "key":
                        key = value;
                        break;
                    case "name":
                        split = value.split("|");
                        let singular = split[0];
                        let plural = split[1];
                        name = {
                            singular,
                            plural
                        };
                        break;
                    case "desc":
                        description = value;
                        break;
                }
            });

            if(!name){
                generateInvalidConfigurationError("Missing name for button")
            }
            if(!description){
                generateInvalidConfigurationError("Missing name for button")
            }

            let configuration = new ButtonConfiguration(group.key, name, description);
            return configuration;
        });
    }
};