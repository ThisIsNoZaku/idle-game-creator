import EntityConfiguration from "./EntityConfiguration";

export default class BuildingConfiguration extends EntityConfiguration {
    public onTick: string;
    /**
     * The base resource cost for this Building.
     */
    public baseConst: string;
    /**
     * The amount the price is modified each time one is purchased.
     */
    public costIncrease: number;
    /**
     * The amount that is refunded when one is purchased.
     */
    public costRefund: number;
    /**
     * If this Building cannot be purchased or sold.
     */
    public noBuy: boolean;
}
