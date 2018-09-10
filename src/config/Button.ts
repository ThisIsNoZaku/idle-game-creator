export class ButtonConfiguration {
    /**
     * The unique name of the button.
     */
    identifier:string;
    /**
     * The displayed name of the button.
     */
    name:string;
    /**
     * The description of the button.
     */
    description:string;
    /**
     * The effect triggered when this button clicks.
     */
    onClick:string;
    /**
     * If the tooltip for this button displays the number of times it was clicked.
     */
    showClicks:boolean;
}