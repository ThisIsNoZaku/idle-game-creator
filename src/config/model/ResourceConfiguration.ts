/**
 * Resources are things that you gain and spend.
 */
import EntityConfiguration from "./EntityConfiguration";

export default class ResourceConfiguration extends EntityConfiguration {
    constructor(key: string, name: string, description: string) {
        super(key, name, description);
    }
}
