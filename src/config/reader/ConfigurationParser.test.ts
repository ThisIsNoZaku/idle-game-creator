import ConfigurationParser from "./ConfigurationParser";
import * as fs from "fs";

describe("ConfigurationParser", () => {
    const parser = new ConfigurationParser();
    it("can construct", () => {
        new ConfigurationParser();
    });

    it("throws an exception if the configuration is missing the required header", ()=>{
        let config = fs.readFileSync(`${__dirname}/test-config.txt`, 'UTF-8');
        parser.readAsTxtConfig(config);
        fail();
    });
});