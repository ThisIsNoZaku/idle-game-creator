import axios from "axios";
import ConfigurationLoader from "./ConfigurationLoader";

jest.mock("axios");

describe("ConfigurationLoader", () => {
    let loader: ConfigurationLoader;
    beforeEach(() => {
        loader = new ConfigurationLoader(axios);
    });
    afterEach(() => {
        (axios as any).mockReset();
    });
    it("can construct", () => {
        expect(() => new ConfigurationLoader(axios)).not.toThrow();
    });
    it("throws an exception if the client fails to connect", (done) => {
        (axios.get as jest.Mock).mockReturnValueOnce(Promise.reject({}));
        loader.load("badurl").catch(() => {
            done();
        });
    });
    it("returns the loaded data if the client successfully connects", (done) => {
        (axios.get as jest.Mock).mockReturnValueOnce(Promise.resolve(""));
        loader.load("goodurl").then(() => {
            done();
        });
    });
});
