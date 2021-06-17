import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Link, Paper, Stack, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import CopyIcon from '@material-ui/icons/FileCopy';
import BackIcon from '@material-ui/icons/ArrowLeft';
import Konva from 'konva';
import React, { useRef, useState, useReducer, Reducer } from 'react';
import { usePictogram } from '../../hooks/network';
import BackgroundOptions from './options/BackgroundOptions';
import BorderOptions from './options/BorderOptions';
import ColorizedOptions from './options/ColorizedOptions';
import IdentifierOptions, { Identifier, IdentifierPosition } from './options/IdentifierOptions';
import PluralOptions from './options/PluralOptions';
import TextOptions, { fontFamilies } from './options/TextOptions';
import VerbalTenseOptions, { Tense } from './options/VerbalTenseOptions';
import Pictogram from './Pictogram';
import LanguageSelection from '../LanguageSelection';
import CrossOutOptions from './options/CrossOutOptions';
import DragAndDropOptions from './options/DragAndDropOptions';
import ResolutionOptions from './options/ResolutionOptions';
import ZoomOptions from './options/ZoomOptions';
import { useParams } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { SkinColor, HairColor, backgroundColors, borderColors, pluralColors, tenseColors, identifierColors } from '../../data/colors';


declare const ClipboardItem: any;

enum Resolution {
  low = 500,
  high = 2500,
}

const initialTextState = {
  enabled: false,
  value: '',
  style: {
    uppercase: false,
    color: '#000000',
    fontSize: 46,
    fontFamily: fontFamilies[0],
  },
};

type Props = {

}

type IAction = { type: string, value?: any };
type IState = typeof initialTextState;

const PictogramConfigurator: React.FC<Props> = (props) => {
  const { id: paramId, language } = useParams<{ id: string, language: string }>();
  const pictogramId = parseInt(paramId, 10);

  const stageRef = useRef<Konva.Stage>(null);
  const [autocompleteLanguage, setAutocompleteLanguage] = useState(language);

  const pictogram = usePictogram(language, pictogramId);
  const keywords: string[] = !pictogram.data ? [] : pictogram.data.keywords.map(data => data.keyword);

  const [colorized, setColorized] = useState(true);
  const [skinColor, setSkinColor] = useState(SkinColor.white);
  const [hairColor, setHairColor] = useState(HairColor.brown);

  const colorizedOptions = {
    colorized,
    skin: !!pictogram.data?.skin,
    skinColor,
    hairColor,
    hair: !!pictogram.data?.hair,
    setColorized,
    setSkinColor,
    setHairColor,
  };

  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);

  const backgroundParams = {
    backgroundColor,
    setBackgroundColor,
  };

  const [borderWidth, setBorderWidth] = useState(0);
  const [borderColor, setBorderColor] = useState(borderColors[0]);

  const borderParams = {
    borderColor,
    borderWidth,
    setBorderWidth,
    setBorderColor,
  };

  const [crossedOut, setCrossedOut] = useState(false);
  const [resolution, setResolution] = useState(Resolution.low);

  const [plural, setPlural] = useState(false);
  const [pluralColor, setPluralColor] = useState(pluralColors[0]);

  const pluralParams = { plural, setPlural, pluralColor, setPluralColor };

  const [tense, setTense] = useState(Tense.present);
  const [tenseColor, setTenseColor] = useState(tenseColors[0]);

  const tenseParams = { tense, setTense, tenseColor, setTenseColor };

  const [identifier, setIdentifier] = useState(Identifier.none);
  const [identifierPosition, setIdentifierPosition] = useState(IdentifierPosition.right);
  const [identifierColor, setIdentifierColor] = useState(identifierColors[0]);

  const identifierParams = { identifier, setIdentifier, identifierPosition, setIdentifierPosition, identifierColor, setIdentifierColor };

  const reducer = (state: IState, { type, value }: IAction): IState => {
    if (type === 'reset') {
      return initialTextState;
    }

    return { ...state, [type]: value };
  };
  const [textTop, dispatchTextTop] = useReducer<Reducer<IState, IAction>>(reducer, initialTextState);
  const [textBottom, dispatchTextBottom] = useReducer<Reducer<IState, IAction>>(reducer, initialTextState);

  const [zoom, setZoom] = useState(0);
  const [dragAndDrop, setDragAndDrop] = useState(false);

  const url = new URL(`https://api.arasaac.org/api/pictograms/${pictogramId}`);
  url.searchParams.append('download', 'false');
  url.searchParams.append('color', colorized.toString());
  url.searchParams.append('resolution', resolution.toString());
  url.searchParams.append('skin', SkinColor[skinColor]);
  url.searchParams.append('hair', HairColor[hairColor]);

  const title = pictogram.data?.keywords ? pictogram.data?.keywords[0]?.keyword : '';
  const pictogramParams = {
    stageRef,
    url: url.href,
    borderColor,
    borderWidth,
    backgroundColor,
    crossedOut,
    plural, pluralColor, tense, tenseColor, identifier, identifierColor, identifierPosition, zoom, dragAndDrop,
    textTop: textTop.enabled ? { value: textTop.value, style: textTop.style } : undefined,
    textBottom: textBottom.enabled ? { value: textBottom.value, style: textBottom.style } : undefined,
  }

  const [expanded, setExpanded] = useState('panel-0');
  const accordionParams = (panel: string) => ({
    expanded: expanded === panel,
    onChange: (_: any, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : '');
    },
  });

  const getDataUrl = () => {
    const pixelRatio = resolution === Resolution.high
      ? Math.ceil(Resolution.high / Resolution.low)
      : 1

    return stageRef.current?.getStage().toDataURL({ pixelRatio });
  }

  const onDownload = () => {
    const data = getDataUrl();

    if (data) {
      const keywords = pictogram.data?.keywords.map(k => k.keyword) || [];
      const linkElement = document.createElement('a');

      linkElement.href = data;
      linkElement.setAttribute('download', [pictogramId, ...keywords].join('-') + '.png');
      linkElement.click();
    }
  }

  const onCopyTopClipboard = () => {
    const data = getDataUrl();

    data && fetch(data).then((response) => response.blob()).then((blob) => {
      (navigator.clipboard as any).write([new ClipboardItem({
        'image/png': blob,
      })])
    });
  }

  const canCopyToClipboard = !!ClipboardItem;

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', padding: { sm: 0, md: 3 }, }}>
      <Box mb={3}>
        <Button component={RouterLink} to="/" variant="outlined" size="small" startIcon={<BackIcon />}>Zurück</Button>
      </Box>
      <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}
        spacing={4}>
        <Box sx={{ maxWidth: 500 }}>
          <Paper>
            {title && <Box padding={1}><Typography variant="h5" align="center">{title}</Typography></Box>}

            <Pictogram {...pictogramParams} />

            <Stack spacing={1} direction="row" padding={2}>
              <Button variant="contained" disabled={!stageRef.current} onClick={() => onDownload()} startIcon={<DownloadIcon />}>Herunterladen</Button>
              {canCopyToClipboard && <Button variant="contained" disabled={!stageRef.current} onClick={() => onCopyTopClipboard()} startIcon={<CopyIcon />} color="secondary">Kopieren</Button>}
            </Stack>
          </Paper>

          <Typography m={2} variant="body2" sx={{ opacity: 0.6 }}>&copy; Das abgebildete piktographische Symbol ist Eigentum der
            Regierung von Aragón und wurden von Sergio Palao für <Link href="http://www.arasaac.org">ARASAAC</Link> erstellt,
            das sie unter der <Link href="https://creativecommons.org/licenses/by-nc-sa/3.0/de/">Creative-Commons-Lizenz BY-NC-SA</Link> weitergibt.</Typography>
        </Box>
        <Box flexGrow={1}>
          <Accordion {...accordionParams('panel-0')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Design</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2} divider={<Divider flexItem />}>
                <ColorizedOptions {...colorizedOptions} />

                <BackgroundOptions {...backgroundParams} />

                <BorderOptions {...borderParams} />
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion {...accordionParams('panel-1')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Zusatz</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2} divider={<Divider flexItem />}>
                <CrossOutOptions {...{ crossedOut, setCrossedOut }} />

                <PluralOptions {...pluralParams} />

                <VerbalTenseOptions {...tenseParams} />

                {false && <IdentifierOptions {...identifierParams} />}
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion {...accordionParams('panel-2')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Textoptionen</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2} divider={<Divider flexItem />}>
                <LanguageSelection selected={autocompleteLanguage} onChange={setAutocompleteLanguage} />

                <TextOptions label="Text oben" data={{ ...textTop, keywords }} dispatch={dispatchTextTop} />

                <TextOptions label="Text unten" data={{ ...textBottom, keywords }} dispatch={dispatchTextBottom} />
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion {...accordionParams('panel-3')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Erweiterte Optionen</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2} divider={<Divider flexItem />}>
                <ZoomOptions {...{ zoom, setZoom }} />

                <DragAndDropOptions {...{ dragAndDrop, setDragAndDrop }} />

                <ResolutionOptions enabled={resolution === Resolution.high} onChange={enabled => setResolution(enabled ? Resolution.high : Resolution.low)} />
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Stack>
    </Box>
  );
}

export default PictogramConfigurator;