export default class SectionConfiguration {

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

    constructor(key: string, header: string, contains: string[], direction?: "horizontal"|"vertical"|undefined) {
        this.key = key;
        this.header = header;
        this.direction = direction;
        this.contains = contains;
    }
    
    public static copyFrom(key:string, from:{[k:string]:any}) {
        return new SectionConfiguration(key, from.header, from.contains, 
        from.direction);
    }
}
