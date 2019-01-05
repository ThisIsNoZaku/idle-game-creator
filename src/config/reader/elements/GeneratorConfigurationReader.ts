import GeneratorConfiguration from "../../model/GeneratorConfiguration";
import { Requirements } from "../../model/PurchasableConfiguration";
import RequirementsTranslator from "../RequirementsTranslator";
import ItemConfigurationReader from "./ItemConfigurationReader";

export default class GeneratorConfigurationReader implements ItemConfigurationReader<GeneratorConfiguration> {
    public static instance(): GeneratorConfigurationReader {
        return this._instance;
    }
    private static _instance = new GeneratorConfigurationReader();

    public read(key: string, input: any): GeneratorConfiguration {
        const out =  GeneratorConfiguration.copyFrom(key, {...input, ...{
            costs: this.readCosts(input.cost),
            requirements: RequirementsTranslator(input.requires),
        }});
        return out;
    }

    private readCosts(input: {[resourceName: string]: number}) {
        return input;
    }
}
