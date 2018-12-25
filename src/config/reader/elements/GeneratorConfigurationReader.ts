import GeneratorConfiguration from "../../model/GeneratorConfiguration";
import ItemConfigurationReader from "./ItemConfigurationReader";
import { Requirements, empty } from "../../model/PurchasableConfiguration";

export default class GeneratorConfigurationReader implements ItemConfigurationReader<GeneratorConfiguration> {
    private static _instance = new GeneratorConfigurationReader();
    
    public static instance(): GeneratorConfigurationReader{
        return this._instance;
    }
    
    read(key:string, input: any): GeneratorConfiguration {
        const out =  GeneratorConfiguration.copyFrom(key, {...input, ...{
            requirements: this.readRequirements({...{
                resources: {},
                requirements: {}
            }, ...input.requirements}),
            costs: this.readCosts(input.costs),
        }});
        return out;
    }
    
    readCosts(input: {[resourceName: string]:number}) {
        return input;
    }
    
    readRequirements(input: any):  Requirements {
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
                if ( typeof input[resourceName] === "number") {
                    mapped[resourceName] = {
                        current: input[resourceName] as number,
                        lifetimeMax: 0,
                        lifetimeTotal: 0
                    }
                } else {
                    const requirementExpressions = (input[resourceName] as string).split(",")
                    .map((s:string)=>{
                        return s.trim();
                    });
                    requirementExpressions.forEach((expression:string) => {
                        const expressionTokens: string[] = expression.split(" ");
                        let amount = Number.parseFloat(expressionTokens[1]);
                        let type = expressionTokens[0];
                        if (!Number.isNaN(+expressionTokens[0])) {
                            type = "current";
                            amount = +expressionTokens[0];
                        } if (type == "total") {
                            mapped[resourceName] = {...mapped[resourceName], ...{
                                lifetimeTotal : amount,
                            }};
                        } else if (type == "highest") {
                            mapped[resourceName] = {...mapped[resourceName], ...{
                                lifetimeMax : amount,
                            }};
                        } else if (type === "current"){
                            mapped[resourceName] = {...mapped[resourceName], ...{
                                current : amount,
                            }};
                        } else {
                            throw new Error(`type must be one of 'current', 'total' or 'highest', but was ${type}`);
                        }
                    });
                }
                return mapped;
            }, {});
            return out;
    }
    
}