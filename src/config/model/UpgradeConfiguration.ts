import ClickableConfiguration from "../../components/ClickableConfigurtion";
import EntityConfiguration from "./EntityConfiguration";

export default class UpgradeConfiguration extends EntityConfiguration implements ClickableConfiguration {

    public baseCost: {[resourceName: string]: number};
    public onClick: string[];
    public effects: Array<{trigger: string, effects: string[]}>;
    /**
     * If the tooltip for the upgrade button should display the cost to buy
     * will include the resource cost.
     */
    public costTooltip: boolean = false;

    constructor(key: string, name: string, desc: string,
                baseCost: { [p: string]: number }, effects: Array<{trigger: string,
                effects: string[]}>, costTooltip: boolean) {
        super(key, name, desc);
        this.baseCost = baseCost;
        this.effects = effects;
        this.onClick = [`upgrade ${key}`];
        this.costTooltip = costTooltip;
    }
}
