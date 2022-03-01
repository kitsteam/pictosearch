import { PictogramState, TextState } from ".";
import { HairColor, SkinColor } from "../../../data/colors";
import { Identifier, IdentifierPosition } from "../options/IdentifierOptions";
import { Tense } from "../options/VerbalTenseOptions";

export enum ActionType {
    init,
    resolution,
    colorized,
    headColor,
    background,
    border,
    crossedOut,
    plural,
    identifier,
    text,
    resetText,
    tense,
    zoom,
    position,
    dragAndDrop,
};

type InitialAction = {
    type: ActionType.init,
    data: PictogramState,
}

export const updateInitialState = (data: PictogramState): InitialAction => ({
    type: ActionType.init,
    data,
});

type ResolutionAction = {
    type: ActionType.resolution,
    data: number,
}

export const updateResolution = (data: number): ResolutionAction => ({
    type: ActionType.resolution,
    data,
});

type ColorizedAction = {
    type: ActionType.colorized,
    data: boolean,
}

export const updateColorized = (data: boolean): ColorizedAction => ({
    type: ActionType.colorized,
    data,
});

type HeadColorAction = {
    type: ActionType.headColor,
    data: {
        skinColor: SkinColor,
        hairColor: HairColor,
    },
};

export const updateHeadColor = (skinColor: SkinColor, hairColor: HairColor): HeadColorAction => ({
    type: ActionType.headColor,
    data: {
        skinColor,
        hairColor,
    }
});

type BackgroundAction = {
    type: ActionType.background,
    data: {
        color: string,
    },
}

export const updateBackground = (color: string): BackgroundAction => ({
    type: ActionType.background,
    data: {
        color,
    },
});

type BorderAction = {
    type: ActionType.border,
    data: {
        width: number,
        color: string,
    },
}

export const updateBorder = (width: number, color: string): BorderAction => ({
    type: ActionType.border,
    data: {
        width,
        color,
    },
});

type CrossedOutAction = {
    type: ActionType.crossedOut,
    data: boolean,
}

export const updateCrossedOut = (data: boolean): CrossedOutAction => ({
    type: ActionType.crossedOut,
    data,
});

type PluralAction = {
    type: ActionType.plural,
    data: {
        enabled: boolean,
        color: string,
    },
}

export const updatePlural = (enabled: boolean, color: string): PluralAction => ({
    type: ActionType.plural,
    data: {
        enabled,
        color,
    },
});

type IdentifierAction = {
    type: ActionType.identifier,
    data: {
        type: Identifier,
        position: IdentifierPosition,
        color: string,
    },
}

export const updateIdentifier = (type: Identifier, position: IdentifierPosition, color: string): IdentifierAction => ({
    type: ActionType.identifier,
    data: {
        type,
        position,
        color,
    },
});

type TextAction = {
    type: ActionType.text,
    data: {
        position: 'top' | 'bottom',
        state: TextState,
    },
};

export const updateTextTop = (state: TextState): TextAction => ({
    type: ActionType.text,
    data: {
        position: 'top',
        state,
    },
});

export const updateTextBottom = (state: TextState): TextAction => ({
    type: ActionType.text,
    data: {
        position: 'bottom',
        state,
    },
});

type ResetTextAction = {
    type: ActionType.resetText,
    data: {
        position: 'top' | 'bottom',
    },
};

export const resetTextTop = (): ResetTextAction => ({
    type: ActionType.resetText,
    data: {
        position: 'top',
    }
});

export const resetTextBottom = (): ResetTextAction => ({
    type: ActionType.resetText,
    data: {
        position: 'bottom',
    }
});

type TenseAction = {
    type: ActionType.tense,
    data: {
        type: Tense,
        color: string,
    },
}

export const updateTense = (type: Tense, color: string): TenseAction => ({
    type: ActionType.tense,
    data: {
        type,
        color,
    },
});

type ZoomAction = {
    type: ActionType.zoom,
    data: number,
}

export const updateZoom = (data: number): ZoomAction => ({
    type: ActionType.zoom,
    data,
});

type PositionAction = {
    type: ActionType.position,
    data: {
        x: number,
        y: number,
    },
};

export const updatePosition = (x: number, y: number): PositionAction => ({
    type: ActionType.position,
    data: { x, y },
});

type DragAndDropAction = {
    type: ActionType.dragAndDrop,
    data: boolean,
};

export const enableDragAndDrop = (): DragAndDropAction => ({
    type: ActionType.dragAndDrop,
    data: true,
});

export const disableDragAndDrop = (): DragAndDropAction => ({
    type: ActionType.dragAndDrop,
    data: false,
});

export type Action = InitialAction |
    ResolutionAction |
    ColorizedAction |
    HeadColorAction |
    BackgroundAction |
    BorderAction |
    CrossedOutAction |
    IdentifierAction |
    PluralAction |
    TextAction |
    ResetTextAction |
    TenseAction |
    ZoomAction |
    PositionAction |
    DragAndDropAction;