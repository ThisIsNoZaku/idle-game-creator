import {Requirements} from "../model/PurchasableConfiguration";

export default function requirementsTranslator(input: any){
    return readRequirements(input);
};

function readRequirements(input: any): Requirements {
    if (input === undefined) {
        return {
            resources: {},
        };
    }
    const out = {
        resources: mapResourceRequirements(input.resources),
    };
    return out;
}

function mapResourceRequirements(input: {[resourceName: string]: string | number}): {
    [resourceName: string]: {
        lifetimeMax: number,
        lifetimeTotal: number,
        current: number,
    }} {
        const out = Object.keys(input)
            .reduce((mapped: {[resourceName: string]: {
                lifetimeMax: number,
                lifetimeTotal: number,
                current: number,
            }}, resourceName: string) => {
                mapped[resourceName] = parseResourceExpression(input[resourceName]);
                return mapped;
            }, {});
        return out;
}

function parseResourceExpression(expression: string|number) {
    if (typeof expression === "number") {
        return {
            current: expression,
            lifetimeMax: 0,
            lifetimeTotal: 0,
        };
    }
    return expression.split(",").map((s: string) => s.trim())
    .reduce((mapped: {
        current: number,
        lifetimeMax: number,
        lifetimeTotal: number,
    }, segment: string) => {
        const segmentTokens = segment.split(/\s+/);
        if (segmentTokens.length === 1) {
            if (mapped.current !== 0) {
                throw new Error("Attempted to set 'current' resource " +
                "requirement multiple times.");
            }
            mapped.current = Number.parseFloat(segmentTokens[0]);
        } else if (segmentTokens.length === 2) {
            const type = segmentTokens[1];
            const amount = Number.parseFloat(segmentTokens[0]);
            switch (type) {
                case "total":
                    if (mapped.lifetimeTotal !== 0) {
                        throw new Error("Attempted to set 'total' " +
                        "resource requirement multiple times.");
                    }
                    mapped.lifetimeTotal = amount;
                    break;
                case "max":
                    if (mapped.lifetimeMax !== 0) {
                        throw new Error(`Attempted to set 'max' resource ` +
                            `requirement multiple times.`);
                    }
                    mapped.lifetimeMax = amount;
                    break;
                default:
                    throw new Error(`'${segment}' not understood in ` +
                        `${expression}, segment must be '<number> total ` +
                        `or '<number> max'`);
            }
        } else {
            throw new Error(`${segment} not understood in ${expression}, it contains an invalid number of tokens.`);
        }
        return mapped;
    }, {
        current:  0,
        lifetimeMax: 0,
        lifetimeTotal: 0,
    });
}
