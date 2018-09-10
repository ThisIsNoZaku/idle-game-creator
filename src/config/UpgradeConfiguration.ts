import ThingConfiguration from "./ThingConfiguration";

export default class UpgradeConfiguration extends ThingConfiguration{
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