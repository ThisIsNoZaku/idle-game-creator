import CountableState from "./CountableState";

export default class ResourceState extends CountableState {
    /**
     * The name of the resource.
     */
    public name: string;

    constructor(name: string, quantity: number) {
        super(quantity);
        this.name = name;
    }
}
