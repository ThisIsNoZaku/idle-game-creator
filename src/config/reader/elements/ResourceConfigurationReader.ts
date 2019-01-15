import ItemConfigurationReader from "./ItemConfigurationReader";
import ResourceConfiguration from "../../../config/model/ResourceConfiguration";

export default class ResourceConfigurationReader implements ItemConfigurationReader<ResourceConfiguration> {
    public static instance() {
        return this._instance;
    }
    private static _instance:ResourceConfigurationReader = new ResourceConfigurationReader();
    
    public read(key: string, input: any) {
        return new ResourceConfiguration(key, input.name, input.description);
    }
}