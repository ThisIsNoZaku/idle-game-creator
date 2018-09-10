import ThingConfiguration from "./ThingConfiguration";

export class ButtonConfiguration extends ThingConfiguration{
    onClick:string;
    /**
     * If the tooltip for this button displays the number of times it was clicked.
     */
    showClicks:boolean;
}