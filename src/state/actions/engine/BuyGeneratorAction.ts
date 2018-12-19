import {Action} from "redux";

export default class BuyGeneratorAction implements Action<string> {
  public static ACTION_TYPE = "BUY";
  public type = BuyGeneratorAction.ACTION_TYPE;
  public entity: string;
  public quantity: number;
  public success: boolean;
  public cost?: {[resourceName: string]: number};

  constructor(entity: string, quantity: number, cost?: {[resourceName: string]: number}) {
    if (!entity) {
      throw new Error("Entity name not specified.");
    }
    this.entity = entity;
    if (quantity === undefined) {
      throw new Error("No quantity defined.");
    } else if (typeof quantity !== "number" || Number.isNaN(quantity)) {
      throw new Error("Quantity was not a number or NaN.");
    }
    this.success = quantity !== 0;
    this.quantity = quantity;
    this.cost = cost;
    if (quantity > 0 && cost === undefined) {
      throw new Error("Quantity was positive but no cost was defined. " +
        "Pass an empty object if the purchase has no cost.");
    }
  }
}
