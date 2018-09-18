export default class SectionConfiguration {

    public key: string;
    public direction: "vertical"|"horizontal"|undefined;
    /**
     * The header displayed at the top of the section.
     */
    public header: string;
    public contains: string[];

    constructor(key: string, header: string, contains: string[], direction?: "horizontal"|"vertical"|undefined) {
        this.key = key;
        this.header = header;
        this.direction = direction;
        this.contains = contains;
    }
}
