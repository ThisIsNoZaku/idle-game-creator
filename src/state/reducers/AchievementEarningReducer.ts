import GameState from "../engine/GameState";

import AchievementConfiguration from "../../config/model/AchievementConfiguration";
import AchievementState from "../../state/engine/AchievementState";

import { Requirements } from "../../config/model/PurchasableConfiguration";

export default function(state: GameState) {
    if (state && state.achievements) {
        Object.keys(state.achievements)
        .filter((achievement: string) => {
            return !state.achievements[achievement].earned && checkIfRequirementsMet(
                state.achievements[achievement].achievementName.requirements, state);
        })
        .map((key: string) => {
            return state.achievements[key];
        }).forEach((achievement: AchievementState) => {
            achievement.earned = true;
        });
    }
    return state;
}

function checkIfRequirementsMet(requirements: Requirements, state: GameState) {
    return Object.keys(requirements.resources).reduce((requirementsMet: boolean, resourceName: string) => {
        return requirementsMet &&
            state.resources[resourceName].quantity >= requirements.resources[resourceName].current &&
            state.resources[resourceName].lifetimeMax >= requirements.resources[resourceName].lifetimeMax &&
            state.resources[resourceName].lifetimeTotal >= requirements.resources[resourceName].lifetimeTotal;
    }, true);
}
