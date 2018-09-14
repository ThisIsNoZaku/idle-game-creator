import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { App } from "../App";

import { ButtonComponent } from "../components/Button";
import {LayoutSection} from "../components/LayoutSection";

storiesOf("App", module)
    .add("can render an error message", () => <App error="Some Error Message" />);

storiesOf('Button', module)
  .add('with text', () => <ButtonComponent text="Hello World" onClick={action("Hello World!")}>Hello Button</ButtonComponent>);

storiesOf("LayoutSection", module)
    .add("can contain buttons", ()=> <LayoutSection
        header="Buttons"
        children={[
        React.createElement(ButtonComponent, {buttonKey:"one", text:"One"}),
        React.createElement(ButtonComponent, {buttonKey:"two", text:"Two"}),
        React.createElement(ButtonComponent, {buttonKey:"three", text:"Three"})]
    } ></LayoutSection>)
    .add("can have a text Header", ()=><LayoutSection header="Text Header" ></LayoutSection>)
    .add("can layout contents horizontally", ()=> <LayoutSection
        header="Horizontal Buttons"
        direction="horizontal"
        children={[
        React.createElement(ButtonComponent, {buttonKey:"one", text:"One"}),
        React.createElement(ButtonComponent, {buttonKey:"two", text:"Two"}),
        React.createElement(ButtonComponent, {buttonKey:"three", text:"Three"})]
    } ></LayoutSection>)
    .add("can contain other LayoutSections", ()=> <LayoutSection
        header="Top Level"
        direction="horizontal"
        children={[
            <LayoutSection
                header="Left Nested"
                direction="horizontal" children={[
                    <ButtonComponent buttonKey="leftOne" text="Left One"/>,
                    <ButtonComponent buttonKey="leftTwo" text="Left Two"/>
                ]}/>,
            <LayoutSection
                header="Right Nested"
                children={[
                    <ButtonComponent buttonKey="rightOne" text="Right One"/>,
                    <ButtonComponent buttonKey="rightTwo" text="Right Two"/>
                ]}/>
        ]}/>
        )