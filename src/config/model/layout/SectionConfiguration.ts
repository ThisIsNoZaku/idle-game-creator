export default class SectionConfiguration {

    constructor(key: string, header: string, contains: string[]) {
        this.key = key;
        this.header = header;
        this.contains = contains;
    }

    key:string;
    /**
     * The header displayed at the top of the section.
     */
    header:string;
    contains:string[];
}