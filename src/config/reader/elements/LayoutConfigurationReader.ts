import LayoutConfiguration from "../../model/layout/SectionConfiguration";
import ItemConfigurationReader from "./ItemConfigurationReader";

export default class LayoutConfigurationReader implements ItemConfigurationReader<LayoutConfiguration> {
    public static instance(): LayoutConfigurationReader {
        return this._instance;
    }
    private static _instance = new LayoutConfigurationReader();

    private constructor() {}

    public read(key: string, input: object): LayoutConfiguration {
        return LayoutConfiguration.copyFrom(key, input);
    }
}
