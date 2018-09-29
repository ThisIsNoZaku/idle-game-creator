import GameConfiguration from "../config/model/GameConfiguration";
import GameState from "./engine/GameState";

export default class AppState {
    public config: GameConfiguration;
    public state: GameState;
    public error?: string;

    constructor(config: GameConfiguration, state: GameState) {
        this.config = config;
        this.state = state;
    }
}
