import React from 'react';

import {storiesOf} from '@storybook/react';
import {action as StorybookAction} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

import {App} from "../App";

import ButtonComponent from "../components/Button";
import {LayoutSection} from "../components/LayoutSection";
import GameRenderer from "../components/GameRenderer";
import SectionConfiguration from "../config/model/layout/SectionConfiguration";
import {ButtonConfiguration} from "../config/model/ButtonConfiguration";
import GameConfiguration from "../config/model/GameConfiguration";
import {createStore} from "redux";
import {Provider} from "react-redux";
import ResourceConfiguration from "../config/model/ResourceConfiguration";
import ResourceDisplay from "../components/ResourceDisplay";

storiesOf("App", module)
    .add("can render an error message", () => <App error="Some Error Message"/>)
    .add("displays an intro page when no game is specified", () => <App/>);

storiesOf("GameRenderer", module)
    .addDecorator(story => <Provider
        store={createStore((state, action) => {
            if (action.type === "BUTTON_CLICK") {
                StorybookAction(`${action.button.identifier} clicked.`)();
            }
            return {
                resources : {
                    resource: 0
                }
            }
        })}>{story()}</Provider>)
    .add("can render a game related error", () => <GameRenderer error="Some Error Message"/>)
    .add("can render a layout based on a config", () => <GameRenderer config={new GameConfiguration(
        {},
        {button: new ButtonConfiguration("button", "Button", "This is a button.")},
        {
            buttons: new SectionConfiguration("buttons", "Buttons", ["button"]),
            resources: new SectionConfiguration("resources", "Resources", ["resource"])
        },
        {resource: new ResourceConfiguration("resource", "Resource")}
    )
    }/>)
;

storiesOf('Button', module)
    .addDecorator(story => <Provider
        store={createStore((state: any, action: any) => {
            if (action.type === "BUTTON_CLICK") {
                StorybookAction(`${action.button.identifier} clicked.`)();
            }
            return {}
        })}>{story()}</Provider>)
    .add('with text', () => <ButtonComponent identifier="button" config={{
        buttons: {
            button: new ButtonConfiguration("button", "Button")
        }

    }}/>);

storiesOf("LayoutSection", module)
    .addDecorator(story => <Provider
        store={createStore((state: any, action: any) => {
            if (action.type === "BUTTON_CLICK") {
                StorybookAction(`${action.button.identifier} clicked.`)();
            }
            return {}
        })}>{story()}</Provider>)
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

storiesOf("ResourceDisplay", module)
    .addDecorator(story => <Provider
        store={createStore((state: any, action: any) => {
            if (action.type === "BUTTON_CLICK") {
                StorybookAction(`${action.button.identifier} clicked.`)();
            }
            return {
                resources: {
                    bunnies: 1
                }
            }
        })}>{story()}</Provider>)
    .add("can display a resource", () => <ResourceDisplay
        identifier="bunnies"
        config={new GameConfiguration({}, {}, {}, {
            bunnies: new ResourceConfiguration("bunnies", "Bunnies")
        })}
    />);