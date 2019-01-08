import AchievementConfiguration from "../../config/model/AchievementConfiguration";

export default class AchievementState {
    public earned: boolean;
    public achievementName: AchievementConfiguration;

    constructor(achievement: AchievementConfiguration, earned?: boolean) {
        this.achievementName = achievement;
        this.earned = earned || false;
    }
}
