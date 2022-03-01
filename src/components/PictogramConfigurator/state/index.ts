import { SkinColor, HairColor, backgroundColors, borderColors, pluralColors, identifierColors, tenseColors } from "../../../data/colors";
import { Identifier, IdentifierPosition } from "../options/IdentifierOptions";
import { Tense } from "../options/VerbalTenseOptions";
import { fontFamilies } from '../options/TextOptions';
import { PictogramCustomization } from "../Pictogram";
import { Action, ActionType } from "./actions";

export enum Resolution {
    low = 500,
    high = 2500,
}

type PictogramOptions = {
    colorized: boolean,
    resolution: number,
    skinColor: SkinColor,
    hairColor: HairColor,
}

export type PictogramState = {
    options: PictogramOptions,
    customizations: PictogramCustomization,
};

export const initialTextState = {
    enabled: false,
    value: '',
    style: {
        uppercase: false,
        color: '#000000',
        fontSize: 46,
        fontFamily: fontFamilies[0],
    },
};

export type TextState = typeof initialTextState;

export const initialPictogramState: PictogramState = {
    options: {
        colorized: true,
        resolution: Resolution.low,
        skinColor: SkinColor.white,
        hairColor: HairColor.brown,
    },
    customizations: {
        backgroundColor: backgroundColors[0],
        border: {
            width: 0,
            color: borderColors[0],
        },
        crossedOut: false,
        plural: false,
        pluralColor: pluralColors[0],
        identifier: {
            type: Identifier.none,
            position: IdentifierPosition.right,
            color: identifierColors[0],
        },
        text: {
            top: { ...initialTextState },
            bottom: { ...initialTextState },
        },
        tense: Tense.present,
        tenseColor: tenseColors[0],
        zoom: 0,
        position: {
            x: 0,
            y: 0,
        },
        dragAndDrop: false,
    },
};

export function pictogramStateReducer(state: PictogramState, action: Action): PictogramState {
    switch (action.type) {
        case ActionType.init:
            return { ...state, ...action.data };
        case ActionType.resolution:
            return { ...state, options: { ...state.options, resolution: action.data } };
        case ActionType.colorized:
            return { ...state, options: { ...state.options, colorized: action.data } };
        case ActionType.headColor:
            return { ...state, options: { ...state.options, ...action.data } };
        case ActionType.background:
            return {
                ...state,
                customizations: { ...state.customizations, backgroundColor: action.data.color }
            };
        case ActionType.border:
            return {
                ...state,
                customizations: {
                    ...state.customizations,
                    border: { ...action.data },
                }
            };
        case ActionType.crossedOut:
            return {
                ...state,
                customizations: { ...state.customizations, crossedOut: action.data }
            };
        case ActionType.plural:
            return {
                ...state,
                customizations: {
                    ...state.customizations,
                    plural: action.data.enabled,
                    pluralColor: action.data.color,
                }
            };
        case ActionType.identifier:
            return {
                ...state,
                customizations: {
                    ...state.customizations,
                    identifier: { ...action.data },
                }
            };
        case ActionType.text:
            return {
                ...state,
                customizations: {
                    ...state.customizations,
                    text: {
                        ...state.customizations.text,
                        [action.data.position]: action.data.state,
                    },
                }
            };
        case ActionType.resetText:
            return {
                ...state,
                customizations: {
                    ...state.customizations,
                    text: {
                        ...state.customizations.text,
                        [action.data.position]: initialTextState,
                    },
                }
            };
        case ActionType.tense:
            return {
                ...state,
                customizations: {
                    ...state.customizations,
                    tense: action.data.type,
                    tenseColor: action.data.color,
                }
            };
        case ActionType.zoom:
            return {
                ...state,
                customizations: { ...state.customizations, zoom: action.data }
            };
        case ActionType.position:
            return {
                ...state,
                customizations: { ...state.customizations, position: action.data },
            };
        case ActionType.dragAndDrop:
            return {
                ...state,
                customizations: {
                    ...state.customizations,
                    dragAndDrop: action.data,
                    position: { x: 0, y: 0 },
                },
            };
    }
}

export const pictogramStateReducerWithLogger = (state: PictogramState, action: Action): PictogramState => {
    const next = pictogramStateReducer(state, action);

    console.group();
    console.log("%cPrevious State:", "color: #9E9E9E; font-weight: 700;", state);
    console.log("%cAction:", "color: #00A7F7; font-weight: 700;", ActionType[action.type], action);
    console.log("%cNext State:", "color: #47B04B; font-weight: 700;", next);
    console.groupEnd();

    return next;
}