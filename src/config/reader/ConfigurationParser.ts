import Model from "../model/Model";

export class ReadingConfiguration {
    requireButtonConfiguration?:boolean
}

export function generateInvalidConfigurationError(message: string) {
    throw new Error(`Invalid Configuration File - ${message}`);
}

export default interface ConfigurationParser {
    parse(data:string, config?:ReadingConfiguration):Model
}