export default class ResourceState {
    /**
     * The name of the resource.
     */
    public name: string;
    /**
     * The current amount of the resource.
     */
    public quantity: number;

    constructor(name: string, quantity: number) {
        this.name = name;
        this.quantity = quantity;
    }
}