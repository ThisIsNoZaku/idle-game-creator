export default class GeneratorState {
    /**
     * The name of the resource.
     */
    public name: string;
    /**
     * The amount of the resource.
     */
    public quantity: number;

    constructor(name: string, quantity: number) {
        this.name = name;
        this.quantity = quantity;
    }
}
