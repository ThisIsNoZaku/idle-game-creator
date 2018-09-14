import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import {Welcome } from '@storybook/react/demo';

import { ButtonComponent } from "../components/Button";
import {LayoutSection} from "../components/LayoutSection";

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <ButtonComponent text="Hello World" onClick={action("Hello World!")}>Hello Button</ButtonComponent>);

storiesOf("LayoutSection", module)
    .add("can contain buttons", ()=> <LayoutSection children={[
        React.createElement(ButtonComponent, {buttonKey:"one", text:"One"}),
        React.createElement(ButtonComponent, {buttonKey:"two", text:"Two"}),
        React.createElement(ButtonComponent, {buttonKey:"three", text:"Three"})]
    } ></LayoutSection>)
    .add("can layout contents horizontally", ()=> <LayoutSection direction="horizontal"
        children={[
        React.createElement(ButtonComponent, {buttonKey:"one", text:"One"}),
        React.createElement(ButtonComponent, {buttonKey:"two", text:"Two"}),
        React.createElement(ButtonComponent, {buttonKey:"three", text:"Three"})]
    } ></LayoutSection>)
    .add("can contain other LayoutSections", ()=> <LayoutSection direction="horizontal"
        children={[
            <LayoutSection direction="horizontal" children={[
                <LayoutSection children={[
                    <ButtonComponent buttonKey="leftOne" text="Left One"/>,
                    <ButtonComponent buttonKey="leftTwo" text="Left Two"/>
                ]}/>,
                <LayoutSection children={[
                    <ButtonComponent buttonKey="rightOne" text="Right One"/>,
                    <ButtonComponent buttonKey="rightTwo" text="Right Two"/>
                ]}/>
            ]}/>
        ]} ></LayoutSection>)