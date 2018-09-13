import ThingConfiguration from "./ThingConfiguration";
import {ButtonConfiguration} from "./ButtonConfiguration";
import MetaConfiguration from "./MetaConfiguration";

export default class GameConfiguration {

    constructor(meta:MetaConfiguration, buttons:ButtonConfiguration[]) {
        this.meta = meta;
        this.buttons = buttons;
    }

    meta:MetaConfiguration;
    buttons:ButtonConfiguration[];
}