import ConfigurationReducer from "./ConfigurationReducer";
import PopulateConfigAction from "../actions/PopulateConfigAction";

describe("ConfigurationReducer", () => {
    it("returns null if state is undefined", () => {
        const result = ConfigurationReducer(undefined, {type: "@@init"});
        expect(result).toEqual(null);
    })
    it("returns the given state for an unrelated action", () => {
        const previousState = {
            foo: "bar"
        };
        const result = ConfigurationReducer(previousState, {type: "someUnrelatedAction"});
        expect(result).toEqual(previousState);
    });
    it("throws an error if a POPULATE_CONFIG action is called but no actual configuration is given", () => {
        expect(ConfigurationReducer.bind(null, {}, {
            type: PopulateConfigAction.ACTION_TYPE,
            config: null,
        })).toThrow();
    });
    it("uses the given configuratio if a POPULATE_CONFIG action is called", () => {
        const result = ConfigurationReducer(null, {
            type: PopulateConfigAction.ACTION_TYPE,
            config: {foo:"foo"},
        })
        expect(result).toEqual({foo:"foo"});
    });
})