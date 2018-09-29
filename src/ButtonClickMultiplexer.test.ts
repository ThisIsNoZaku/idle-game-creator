import ButtonClickMultiplexer from "./ButtonClickMultiplexer";
import ButtonClickAction from "./state/actions/ButtonClickAction";

import { Store } from "react";
import {Action} from "redux";
import createMockStore from "redux-mock-store";
import {createSandbox, SinonSpyCallApi, spy} from "sinon";

jest.mock(Store);

describe("ButtonClickMultiplexer", () => {
    let ButtonClickMiddleware: (next: (action: Action<any>) => any) => (action: Action<any>) => any;
    let mockStore;
    let next: SinonSpyCallApi;
    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
        mockStore = createMockStore();
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
