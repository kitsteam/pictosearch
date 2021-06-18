import { Autocomplete, Box, Button, CircularProgress, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import LanguageSelection from '../LanguageSelection';
import PictogramGallery from '../PictogramGallery';
import { useKeywords, useNewPictograms, useSearch } from '../../hooks/network';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory, useLocation } from 'react-router-dom';
import logoArasaac from './logo_ARASAAC.png';
import { Trans, useTranslation } from 'react-i18next';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

type Props = {

}

const PictogramSearch: React.FC<Props> = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language.split('-')[0]);
  const keywords = useKeywords(language);
  const newPictograms = useNewPictograms(language);

  const history = useHistory();
  const queryParams = useQuery();

  const query = queryParams.get('q') || '';

  const [value, setValue] = useState(query);
  const result = useSearch(language, query);

  const searchFor = useCallback((q: string) => {
    history.push({
      pathname: '/',
      search: q ? '?' + new URLSearchParams({ q }).toString() : undefined,
    });
  }, [history]);

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

    searchFor(value);
  }, [value, searchFor]);

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <LanguageSelection selected={language} onChange={setLanguage} />
      </Box>
      <Paper sx={{ marginTop: 3, marginBottom: 3, padding: 3 }}>
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
              <Button disabled={!value || isLoading} variant="contained" type="submit" startIcon={isLoading ? <CircularProgress size="1em" color="inherit" /> : <SearchIcon />}>{t('search.action')}</Button>
            </Grid>
          </Grid>
        </form>

        <Box>
          {isLoading ?
            <Typography variant="body1"><CircularProgress size="1em" color="inherit" /> {t('search.loading', { query })}</Typography>
            : (
              <>
                {result.data && <Typography variant="body1">{t('search.result', { count: result.data.length, query })}</Typography>}
                {!result.data && newPictograms.data && <Typography variant="body1">{t('search.displayNew', { number: newPictograms.data.length })}</Typography>}
              </>
            )}
        </Box>
      </Paper>

      {items && <PictogramGallery items={items} language={language} />}

      <Box m={2}>
        <Link href="http://www.arasaac.org">
          <img src={logoArasaac} alt="Logo ARASSAC" />
        </Link>
        <Typography variant="body2" sx={{ opacity: 0.6 }}>&copy;{' '}
          <Trans i18nKey="search.license">
            Die angezeigten piktographischen Symbole sind Eigentum der
            Regierung von Aragón und wurden von Sergio Palao für <Link href="http://www.arasaac.org">ARASAAC</Link> erstellt,
            das sie unter der <Link href="https://creativecommons.org/licenses/by-nc-sa/3.0/de/">Creative-Commons-Lizenz BY-NC-SA</Link> weitergibt.
          </Trans>
        </Typography>
      </Box>
    </>
  )
}

export default PictogramSearch;