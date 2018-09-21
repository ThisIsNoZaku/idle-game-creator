import ResourceState from "./ResourceState";
import GeneratorConfiguration from "../../config/model/GeneratorConfiguration";

export default class GameState {
    public resources: { [name: string]: ResourceState } = {};
    public generators: {
        [name: string]: {
            entity: GeneratorConfiguration,
            quantity: number
        }
    } = {}
}