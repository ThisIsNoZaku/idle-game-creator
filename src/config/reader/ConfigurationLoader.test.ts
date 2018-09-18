import axios from "axios";
import ConfigurationLoader from "./ConfigurationLoader";

jest.mock("axios");

describe("ConfigurationLoader", () => {
    let loader: ConfigurationLoader;
    beforeEach(() => {
        loader = new ConfigurationLoader(axios);
    });
    afterEach(() => {
        (axios as jest.Mock).mockReset();
    });
    it("can construct", () => {
        new ConfigurationLoader(axios);
    });
    it("throws an exception if no client is provided", () => {
        expect(() => {
            return new ConfigurationLoader(null);
        })
            .toThrow(Error);
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
