import ClickableConfiguration from "../../components/ClickableConfigurtion";
import PurchaseableConfiguration, {Cost, Requirements} from "./PurchasableConfiguration";

export default class UpgradeConfiguration extends PurchaseableConfiguration implements ClickableConfiguration {

    public onClick: string[];
    public effects: Array<{trigger: string, effects: string[]}>;
    /**
     * If the tooltip for the upgrade button should display the cost to buy
     * will include the resource cost.
     */
    public costTooltip: boolean = false;

    constructor(key: string, name: string, desc: string,
                effects: Array<{trigger: string, effects: string[]}>, 
                costs: Cost, requirements: Requirements,
                costTooltip: boolean) {
        super(key, name, desc, costs, requirements);
        this.effects = effects;
        this.onClick = [`upgrade ${key}`];
        this.costTooltip = costTooltip;
    }
    
    static copyFrom(key: string, from: {[k:string]:any}) {
        return new UpgradeConfiguration(key, from.name, from.description, 
        from.costs, from.requirements, from.effects, from.costTooltip);
    }
}
