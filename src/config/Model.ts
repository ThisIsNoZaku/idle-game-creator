import ThingConfiguration from "./ThingConfiguration";

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
    things:ThingConfiguration[];
}