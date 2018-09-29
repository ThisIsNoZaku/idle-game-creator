/**
 * Something which generates resources every tick.
 */
export default class ResourceGenerator {
    /**
     * The resources each generator produces.
     */
    public generated: {[resourceName: string]: number};

    constructor(generated: {[resourceName: string]: number}) {
        this.generated = generated;
    }
}
