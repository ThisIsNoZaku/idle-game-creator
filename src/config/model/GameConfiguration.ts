import AchievementConfiguration from "./AchievementConfiguration";
import ButtonConfiguration from "./ButtonConfiguration";
import GeneratorConfiguration from "./GeneratorConfiguration";
import MetaConfiguration from "./MetaConfiguration";
import ResourceConfiguration from "./ResourceConfiguration";
import UpgradeConfiguration from "./UpgradeConfiguration";

import SectionConfiguration from "./layout/SectionConfiguration";

export default class GameConfiguration {

    public meta: MetaConfiguration;
    public buttons: {[key: string]: ButtonConfiguration};
    public layout: {[key: string]: SectionConfiguration};
    public resources: {[key: string]: ResourceConfiguration};
    public generators: {[key: string]: GeneratorConfiguration};
    public upgrades: {[key: string]: UpgradeConfiguration};
    public achievements: {[key: string]: AchievementConfiguration};

    constructor(meta: MetaConfiguration, buttons: {[key: string]: ButtonConfiguration},
                layout: {[key: string]: SectionConfiguration},
                resources: {[key: string]: ResourceConfiguration},
                generators: {[key: string]: GeneratorConfiguration},
                upgrades: {[key: string]: UpgradeConfiguration},
                achievements: {[key: string]: AchievementConfiguration}) {
        this.meta = meta;
        this.buttons = buttons;
        this.layout = layout;
        this.resources = resources;
        this.generators = generators;
        this.upgrades = upgrades;
        this.achievements = achievements;
    }
}
