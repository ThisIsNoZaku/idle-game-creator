import LayoutConfigurationReader from "./LayoutConfigurationReader";
import LayoutConfiguration from "../../model/layout/SectionConfiguration";

describe("Layout configuration reader", () => {
    let reader:LayoutConfigurationReader;
    beforeEach(()=>{
        reader = LayoutConfigurationReader.instance();
    })
    it("generates a configuration", () => {
        const read:LayoutConfiguration = reader.read("key", {
            header: "header",
            contains: [],
            direction: "horizontal",
        });
        expect(read.key).toBe("key");
        expect(read.header).toBe("header");
        expect(read.contains).toEqual([]);
        expect(read.direction).toBe("horizontal");
    });
    it("defaults direction to 'vertical'", () => {
        const read:LayoutConfiguration = reader.read("key", {
            header: "header",
            contains: [],
        });
        expect(read.key).toBe("key");
        expect(read.header).toBe("header");
        expect(read.contains).toEqual([]);
        expect(read.direction).toBe("vertical");
    });
    it("throws an error if 'contains' is missing", () => {
        expect(()=>{
            reader.read("key", {
                header: "header",
            });
        }).toThrow();
    });
});