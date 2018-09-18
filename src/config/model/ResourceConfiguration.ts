/**
 * Resources are things that you gain and spend.
 */
import EntityConfiguration from "./EntityConfiguration";

export default class ResourceConfiguration extends EntityConfiguration {
    /**
     * If the resource is allowed to have a negative quantity.
     */
    public canBeNegative: boolean;
    /**
     * Set this resource to always have the following quantity.
     */
    public isAlways?: string;
    /**
     * If the tooltip displays the amount of the resource earned.
     */
    public showEarned: boolean;
    /**
     * If the tooltip displays the maximum amount of the resource.
     */
    public showMax: boolean;
}
