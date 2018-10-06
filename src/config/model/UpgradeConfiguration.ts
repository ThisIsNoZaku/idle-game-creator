import ClickableConfiguration from "../../components/ClickableConfigurtion";
import EntityConfiguration from "./EntityConfiguration";

export default class UpgradeConfiguration extends EntityConfiguration implements ClickableConfiguration {

    /**
     * The cost for this upgrade.
     */
    public baseCost: {[resourceName: string]: number};
    
    public onClick: string[];

    constructor(key: string, name: string, desc: string, baseCost: { [p: string]: number }) {
        super(key, name, desc);
        this.baseCost = baseCost;
        this.onClick = [`add upgrade ${key}`];
    }
}
