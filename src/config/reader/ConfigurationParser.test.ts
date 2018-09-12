import ConfigurationParser from "./ConfigurationParser";
import * as fs from "fs";

describe("ConfigurationParser", () => {
    const parser = new ConfigurationParser();
    it("can construct", () => {
        new ConfigurationParser();
    });

    it("throws an exception if the configuration is missing the required header", ()=>{
        try {
            let config = `
        `;
            parser.readAsTxtConfig(config);
        } catch (e) {
            expect(e.message).toBe("Invalid Configuration File - File doesn't begin with the required 'Let's make a game!'.")
        }
    });
});