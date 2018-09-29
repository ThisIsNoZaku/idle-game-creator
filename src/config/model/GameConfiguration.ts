import {ButtonConfiguration} from "./ButtonConfiguration";
import GeneratorConfiguration from "./GeneratorConfiguration";
import MetaConfiguration from "./MetaConfiguration";
import ResourceConfiguration from "./ResourceConfiguration";

import SectionConfiguration from "./layout/SectionConfiguration";

export default class GameConfiguration {

    public meta: MetaConfiguration;
    public buttons: {[key: string]: ButtonConfiguration};
    public layout: {[key: string]: SectionConfiguration};
    public resources: {[key: string]: ResourceConfiguration};
    public generators: {[key: string]: GeneratorConfiguration};

    constructor(meta: MetaConfiguration, buttons: {[key: string]: ButtonConfiguration},
                layout: {[key: string]: SectionConfiguration}, resources: {[key: string]: ResourceConfiguration},
                generators: {[key: string]: GeneratorConfiguration}) {
        this.meta = meta;
        this.buttons = buttons;
        this.layout = layout;
        this.resources = resources;
        this.generators = generators;
    }
}
