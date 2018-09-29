import {AxiosError, AxiosInstance, AxiosResponse} from "axios";

export default class ConfigurationLoader {
    private axiosClient: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosClient = axiosInstance;
    }

    public load(location: string): Promise<AxiosResponse> {
        console.info("Loading configuration");
        return this.axiosClient.get(location).then((response: AxiosResponse) => {
            console.info("Loaded configuration.");
            return response;
        }, (error: AxiosError) => {
            console.error("Failed to load configuration", error);
            throw error;
        });
    }
}
