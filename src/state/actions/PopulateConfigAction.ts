export default class PopulateConfigAction implements Action<string> {
  static ACTION_TYPE = "POPULATE_CONFIG";
  public type = PopulateConfigAction.ACTION_TYPE;
  public config:any;

  constructor(config:any){
    this.config = config;
  }
}
