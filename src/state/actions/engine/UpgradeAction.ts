import {Action} from "redux";

export default class UpgradeAction implements Action<string> {
  public static ACTION_TYPE = "UPGRADE";
  public type = UpgradeAction.ACTION_TYPE;
  public entity: string;
  public cost?: {[resourceName: string]: number};

  constructor(entity: string, cost: {[resourceName: string]: number}) {
    if (!entity) {
      throw new Error("Entity name not specified.");
    }
    this.entity = entity;
  }
}
