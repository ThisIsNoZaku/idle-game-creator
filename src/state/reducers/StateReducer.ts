import {Action} from "redux";

import BuyGeneratorAction from "../actions/engine/BuyGeneratorAction";
import GainResourceAction from "../actions/engine/GainResourceAction";
import TickAction from "../actions/engine/TickAction";
import UpgradeAction from "../actions/engine/UpgradeAction";
import PopulateConfigAction from "../actions/PopulateConfigAction";
import GameState from "../engine/GameState";
import GeneratorState from "../engine/GeneratorState";
import ResourceState from "../engine/ResourceState";
import UpgradeState from "../engine/UpgradeState";

export default function(state: any, action: Action<any>) {
    if (state === undefined) {
        return {...new GameState()};
    }
    if (action.type === "POPULATE_CONFIG") {
      const populateAction = (action as PopulateConfigAction);
        return {
            generators: Object.keys(populateAction.config.generators).reduce((reduced: any, generatorName: string) => {
                reduced[generatorName] = new GeneratorState(generatorName, 0);
                return reduced;
            }, {}),
            resources: Object.keys(populateAction.config.resources).reduce((reduced: any, resourceName: string) => {
                reduced[resourceName] = new ResourceState(resourceName, 0);
                return reduced;
            }, {}),
            upgrades: Object.keys(populateAction.config.upgrades || {}).reduce((reduced: any, upgradeName: string) => {
                reduced[upgradeName] = new UpgradeState(populateAction.config.upgrades[upgradeName], false);
                return reduced;
            }, {}),
        };
    }
    if (action.type === GainResourceAction.ACTION_TYPE) {
      const gainResourceAction = (action as GainResourceAction);
        if (!state.resources[gainResourceAction.resource]) {
            console.warn(`${gainResourceAction.resource} isn't a valid resource.`);
            return state;
        } else {
            state.resources[gainResourceAction.resource].quantity =
                state.resources[gainResourceAction.resource].quantity + gainResourceAction.quantity;
            return {
                ...state,
            };
        }
    }
    if (action.type === "BUY") {
      const buyGeneratorAction = (action as BuyGeneratorAction);
        if (!state.generators[buyGeneratorAction.entity]) {
            console.warn(`${buyGeneratorAction.entity} isn't a valid generator.`);
        } else {
            if (buyGeneratorAction.success) {
                state.generators[buyGeneratorAction.entity].quantity =
                    (state.generators[buyGeneratorAction.entity].quantity)
                    + buyGeneratorAction.quantity;
                Object.keys(buyGeneratorAction.cost!).forEach((resourceName: string) => {
                    state.resources[resourceName].quantity -= buyGeneratorAction.cost![resourceName];
                });
            }
        }
        return {...state};
    }

    if (action.type === "UPGRADE") {
        const upgradeAction = (action as UpgradeAction);
        if (!state.upgrades[upgradeAction.entity]) {
            console.warn(`${upgradeAction.entity} isn't an existing upgrade.`);
        } else {
            state.upgrades[upgradeAction.entity].enabled = true;
        }
    }

    if (action.type === "TICK") {
      const tick = (action as TickAction);
        const updatedResources = Object.keys(state.resources).reduce((updated: any, resourceName: string ) => {
            updated[resourceName].quantity += tick.generatedResources[resourceName];
            return updated;
        }, state.resources);
        return {...state, ...{
            resources : updatedResources,
        }};
    }
    return state;
}
