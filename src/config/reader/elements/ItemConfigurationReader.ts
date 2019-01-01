import EntityConfiguration from "../../model/EntityConfiguration";

export default interface ItemConfigurationReader<T> {
    read(key: string, input: object): T;
}
