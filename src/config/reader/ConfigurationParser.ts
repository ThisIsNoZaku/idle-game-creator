import Model, {LetsMakeAGame} from "../Model";
import {AssertionError} from "assert";

function generateInvalidConfigurationError(message:string){
    throw new Error(`Invalid Configuration File - ${message}`);
}

class Sections {
    meta:{begins?:number, ends?:number} = {}
}

export default class ConfigurationParser {

    readAsTxtConfig(data: string) {
        let split = data.split("\n");
        let currentLine = 0;
        let sections = new Sections();
        if(split[currentLine] === "Let's make a game!"){
            sections.meta.begins = currentLine + 1;
            console.assert(split[currentLine], "Must be undefined.");
            while(split[currentLine] !== undefined && split[currentLine].trim() !== ""){
                currentLine++
            }
            sections.meta.ends = currentLine;
        }
        console.log(sections);

        let metaConfiguration = ConfigurationParser.metaConfiguration(split.slice(sections.meta.begins, sections.meta.ends));

        throw new Error("Not implemented");
    }

    static metaConfiguration(data:string[]){
        let name:string|null = null;
        let author:string|null = null;
        let description:string|null = null;
        let version:string|null = null;

        data.forEach((line:string)=>{
            let split = line.split(":");
            let key = split[0].trim();
            let value = split[1].trim();
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
        if(!name){
            generateInvalidConfigurationError("Name must have a value.")
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