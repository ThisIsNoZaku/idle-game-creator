import ThingConfiguration from "./ThingConfiguration";
import {ButtonConfiguration} from "./ButtonConfiguration";
import MetaConfiguration from "./MetaConfiguration";
import LayoutConfiguration from "./layout/LayoutConfiguration";

export default class GameConfiguration {

    constructor(meta:MetaConfiguration, buttons:ButtonConfiguration[], layout:LayoutConfiguration) {
        this.meta = meta;
        this.buttons = buttons;
        this.layout = layout;
    }

    meta:MetaConfiguration;
    buttons:ButtonConfiguration[];
    layout:LayoutConfiguration;
}