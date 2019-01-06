import AppState from "../AppState";

import AchievementConfiguration from "../../config/model/AchievementConfiguration"
import AchievementState from "../../state/engine/AchievementState";

export default function (state: AppState) {
    if (state && state.config && state.config.achievements) {
        Object.keys(state.config.achievements)
        .filter((achievement: string) => {
            return !state.state.achievements[achievement].earned &&
                state.config.achievements[achievement].requirements;
        })
        .map((key: string) => {
            return state.state.achievements[key];
        }).forEach((achievement: AchievementState) => {
            achievement.earned = true;
        })
    }
    return state;
}

