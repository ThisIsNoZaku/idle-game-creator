import LayoutConfiguration from "../../model/layout/SectionConfiguration";
import ItemConfigurationReader from "./ItemConfigurationReader";

export default class LayoutConfigurationReader implements ItemConfigurationReader<LayoutConfiguration> {
    private constructor(){}
    private static _instance = new LayoutConfigurationReader();
    
    public static instance(): LayoutConfigurationReader {
        return this._instance;
    }
    
    read(key:string, input: object): LayoutConfiguration {
        return LayoutConfiguration.copyFrom(key, input);
    }
}