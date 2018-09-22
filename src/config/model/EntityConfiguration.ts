export default class EntityConfiguration {

    /**
     * The unique key for this Thing.
     */
    public key: string;
    /**
     * The name(s) for the Thing.
     */
    public name: string;
    /**
     * The description of the Thing.
     */
    public description: string;

    constructor(key: string, name: string, desc: string) {
        this.key = key;
        this.name = name;
        this.description = desc;
    }
}
