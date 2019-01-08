import AchievementConfiguration from "../model/AchievementConfiguration";
import GeneratorConfiguration from "../model/GeneratorConfiguration";
import UpgradeConfiguration from "../model/UpgradeConfiguration";
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
        const config = fs.readFileSync(Path.resolve(__dirname +
            "../../../../public/example.yaml"), "UTF-8");
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

        expectGenerator(parsedConfig.generators.cage, {
            cost: {
                resources: {
                    bunny: 15,
                },
            },
            costTooltip: true,
            description: "Generates 1 bunny per 10 seconds",
            name: "Cage",
            onTick: ["yield .1 bunny"],
            requirements: {
                resources: {},
            },
        });

        expectGenerator(parsedConfig.generators.hutch, {
            cost: {
                resources: {
                    bunny: 100,
                },
            },
            costTooltip: true,
            description: "A bit roomier than a cage. Generates 1 bunny per 2 " +
                "seconds.",
            name: "Hutch",
            onTick: ["yield .5 bunny"],
            requirements: {
                resources: {
                    bunny: {
                        current: 0,
                        lifetimeMax: 0,
                        lifetimeTotal: 100,
                    },
                },
            },
        });

        expectGenerator(parsedConfig.generators.coop, {
            cost: {
                resources: {
                    bunny: 600,
                },
            },
            costTooltip: true,
            description: "A much nicer rabbit home where full bunny families " +
                "can live. Produces 5 rabbits per second.",
            name: "Coop",
            onTick: ["yield 5 bunny"],
            requirements: {
                resources: {
                    bunny: {
                        current: 0,
                        lifetimeMax: 0,
                        lifetimeTotal: 600,
                    },
                },
            },
        });

        expectGenerator(parsedConfig.generators.pen, {
            cost: {
                resources: {
                    bunny: 4000,
                },
            },
            costTooltip: true,
            description: "A lovely enclosure with plenty of green space. " +
                "Produces 12 rabbits per second.",
            name: "Pen",
            onTick: ["yield 12 bunny"],
            requirements: {
                resources: {
                    bunny: {
                        current: 0,
                        lifetimeMax: 0,
                        lifetimeTotal: 4000,
                    },
                },
            },
        });

        expectGenerator(parsedConfig.generators.meadow, {
            cost: {
                resources: {
                    bunny: 20000,
                },
            },
            costTooltip: true,
            description: "A wide open space full of shade and lush grass. " +
                "Produces 90 rabbits per second.",
            name: "Meadow",
            onTick: ["yield 90 bunny"],
            requirements: {
                resources: {
                    bunny: {
                        current: 0,
                        lifetimeMax: 0,
                        lifetimeTotal: 20000,
                    },
                },
            },
        });

        // Make sure we're checking the correct number of upgrades.
        expect(Object.keys(parsedConfig.upgrades).length).toBe(1);

        expectUpgrade(parsedConfig.upgrades.parsley, {
            cost: {
                resources: {
                    bunny: 100,
                },
            },
            description: "A nice little supplement to your bunnies' diet. Effect:+1 bunny/click",
            effects: [
                {
                    effects: ["add 1 bunny"],
                    trigger: "bunnyButton click",
                }],
            name: "Parsley",
            requirements: {
                resources: {
                    bunny: {
                        current: 0,
                        lifetimeMax: 0,
                        lifetimeTotal: 10,
                    },
                },
            },
        });

        // Make sure we're checking the correct number of achievements.
        expect(Object.keys(parsedConfig.achievements).length).toBe(1);

        expectAchievement(parsedConfig.achievements.bunnyAchieve1, {
            description: "Have 1 bunny.",
            name: "Run Rabbit Run",
            requirements: {
                resources: {
                    bunny: {
                        current: 1,
                        lifetimeMax: 0,
                        lifetimeTotal: 0,
                    },
                },
            },
        });

        expect(Object.keys(parsedConfig.meta).length).toBe(4);
    });
});

function expectGenerator(actual: GeneratorConfiguration, expected: any) {
    expect(actual).toBeDefined();
    expect(actual.name).toEqual(expected.name);
    expect(actual.description).toEqual(expected.description);
    expect(actual.costTooltip).toEqual(expected.costTooltip);
    expect(actual.cost).toEqual(expected.cost);
    expect(actual.onTick).toEqual(expected.onTick);
    expect(actual.requirements).toEqual(expected.requirements);
}

function expectUpgrade(actual: UpgradeConfiguration, expected: any) {
    expect(actual).toBeDefined();
    expect(actual.name).toEqual(expected.name);
    expect(actual.description).toEqual(expected.description);
    expect(actual.cost).toEqual(expected.cost);
    expect(actual.requirements).toEqual(expected.requirements);
    expect(actual.effects).toEqual(expected.effects);
}

function expectAchievement(actual: AchievementConfiguration, expected: any) {
    expect(actual).toBeDefined();
    expect(actual.name).toEqual(expected.name);
    expect(actual.description).toEqual(expected.description);
    expect(actual.requirements).toEqual(expected.requirements);
}
