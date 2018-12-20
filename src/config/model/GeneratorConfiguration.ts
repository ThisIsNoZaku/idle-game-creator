import ClickableConfiguration from "../../components/ClickableConfigurtion";
import EntityConfiguration from "./EntityConfiguration";

export default class GeneratorConfiguration extends EntityConfiguration implements ClickableConfiguration {

    public onTick: string[];
    /**
     * The base resource cost for this Building.
     */
    public baseCost: {[resourceName: string]: number};
    /**
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
        baseCost: { [p: string]: number }, onTick: string[], costTooltip: boolean) {
        super(key, name, desc);
        this.baseCost = baseCost;
        this.onTick = onTick;
        this.onClick = [`buy ${key}`];
        this.costTooltip = costTooltip;
    }
    
    public static copyFrom(key: string, from: {[k:string]:any}) {
        return new GeneratorConfiguration(key, from.name, from.description, 
        from.baseCost, from.onTick, from.costTooltip);
    }
}
