import EntityConfiguration from "./EntityConfiguration";
import {Requirements} from "./PurchasableConfiguration";

export default class AchievementConfiguration extends EntityConfiguration {
    public requirements:Requirements;
    constructor(key: string, name: string, description: string, 
        requirements:Requirements) {
        super(key, name, description);
        this.requirements = requirements;
    }
}