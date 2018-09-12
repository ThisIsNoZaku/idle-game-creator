import Model, {LetsMakeAGame} from "../model/Model";

function generateInvalidConfigurationError(message:string){
    throw new Error(`Invalid Configuration File - ${message}`);
}

class Sections {
    meta:{begins?:number, ends?:number} = {}
}

function validateIndentation(lines: string[]) {
    let expectedIndentation = lines[0].search("^(\s+).+");
}

export default class ConfigurationParser {

    readAsTxtConfig(data: string) {
        let split = data.split("\n");
        let sections = new Sections();
        // Find all top-level entries
        let currentSection:string|null = null;
        split.forEach((line:string, index:number)=>{
            if(line === "Let's make a game!"){
                console.info("Found 'Let's make a game!'");
                sections.meta.begins = index+1;
                currentSection = "meta";
            } else if(currentSection !== null && (line.trim() === '' || line.trimLeft().length > line.length)){
                console.info(`Ending section on line ${index}`);
                sections[currentSection].ends = index;
                currentSection = null;
            }
        });
        if(currentSection){
            sections[currentSection].ends = split.length-1;
        }

        console.info(`Generating meta configuration from ${sections.meta.begins} to ${sections.meta.ends}`);
        if(!sections.meta.begins){
            generateInvalidConfigurationError("File doesn't begin with the required 'Let's make a game!' on the first line.");
        }
        let metaConfiguration = ConfigurationParser.metaConfiguration(split.slice(sections.meta.begins, sections.meta.ends+1));

        return new Model(metaConfiguration, null, null);
    }

    static metaConfiguration(data:string[]){
        let name:string|null = null;
        let author:string|null = null;
        let description:string|null = null;
        let version:string|null = null;

        data.forEach((line:string)=>{
            try {
                let split = line.split(":");
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
            } catch (e) {
                console.log(line);
                throw e;
            }
        });
        if(!name){
            generateInvalidConfigurationError("name must have a value.")
        }
        if(!version){
            generateInvalidConfigurationError("version must have a value.")
        }
        if(!description){
            generateInvalidConfigurationError("desc must have a value.")
        }
        if(!author){
            generateInvalidConfigurationError("by must have a value.")
        }
        return new LetsMakeAGame(name!, author!, description!, version!);
    }
};