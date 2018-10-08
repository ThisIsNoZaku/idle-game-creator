import ButtonClickMultiplexer from "./ButtonClickMultiplexer";
import ButtonClickAction from "./state/actions/ButtonClickAction";
import GainResourceAction from "./state/actions/engine/GainResourceAction";

import {Action, Store} from "redux";
import configureStore from "redux-mock-store";
import {createSandbox, SinonSpyCallApi, spy} from "sinon";

describe("ButtonClickMultiplexer", () => {
    let ButtonClickMiddleware: (next: (action: Action<any>) => any) => (action: Action<any>) => any;
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
        ButtonClickMiddleware = ButtonClickMultiplexer(mockStore);
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
        ButtonClickMiddleware(next)(action);
        expect(next.withArgs(action).calledOnce).toBeTruthy();
    });
    it("multiplexes a click action based on the button clicked", () => {
        const action = new ButtonClickAction({
            identifier: "Button",
            type: "button",
            effects: ["yield 1 resourceA", "yield 2 resourceB"]
        });
        ButtonClickMiddleware(next)(action);
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
                                trigger: "Button click",
                                effects: ["add 1 resourceA"],
                            }],
                        },
                        enabled: true,
                    }
                    ],
            },
        });
        ButtonClickMiddleware = ButtonClickMultiplexer(mockStore);
        const action = new ButtonClickAction({
            identifier: "Button",
            type: "button",
            effects: ["yield 1 resourceA"]
        });
        ButtonClickMiddleware(next)(action);
        expect(next.withArgs(action).calledOnce).not.toBeTruthy();
        expect(next.withArgs({... new GainResourceAction("resourceA", 2)}).calledOnce).toBeTruthy();
        expect(next.calledOnce).toBeTruthy();
    });
});
