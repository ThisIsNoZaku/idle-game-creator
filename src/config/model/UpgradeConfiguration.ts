import EntityConfiguration from "./EntityConfiguration";

export default class UpgradeConfiguration extends EntityConfiguration {
    /**
     * The effect the Upgrade has.
     */
    public passive: string;
    /**
     * The cost to purchase this Upgrade.
     */
    public cost: string;
    /**
     * If this upgrade cannot be bought.
     */
    public noBuy: boolean;
}
