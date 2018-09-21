import EntityConfiguration from "./EntityConfiguration";

export default class GeneratorConfiguration extends EntityConfiguration {

    constructor(key: string, name: string, desc: string, baseCost: { [p: string]: number }) {
        super(key, name, desc);
        this.baseCost = baseCost;
    }

    public onTick: string;
    /**
     * The base resource cost for this Building.
     */
    public baseCost: {[resourceName:string]:number};
    /**
     * The amount the price is modified each time one is purchased.
     */
    public costIncrease: number = 15;
    /**
     * The amount that is refunded when one is purchased.
     */
    public costRefund: number;
    /**
     * If this Building cannot be purchased or sold.
     */
    public noBuy: boolean;
}
