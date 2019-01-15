import EntityConfiguration from "../../model/EntityConfiguration";
import GameConfiguration from "../../model/GameConfiguration";

export default interface ItemConfigurationReader<T> {
    read(key: string, input: object, globalConfig?: GameConfiguration): T;
}
