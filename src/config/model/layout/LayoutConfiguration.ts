import SectionConfiguration from "./SectionConfiguration";

export default class LayoutConfiguration {

    constructor(sections: SectionConfiguration[]) {
        sections.forEach((section, index) => {
            this[index] = section;
        });
    }
    [index: string]: SectionConfiguration
}
