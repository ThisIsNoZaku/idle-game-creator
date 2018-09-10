export default class UpgradeConfiguration{
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
     * The effect the Upgrade has.
     */
    passive:string;
    /**
     * The cost to purchase this Upgrade.
     */
    cost:string;
    /**
     * If this upgrade cannot be bought.
     */
    noBuy:boolean;
}