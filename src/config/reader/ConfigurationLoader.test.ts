import ConfigurationLoader from "./ConfigurationLoader";
import axios from "axios";

jest.mock("axios");

describe("ConfigurationLoader", () => {
    let loader: ConfigurationLoader;
    beforeEach(() => {
        loader = new ConfigurationLoader(axios);
    });
    afterEach(() => {
        (axios as jest.Mock).mockReset();
    })
    it("can construct", () => {
        try {
            new ConfigurationLoader(null);
            fail("Exception should be thrown.");
        } catch (e) {

        }
    });
    it("throws an exception if the client fails to connect", (done) => {
        (axios.get as jest.Mock).mockReturnValueOnce(Promise.reject({}));
        let loader = new ConfigurationLoader(axios);
        loader.load("badurl").catch(()=>{
            done();
        });
    });
    it("returns the loaded data if the client successfully connects", done => {
        (axios.get as jest.Mock).mockReturnValueOnce(Promise.resolve(""));
        let loader = new ConfigurationLoader(axios);
        loader.load("goodurl").then(()=>{
            done();
        });
    });
});