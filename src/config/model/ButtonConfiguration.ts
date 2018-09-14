import ThingConfiguration from "./ThingConfiguration";

export class ButtonConfiguration extends ThingConfiguration{

    constructor(key:string, name:string, description:string, onClick?: string, showClicks?: boolean) {
        super(key, name, description);
        this.onClick = onClick;
        this.showClicks = showClicks;
    }

    onClick:string;
    /**
     * If the tooltip for this button displays the number of times it was clicked.
     */
    showClicks:boolean;
}