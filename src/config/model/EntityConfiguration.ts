export default class EntityConfiguration {

    /**
     * The unique key for this Thing.
     */
    public key: string;
    /**
     * The name(s) for the Thing.
     */
    public name: string;
    /**
     * The description of the Thing.
     */
    public description: string;
    /**
     * Text to display instead of the name.
     */
    public text: string;
    /**
     * Tags that this Thing has.
     */
    public tags: string[];
    /**
     * The base resource cost of this thing, if it's a building or upgrade.
     */
    public costs: {[resourceName: string]: number};
    /**
     * Requirements for this Thing.
     *
     * If the thing is a Button, Resource, Upgrade or Building, it is visible if the requirements are met and hidden
     * otherwise.
     *
     * An Achievement is earned when the requirement is met.
     *
     * A Shiny can only spawn if the requirements are met.
     */
    public requirements: ThingRequirement[];
    /**
     * If true, do not display this Thing.
     */
    public hidden: boolean;
    /**
     * If true, only display the icon of this Thing, if any.
     */
    public noText: boolean;
    /**
     * The origin of the tooltip of this Thing.
     */
    public tooltipOrigin: "top"|"right"|"bottom"|"left";
    /**
     * If true, do not display the tooltip of this Thing.
     */
    public noTooltip: boolean;
    /**
     * The number of this Thing that the player begins with at the start.
     */
    public startWith: number;
    /**
     * If this Thing is visible at game start.
     */
    public shown: boolean;
    /**
     * If this thing is lit at game start.
     */
    public lit: boolean;
    /**
     * If this thing is dimmed at game start.
     */
    public dimmed: boolean;
    /**
     * If this thing is Hidden when the amount is 0.
     */
    public hiddenWhen0: boolean;
    /**
     * If this Thing is always hidden.
     */
    public alwaysHidden: boolean;

    constructor(key: string, name: string, desc: string) {
        this.key = key;
        this.name = name;
        this.description = desc;
    }
}
