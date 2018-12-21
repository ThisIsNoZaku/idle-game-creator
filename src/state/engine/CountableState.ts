/**
 * Represents something which tracks an amount.
 */  
export default abstract class CountableState {
    /**
     * The current amount of the thing being tracked.
     */
    private _quantity:number;
    /**
     * The largest amount ever accrued.
     */
     private _lifetimeMax:number = 0;
     /**
      * The total amount of the thing accumulated.
      */ 
     private _lifetimeTotal:number = 0;
     
     constructor(quantity: number) {
         this._quantity = quantity;
         this._lifetimeMax = quantity;
         this._lifetimeTotal = quantity;
     }
     
     set quantity(val:number) {
         if (val > this._quantity) {
             this._lifetimeTotal += val - this._quantity;
         }
         if (val > this._lifetimeMax) {
             this._lifetimeMax = val;
         }
         this._quantity = Math.ceil(val * 10) / 10;
     }
     
     get quantity(){
         return this._quantity;
     }
     
     get lifetimeMax(){
         return this._lifetimeMax;
     }
     
     get lifetimeTotal(){
         return this._lifetimeTotal;
     }
}