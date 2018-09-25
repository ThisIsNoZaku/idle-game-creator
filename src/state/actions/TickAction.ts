import Action from "redux";

export default class TickAction implements Action<string> {
  static ACTION_TYPE = "TICK";
  public type = TickAction.ACTION_TYPE;
  constructor(generatedResources: {[name:string]:number}){
    this.generatedResources = generatedResources;
  }
  generatedResources: {[name:string]:number}
}
