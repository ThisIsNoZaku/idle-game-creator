import {Action} from "redux";

export default class ButtonClickAction implements Action<any> {
    public static ACTION_TYPE = "BUTTON_CLICK";
    public type: string = ButtonClickAction.ACTION_TYPE;
    public button: {identifier: string, effects?: string[], type: string};

    constructor(button: { identifier: string; effects?: string[]; type: string }) {
        this.button = button;
    }
}
