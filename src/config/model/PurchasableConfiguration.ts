import EntityConfiguration from "./EntityConfiguration";

export default class PurchaseableConfiguration extends EntityConfiguration {
    private _cost: Cost;

    private _requirements: Requirements;

    constructor(key: string, name: string, description: string, cost?: Cost,
        requirements?: Requirements) {
        super(key, name, description);
        this._cost = cost !== undefined ? cost : empty();
        this._requirements = requirements !== undefined ? requirements : empty();
    }

    get cost() {
        return this._cost;
    }

    get requirements() {
        return this._requirements;
    }
}

export type Cost = {
    resources: {[name: string]: number},
};

export type Requirements = {
    resources: {[name: string]: {
        current: number,
        lifetimeMax: number,
        lifetimeTotal: number,
    }};
};

export function empty(): Cost & Requirements {
    return {
        resources: {},
    };
}
