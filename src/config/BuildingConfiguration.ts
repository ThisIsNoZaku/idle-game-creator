import ThingConfiguration from "./ThingConfiguration";

export default class BuildingConfiguration extends ThingConfiguration{
    onTick:string;
    /**
     * The base resource cost for this Building.
     */
    baseConst:string;
    /**
     * The amount the price is modified each time one is purchased.
     */
    costIncrease:number;
    /**
     * The amount that is refunded when one is purchased.
     */
    costRefund:number;
    /**
     * If this Building cannot be purchased or sold.
     */
    noBuy:boolean;
}