import GameConfiguration from "../../model/GameConfiguration";
import LayoutConfiguration from "../../model/layout/SectionConfiguration";
import ItemConfigurationReader from "./ItemConfigurationReader";

import * as _ from "lodash";

export default class LayoutConfigurationReader implements ItemConfigurationReader<LayoutConfiguration> {
    public static instance(): LayoutConfigurationReader {
        return this._instance;
    }
    private static _instance = new LayoutConfigurationReader();

    private constructor() {}

    public read(key: string, input: any, globalConfig: GameConfiguration): LayoutConfiguration {
        if (input.contains === undefined) {
            throw new Error("required property 'contains' is undefined");
        }
        return LayoutConfiguration.copyFrom(key, this.expandLayoutPlaceholders(input as any, globalConfig));
    }

    private expandLayoutPlaceholders(input: LayoutConfiguration, globalConfig: GameConfiguration) {
        input.contains = _.flatMap((input.contains || []).map((key: string) => {
            switch (key) {
                case "*Buttons":
                    return Object.keys(globalConfig.buttons).map((buttonKey: string) => {
                        return globalConfig.buttons[buttonKey].key;
                    });
                case "*Resources":
                    return Object.keys(globalConfig.resources).map((resourceKey: string) => {
                        return globalConfig.resources[resourceKey].key;
                    });
                case "*Upgrades":
                    return Object.keys(globalConfig.upgrades).map((upgradeKey: string) => {
                        return globalConfig.upgrades[upgradeKey].key;
                    });
                case "*Achievements":
                    return Object.keys(globalConfig.achievements).map((achievementKey: string) => {
                        return globalConfig.achievements[achievementKey].key;
                    });
                case "*Generators":
                    return Object.keys(globalConfig.generators).map((generatorKey: string) => {
                        return globalConfig.generators[generatorKey].key;
                    });
            }
            return [key];
        }));
        return input;
    }
}
