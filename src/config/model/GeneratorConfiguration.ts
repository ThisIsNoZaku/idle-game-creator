import ClickableConfiguration from "../../components/ClickableConfigurtion";
import PurchaseableConfiguration from "./PurchasableConfiguration";
import { Cost, Requirements } from "./PurchasableConfiguration";

export default class GeneratorConfiguration extends PurchaseableConfiguration implements ClickableConfiguration {
    public static copyFrom(key: string, from: {[k: string]: any}) {
        return new GeneratorConfiguration(key, from.name, from.description,
        from.costs, from.requirements, from.onTick, from.costTooltip);
    }
    public onTick: string[];
    /**
     * TODO: Move into PurchaseableConfiguration.
     * The amount the price is modified each time one is purchased.
     */
    public costIncrease: number = 15;

    public onClick: string[];

    /**
     * If the tooltip for the generator button should display the cost to buy
     * will include the resource cost.
     */
    public costTooltip: boolean = false;

    constructor(key: string, name: string, desc: string,
        costs: Cost, requirements: Requirements, onTick: string[], costTooltip: boolean) {
        super(key, name, desc, costs, requirements);
        this.onTick = onTick;
        this.onClick = [`buy ${key}`];
        this.costTooltip = costTooltip;
    }
}
