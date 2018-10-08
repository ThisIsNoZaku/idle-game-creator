import ResourceState from "./ResourceState";
import UpgradeState from "./UpgradeState";

import GeneratorConfiguration from "../../config/model/GeneratorConfiguration";

export default class GameState {
    public resources: { [name: string]: ResourceState } = {};
    public generators: {
        [name: string]: {
            entity: GeneratorConfiguration,
            quantity: number,
        },
    } = {};
    public upgrades: { [name: string]: UpgradeState } = {};
}
