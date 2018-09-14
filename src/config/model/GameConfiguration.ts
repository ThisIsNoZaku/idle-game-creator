import {ButtonConfiguration} from "./ButtonConfiguration";
import MetaConfiguration from "./MetaConfiguration";
import SectionConfiguration from "./layout/SectionConfiguration";

export default class GameConfiguration {

    constructor(meta:MetaConfiguration, buttons:{[key:string]:ButtonConfiguration}, layout:{[key:string]:SectionConfiguration}) {
        this.meta = meta;
        this.buttons = buttons;
        this.layout = layout;
    }

    meta:MetaConfiguration;
    buttons:{[key:string]:ButtonConfiguration};
    layout:{[key:string]:SectionConfiguration};
}