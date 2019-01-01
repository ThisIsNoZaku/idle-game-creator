import LayoutConfiguration from "../../model/layout/SectionConfiguration";
import LayoutConfigurationReader from "./LayoutConfigurationReader";

describe("Layout configuration reader", () => {
    let reader: LayoutConfigurationReader;
    beforeEach(() => {
        reader = LayoutConfigurationReader.instance();
    });
    it("generates a configuration", () => {
        const read: LayoutConfiguration = reader.read("key", {
            contains: [],
            direction: "horizontal",
            header: "header",
        });
        expect(read.key).toBe("key");
        expect(read.header).toBe("header");
        expect(read.contains).toEqual([]);
        expect(read.direction).toBe("horizontal");
    });
    it("defaults direction to 'vertical'", () => {
        const read: LayoutConfiguration = reader.read("key", {
            contains: [],
            header: "header",
        });
        expect(read.key).toBe("key");
        expect(read.header).toBe("header");
        expect(read.contains).toEqual([]);
        expect(read.direction).toBe("vertical");
    });
    it("throws an error if 'contains' is missing", () => {
        expect(() => {
            reader.read("key", {
                header: "header",
            });
        }).toThrow();
    });
});
