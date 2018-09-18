import {ButtonConfiguration} from "./ButtonConfiguration";
import SectionConfiguration from "./layout/SectionConfiguration";
import MetaConfiguration from "./MetaConfiguration";
import ResourceConfiguration from "./ResourceConfiguration";

export default class GameConfiguration {

    public meta: MetaConfiguration;
    public buttons: {[key: string]: ButtonConfiguration};
    public layout: {[key: string]: SectionConfiguration};
    public resources: {[key:string]: ResourceConfiguration}

    constructor(meta: MetaConfiguration, buttons: {[key: string]: ButtonConfiguration},
                layout: {[key: string]: SectionConfiguration}, resources: {[key:string]:ResourceConfiguration}) {
        this.meta = meta;
        this.buttons = buttons;
        this.layout = layout;
        this.resources = resources;
    }
}
