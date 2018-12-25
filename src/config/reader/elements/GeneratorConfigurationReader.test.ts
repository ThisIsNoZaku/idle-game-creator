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
            costs: {
                resources: {
                    bunny: 10,
                }
            },
            requirements: {
                resources: {
                    resource: "1, highest 2, total 3",
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
        expect(read.requirements.resources.resource).toBeDefined();
        expect(read.requirements.resources.resource.current).toBe(1);
        expect(read.requirements.resources.resource.lifetimeMax).toBe(2);
        expect(read.requirements.resources.resource.lifetimeTotal).toBe(3);
        
        expect(read.costIncrease).toEqual(15);
        
        expect(read.costTooltip).toBeFalsy();
        
        expect(read.key).toBe("key");
        
        expect(read.onClick).toEqual([
            "buy key"]);
            
        expect(read.onTick).toEqual([
            "gain 1 resource",
            ]);
    });
});