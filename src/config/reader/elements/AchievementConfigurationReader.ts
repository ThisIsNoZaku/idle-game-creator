import ItemConfigurationReader from "./ItemConfigurationReader";
import AchievementConfiguration from "../../model/AchievementConfiguration";
import RequirementsTranslator from "../RequirementsTranslator";

export default class AchievementConfigurationReader implements ItemConfigurationReader<AchievementConfiguration> {
    private static _instance: AchievementConfigurationReader = new AchievementConfigurationReader();
    public static instance() {
        return this._instance;
    }
    
    public read(key:string, input: any) {
        return new AchievementConfiguration(key, input.name, input.description,
            RequirementsTranslator(input.requires)
        );
    }
}