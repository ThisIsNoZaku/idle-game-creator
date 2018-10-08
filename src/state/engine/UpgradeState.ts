import UpgradeConfiguration from "../../config/model/UpgradeConfiguration";

export default class UpgradeState {
    public config: UpgradeConfiguration;
    public enabled: boolean;

    constructor(config: UpgradeConfiguration, enabled: boolean) {
        this.config = config;
        this.enabled = enabled;
    }
}
