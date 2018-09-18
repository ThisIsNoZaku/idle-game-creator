import GameConfiguration from "../model/GameConfiguration";

export class ReadingConfiguration {
    public requireButtonConfiguration?: boolean;
}

export function generateInvalidConfigurationError(message: string) {
    throw new Error(`Invalid Configuration File - ${message}`);
}

export default interface ConfigurationParser {
    parse(data: string, config?: ReadingConfiguration): GameConfiguration;
}
