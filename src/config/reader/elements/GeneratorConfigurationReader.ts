import GeneratorConfiguration from "../../model/GeneratorConfiguration";
import ItemConfigurationReader from "./ItemConfigurationReader";
import { Requirements, empty } from "../../model/PurchasableConfiguration";
import RequirementExpressionParser from "../RequirementExpressionParser";

export default class GeneratorConfigurationReader implements ItemConfigurationReader<GeneratorConfiguration> {
    private static _instance = new GeneratorConfigurationReader();
    
    public static instance(): GeneratorConfigurationReader{
        return this._instance;
    }
    
    read(key:string, input: any): GeneratorConfiguration {
        const out =  GeneratorConfiguration.copyFrom(key, {...input, ...{
            requirements: this.readRequirements(input.requires),
            costs: this.readCosts(input.cost),
        }});
        return out;
    }
    
    readCosts(input: {[resourceName: string]:number}) {
        return input;
    }
    
    readRequirements(input: any):  Requirements {
        if (input == undefined) {
            return {
                resources: {},
            }
        }
        const out = {
            resources: this.mapResourceRequirements(input.resources),
        }
        return out;
    }
    
    private mapResourceRequirements(input:{[resourceName: string] : string | number}) : {
        [resourceName: string]: {
            lifetimeMax: number,
            lifetimeTotal: number,
            current: number,
        }} {
            const out = Object.keys(input).reduce((mapped: {[resourceName: string] : {
                lifetimeMax: number,
                lifetimeTotal: number,
                current: number,
            }}, resourceName: string) => {
                mapped[resourceName] = this.parseResourceExpression(input[resourceName]);
                return mapped;
            }, {});
            return out;
    }
    
    private parseResourceExpression(expression:string|number) {
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
            lifetimeTotal: number,
            lifetimeMax: number,
        }, segment:string) => {
            const segmentTokens = segment.split(/\s+/);
            if (segmentTokens.length === 1) {
                if (mapped.current !== 0) {
                    throw new Error("Attempted to set 'current' resource requirement multiple times.");
                }
                mapped.current = Number.parseFloat(segmentTokens[0]);
            } else if (segmentTokens.length === 2) {
                const type = segmentTokens[1];
                const amount = Number.parseFloat(segmentTokens[0]);
                switch (type) {
                    case "total":
                        if (mapped.lifetimeTotal !== 0) {
                            throw new Error("Attempted to set 'total' resource requirement multiple times.");
                        }
                        mapped.lifetimeTotal = amount;
                        break;
                    case "max":
                        if (mapped.lifetimeMax !== 0) {
                            throw new Error("Attempted to set 'max' resource requirement multiple times.");
                        }
                        mapped.lifetimeMax = amount;
                        break;
                    default:
                        throw new Error(`'${segment}' not understood in ${expression}, segment must be '<number> total' or '<number> max'`);
                }
            }
            return mapped;
        }, {
            current:  0,
            lifetimeMax: 0,
            lifetimeTotal: 0,
        });
    }
    
}