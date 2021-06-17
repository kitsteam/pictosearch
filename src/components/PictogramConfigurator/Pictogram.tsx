import { Box } from '@material-ui/core';
import Konva from 'konva';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image, Rect, Line, Group, Text } from 'react-konva';
import useImage from 'use-image';
import { Identifier, IdentifierPosition } from './options/IdentifierOptions';
import { FontStyle } from './options/TextOptions';
import { Tense } from './options/VerbalTenseOptions';

const checkerboard = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center';

const stageSize = 500;
const crossedOutColor = 'red';
const crossedOutWidth = 20;
const pluralWidth = 16;
const iconSize = 55;
const identifierBaseUrl = 'https://static.arasaac.org/images/identifiers';

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
    const url = `${identifierBaseUrl}/${Identifier[identifier]}_${identifierColor.replace(/^#/, '')}.png`;
    const [image] = useImage(url, 'Anonymous');

    return <Image image={image} x={x} y={y} width={iconSize} height={iconSize} />
}

function fitStageIntoParentContainer(ref: RefObject<Konva.Stage>, container: RefObject<HTMLElement>) {
    if (!ref.current || !container.current) {
        return;
    }

    const containerWidth = container.current.offsetWidth;
    const scale = containerWidth / 500;

    ref.current.width(stageSize * scale);
    ref.current.height(stageSize * scale);
    ref.current.scale({ x: scale, y: scale });
}

type Props = {
    stageRef: RefObject<Konva.Stage>,
    url: string,
    borderWidth: number,
    borderColor: string,
    backgroundColor: string,
    crossedOut: boolean,
    plural: boolean,
    pluralColor: string,
    tense: Tense,
    tenseColor: string,
    identifier: Identifier,
    identifierPosition: IdentifierPosition,
    identifierColor: string,
    zoom: number,
    dragAndDrop: boolean,
    textTop?: {
        value: string,
        style: FontStyle,
    },
    textBottom?: {
        value: string,
        style: FontStyle,
    },
}

const Pictogram: React.FC<Props> = (props) => {
    const { stageRef, url, borderWidth, borderColor, backgroundColor, crossedOut, plural,
        pluralColor, tense, tenseColor, identifier, identifierColor, identifierPosition, zoom, dragAndDrop, textTop, textBottom } = props;
    const [image] = useImage(url, 'Anonymous');
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [moved, setMoved] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    const topTextRef = useRef<Konva.Text>(null);
    const bottomTextRef = useRef<Konva.Text>(null);

    useEffect(() => {
        if (!moved) {
            setPosition({
                x: borderWidth,
                y: borderWidth,
            });
        }
    }, [moved, borderWidth]);

    useEffect(() => {
        const cb = () => fitStageIntoParentContainer(stageRef, containerRef);

        cb();

        window.addEventListener('resize', cb);

        return () => {
            window.removeEventListener('resize', cb);
        }
    }, [stageRef]);

    const leftIcon = {
        x: borderWidth,
        y: borderWidth,
    };
    const rightIcon = {
        x: stageSize - borderWidth - iconSize,
        y: borderWidth,
    };

    const bottomLeftIcon = {
        x: borderWidth,
        y: stageSize - borderWidth - iconSize,
    };
    const bottomRightIcon = {
        x: stageSize - borderWidth - iconSize,
        y: stageSize - borderWidth - iconSize,
    };

    const width = (stageSize - 2 * borderWidth);
    const height = stageSize - 2 * borderWidth;

    const onDragEnd = (x: number, y: number) => {
        setMoved(true);
        setPosition({
            x,
            y,
        });
    }

    const topTextHeight = textTop?.value && topTextRef.current ? topTextRef.current.textHeight : 0;
    const bottomTextHeight = textBottom?.value && bottomTextRef.current ? bottomTextRef.current.textHeight : 0;
    const textHeight = topTextHeight + bottomTextHeight;

    return (
        <Box sx={{ background: checkerboard }} ref={containerRef}>
            <Stage width={stageSize} height={stageSize} ref={stageRef}>
                <Layer>
                    <Rect x={0} y={0} width={stageSize} height={stageSize} stroke={borderColor} strokeWidth={borderWidth * 2} fill={backgroundColor} />
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

                    {identifier !== Identifier.none && <Group>
                        <IdentifierIcon
                            identifier={identifier}
                            identifierColor={identifierColor} {...(identifierPosition === IdentifierPosition.left ? leftIcon : rightIcon)} />
                    </Group>}
                </Layer>

                <Layer>
                    {textTop &&
                        <Text fontFamily={textTop.style.fontFamily}
                            fontSize={textTop.style.fontSize}
                            fill={textTop.style.color}
                            text={textTop.style.uppercase ? textTop.value.toUpperCase() : textTop.value}
                            x={0}
                            y={borderWidth}
                            width={stageSize}
                            align="center"
                            wrap="word"
                            ref={topTextRef} />}

                    {textBottom &&
                        <Text fontFamily={textBottom.style.fontFamily}
                            fontSize={textBottom.style.fontSize}
                            fill={textBottom.style.color}
                            text={textBottom.style.uppercase ? textBottom.value.toUpperCase() : textBottom.value}
                            x={0}
                            y={stageSize - borderWidth - (bottomTextRef.current?.getHeight() || 0)}
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