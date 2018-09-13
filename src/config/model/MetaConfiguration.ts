export default class MetaConfiguration {

    constructor(name: string, author: string, desc: string, version: string) {
        this.name = name;
        this.author = author;
        this.desc = desc;
        this.version = version;
    }

    name: string;
    author: string;
    desc: string;
    version: string;
}