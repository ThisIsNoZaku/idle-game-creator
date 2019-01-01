import ButtonConfiguration from "../../model/ButtonConfiguration";
import ItemConfigurationReader from "./ItemConfigurationReader";

export default class ButtonConfigurationReader implements ItemConfigurationReader<ButtonConfiguration> {
    public static instance(): ButtonConfigurationReader {
        return this._instance;
    }
    private static _instance = new ButtonConfigurationReader();
    private constructor() {}

    public read(key: string, input: any): ButtonConfiguration {
        if (input.name === undefined) {
            throw new Error("Name is required");
        }
        if (input.description === undefined) {
            throw new Error("Description is required");
        }
        return ButtonConfiguration.copyFrom(key, input);
    }
}
