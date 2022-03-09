import { Accordion, AccordionDetails, AccordionSummary, Badge, Box, Button, Divider, IconButton, Link, Paper, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import CopyIcon from '@mui/icons-material/FileCopy';
import BackIcon from '@mui/icons-material/ArrowLeft';
import AddIcon from '@mui/icons-material/AddToPhotos';
import CollectionsIcon from '@mui/icons-material/Collections';
import SaveIcon from '@mui/icons-material/Save';
import RemoveIcon from '@mui/icons-material/Delete';
import SuccessIcon from '@mui/icons-material/Check';
import ClipboardIcon from '@mui/icons-material/ContentPasteGo';
import Konva from 'konva';
import React, { useRef, useState, useReducer, useEffect } from 'react';
import { usePictogram, usePictogramUrl } from '../../hooks/network';
import { useCollection } from '../../hooks/collection';
import BackgroundOptions from './options/BackgroundOptions';
import BorderOptions from './options/BorderOptions';
import ColorizedOptions from './options/ColorizedOptions';
import IdentifierOptions, { } from './options/IdentifierOptions';
import PluralOptions from './options/PluralOptions';
import TextOptions from './options/TextOptions';
import VerbalTenseOptions from './options/VerbalTenseOptions';
import Pictogram from './Pictogram';
import LanguageSelection from '../LanguageSelection';
import CrossOutOptions from './options/CrossOutOptions';
import DragAndDropOptions from './options/DragAndDropOptions';
import ResolutionOptions from './options/ResolutionOptions';
import ZoomOptions from './options/ZoomOptions';
import { useHistory, useParams } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import MetaData from './MetaData'
import { Trans, useTranslation } from 'react-i18next';
import Clipboard from '../../utils/Clipboard';
import { initialPictogramState, PictogramState, pictogramStateReducer, pictogramStateReducerWithLogger, Resolution } from "./state";
import { disableDragAndDrop, enableDragAndDrop, updateInitialState, updateResolution, updateTextBottom, updateTextTop } from "./state/actions";
import * as uuid from 'uuid';
import { dequal } from "dequal/lite";
import { loadPictogram } from "../../hooks/collection";
import ResponsiveIconButton from "../ResponsiveIconButton";

type Props = {

}

const PictogramConfigurator: React.FC<Props> = (props) => {
  const { t, i18n } = useTranslation();
  const { id: paramId, language, version } = useParams<{ id: string, language: string, version?: string }>();
  const history = useHistory();
  const pictogramId = parseInt(paramId, 10);
  const collection = useCollection();

  if (i18n.language !== language) {
    i18n.changeLanguage(language);
  }

  const stageRef = useRef<Konva.Stage>(null);
  const [autocompleteLanguage, setAutocompleteLanguage] = useState(language);
  const [changed, setChanged] = useState(false);
  const [storedState, setStoredState] = useState<PictogramState>();
  const [addedToCollection, setAddedToCollection] = useState(false);

  const pictogram = usePictogram(language, pictogramId);
  const keywords: string[] = !pictogram.data ? [] : pictogram.data.keywords.map(data => data.keyword);

  const [state, dispatch] = useReducer(process.env.NODE_ENV === 'development' ? pictogramStateReducerWithLogger : pictogramStateReducer, initialPictogramState);

  const url = usePictogramUrl(pictogramId, state.options.colorized, state.options.resolution, state.options.skinColor, state.options.hairColor);

  const title = pictogram.data?.keywords ? pictogram.data?.keywords[0]?.keyword : '';

  const [expanded, setExpanded] = useState('panel-0');
  const accordionParams = (panel: string) => ({
    expanded: expanded === panel,
    onChange: (_: any, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : '');
    },
  });

  useEffect(() => {
    if (!version) {
      return;
    }

    const storedState = loadPictogram(paramId, version);

    if (!storedState) {
      history.push(`/pictogram/${language}/${paramId}`);

      return;
    }

    setStoredState(storedState);

    dispatch(updateInitialState(storedState));
  }, [paramId, version, history, language]);

  useEffect(() => {
    if (storedState && !dequal(state, storedState)) {
      setChanged(true);
    }
  }, [state, storedState]);

  const onStoreNewVersion = () => {
    const version = uuid.v4();

    collection.store(paramId, version, state, title);

    history.push(`/pictogram/${language}/${paramId}/${version}`);

    setAddedToCollection(true);

    setTimeout(() => setAddedToCollection(false), 3000);
  }

  const onUpdateVersion = () => {
    if (version) {
      collection.store(paramId, version, state);

      setChanged(false);
    }
  }

  const onDeleteVersion = () => {
    if (version) {
      collection.delete(paramId, version);

      setChanged(false);

      history.push(`/pictogram/${language}/${paramId}`);
    }
  }

  const getDataUrl = () => {
    const pixelRatio = state.options.resolution === Resolution.high
      ? Math.ceil(Resolution.high / Resolution.low)
      : 1

    return stageRef.current?.getStage().toDataURL({ pixelRatio });
  };

  const onDownload = () => {
    const data = getDataUrl();

    if (data) {
      const keywords = pictogram.data?.keywords.map(k => k.keyword) || [];
      const linkElement = document.createElement('a');

      linkElement.href = data;
      linkElement.setAttribute('download', [pictogramId, ...keywords].join('-') + '.png');
      linkElement.click();
    }
  };

  const onCopyTopClipboard = () => {
    const data = getDataUrl();

    data && Clipboard.copyImage(data);
  };

  const onCopyLicenseToClipboard = () => {
    Clipboard.copyText(t('config.clipboardLicense'));
  }

  return (
    <Box>
      <Stack direction="row" mb={3}>
        <Button component={RouterLink} to="/search" variant="outlined" size="small" startIcon={<BackIcon />}>{t('back')}</Button>
        <Box flexGrow={1}></Box>
        <Badge badgeContent={collection.size} color="primary">
          <Button component={RouterLink} to="/collection" variant="outlined" size="small" startIcon={<CollectionsIcon />} disabled={collection.size === 0}>{t('Collection')}</Button>
        </Badge>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}
        spacing={4}>
        <Box sx={{ maxWidth: 500 }}>
          <Paper>
            {title && <Box padding={1}><Typography variant="h5" align="center">{title}</Typography></Box>}

            <Pictogram {...{ url: url.href, stageRef, dispatch, ...state.customizations }} />

            <Stack spacing={1} direction="row" padding={2}>
              <ResponsiveIconButton variant="contained" disabled={!stageRef.current} onClick={() => onDownload()} color="primary" startIcon={<DownloadIcon />}>{t('download')}</ResponsiveIconButton>
              {Clipboard.hasSupport() && <ResponsiveIconButton variant="contained" disabled={!stageRef.current} onClick={onCopyTopClipboard} startIcon={<CopyIcon />} color="secondary">{t('copy')}</ResponsiveIconButton>}
              <Box flexGrow={1}></Box>

              <IconButton onClick={onStoreNewVersion}>
                {addedToCollection ? <SuccessIcon /> : <Badge color="primary" badgeContent={collection.count(pictogramId)}><AddIcon /></Badge>}
              </IconButton>

              {version && <>
                <IconButton disabled={!changed} onClick={onUpdateVersion}><SaveIcon /></IconButton>
                <IconButton onClick={onDeleteVersion}><RemoveIcon /></IconButton>
              </>}
            </Stack>
          </Paper>

          <Typography m={2} variant="body2" sx={{ opacity: 0.6 }}>
            {Clipboard.hasSupport() && <IconButton sx={{ marginLeft: -1 }} size="small" onClick={onCopyLicenseToClipboard}><ClipboardIcon /></IconButton>}

            <Trans i18nKey="config.license">Sergio Palao (Urheber), ARASAAC (<Link href="http://www.arasaac.org">arasaac.org</Link>),
              Regierung von Aragón in Spanien (Eigentümer), <Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en">CC BY-SA-NC 4.0</Link>.
            </Trans>
          </Typography>

          {pictogram.data && <Box sx={{ display: { xs: 'none', md: 'block' } }}><MetaData data={pictogram.data} /></Box>}
        </Box>
        <Box flexGrow={1}>
          <Accordion {...accordionParams('panel-0')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{t('config.design')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2} divider={<Divider flexItem />}>
                <ColorizedOptions {...{
                  colorized: state.options.colorized,
                  skin: !!pictogram.data?.skin,
                  skinColor: state.options.skinColor,
                  hairColor: state.options.hairColor,
                  hair: !!pictogram.data?.hair,
                  dispatch,
                }} />

                <BackgroundOptions {...{
                  backgroundColor: state.customizations.backgroundColor,
                  dispatch,
                }} />

                <BorderOptions {...{
                  borderColor: state.customizations.border.color,
                  borderWidth: state.customizations.border.width,
                  dispatch
                }} />
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion {...accordionParams('panel-1')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{t('config.addition')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2} divider={<Divider flexItem />}>
                <CrossOutOptions {...{ crossedOut: state.customizations.crossedOut, dispatch }} />

                <PluralOptions {...{ plural: state.customizations.plural, pluralColor: state.customizations.pluralColor, dispatch }} />

                <VerbalTenseOptions {...{ tense: state.customizations.tense, tenseColor: state.customizations.tenseColor, dispatch }} />

                {false && <IdentifierOptions {...{
                  identifier: state.customizations.identifier.type,
                  identifierPosition: state.customizations.identifier.position,
                  identifierColor: state.customizations.identifier.color,
                  dispatch
                }} />}
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion {...accordionParams('panel-2')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{t('config.textOptions')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2} divider={<Divider flexItem />}>
                <LanguageSelection selected={autocompleteLanguage} onChange={setAutocompleteLanguage} />

                <TextOptions label={t('config.textTop')} {...{ keywords }} state={state.customizations.text.top} onChange={state => dispatch(updateTextTop(state))} />

                <TextOptions label={t('config.textBottom')} {...{ keywords }} state={state.customizations.text.bottom} onChange={state => dispatch(updateTextBottom(state))} />
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion {...accordionParams('panel-3')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{t('config.additionalOptions')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2} divider={<Divider flexItem />}>
                <ZoomOptions {...{ zoom: state.customizations.zoom, dispatch }} />

                <DragAndDropOptions {...{
                  dragAndDrop: state.customizations.dragAndDrop,
                  setDragAndDrop: (enabled) => dispatch(enabled ? enableDragAndDrop() : disableDragAndDrop()),
                }} />

                <ResolutionOptions enabled={state.options.resolution === Resolution.high} onChange={enabled => dispatch(updateResolution(enabled ? Resolution.high : Resolution.low))} />
              </Stack>
            </AccordionDetails>
          </Accordion>

          {pictogram.data && <Box sx={{ display: { xs: 'block', md: 'none' } }} mt={3}><MetaData data={pictogram.data} /></Box>}
        </Box>
      </Stack>
    </Box>
  );
}

export default PictogramConfigurator;
