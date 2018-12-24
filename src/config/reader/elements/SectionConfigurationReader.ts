import SectionConfiguration from "../../model/layout/SectionConfiguration";
import ItemConfigurationReader from "./ItemConfigurationReader";

export default class SectionConfigurationReader implements ItemConfigurationReader<SectionConfiguration> {
    private constructor(){}
    private static _instance = new SectionConfigurationReader();
    
    public static instance(): SectionConfigurationReader{
        return this._instance;
    }
    
    read(key:string, input: object): SectionConfiguration {
        return SectionConfiguration.copyFrom(key, input);
    }
}