export default class MetaConfiguration {

    public name: string;
    public author: string;
    public description: string;
    public version: string;

    constructor(name: string, author: string, description: string, version: string) {
        this.name = name;
        this.author = author;
        this.description = description;
        this.version = version;
    }
}
