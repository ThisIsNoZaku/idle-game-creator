export default class SectionConfiguration {

    constructor(key: string, header: string, contains: string[], direction?:"horizontal"|"vertical"|undefined) {
        this.key = key;
        this.header = header;
        this.direction = direction;
        this.contains = contains;
    }

    key:string;
    direction:"vertical"|"horizontal"|undefined;
    /**
     * The header displayed at the top of the section.
     */
    header:string;
    contains:string[];
}