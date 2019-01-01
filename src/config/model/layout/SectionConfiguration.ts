export default class SectionConfiguration {

    public static copyFrom(key: string, from: {[k: string]: any}) {
        if (from.header === undefined) {
            from.header = key;
        }
        if (from.contains === undefined ) {
            throw new Error("Required 'contains' property missing.");
        }
        return new SectionConfiguration(key, from.header, from.contains,
        from.direction);
    }

    public key: string;
    public direction: "vertical"|"horizontal"|undefined;
    /**
     * The header displayed at the top of the section.
     */
    public header: string;
    public contains: string[];
    /**
     * If this is a top level layout, which is parent directly to the page.
     */
    public root: boolean = true;

    constructor(key: string, header: string, contains: string[],
        direction?: "horizontal"|"vertical"|undefined) {
        this.key = key;
        this.header = header;
        this.direction = direction || "vertical";
        this.contains = contains;
    }
}
