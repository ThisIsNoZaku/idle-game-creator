import Model from "../model/Model";

export class ReadingConfiguration {
    requireButtonConfiguration?:boolean
}

export default interface ConfigurationParser {
    parse(data:string, config:ReadingConfiguration):Model
}