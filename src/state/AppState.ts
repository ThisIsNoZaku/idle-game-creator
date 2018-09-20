import GameConfiguration from "../config/model/GameConfiguration";
import GameState from "./engine/GameState";

export default class AppState {
    public config: GameConfiguration;
    public state: GameState;
}
