import AchievementConfiguration from "../../model/AchievementConfiguration";
import RequirementsTranslator from "../RequirementsTranslator";
import ItemConfigurationReader from "./ItemConfigurationReader";

export default class AchievementConfigurationReader implements ItemConfigurationReader<AchievementConfiguration> {
    public static instance() {
        return this._instance;
    }
    private static _instance: AchievementConfigurationReader = new AchievementConfigurationReader();

    public read(key: string, input: any) {
        return new AchievementConfiguration(key, input.name, input.description,
            RequirementsTranslator(input.requires),
        );
    }
}
