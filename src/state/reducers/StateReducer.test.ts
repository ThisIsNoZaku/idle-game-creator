import StateReducer from "./StateReducer";
import GameState from "../engine/GameState";
import GainResourceAction from "../actions/GainResourceAction";
import ResourceState from "../engine/ResourceState";
import TickAction from "../actions/TickAction";
import GeneratorState from "../engine/GeneratorState";
import BuyAction from "../actions/BuyAction";
import sinon from "sinon";

describe("Game StateReducer", ()=>{
  let sandbox;
  beforeEach(()=>{
    sandbox = sinon.createSandbox();
  });
  afterEach(()=>{
    sandbox.verifyAndRestore();
  })
  it("returns an empty GameState when given undefined", ()=>{
    const result = StateReducer(undefined, {type: "@@INIT"});
    expect(result).toEqual({... new GameState()});
  });
  it("returns the given state if it receives an unknown action", ()=>{
    const state = {};
    expect(StateReducer(state, {type: "unknown"})).toEqual(state);
  });
  it("modified resources when receiving a GainResourceAction", ()=>{
    const action = new GainResourceAction("resource", 1);
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
  it("adds generators on Buy action", ()=>{
    const state = {
      generators : {
        generator: new GeneratorState("generator", 1)
      }
    };
    const action = new BuyAction("generator", 1);
    const reducerResult = StateReducer(state, action);
    expect(reducerResult.generators["generator"].quantity).toBe(2);
  });
  it("removed resources when a successful build action has a cost", ()=>{
    const state = {
      resources: {
        resource: new ResourceState("resource", 1)
      },
      generators : {
        generator: new GeneratorState("generator", 1)
      }
    };
    const action = new BuyAction("generator", 1, {resource:1});
    console.assert(action.success, "Oops, was supposed to be successful");
    const reducerResult = StateReducer(state, action);
    expect(reducerResult.resources["resource"].quantity).toBe(0);
    expect(reducerResult.generators["generator"].quantity).toBe(2);
  });
  it("does not add a generator if an non-defined one is specified", ()=>{
    let logSpy = sandbox.spy(console, 'warn');
    const state = {
      generators : {
        generator: new GeneratorState("generator", 1)
      }
    };
    const action = new BuyAction("doesnotexist", 1);
    const reducerResult = StateReducer(state, action);
    expect(reducerResult.generators["generator"].quantity).toBe(1);
    expect(logSpy.calledOnce).toBeTruthy();
  });
});
