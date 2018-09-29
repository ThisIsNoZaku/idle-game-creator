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
    /**
     *
     */
    public onClick: string[];

    constructor(key: string, name: string, desc: string, baseCost: { [p: string]: number }, onTick: string[]) {
        super(key, name, desc);
        this.baseCost = baseCost;
        this.onTick = onTick;
        this.onClick = [`buy ${key}`];
    }
}
