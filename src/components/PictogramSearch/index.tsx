import { Autocomplete, Badge, Box, Button, CircularProgress, GridLegacy as Grid, IconButton, TextField, Theme, Typography, useMediaQuery } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import LanguageSelection from '../LanguageSelection';
import PictogramGallery from '../PictogramGallery';
import { useKeywords, useNewPictograms, useSearch } from '../../hooks/network';
import SearchIcon from '@mui/icons-material/Search';
import CollectionsIcon from '@mui/icons-material/Collections';
import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from 'react-i18next';
import { useCollection } from "../../hooks/collection";
import { useQuery } from "../../hooks/location";

const PictogramSearch: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language.split('-')[0]);
  const keywords = useKeywords(language);
  const newPictograms = useNewPictograms(language);
  const collection = useCollection();
  const navigate = useNavigate();

  const queryParams = useQuery();
  const largeScreen = useMediaQuery<Theme>(theme => theme.breakpoints.up('sm'));

  const query = queryParams.get('q') || '';

  const [value, setValue] = useState(query);
  const result = useSearch(language, query);

  const searchFor = useCallback((q: string) => {
    navigate({
      search: q ? '?' + new URLSearchParams({ q }).toString() : undefined,
    });
  }, [navigate]);

  const pictograms = query ? result.data : newPictograms.data;
  const items = pictograms ?
    pictograms.map((item: any) => ({
      id: item._id,
      title: typeof item.keywords[0] === 'string' || !item.keywords[0] ? item.keywords[0] : item.keywords[0].keyword
    })) : undefined;

  const autosuggestOptions = value ? keywords.data.filter(keyword => keyword.toLowerCase().startsWith(value.toLowerCase())) : [];

  const isLoading = !!query && result.isLoading && !result.error;

  const onSubmit = useCallback((ev: React.FormEvent) => {
    ev.preventDefault();

    searchFor(value.trim());
  }, [value, searchFor]);

  return (
    <>
      <Box display="flex" mb={3}>
        <LanguageSelection selected={language} onChange={setLanguage} />
        <Box flexGrow={1}></Box>
        <Badge badgeContent={collection.size} color="primary">
          <Button component={RouterLink} to="/collection" variant="outlined" size="small" startIcon={<CollectionsIcon />} disabled={collection.size === 0}>{t('Collection')}</Button>
        </Badge>
      </Box>
      <>
        <form onSubmit={onSubmit}>
          <Grid container alignItems="center" spacing={1} mb={3}>
            <Grid item flexGrow={1}>
              <Autocomplete
                size="small"
                freeSolo
                value={value}
                onChange={(ev, newValue) => { setValue(newValue || ''); searchFor(newValue || ''); }}
                onInputChange={(ev, newValue) => setValue(newValue)}
                options={autosuggestOptions}
                disablePortal={autosuggestOptions.length === 0}
                noOptionsText=""
                renderInput={(params) => <TextField
                  {...params}
                  label={t('search.term')} />}
              />
            </Grid>
            <Grid item>
              {largeScreen ?
                <Button
                  disabled={!value || isLoading}
                  variant="contained"
                  type="submit"
                  startIcon={isLoading ? <CircularProgress size="1em" color="inherit" /> : <SearchIcon />}>
                  {t('search.action')}
                </Button>
                :
                <IconButton
                  disabled={!value || isLoading}
                  type="submit">
                  {isLoading ? <CircularProgress size="1em" color="inherit" /> : <SearchIcon />}
                </IconButton>
              }
            </Grid>
          </Grid>
        </form>

        <Typography variant="body2" sx={{ opacity: 0.6 }}>
          <Trans i18nKey="search.license">
            Sergio Palao (Urheber), ARASAAC (<Link to="http://www.arasaac.org">arasaac.org</Link>),
            Regierung von Aragón in Spanien (Eigentümer), <Link to="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en">CC BY-SA-NC 4.0</Link>
          </Trans>
        </Typography>
        <br />

        <Box>
          {isLoading ?
            <Typography variant="body1"><CircularProgress size="1em" color="inherit" /> {t('search.loading', { query })}</Typography>
            : (
              <>
                {result.data && <Typography variant="body1">{t('search.result_plural', { count: result.data.length, query })}</Typography>}
                {!result.data && newPictograms.data && <Typography variant="body1">{t('search.displayNew', { number: newPictograms.data.length })}</Typography>}
              </>
            )}
        </Box>
      </>

      {items && <PictogramGallery {...{ items, language, collection }} />}
    </>
  )
}

export default PictogramSearch;
