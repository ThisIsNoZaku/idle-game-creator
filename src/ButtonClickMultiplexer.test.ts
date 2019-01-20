import ButtonClickMultiplexer from "./ButtonClickMultiplexer";
import ButtonClickAction from "./state/actions/ButtonClickAction";
import GainResourceAction from "./state/actions/engine/GainResourceAction";

import {Action, Store} from "redux";
import configureStore from "redux-mock-store";
import {createSandbox, SinonSpyCallApi, spy} from "sinon";

describe("ButtonClickMultiplexer", () => {
    let buttonClickMiddleware: (next: (action: Action<any>) => any)
        => (action: Action<any>) => any;
    let mockStore;
    let next: any;
    let sandbox: any;
    beforeEach(() => {
        sandbox = createSandbox();
        mockStore = configureStore()({
            state: {
                upgrades: [],
            },
        });
        buttonClickMiddleware = ButtonClickMultiplexer(mockStore);
        next = sandbox.spy();
    });
    afterEach(() => {
      sandbox.verifyAndRestore();
    });
    it("Does nothing if the action has no effects.", () => {
        const action = new ButtonClickAction({
            identifier: "Button",
            type: "button",
        });
        buttonClickMiddleware(next)(action);
        expect(next.withArgs(action).calledOnce).toBeTruthy();
    });
    it("multiplexes a click action based on the button clicked", () => {
        const action = new ButtonClickAction({
            effects: ["yield 1 resourceA", "yield 2 resourceB"],
            identifier: "Button",
            type: "button",
        });
        buttonClickMiddleware(next)(action);
        expect(next.withArgs(action).calledOnce).not.toBeTruthy();
        expect(next.withArgs({... new GainResourceAction("resourceA", 1)}).calledOnce).toBeTruthy();
        expect(next.withArgs({... new GainResourceAction("resourceB", 2)}).calledOnce).toBeTruthy();
    });
    it("modifies click effects when there are upgrades", () => {
        mockStore = configureStore()({
            state: {
                upgrades: [
                    {
                        config: {
                            effects: [{
                                effects: ["add 1 resourceA"],
                                trigger: "Button click",
                            }],
                        },
                        enabled: true,
                    },
                    ],
            },
        });
        buttonClickMiddleware = ButtonClickMultiplexer(mockStore);
        const action = new ButtonClickAction({
            effects: ["yield 1 resourceA"],
            identifier: "Button",
            type: "button",
        });
        buttonClickMiddleware(next)(action);
        expect(next.withArgs(action).calledOnce).not.toBeTruthy();
        expect(next.withArgs({... new GainResourceAction("resourceA", 2)}).calledOnce).toBeTruthy();
        expect(next.calledOnce).toBeTruthy();
    });
    it("click modifiers apply addition, then multiplier effects", () => {
        mockStore = configureStore()({
            state: {
                upgrades: [
                    {
                        config: {
                            effects: [{
                                effects: ["multiply 1.1 resourceA"],
                                trigger: "Button click",
                            },{
                                effects: ["add 1 resourceA"],
                                trigger: "Button click",
                            },
                            {
                                effects: ["multiply 1.1 resourceA"],
                                trigger: "Button click",
                            },],
                        },
                        enabled: true,
                    },
                    ],
            },
        });
        buttonClickMiddleware = ButtonClickMultiplexer(mockStore);
        const action = new ButtonClickAction({
            effects: ["yield 1 resourceA"],
            identifier: "Button",
            type: "button",
        });
        buttonClickMiddleware(next)(action);
        expect(next.withArgs(action).calledOnce).not.toBeTruthy();
        expect(next.getCall(0).args[0]).toEqual(new GainResourceAction("resourceA", 2.4));
        expect(next.withArgs({... new GainResourceAction("resourceA", 2.4)}).calledOnce).toBeTruthy();
        expect(next.calledOnce).toBeTruthy();
    });
    it("throws an error when the first token is invalid", () => {
        mockStore = configureStore()({
            state: {
                upgrades: [
                    {
                        config: {
                            effects: [{
                                effects: ["crash 1.1 resourceA"],
                                trigger: "Button click",
                            }],
                        },
                        enabled: true,
                    },
                    ],
            },
        });
        buttonClickMiddleware = ButtonClickMultiplexer(mockStore);
        const action = new ButtonClickAction({
            effects: ["yield 1 resourceA"],
            identifier: "Button",
            type: "button",
        });
        expect(() =>{
            buttonClickMiddleware(next)(action);
        }).toThrow();
    });
});
