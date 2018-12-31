import GameConfiguration from "../model/GameConfiguration";
import {ReadingConfiguration} from "./ConfigurationParser";
import YamlConfigurationParser from "./YamlConfigurationParser";
import fs from "fs";
import Path from "path";

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
        const config = fs.readFileSync(Path.resolve(__dirname + "../../../../public/example.yaml"), "UTF-8");
        const parsedConfig = parser.parse(config);
        
        expect(parsedConfig.meta.name).toBe("Bunnyclicker");
        expect(parsedConfig.meta.author === "Orteil");
        expect(parsedConfig.meta.description).toBe("Example game");
        expect(parsedConfig.meta.version).toBe("0.0.1");
        
        expect(parsedConfig.buttons.bunnyButton.key).toBe("bunnyButton");
        expect(parsedConfig.buttons.bunnyButton.name).toBe("Make a bunny");
        expect(parsedConfig.buttons.bunnyButton.description).toBe("Click this little bunny to get more bunnies!");
        
        expect(parsedConfig.layout.buttons).toBeDefined();
        expect(parsedConfig.layout.buttons.key).toBe("buttons");
        expect(parsedConfig.layout.buttons.direction).toBe("vertical");
        expect(parsedConfig.layout.buttons.contains).toContain("bunnyButton");
        expect(parsedConfig.layout.resources).toBeDefined();
        expect(parsedConfig.layout.resources.key).toBe("resources");
        expect(parsedConfig.layout.resources.direction).toBe("vertical");
        expect(parsedConfig.layout.resources.contains).toContain("bunny");
        
        // Make sure we're checking the correct number of generators.
        expect(Object.keys(parsedConfig.generators).length).toBe(5);
        
        expect(parsedConfig.generators.cage).toBeDefined();
        expect(parsedConfig.generators.cage.name).toEqual("Cage");
        expect(parsedConfig.generators.cage.description).toEqual("Generates 1 bunny per 10 seconds");
        expect(parsedConfig.generators.cage.costTooltip).toEqual(true);
        expect(parsedConfig.generators.cage.cost.resources.bunny).toEqual(15);
        expect(parsedConfig.generators.cage.onTick).toEqual(["yield .1 bunny"]);
        
        expect(parsedConfig.generators.hutch).toBeDefined();
        expect(parsedConfig.generators.hutch.name).toEqual("Hutch");
        expect(parsedConfig.generators.hutch.description).toEqual("A bit roomier than a cage. Generates 1 bunny per 2 seconds.");
        expect(parsedConfig.generators.hutch.costTooltip).toEqual(true);
        expect(parsedConfig.generators.hutch.cost.resources.bunny).toEqual(100);
        expect(parsedConfig.generators.hutch.requirements.resources.bunny.lifetimeTotal).toEqual(100);
        expect(parsedConfig.generators.hutch.onTick).toEqual(["yield .5 bunny"]);
        
        expect(parsedConfig.generators.coop).toBeDefined();
        expect(parsedConfig.generators.coop.name).toEqual("Coop");
        expect(parsedConfig.generators.coop.description).toEqual("A much nicer rabbit home where full bunny families can live. Produces 5 rabbits per second.");
        expect(parsedConfig.generators.coop.costTooltip).toEqual(true);
        expect(parsedConfig.generators.coop.cost.resources.bunny).toEqual(600);
        expect(parsedConfig.generators.coop.requirements.resources.bunny.lifetimeTotal).toEqual(600);
        expect(parsedConfig.generators.coop.onTick).toEqual(["yield 5 bunny"]);
        
        expect(parsedConfig.generators.pen).toBeDefined();
        expect(parsedConfig.generators.pen.name).toEqual("Pen");
        expect(parsedConfig.generators.pen.description).toEqual("A lovely enclosure with plenty of green space. Produces 12 rabbits per second.");
        expect(parsedConfig.generators.pen.costTooltip).toEqual(true);
        expect(parsedConfig.generators.pen.cost.resources.bunny).toEqual(4000);
        expect(parsedConfig.generators.pen.requirements.resources.bunny.lifetimeTotal).toEqual(4000);
        expect(parsedConfig.generators.pen.onTick).toEqual(["yield 12 bunny"]);
        
        expect(parsedConfig.generators.meadow).toBeDefined();
        expect(parsedConfig.generators.meadow.name).toEqual("Meadow");
        expect(parsedConfig.generators.meadow.description).toEqual("A wide open space full of shade and lush grass. Produces 90 rabbits per second.");
        expect(parsedConfig.generators.meadow.costTooltip).toEqual(true);
        expect(parsedConfig.generators.meadow.cost.resources.bunny).toEqual(20000);
        expect(parsedConfig.generators.meadow.requirements.resources.bunny.lifetimeTotal).toEqual(20000);
        expect(parsedConfig.generators.meadow.onTick).toEqual(["yield 90 bunny"]);
        
        expect(Object.keys(parsedConfig.meta).length).toBe(4);
    });
});
