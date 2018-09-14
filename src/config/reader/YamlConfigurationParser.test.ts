import YamlConfigurationParser from "./YamlConfigurationParser";
import {ReadingConfiguration} from "./ConfigurationParser";

describe("YamlConfigurationParser", () => {
    const parser = new YamlConfigurationParser();
    it("can construct", () => {
        new YamlConfigurationParser();
    });
    describe("meta configuration", () => {

        it("throws an exception if the configuration is missing the required meta section", () => {
            try {
                let config = ``;
                parser.parse(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - Input file was empty.");
            }
        });
        it("throws an exception if the configuration is missing a 'version' entry", () => {
            try {
                let config =
                    `meta:\n` +
                    `    name: Game name\n` +
                    `buttons:\n` +
                    `    - theButton:\n` +
                    `        name: Button\n` +
                    `        description: Description`;
                parser.parse(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - meta section is missing required property 'author'.");
            }
        });
        it("throws an exception if the 'version' is not a string", () => {
            try {
                let config =
                    `meta:\n` +
                    `    name: Game name\n` +
                    `    version: 1\n` +
                    `    description: Description\n` +
                    `    author: Author\n` +
                    `buttons:\n` +
                    `    - theButton:\n` +
                    `        name: Button\n` +
                    `        description: Description\n` +
                    `layout:\n`+
                    `   - buttons:\n`+
                    `       contains\n`+
                    `           - Buttons`;
                parser.parse(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - 'version' in the meta section must be a string. Try putting it in quotes.");
            }
        });
        it("throws an exception if the configuration is missing an 'author' entry", () => {
            try {
                let config =
                    `meta:\n` +
                    `    name: Game name\n` +
                    `    version: "0.1"\n` +
                    `    desc: Description\n`;
                parser.parse(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - meta section is missing required property 'author'.");
            }
        });
    });
    describe("button configuration", () => {
        it("throws an exception if no button configuration is found", () => {
            try {
                let config =
                    `meta:\n` +
                    `    name: Game name\n` +
                    `    version: "0.1"\n` +
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
                    `    version: "0.1"\n` +
                    `    description: Description\n` +
                    `    author: Author\n` +
                    `buttons:\n`;
                parser.parse(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - File is missing top level 'buttons' section. If you're sure it exists, it might be empty.");
            }
        });
    });
    describe("layout configuration", () => {
        it("throws an exception if the layout configuration is missing", () => {
            try {
                let config =
                    `meta:\n` +
                    `    name: Game name\n` +
                    `    version: "0.1"\n` +
                    `    description: Description\n` +
                    `    author: Author\n` +
                    `buttons:\n` +
                    `    - theButton:\n` +
                    `        name: Button\n` +
                    `        description: Description`;
                parser.parse(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - File is missing top level 'layout' section.");
            }

        });
    });

    it("Generates an expected configuration.", () => {
        let config =
            `meta:\n` +
            `    name: Game name\n` +
            `    version: "0.1"\n` +
            `    description: Description\n` +
            `    author: Author\n` +
            `\n`+
            `buttons:\n` +
            `    theButton:\n` +
            `        name: Button\n` +
            `        description: Description\n` +
            `layout:\n`+
            `   buttons:\n`+
            `       contains:\n`+
            `           - Buttons`;
        let parsedConfig = parser.parse(config);
        console.log(parsedConfig);
        expect(parsedConfig.meta.name).toBe("Game name");
        expect(parsedConfig.meta.author === "Author");
        expect(parsedConfig.meta.description).toBe("Description");
        expect(parsedConfig.meta.version).toBe("0.1");
        expect(parsedConfig.buttons["theButton"].key).toBe("theButton");
        expect(parsedConfig.buttons["theButton"].name).toBe("Button");
        expect(parsedConfig.buttons["theButton"].description).toBe("Description");
        expect(parsedConfig.layout["buttons"].key).toBe("buttons");
        expect(parsedConfig.layout["buttons"].contains).toContain("Buttons");
        expect(Object.keys(parsedConfig.meta).length).toBe(4);
    });
});