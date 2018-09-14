export default class ThingConfiguration {

    constructor(key:string, name:string, desc:string) {
        this.key = key;
        this.name = name;
        this.description = desc;
    }

    /**
     * The unique key for this Thing.
     */
    key:string;
    /**
     * The name(s) for the Thing.
     */
    name:string;
    /**
     * The description of the Thing.
     */
    description:string;
    /**
     * Text to display instead of the name.
     */
    text:string;
    /**
     * Tags that this Thing has.
     */
    tags:string[];
    /**
     * The base resource cost of this thing, if it's a building or upgrade.
     */
    costs: {[resourceName:string]:number};
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
    requirements:ThingRequirement[];
    /**
     * If true, do not display this Thing.
     */
    hidden:boolean;
    /**
     * If true, only display the icon of this Thing, if any.
     */
    noText:boolean;
    /**
     * The origin of the tooltip of this Thing.
     */
    tooltipOrigin:"top"|"right"|"bottom"|"left";
    /**
     * If true, do not display the tooltip of this Thing.
     */
    noTooltip:boolean;
    /**
     * The number of this Thing that the player begins with at the start.
     */
    startWith:number;
    /**
     * If this Thing is visible at game start.
     */
    shown:boolean;
    /**
     * If this thing is lit at game start.
     */
    lit:boolean;
    /**
     * If this thing is dimmed at game start.
     */
    dimmed:boolean;
    /**
     * If this thing is Hidden when the amount is 0.
     */
    hiddenWhen0:boolean;
    /**
     * If this Thing is always hidden.
     */
    alwaysHidden:boolean;
}

/**
 * A requirement for a thing.
 */
interface ThingRequirement {

}

/**
 * A requirement for a minimum amount of a certain resource.
 */
class ResourceRequirement {
    resourceName:string;
    amount:number;
}

/**
 * A requirement for a minimum production of a particular resource.
 */
class ProductionRequirement{
    resourceName:string;
    amount:number;
}

/**
 * A requirement to have a particular upgrade.
 */
class UpgradeRequirement {
    upgradeName:string;
}