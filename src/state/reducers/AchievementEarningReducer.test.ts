import AppState from "../AppState";
import ResourceState from "../engine/ResourceState";
import AchievementEarningReducer from "./AchievementEarningReducer";

describe("Achievement Reducer", () => {
    let appState: AppState;

    it("sets an achievement to earned if the achievement requirements are met", () => {
        appState = {
            config: {
                achievements: {
                    single: {
                        description: "description",
                        key: "single",
                        name: "Single",
                        requirements: {
                            resources: {
                                resource: {
                                    current: 1,
                                    lifetimeMax: 0,
                                    lifetimeTotal: 0,
                                },
                            },
                        },
                    },
                },
                buttons: {},
                generators: {},
                layout: {},
                meta: {
                    author: "",
                    description: "",
                    name: "",
                    version: "",
                },
                resources: {},
                upgrades: {},
            },
            state: {
                achievements: {
                    single: {
                        achievementName: {
                            description: "",
                            key: "",
                            name: "",
                            requirements: {
                                resources: {},
                            },
                        },
                        earned: false,
                    },
                },
                generators: {},
                resources: {
                    resource: new ResourceState("resource", 1),
                },
                upgrades: {},
            },
        };
        expect(appState.state.achievements.single.earned).toBeFalsy();
        AchievementEarningReducer(appState.state);
        expect(appState.state.achievements.single.earned).toBeTruthy();
    });
});
