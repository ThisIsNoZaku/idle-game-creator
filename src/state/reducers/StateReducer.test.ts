import StateReducer from "./StateReducer";

import BuyAction from "../actions/BuyAction";
import GainResourceAction from "../actions/GainResourceAction";
import TickAction from "../actions/TickAction";
import PopulateConfigAction from "../actions/PopulateConfigAction";

import GameState from "../engine/GameState";
import GeneratorState from "../engine/GeneratorState";
import ResourceState from "../engine/ResourceState";

import sinon from "sinon";

describe("Game StateReducer", () => {
  let sandbox: sinon.SinonSandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.verifyAndRestore();
  });
  it("returns an empty GameState when given undefined", () => {
    const result = StateReducer(undefined, {type: "@@INIT"});
    expect(result).toEqual({... new GameState()});
  });
  it("returns the given state if it receives an unknown action", () => {
    const state = {};
    expect(StateReducer(state, {type: "unknown"})).toEqual(state);
  });
  it("modified resources when receiving a GainResourceAction", () => {
    const action = new GainResourceAction("resource", 1);
    const state = {
      resources: {resource: new ResourceState("resource", 0)},
    };
    const reducerResult = StateReducer(state, action);
    expect(reducerResult.resources.resource.quantity).toBe(1);
  });
  it("updates resources on Ticks", () => {
    const state = {
      resources: {resource: new ResourceState("resource", 0)},
    };
    const action = new TickAction({
      resource: 1,
    });
    const reducerResult = StateReducer(state, action);
    expect(reducerResult.resources.resource.quantity).toBe(1);
  });
  describe("buying", () =>{
  it("adds generators on Buy action", () => {
    const state = {
      generators : {
        generator: new GeneratorState("generator", 1),
      },
    };
    const action = new BuyAction("generator", 1, {});
    const reducerResult = StateReducer(state, action);
    expect(reducerResult.generators.generator.quantity).toBe(2);
  });
  it("removed resources when a successful build action has a cost", () => {
    const state = {
      generators : {
        generator: new GeneratorState("generator", 1),
      },
      resources: {
        resource: new ResourceState("resource", 1),
      },
    };
    const action = new BuyAction("generator", 1, {resource: 1});
    console.assert(action.success, "Oops, was supposed to be successful");
    const reducerResult = StateReducer(state, action);
    expect(reducerResult.resources.resource.quantity).toBe(0);
    expect(reducerResult.generators.generator.quantity).toBe(2);
  });
  it("does not add a generator if an non-defined one is specified", () => {
    const logSpy = sandbox.spy(console, "warn");
    const state = {
      generators : {
        generator: new GeneratorState("generator", 1),
      },
    };
    const action = new BuyAction("doesnotexist", 1, {});
    const reducerResult = StateReducer(state, action);
    expect(reducerResult.generators.generator.quantity).toBe(1);
    expect(logSpy.calledOnce).toBeTruthy();
  });
  it("does not add a resource if an non-defined one is specified", () => {
    const logSpy = sandbox.spy(console, "warn");
    const state = {
      resources : {
        resource: new ResourceState("resource", 1),
      },
    };
    const action = new GainResourceAction("doesnotexist", 1);
    const reducerResult = StateReducer(state, action);
    expect(reducerResult.resources.resource.quantity).toBe(1);
    expect(logSpy.calledOnce).toBeTruthy();
  });
  it("populates the resource state when reading a configuration", () => {
    const config = {
      resources: {
        resource: {}
      },
      generators: {
        generator: {}
      }
    };
    const action = new PopulateConfigAction(config);
    const reducerResult = StateReducer({}, action);
    expect(reducerResult.resources.resource).toBeTruthy();
    expect(reducerResult.generators.generator).toBeTruthy();
  });
  it("ignores a failed buy action", () => {
    const state = {
      generators : {
        generator: new GeneratorState("generator", 0),
      },
    };
    const action = new BuyAction("generator", 0);
    const reducerResult = StateReducer(state, action);
    expect(reducerResult.generators.generator.quantity).toBe(0);
  });
  it("does not remove any resources if buy cost is missing", () => {
    const state = {
      generators : {
        generator: new GeneratorState("generator", 0),
      },
      resources: {
        resource: new ResourceState("resource", 1)
      }
    };
    const action = new BuyAction("generator", 1, {});
    const reducerResult = StateReducer(state, action);
    expect(reducerResult.generators.generator.quantity).toBe(1);
    expect(reducerResult.resources.resource.quantity).toBe(1);
  });
  })
});
