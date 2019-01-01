import ButtonConfiguration from "../../model/ButtonConfiguration";
import ButtonConfigurationReader from "./ButtonConfigurationReader";

describe("ButtonConfigurationReader", () => {
    const reader = ButtonConfigurationReader.instance();
    it("generates a Button Configuration from a parsed object", () => {
        const output: ButtonConfiguration = reader.read("key", {
            description: "Generator configuration",
            name: "Generator name",
            onClick: [
                "yield 1 bunny",
                "yield 1 rabbit",
                ],
        });
        expect(output.description).toBe("Generator configuration");
        expect(output.name).toBe("Generator name");
        expect(output.showClicks).toBeFalsy();
        expect(output.onClick).toEqual([
            "yield 1 bunny",
            "yield 1 rabbit",
            ]);
    });
    it("ignores additional properties", () => {
        const output: ButtonConfiguration = reader.read("key", {
            description: "Generator configuration",
            extra: "something",
            name: "Generator name",
            onClick: [
                "yield 1 bunny",
                "yield 1 rabbit",
                ],
        });
        expect(output.description).toBe("Generator configuration");
        expect(output.name).toBe("Generator name");
        expect(output.showClicks).toBeFalsy();
        expect(output.onClick).toEqual([
            "yield 1 bunny",
            "yield 1 rabbit",
            ]);
        expect((output as any).extra).toBeUndefined();
    });
    it("throws an error if name is missing", () => {
        expect(() => {
            reader.read("key", {
                description: "Generator configuration",
                extra: "something",
                onClick: [
                    "yield 1 bunny",
                    "yield 1 rabbit",
                    ],
            });
        }).toThrow();
    });
    it("throws an error if description is missing", () => {
        expect(() => {
            reader.read("key", {
                name: "Generator name",
                onClick: [
                    "yield 1 bunny",
                    "yield 1 rabbit",
                ],
        });
        }).toThrow();
    });
});
