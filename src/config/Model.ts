export default class Model {
    letsMakeAGame:LetsMakeAGame;
    settings:Settings;
    layout:Layout;
}

class LetsMakeAGame {
    name:string;
    author:string;
    desc:string;
    version:string;
}

/**
 * Core global settings.
 */
class Settings {
    /**
     * The base percentage increase in the price of a building when purchasing one.
     */
    buildingCostIncreaseFactor: number;
    /**
     * The base amount of resources that a building returns when sold.
     */
    buildingCostRefund:number;

}

class Layout {
    boxes:{[boxKey:string]:Box}
}

/**
 * A component of the layout. A Box can contain other boxes or
 */
class Box {
    /**
     * The names of builtin components, tag names, name of other boxes, the log,
     */
    contains:string[];
    /**
     * The name of another box that contains this one.
     */
    in:string;
    /**
     * The header for this Box.
     */
    header:string;
    /**
     * The footer for this Box.
     */
    footer:string;
    /**
     * The tooltip to display for this Box.
     */
    tooltip:string;
    /**
     * If child components show or hide their names.
     */
    names:"show"|"hide";
    /**
     * If child components show or hide their icons.
     */
    icons: "show"|"hide";
    /**
     * If child components show or hide their costs.
     */
    costs:"show"|"hide";
    /**
     * If child components show or hide their production per second.
     */
    ps:"show"|"hide";
    /**
     * If the layout should extend the default layout.
     */
    useDefault:boolean;
}

/**
 * Defined items
 */
class Things {
    things:Thing[];
}

class Thing {
    /**
     * The unique key for this Thing.
     */
    key:string;
    /**
     * The name(s) for the Thing.
     */
    name:{
        singular:string,
        plural:string
    };
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