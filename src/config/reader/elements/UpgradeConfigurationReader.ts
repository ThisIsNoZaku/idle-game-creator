import UpgradeConfiguration from "../../model/UpgradeConfiguration";
import RequirementsTranslator from "../RequirementsTranslator";
import ItemConfigurationReader from "./ItemConfigurationReader";

export default class SectionConfigurationReader implements ItemConfigurationReader<UpgradeConfiguration> {
    public static instance(): SectionConfigurationReader {
        return this._instance;
    }
    private static _instance = new SectionConfigurationReader();

    private constructor() {}

    public read(key: string, input: any): UpgradeConfiguration {
        return UpgradeConfiguration.copyFrom(key, {...input, ...{
            requirements: RequirementsTranslator(input.requires),
        }});
    }
}
