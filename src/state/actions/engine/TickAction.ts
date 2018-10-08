import {Action} from "redux";

export default class TickAction implements Action<string> {
  public static ACTION_TYPE = "TICK";
  public type = TickAction.ACTION_TYPE;
  public generatedResources: {[name: string]: number};
  constructor(generatedResources: {[name: string]: number}) {
    this.generatedResources = generatedResources;
  }
}
