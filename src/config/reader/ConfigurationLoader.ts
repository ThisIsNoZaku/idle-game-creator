import {AxiosError, AxiosInstance, AxiosResponse} from "axios";

export default class ConfigurationLoader {
    private axiosClient:AxiosInstance;

    constructor(axiosInstance:AxiosInstance) {
        if(!axiosInstance){
            throw new Error("axiosInstance must be defined.")
        }
        this.axiosClient = axiosInstance;
    }

    load(location:string):Promise<AxiosResponse> {
        console.info("Loading configuration");
        return this.axiosClient.get(location).then((response: AxiosResponse) => {
            console.info("Loaded configuration.");
            return response;
        }, (error:AxiosError) => {
            console.error("Failed to load configuration", error);
            throw error;
        });
    }
}