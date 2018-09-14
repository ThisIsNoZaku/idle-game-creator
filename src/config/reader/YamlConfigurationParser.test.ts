import YamlConfigurationParser from "./YamlConfigurationParser";
import {ReadingConfiguration} from "./ConfigurationParser";

describe("YamlConfigurationParser", () => {
    const parser = new YamlConfigurationParser();
    it("can construct", () => {
        new YamlConfigurationParser();
    });
    describe("meta configuration", () => {
        let readConfig: ReadingConfiguration = {
            requireButtonConfiguration: false
        };

        it("throws an exception if the configuration is missing the required meta section", () => {
            try {
                let config = ``;
                parser.parse(config, readConfig);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - Input file was empty.");
            }
        });
        it("throws an exception if the configuration is missing a 'name' entry", () => {
            try {
                let config = `Let's make a game!`;
                parser.parse(config, readConfig);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - File is missing top level 'meta' section.");
            }
        });
        it("throws an exception if the configuration is missing a 'version' entry", () => {
            try {
                let config =
                    `meta:\n` +
                    `    name: Game name\n`;
                parser.parse(config, readConfig);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - meta section is missing required property 'author'.");
            }
        });
        it("throws an exception if the configuration is missing an 'author' entry", () => {
            try {
                let config =
                    `meta:\n` +
                    `    name: Game name\n` +
                    `    version: 0.1\n` +
                    `    desc: Description\n`;
                parser.parse(config, readConfig);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - meta section is missing required property 'author'.");
            }
        });
        it("Generates an expected configuration.", () => {
            let config =
                `meta:\n` +
                `    name: Game name\n` +
                `    version: 0.1\n` +
                `    description: Description\n` +
                `    author: Author\n`;
            let parsedConfig = parser.parse(config, readConfig);
            expect(parsedConfig.meta.name === "Game name");
            expect(parsedConfig.meta.author === "Author");
            expect(parsedConfig.meta.description === "Description");
            expect(parsedConfig.meta.version === "0.1");
            expect(Object.keys(parsedConfig.meta).length).toBe(4);
        });
    });
    describe("button configuration", () => {
        it("throws an exception if no button configuration is found", () => {
            try {
                let config =
                    `meta:\n` +
                    `    name: Game name\n` +
                    `    version: 0.1\n` +
                    `    description: Description\n` +
                    `    author: Author\n`;
                parser.parse(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - File is missing top level 'buttons' section. If you're sure it exists, it might be empty.");
            }
        });
        it("throws an exception if the button configuration is empty.", () => {
            try {
                let config =
                    `meta:\n` +
                    `    name: Game name\n` +
                    `    version: 0.1\n` +
                    `    description: Description\n` +
                    `    author: Author\n` +
                    `buttons:\n`;
                parser.parse(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - File is missing top level 'buttons' section. If you're sure it exists, it might be empty.");
            }
        });
        it("creates a button configuration", () => {
            let config =
                `meta:\n` +
                `    name: Game name\n` +
                `    version: 0.1\n` +
                `    description: Description\n` +
                `    author: Author\n` +
                `buttons:\n` +
                `    - theButton:\n` +
                `        name: Button\n` +
                `        description: Description`;
            let parsedConfig = parser.parse(config);
            expect(parsedConfig.buttons[0].key === "theButton");
            expect(parsedConfig.buttons[0].name === "Button");
            expect(parsedConfig.buttons[0].description === "Descritpion");
            expect(parsedConfig.buttons[0].onClick === "yield 1 point");
        })
    })
});