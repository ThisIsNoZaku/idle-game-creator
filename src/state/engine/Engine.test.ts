import Engine from "./Engine";
import * as sinon from "sinon";
import * as redux from "redux";

describe("Engine", () => {
    let nextAction:(action: redux.Action) => void;
    let store:sinon.SinonSpy & redux.Store;
    let engineWithStore:(next:(action: redux.Action<any>) => void) => (action: redux.Action<any>) => void;
    beforeEach(() => {
        nextAction = (sinon.spy() as any);
        engineWithStore = Engine(store);
    });
    it("forwards actions to the next action", () => {
        engineWithStore(nextAction);
        expect((nextAction as sinon.SinonSpy).called);
    });
});