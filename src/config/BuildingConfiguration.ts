export default class BuildingConfiguration {
    /**
     * The unique identifier for this Building.
     */
    identifier:string;
    /**
     * The name for this Building.
     */
    name:string;
    /**
     * The description for this Building.
     */
    description:string;
    /**
     * The effect triggered every tick.
     */
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