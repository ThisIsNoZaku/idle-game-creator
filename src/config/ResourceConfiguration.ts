/**
 * Resources are things that you gain and spend.
 */
export default class ResourceConfiguration {
    /**
     * The unique internal name for the resource
     */
    identifier:string;
    /**
     * The visible name of the resource.
     */
    name:string;
    /**
     * The description for the resource.
     */
    description:string;
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