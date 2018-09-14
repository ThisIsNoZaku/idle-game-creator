import * as React from "react";

export default class AppState {
    components: {
        layout: {[key:string]:React.ComponentElement<any,any>},
        buttons: {[key:string]:React.ComponentElement<any,any>}
    } = {
        layout:{},
        buttons:{}
    }
}