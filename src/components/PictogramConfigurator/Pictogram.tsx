import { Box } from '@mui/material';
import Konva from 'konva';
import React, { RefObject, useCallback, useEffect, useRef } from 'react';
import { Stage, Layer, Image, Rect, Line, Group, Text } from 'react-konva';
import useImage from 'use-image';
import { apiIdentifierBaseUrl } from "../../hooks/network";
import { Identifier, IdentifierPosition } from './options/IdentifierOptions';
import { Tense } from './options/VerbalTenseOptions';
import { TextState } from "./state";
import { Action, updatePosition } from "./state/actions";

const checkerboard = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center';

const stageSize = 500;
const crossedOutColor = 'red';
const crossedOutWidth = 20;
const pluralWidth = 16;
const iconSize = 55;

function PastIcon({ tenseColor, x, y }: { tenseColor: string, x: number, y: number }) {
    const strokeWidth = 16;

    return (
        <Group>
            <Line
                stroke={tenseColor}
                strokeWidth={strokeWidth}
                points={[
                    x + iconSize / 2,
                    y + iconSize / 2,
                    x + iconSize,
                    y + iconSize / 2
                ]}
            />
            <Line
                stroke={tenseColor}
                strokeWidth={1}
                points={[
                    x + iconSize / 2,
                    y,
                    x + iconSize / 2,
                    y + iconSize,
                    x,
                    y + iconSize / 2
                ]}
                closed={true}
                fill={tenseColor}
            />
        </Group>
    );
}

function FutureIcon({ tenseColor, x, y }: { tenseColor: string, x: number, y: number }) {
    const strokeWidth = 16;

    return (
        <Group>
            <Line
                stroke={tenseColor}
                strokeWidth={strokeWidth}
                points={[
                    x,
                    y + iconSize / 2,
                    x + iconSize / 2,
                    y + iconSize / 2
                ]}
            />
            <Line
                stroke={tenseColor}
                strokeWidth={1}
                points={[
                    x + iconSize / 2,
                    y,
                    x + iconSize / 2,
                    y + iconSize,
                    x + iconSize,
                    y + iconSize / 2
                ]}
                closed={true}
                fill={tenseColor}
            />
        </Group>
    );
}

function IdentifierIcon({ identifier, identifierColor, x, y }: { identifier: Identifier, identifierColor: string, x: number, y: number }) {
    const url = `${apiIdentifierBaseUrl}/identifiers/${Identifier[identifier]}_${identifierColor.replace(/^#/, '')}.png`;
    const [image] = useImage(url);

    return <Image image={image} x={x} y={y} width={iconSize} height={iconSize} />
}

function fitStageIntoParentContainer(ref: RefObject<Konva.Stage | null>, container: RefObject<HTMLElement | null>) {
    if (!ref.current || !container.current) {
        return;
    }

    const containerWidth = container.current.offsetWidth;
    const scale = containerWidth / 500;

    ref.current.width(stageSize * scale);
    ref.current.height(stageSize * scale);
    ref.current.scale({ x: scale, y: scale });
}

export type PictogramCustomization = {
    border: {
        width: number,
        color: string,
    },
    backgroundColor: string,
    crossedOut: boolean,
    plural: boolean,
    pluralColor: string,
    tense: Tense,
    tenseColor: string,
    identifier: {
        type: Identifier,
        position: IdentifierPosition,
        color: string,
    },
    zoom: number,
    text: {
        top: TextState,
        bottom: TextState,
    },
    position: {
        x: number,
        y: number,
    },
    dragAndDrop: boolean,
}

type Props = PictogramCustomization & {
    stageRef: RefObject<Konva.Stage | null>,
    url: string,
    dispatch?: React.Dispatch<Action>,
    onLoaded?: () => void,
}

const Pictogram: React.FC<Props> = (props) => {
    const {
        stageRef,
        url,
        border,
        backgroundColor,
        crossedOut,
        plural,
        pluralColor,
        tense,
        tenseColor,
        identifier,
        zoom,
        dragAndDrop,
        position,
        dispatch,
        onLoaded
    } = props;
    const textTop = props.text.top;
    const textBottom = props.text.bottom;

    // Set crossOrigin to 'Anonymous' to enable CORS and prevent canvas taint errors
    // This allows canvas export/filtering while maintaining security (no credentials sent)
    const [image, imageStatus] = useImage(url, 'anonymous');
    const containerRef = useRef<HTMLElement>(null);

    const topTextRef = useRef<Konva.Text>(null);
    const bottomTextRef = useRef<Konva.Text>(null);

    const setPosition = useCallback((x: number, y: number) => dispatch && dispatch(updatePosition(x, y)), [dispatch]);
    const moved = position.x !== 0 || position.y !== 0;

    useEffect(() => {
        if (onLoaded && imageStatus === 'loaded') {
            onLoaded();
        }
    }, [onLoaded, imageStatus]);

    useEffect(() => {
        if (!moved) {
            setPosition(border.width, border.width);
        }
    }, [moved, border.width, setPosition]);

    useEffect(() => {
        const cb = () => fitStageIntoParentContainer(stageRef, containerRef);

        cb();

        window.addEventListener('resize', cb);

        return () => {
            window.removeEventListener('resize', cb);
        }
    }, [stageRef]);

    const onDragEnd = (x: number, y: number) => {
        if (position.x !== x || position.y !== y) {
            setPosition(x, y);
        }
    }

    const leftIcon = {
        x: border.width,
        y: border.width,
    };
    const rightIcon = {
        x: stageSize - border.width - iconSize,
        y: border.width,
    };

    const bottomLeftIcon = {
        x: border.width,
        y: stageSize - border.width - iconSize,
    };
    const bottomRightIcon = {
        x: stageSize - border.width - iconSize,
        y: stageSize - border.width - iconSize,
    };

    const width = (stageSize - 2 * border.width);
    const height = stageSize - 2 * border.width;

    const topTextHeight = textTop?.value && topTextRef.current ? topTextRef.current.textHeight : 0;
    const bottomTextHeight = textBottom?.value && bottomTextRef.current ? bottomTextRef.current.textHeight : 0;
    const textHeight = topTextHeight + bottomTextHeight;

    return (
        <Box sx={{ background: checkerboard }} ref={containerRef}>
            <Stage width={stageSize} height={stageSize} ref={stageRef}>
                <Layer>
                    <Rect x={0} y={0} width={stageSize} height={stageSize} stroke={border.color} strokeWidth={border.width * 2} fill={backgroundColor} />
                </Layer>

                <Layer scale={{ x: 1 + zoom / 100, y: 1 + zoom / 100 }}>
                    <Image
                        image={image}
                        x={position.x + (moved ? 0 : (textHeight / 2))}
                        y={position.y + (moved ? 0 : topTextHeight)}
                        width={width - textHeight}
                        height={height - textHeight}
                        draggable={dragAndDrop}
                        onDragEnd={(ev) => onDragEnd(ev.target.x(), ev.target.y())} />
                </Layer>

                <Layer>
                    {plural && <Group>
                        <Line
                            stroke={pluralColor}
                            strokeWidth={pluralWidth}
                            points={[rightIcon.x, rightIcon.y + iconSize / 2, rightIcon.x + iconSize, rightIcon.y + iconSize / 2]}
                        />
                        <Line
                            stroke={pluralColor}
                            strokeWidth={pluralWidth}
                            points={[rightIcon.x + iconSize / 2, rightIcon.y, rightIcon.x + iconSize / 2, rightIcon.y + iconSize]}
                        />
                    </Group>}

                    {tense !== Tense.present && <Group>
                        {tense === Tense.past && <PastIcon tenseColor={tenseColor} {...bottomLeftIcon} />}
                        {tense === Tense.future && <FutureIcon tenseColor={tenseColor} {...bottomRightIcon} />}
                    </Group>}

                    {identifier.type !== Identifier.none && <Group>
                        <IdentifierIcon
                            identifier={identifier.type}
                            identifierColor={identifier.color} {...(identifier.position === IdentifierPosition.left ? leftIcon : rightIcon)} />
                    </Group>}
                </Layer>

                <Layer>
                    {textTop.enabled &&
                        <Text fontFamily={textTop.style.fontFamily}
                            fontSize={textTop.style.fontSize}
                            fontStyle={textTop.style.fontStyle}
                            fill={textTop.style.color}
                            text={textTop.style.uppercase ? textTop.value.toUpperCase() : textTop.value}
                            x={0}
                            y={border.width}
                            width={stageSize}
                            align="center"
                            wrap="word"
                            ref={topTextRef} />}

                    {textBottom.enabled &&
                        <Text fontFamily={textBottom.style.fontFamily}
                            fontStyle={textBottom.style.fontStyle}
                            fontSize={textBottom.style.fontSize}
                            fill={textBottom.style.color}
                            text={textBottom.style.uppercase ? textBottom.value.toUpperCase() : textBottom.value}
                            x={0}
                            y={stageSize - border.width - (bottomTextRef.current?.getHeight() || 0)}
                            width={stageSize}
                            align="center"
                            wrap="word"
                            ref={bottomTextRef} />}
                </Layer>

                {crossedOut && <Layer>
                    <Line
                        stroke={crossedOutColor}
                        strokeWidth={crossedOutWidth}
                        points={[0, 0, stageSize, stageSize]}
                        opacity={0.8}
                    />
                    <Line
                        stroke={crossedOutColor}
                        strokeWidth={crossedOutWidth}
                        points={[stageSize, 0, 0, stageSize]}
                        opacity={0.8}
                    />
                </Layer>}
            </Stage>
        </Box>
    )
}

export default Pictogram;