export default class MetaConfiguration {

    constructor(name: string, author: string, description: string, version: string) {
        this.name = name;
        this.author = author;
        this.description = description;
        this.version = version;
    }

    name: string;
    author: string;
    description: string;
    version: string;
}