import TextConfigurationParser, {ReadingConfiguration} from "./TextConfigurationParser";
import * as fs from "fs";

describe("TextConfigurationParser", () => {
    const parser = new TextConfigurationParser();
    it("can construct", () => {
        new TextConfigurationParser();
    });
    describe("meta configuration", () => {
        let readConfig: ReadingConfiguration = {
            requireButtonConfiguration: false
        };

        it("throws an exception if the configuration is missing the required header", () => {
            try {
                let config = ``;
                parser.readAsTxtConfig(config, readConfig);
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - File doesn't begin with the required 'Let's make a game!' on the first line.")
            }
        });
        it("throws an exception if the configuration is missing a 'name' entry", () => {
            try {
                let config = `Let's make a game!`;
                parser.readAsTxtConfig(config, readConfig);
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - name must have a value.");
            }
        });
        it("throws an exception if the configuration is missing a 'version' entry", () => {
            try {
                let config = `Let's make a game!\n  name:Game name`;
                parser.readAsTxtConfig(config, readConfig);
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - version must have a value.");
            }
        });
        it("throws an exception if the configuration is missing a 'desc' entry", () => {
            try {
                let config = `Let's make a game!\n  name:Game name\n  version:0.1`;
                parser.readAsTxtConfig(config, readConfig);
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - desc must have a value.");
            }
        });
        it("throws an exception if the configuration is missing a 'by' entry", () => {
            try {
                let config = `Let's make a game!\n  name:Game name\n  version:0.1\n  desc:Description`;
                parser.readAsTxtConfig(config, readConfig);
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - by must have a value.");
            }
        });
        it("throws an exception if the configuration contains a malformed line.", () => {
            try {
                let config = `Let's make a game!\n  name:Game name\n  version:0.1\n  desc`;
                parser.readAsTxtConfig(config);
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - The line \"  desc\" is malformed, must contain a key and value separated by a ':'");
            }
        });
        it("Generates an expected configuration.", () => {
            let config = `Let's make a game!\n  name:Game name\n  version:0.1\n  desc:Description\n  by:Author`;
            let parsedConfig = parser.readAsTxtConfig(config, readConfig);
            expect(parsedConfig.letsMakeAGame.name === "Game name");
            expect(parsedConfig.letsMakeAGame.author === "Author");
            expect(parsedConfig.letsMakeAGame.desc = "Description");
            expect(parsedConfig.letsMakeAGame.version === "0.1");
            expect(Object.keys(parsedConfig.letsMakeAGame).length).toBe(4);
        });
        it("Is not affected by trailing empty lines.", () => {
            let config = `Let's make a game!\n  name:Game name\n  version:0.1\n  desc:Description\n  by:Author\n\n\n`;
            let parsedConfig = parser.readAsTxtConfig(config, readConfig);
            expect(parsedConfig.letsMakeAGame.name === "Game name");
            expect(parsedConfig.letsMakeAGame.author === "Author");
            expect(parsedConfig.letsMakeAGame.desc = "Description");
            expect(parsedConfig.letsMakeAGame.version === "0.1");
            expect(Object.keys(parsedConfig.letsMakeAGame).length).toBe(4);
        });
        it("Ignores extraneous properties.", () => {
            let config = `Let's make a game!\n  name:Game name\n  version:0.1\n  desc:Description\n  by:Author\n  extra:extra`;
            let parsedConfig = parser.readAsTxtConfig(config, readConfig);
            expect(parsedConfig.letsMakeAGame.name === "Game name");
            expect(parsedConfig.letsMakeAGame.author === "Author");
            expect(parsedConfig.letsMakeAGame.desc = "Description");
            expect(parsedConfig.letsMakeAGame.version === "0.1");
            expect(Object.keys(parsedConfig.letsMakeAGame).length).toBe(4);
        });
    });
    describe("button configuration", () => {
        it("throws an exception if no button configuration is found", () => {
            try {
                let config = `Let's make a game!\n  name:Game name\n  version:0.1\n  desc:Description\n  by:Author`;
                parser.readAsTxtConfig(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - File doesn't contain the required 'Buttons' entry.")
            }
        });
        it("throws an exception if the button configuration is empty.", () => {
            try {
                let config = `Let's make a game!\n  name:Game name\n  version:0.1\n  desc:Description\n  by:Author\nButtons`;
                parser.readAsTxtConfig(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - Button section begins on line 6 and ends on 5.");
            }
        });
        it("throws an exception if a button identifier doesn't begin with a *", () => {
            try {
                let config =
                    `Let's make a game!\n` +
                    `  name:Game name\n` +
                    `  version:0.1\n` +
                    `  desc:Description\n` +
                    `  by:Author\n` +
                    `Buttons\n` +
                    `  theButton\n` +
                    `    name:Button\n` +
                    `    desc:Description\n` +
                    `    on clic: yield 1 point`;
                parser.readAsTxtConfig(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - theButton looks like it should be an identifier but doesn't begin with a *.");
            }
        });
        it("creates a button configuration", () => {
            let config =
                `Let's make a game!\n` +
                `  name:Game name\n` +
                `  version:0.1\n` +
                `  desc:Description\n` +
                `  by:Author\n` +
                `Buttons\n` +
                `  *theButton\n` +
                `    name:Button\n` +
                `    desc:Description`;
            let parsedConfig = parser.readAsTxtConfig(config);
            expect(parsedConfig.buttons[0].key === "theButton");
            expect(parsedConfig.buttons[0].name.singular === "Button");
            expect(parsedConfig.buttons[0].description == "Descritpion");
            expect(parsedConfig.buttons[0].onClick === "yield 1 point");
        })
    })
});