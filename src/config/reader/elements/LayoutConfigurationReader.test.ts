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
        }, {} as any);
        expect(read.key).toBe("key");
        expect(read.header).toBe("header");
        expect(read.contains).toEqual([]);
        expect(read.direction).toBe("horizontal");
    });
    it("defaults direction to 'vertical'", () => {
        const read: LayoutConfiguration = reader.read("key", {
            contains: [],
            header: "header",
        }, {} as any);
        expect(read.key).toBe("key");
        expect(read.header).toBe("header");
        expect(read.contains).toEqual([]);
        expect(read.direction).toBe("vertical");
    });
    it("throws an error if 'contains' is missing", () => {
        expect(() => {
            reader.read("key", {
                header: "header",
            }, {} as any);
        }).toThrow();
    });
    describe("replaces catchall placeholders", () => {
        it("replaces *Resources", () => {
            const read: LayoutConfiguration = reader.read("key", {
                contains: ["*Resources"],
                }, {
                    resources: {
                        other: {
                            description: "",
                            key: "other",
                            name: "other resource",
                        },
                        resource: {
                            description: "",
                            key: "resource",
                            name: "resource",
                        },
                },
            } as any);
            expect(read.contains.length).toBe(2);
            expect(read.contains).toContain("resource");
            expect(read.contains).toContain("other");
        });
        it("replaces *Buttons", () => {
            const read: LayoutConfiguration = reader.read("key", {
                contains: ["*Buttons"],
            }, {
                buttons: {
                    one: {
                        description: "",
                        key: "one",
                        name: "resource",
                    },
                    two: {
                        description: "",
                        key: "two",
                        name: "other resource",
                    },
                },
            } as any);
            expect(read.contains.length).toBe(2);
            expect(read.contains).toContain("one");
            expect(read.contains).toContain("two");
        });
        it("replaces *Upgrades", () => {
            const read: LayoutConfiguration = reader.read("key", {
                contains: ["*Upgrades"],
            }, {
                upgrades: {
                    one: {
                        description: "",
                        key: "one",
                        name: "resource",
                    },
                    two: {
                        description: "",
                        key: "two",
                        name: "other resource",
                    },
                },
            } as any);
            expect(read.contains.length).toBe(2);
            expect(read.contains).toContain("one");
            expect(read.contains).toContain("two");
        });
        it("replaces *Generators", () => {
            const read: LayoutConfiguration = reader.read("key", {
                contains: ["*Generators"],
            }, {
                generators: {
                    one: {
                        description: "",
                        key: "one",
                        name: "resource",
                    },
                    two: {
                        description: "",
                        key: "two",
                        name: "other resource",
                    },
                },
            } as any);
            expect(read.contains.length).toBe(2);
            expect(read.contains).toContain("one");
            expect(read.contains).toContain("two");
        });
        it("replaces *Achievements", () => {
            const read: LayoutConfiguration = reader.read("key", {
                contains: ["*Achievements"],
            }, {
                achievements: {
                    one: {
                        description: "",
                        key: "one",
                        name: "resource",
                    },
                    two: {
                        description: "",
                        key: "two",
                        name: "other resource",
                    },
                },
            } as any);
            expect(read.contains.length).toBe(2);
            expect(read.contains).toContain("one");
            expect(read.contains).toContain("two");
        });
    });
});
