import {Action} from "redux";

export default class GainResourceAction implements Action<string> {
    public static ACTION_TYPE = "GAIN_RESOURCE";
    public type:string = GainResourceAction.ACTION_TYPE;
    /**
     * The amount of the resource to gain.
     */
    public quantity:number;
    /**
     * The identifier of the resource.
     */
    public resource:string;


    constructor(resource: string, quantity: number) {
        this.quantity = quantity;
        this.resource = resource;
    }
}
