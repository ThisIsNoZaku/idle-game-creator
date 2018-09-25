import StateReducer from "./StateReducer";
import GameState from "../engine/GameState";
import GainResourceAction from "../actions/GainResourceAction";
import ResourceState from "../engine/ResourceState";
import TickAction from "../actions/TickAction";

describe("Game StateReducer", ()=>{
  it("returns an empty GameState when given undefined", ()=>{
    const result = StateReducer(undefined, undefined);
    expect(result).toEqual({... new GameState()});
  });
  it("returns the given state if it receives an unknown action", ()=>{
    const state = {};
    expect(StateReducer(state, {type: "unknown"})).toEqual(state);
  });
  it("modified resources when receiving a GainResourceAction", ()=>{
    const action = new GainResourceAction("resource", 1);
    console.log(action.type);
    const state = {
      resources: {resource: new ResourceState("resource", 0)}
    };
    const reducerResult = StateReducer(state, action);
    expect(reducerResult.resources["resource"].quantity).toBe(1);
  });
  it("updates resources on Ticks", ()=>{
    const state = {
      resources: {resource: new ResourceState("resource", 0)}
    }
    const action = new TickAction({
      resource: 1
    });
    const reducerResult = StateReducer(state, action);
    expect(reducerResult.resources["resource"].quantity).toBe(1);
  });
});
