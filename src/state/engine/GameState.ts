import ResourceState from "./ResourceState";

export default class GameState {
    public resources: {[name:string]:ResourceState} = {};
}