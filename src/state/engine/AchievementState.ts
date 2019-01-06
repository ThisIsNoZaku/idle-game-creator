import AchievementConfiguration from "../../config/model/AchievementConfiguration";

export default class AchievementState {
    public earned: boolean = false;

    constructor(earned?: boolean) {
        this.earned = earned || false;
    }
}
