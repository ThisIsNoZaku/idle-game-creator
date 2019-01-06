import AchievementConfigurationReader from "./AchievementConfigurationReader";

describe("Achievement configuration reader", () => {
    const reader = AchievementConfigurationReader.instance();
    it("transforms objects into AchievementConfiguration objects", () => {
        const input = {
            name: "upgrade",
            description: "description",
            requires: {
                resources: {
                    resource: "1 total",
                },
            },
        };
        const out = reader.read("key", input);
        
        expect(out.key).toBe("key");
        expect(out.name).toBe("upgrade");
        expect(out.description).toBe("description");
        expect(out.requirements).toEqual({
            resources: {
                resource: {
                    current: 0,
                    lifetimeMax: 0,
                    lifetimeTotal: 1,
                },
            },
        });
    });
});