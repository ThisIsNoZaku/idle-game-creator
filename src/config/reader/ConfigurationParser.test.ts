import ConfigurationParser from "./ConfigurationParser";
import * as fs from "fs";

describe("ConfigurationParser", () => {
    const parser = new ConfigurationParser();
    it("can construct", () => {
        new ConfigurationParser();
    });
    describe("meta configuration", () => {

        it("throws an exception if the configuration is missing the required header", () => {
            try {
                let config = ``;
                parser.readAsTxtConfig(config);
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - File doesn't begin with the required 'Let's make a game!' on the first line.")
            }
        });
        it("throws an exception if the configuration is missing a 'name' entry", () => {
            try {
                let config = `Let's make a game!
            `;
                parser.readAsTxtConfig(config);
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - Name must have a value.");
            }
        });
        it("throws an exception if the configuration is missing a 'version' entry", () => {
            try {
                let config = `Let's make a game!\n  name:Game name
            `;
                parser.readAsTxtConfig(config);
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - version must have a value.");
            }
        });
        it("throws an exception if the configuration is missing a 'desc' entry", () => {
            try {
                let config = `Let's make a game!\n  name:Game name\n    version:0.1
            `;
                parser.readAsTxtConfig(config);
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - desc must have a value.");
            }
        });
        it("throws an exception if the configuration is missing a 'version' entry", () => {
            try {
                let config = `Let's make a game!\n  name:Game name\n    version:0.1\n   desc:Description`;
                parser.readAsTxtConfig(config);
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - by must have a value.");
            }
        });
        it("Generates an expected configuration.", () => {
            let config = `Let's make a game!\n  name:Game name\n    version:0.1\n   desc:Description\n  by:Author`;
            let parsedConfig = parser.readAsTxtConfig(config);
            expect(parsedConfig.letsMakeAGame.name === "Game name");
            expect(parsedConfig.letsMakeAGame.author === "Author");
            expect(parsedConfig.letsMakeAGame.desc = "Description");
            expect(parsedConfig.letsMakeAGame.version === "0.1");
            expect(Object.keys(parsedConfig.letsMakeAGame).length).toBe(4);
        });
    })
});