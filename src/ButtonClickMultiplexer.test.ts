import ButtonClickMultiplexer from "./ButtonClickMultiplexer";
import ButtonClickAction from "./state/actions/ButtonClickAction";

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
        mockStore = configureStore()();
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
});
