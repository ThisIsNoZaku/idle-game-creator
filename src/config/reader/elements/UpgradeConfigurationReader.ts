import UpgradeConfiguration from "../../model/UpgradeConfiguration";
import ItemConfigurationReader from "./ItemConfigurationReader";

export default class SectionConfigurationReader implements ItemConfigurationReader<UpgradeConfiguration> {
    private constructor(){}
    private static _instance = new SectionConfigurationReader();
    
    public static instance(): SectionConfigurationReader{
        return this._instance;
    }
    
    read(key:string, input: object): UpgradeConfiguration {
        return UpgradeConfiguration.copyFrom(key, input);
    }
}