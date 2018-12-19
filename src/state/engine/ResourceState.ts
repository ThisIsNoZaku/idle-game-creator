export default class ResourceState {
    /**
     * The name of the resource.
     */
    public name: string;
    /**
     * The current amount of the resource.
     */
    private _quantity: number;
    
    get quantity(): number {
        return this._quantity;
    }
    
    set quantity(val: number) {
        this._quantity = Math.round(10 * val) / 10;
    }

    constructor(name: string, quantity: number) {
        this.name = name;
        this._quantity = quantity;
    }
}