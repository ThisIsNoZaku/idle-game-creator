import {ButtonConfiguration} from "./ButtonConfiguration";
import SectionConfiguration from "./layout/SectionConfiguration";
import MetaConfiguration from "./MetaConfiguration";

export default class GameConfiguration {

    public meta: MetaConfiguration;
    public buttons: {[key: string]: ButtonConfiguration};
    public layout: {[key: string]: SectionConfiguration};

    constructor(meta: MetaConfiguration, buttons: {[key: string]: ButtonConfiguration},
                layout: {[key: string]: SectionConfiguration}) {
        this.meta = meta;
        this.buttons = buttons;
        this.layout = layout;
    }
}
