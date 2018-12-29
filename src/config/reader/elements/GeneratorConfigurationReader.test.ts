import GeneratorConfigurationReader from "./GeneratorConfigurationReader";
import GeneratorConfiguration from "../../model/GeneratorConfiguration";

describe("Generator configuration reader", () => {
    let reader:GeneratorConfigurationReader;
    beforeEach(()=>{
        reader = GeneratorConfigurationReader.instance();
    })
    it("turns a configuration object into a GeneratorConfiguration", () => {
        const config = {
            name: "Generator name",
            description: "Generator description",
            cost: {
                resources: {
                    bunny: 10,
                }
            },
            requires: {
                resources: {
                    bunny: "1, 2 max, 3 total",
                    numberOnly: 1,
                },
            },
            onTick: [
                "gain 1 resource"
                ],
        };
        const read:GeneratorConfiguration = reader.read("key", config);
        
        expect(read).toBeDefined();
        expect(read.name).toBe("Generator name");
        expect(read.description).toBe("Generator description");
        
        
        expect(read.cost).toBeDefined();
        expect(read.cost.resources).toBeDefined();
        expect(read.cost.resources.bunny).toBe(10);
        
        expect(read.requirements).toBeDefined();
        expect(read.requirements.resources).toBeDefined();
        
        expect(read.requirements.resources.bunny).toBeDefined();
        expect(read.requirements.resources.bunny.current).toBe(1);
        expect(read.requirements.resources.bunny.lifetimeMax).toBe(2);
        expect(read.requirements.resources.bunny.lifetimeTotal).toBe(3);
        
        expect(read.requirements.resources.numberOnly).toBeDefined();
        expect(read.requirements.resources.numberOnly.current).toBe(1);
        expect(read.requirements.resources.numberOnly.lifetimeMax).toBe(0);
        expect(read.requirements.resources.numberOnly.lifetimeTotal).toBe(0);
        
        expect(read.costIncrease).toEqual(15);
        
        expect(read.costTooltip).toBeFalsy();
        
        expect(read.key).toBe("key");
        
        expect(read.onClick).toEqual([
            "buy key"]);
            
        expect(read.onTick).toEqual([
            "gain 1 resource",
            ]);
    });
    it("throws an error if a resource requirement attempts to require the current amount of a resource requirement multiple times", () => {
        const config = {
            name: "Generator name",
            description: "Generator description",
            cost: {
                resources: {
                    bunny: 10,
                }
            },
            requires: {
                resources: {
                    bunny: "1, 2",
                },
            },
            onTick: [
                "gain 1 resource"
                ],
        };
        expect(()=> {
            reader.read("key", config);
        }).toThrowError();
    });
    it("throws an error if a resource requirement attempts to require the lifetime total amount of a resource requirement multiple times", () => {
        const config = {
            name: "Generator name",
            description: "Generator description",
            cost: {
                resources: {
                    bunny: 10,
                }
            },
            requires: {
                resources: {
                    bunny: "1 total, 2 total",
                },
            },
            onTick: [
                "gain 1 resource"
                ],
        };
        expect(()=> {
            reader.read("key", config);
        }).toThrowError();
    });
    it("throws an error if a resource requirement attempts to require the lifetime mac amount of a resource requirement multiple times", () => {
        const config = {
            name: "Generator name",
            description: "Generator description",
            cost: {
                resources: {
                    bunny: 10,
                }
            },
            requires: {
                resources: {
                    bunny: "1 max, 2 max",
                },
            },
            onTick: [
                "gain 1 resource"
                ],
        };
        expect(()=> {
            reader.read("key", config);
        }).toThrowError();
    });
    it("throws an error if a resource requirement expression is malformed", () => {
        const config = {
            name: "Generator name",
            description: "Generator description",
            cost: {
                resources: {
                    bunny: 10,
                }
            },
            requires: {
                resources: {
                    bunny: "some gibberish",
                },
            },
            onTick: [
                "gain 1 resource"
                ],
        };
        expect(()=> {
            reader.read("key", config);
        }).toThrowError();
    });
    it("throws an error if a resource requirement expression segment has too many tokens", () => {
        const config = {
            name: "Generator name",
            description: "Generator description",
            cost: {
                resources: {
                    bunny: 10,
                }
            },
            requires: {
                resources: {
                    bunny: "too many tokens",
                },
            },
            onTick: [
                "gain 1 resource"
                ],
        };
        expect(()=> {
            reader.read("key", config);
        }).toThrowError();
    });
});