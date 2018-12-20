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
    
    public static copyFrom(key:string, from: {[k:string]:any}) {
        return new ButtonConfiguration(key, from.name, from.description, from.onClick, 
        from.showClics);
    }
}
