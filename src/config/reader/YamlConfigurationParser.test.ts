import GameConfiguration from "../model/GameConfiguration";
import {ReadingConfiguration} from "./ConfigurationParser";
import YamlConfigurationParser from "./YamlConfigurationParser";

describe("YamlConfigurationParser", () => {
    const parser = new YamlConfigurationParser();
    it("can construct", () => {
        expect(() => new YamlConfigurationParser()).not.toThrow();
    });
    describe("meta configuration", () => {

        it("throws an exception if the configuration is missing the required meta section", () => {
            try {
                const config =
                    `buttons:\n` +
                    `    - theButton:\n` +
                    `        name: Button\n` +
                    `        description: Description`;
                parser.parse(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - File is missing top level 'meta' section.");
            }
        });
        it("throws an exception if the configuration is missing a 'version' entry", () => {
            try {
                const config =
                    `meta:\n` +
                    `    name: Game name\n` +
                    `buttons:\n` +
                    `    - theButton:\n` +
                    `        name: Button\n` +
                    `        description: Description`;
                parser.parse(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - meta section is missing required property" +
                    " 'author'.");
            }
        });
        it("throws an exception if the 'version' is not a string", () => {
            try {
                const config =
                    `meta:\n` +
                    `    name: Game name\n` +
                    `    version: 1\n` +
                    `    description: Description\n` +
                    `    author: Author\n` +
                    `buttons:\n` +
                    `    - theButton:\n` +
                    `        name: Button\n` +
                    `        description: Description\n` +
                    `layout:\n` +
                    `   - buttons:\n` +
                    `       contains\n` +
                    `           - Buttons`;
                parser.parse(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - 'version' in the meta section must be a " +
                    "string. Try putting it in quotes.");
            }
        });
        it("throws an exception if the configuration is missing an 'author' entry", () => {
            try {
                const config =
                    `meta:\n` +
                    `    name: Game name\n` +
                    `    version: "0.1"\n` +
                    `    desc: Description\n`;
                parser.parse(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - meta section is missing required property" +
                    " 'author'.");
            }
        });
    });
    describe("button configuration", () => {
        it("throws an exception if no button configuration is found", () => {
            try {
                const config =
                    `meta:\n` +
                    `    name: Game name\n` +
                    `    version: "0.1"\n` +
                    `    description: Description\n` +
                    `    author: Author\n`;
                parser.parse(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - File is missing top level 'buttons' " +
                    "section. If you're sure it exists, it might be empty.");
            }
        });
        it("throws an exception if the button configuration is empty.", () => {
            try {
                const config =
                    `meta:\n` +
                    `    name: Game name\n` +
                    `    version: "0.1"\n` +
                    `    description: Description\n` +
                    `    author: Author\n` +
                    `buttons:\n`;
                parser.parse(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - File is missing top level 'buttons' " +
                    "section. If you're sure it exists, it might be empty.");
            }
        });
    });
    describe("layout configuration", () => {
        it("throws an exception if the layout configuration is missing", () => {
            try {
                const config =
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
        it("throws an exception if the layout does not parse to an object.", () => {
            try {
                const config =
                    `meta:\n` +
                    `    name: Game name\n` +
                    `    version: "0.1"\n` +
                    `    description: Description\n` +
                    `    author: Author\n` +
                    `buttons:\n` +
                    `    - theButton:\n` +
                    `       name: Button\n` +
                    `       description: Description\n` +
                    `layout:\n` +
                    `   buttons`;
                parser.parse(config);
                fail();
            } catch (e) {
                expect(e.message).toBe("Invalid Configuration File - Layout is of the wrong type, must be an object.");
            }
        });
    });

    it("throws an exception if the input is empty", () => {
        try {
            parser.parse("");
            fail();
        } catch (e) {
            expect(e.message).toBe("Invalid Configuration File - Input file was empty.");
        }
    });
    it("Generates an expected configuration.", () => {
        const config =
            `meta:\n` +
            `    name: Game name\n` +
            `    version: "0.1"\n` +
            `    description: Description\n` +
            `    author: Author\n` +
            `buttons:\n` +
            `    theButton:\n` +
            `        name: Button\n` +
            `        description: Description\n` +
            `layout:\n` +
            `   buttons:\n` +
            `       direction: horizontal\n` +
            `       contains:\n` +
            `           - Buttons\n` +
            `generators:\n` +
            `   resource:\n` +
            `     onTick: yield 1 resource\n` +
            `     requirements:\n` +
            `       resources:\n` + 
            `         bunny: total 1\n` +
            `   bigResource:\n` +
            `       onTick: yield 5 resource\n` +
            `       requirements:\n` + 
            `           resources:\n` + 
            `               bunny: 2\n` + 
            `       costs:\n` +
            `           resources:\n` + 
            `               bunny: 3`;
        const parsedConfig = parser.parse(config);
        
        expect(parsedConfig.meta.name).toBe("Game name");
        expect(parsedConfig.meta.author === "Author");
        expect(parsedConfig.meta.description).toBe("Description");
        expect(parsedConfig.meta.version).toBe("0.1");
        expect(parsedConfig.buttons.theButton.key).toBe("theButton");
        expect(parsedConfig.buttons.theButton.name).toBe("Button");
        expect(parsedConfig.buttons.theButton.description).toBe("Description");
        expect(parsedConfig.layout.buttons.key).toBe("buttons");
        expect(parsedConfig.layout.buttons.direction).toBe("horizontal");
        expect(parsedConfig.layout.buttons.contains).toContain("Buttons");
        
        expect(parsedConfig.generators.resource.requirements.resources.bunny.lifetimeTotal).toBe(1);
        expect(parsedConfig.generators.bigResource.requirements.resources.bunny.current).toBe(2);
        expect(parsedConfig.generators.bigResource.costs.resources.bunny).toBe(3);
        
        expect(Object.keys(parsedConfig.meta).length).toBe(4);
    });
});
