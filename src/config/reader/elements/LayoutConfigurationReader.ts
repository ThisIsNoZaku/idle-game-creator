import LayoutConfiguration from "../../model/layout/SectionConfiguration";
import ItemConfigurationReader from "./ItemConfigurationReader";
import GameConfiguration from "../../model/GameConfiguration";

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
                    return Object.keys(globalConfig.buttons).map((key: string) => {
                        return globalConfig.buttons[key].key;
                    });
                case "*Resources":
                    return Object.keys(globalConfig.resources).map((key: string) => {
                        return globalConfig.resources[key].key;
                    });
                case "*Upgrades":
                    return Object.keys(globalConfig.upgrades).map((key: string) => {
                        return globalConfig.upgrades[key].key;
                    });
                case "*Achievements":
                    return Object.keys(globalConfig.achievements).map((key: string) => {
                        return globalConfig.achievements[key].key;
                    });
                case "*Generators":
                    return Object.keys(globalConfig.generators).map((key: string) => {
                        return globalConfig.generators[key].key;
                    });
            }
            return [key];
        }));
        return input;
    }
}
