import EntityConfiguration from "./EntityConfiguration";

export default class ButtonConfiguration extends EntityConfiguration {

    public onClick?: string[];
    /**
     * If the tooltip for this button displays the number of times it was clicked.
     */
    public showClicks?: boolean;

    constructor(key: string, name: string, description: string, onClick?: string[], showClicks?: boolean) {
        super(key, name, description);
        this.onClick = onClick;
        this.showClicks = showClicks;
    }
}
