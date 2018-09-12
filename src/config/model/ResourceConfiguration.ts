/**
 * Resources are things that you gain and spend.
 */
import ThingConfiguration from "./ThingConfiguration";

export default class ResourceConfiguration extends ThingConfiguration{
    /**
     * If the resource is allowed to have a negative quantity.
     */
    canBeNegative:boolean;
    /**
     * Set this resource to always have the following quantity.
     */
    isAlways?:string;
    /**
     * If the tooltip displays the amount of the resource earned.
     */
    showEarned:boolean;
    /**
     * If the tooltip displays the maximum amount of the resource.
     */
    showMax:boolean;
}