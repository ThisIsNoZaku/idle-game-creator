import ButtonClickMultiplexer from "./ButtonClickMultiplexer";
import { Store } from "react";
import {SinonSpyCallApi, spy, createSandbox} from "sinon";
import ButtonClickAction from "./state/actions/ButtonClickAction";
import {Action} from "redux";
import createMockStore from "redux-mock-store";

jest.mock(Store);

describe("ButtonClickMultiplexer", () => {
    let ButtonClickMiddleware:(next:(action:Action<any>)=>any)=>(action:Action<any>)=>any, mockStore,
        next: SinonSpyCallApi, sandbox;
    beforeEach(()=>{
        sandbox = createSandbox();
        mockStore: createMockStore();
        ButtonClickMiddleware = ButtonClickMultiplexer(mockStore);
        next = sandbox.spy();
    });
    afterEach(()=>{
      sandbox.verifyAndRestore();
    })
    it("Does nothing if the action has no effects.", ()=>{
        let action = new ButtonClickAction({
            identifier: "Button",
            type: "button"
        });
        ButtonClickMiddleware(next)(action);
        expect(next.withArgs(action).calledOnce).toBeTruthy();
    })
});
