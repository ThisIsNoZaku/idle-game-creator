import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

import {App} from "../App";

import {ButtonComponent} from "../components/Button";
import {LayoutSection} from "../components/LayoutSection";
import GameRenderer from "../components/GameRenderer";
import SectionConfiguration from "../config/model/layout/SectionConfiguration";
import {ButtonConfiguration} from "../config/model/ButtonConfiguration";
import GameConfiguration from "../config/model/GameConfiguration";
import {createStore} from "redux";
import {Provider} from "react-redux";
import LayoutConfiguration from "../config/model/layout/LayoutConfiguration";

storiesOf("App", module)
    .add("can render an error message", () => <App error="Some Error Message"/>)
    .add("", () => <App/>);

storiesOf("GameRenderer", module)
    .addDecorator(story => <Provider
        store={createStore(() => {
            return {}
        })}>{story()}</Provider>)
    .add("can render a game related error", () => <GameRenderer error="Some Error Message"/>)
    .add("can render a layout based on a config", () => <GameRenderer config={new GameConfiguration({},
        {button: new ButtonConfiguration("button", "Button", "This is a button.")},
        {buttons: new SectionConfiguration("buttons", "Buttons", ["button"])}
    )
    }/>)
;

storiesOf('Button', module)
    .add('with text', () => <ButtonComponent identifier="button" config={{
        buttons: {
            button: new ButtonConfiguration("button", "Button")
        }

    }}/>);

storiesOf("LayoutSection", module)
    .add("can contain buttons", () => <LayoutSection
        identifier="buttons"
        config={new GameConfiguration(null, {
            "buttonOne": new ButtonConfiguration("buttonOne", "Button One"),
            "buttonTwo": new ButtonConfiguration("buttonTwo", "Button Two"),
            "buttonThree": new ButtonConfiguration("buttonThree", "Button Three")
        }, {
            "buttons": new SectionConfiguration("buttons", null, ["buttonOne", "buttonTwo", "buttonThree"])
        })}
    ></LayoutSection>)
    .add("can have a text Header", () => <LayoutSection
        identifier="buttons"
        config={new GameConfiguration(null, {
            "buttonOne": new ButtonConfiguration("buttonOne", "Button One"),
            "buttonTwo": new ButtonConfiguration("buttonTwo", "Button Two"),
            "buttonThree": new ButtonConfiguration("buttonThree", "Button Three")
        }, {
            "buttons": new SectionConfiguration("buttons", "Buttons")
        })}
    ></LayoutSection>)
    .add("can layout contents horizontally", () => <LayoutSection
        identifier="buttons"
        config={new GameConfiguration(null, {
            "buttonOne": new ButtonConfiguration("buttonOne", "Button One"),
            "buttonTwo": new ButtonConfiguration("buttonTwo", "Button Two"),
            "buttonThree": new ButtonConfiguration("buttonThree", "Button Three")
        }, {
            "buttons": new SectionConfiguration("buttons", null, ["buttonOne", "buttonTwo", "buttonThree"], "horizontal")
        })}
    ></LayoutSection>);