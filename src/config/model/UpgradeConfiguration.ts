import ClickableConfiguration from "../../components/ClickableConfigurtion";
import EntityConfiguration from "./EntityConfiguration";

export default class UpgradeConfiguration extends EntityConfiguration implements ClickableConfiguration {

    public baseCost: {[resourceName: string]: number};
    public onClick: string[];
    public effects: Array<{trigger: string, effects: string[]}>;

    constructor(key: string, name: string, desc: string,
                baseCost: { [p: string]: number }, effects: Array<{trigger: string,
                effects: string[]}>) {
        super(key, name, desc);
        this.baseCost = baseCost;
        this.effects = effects;
        this.onClick = [`upgrade ${key}`];
    }
}
