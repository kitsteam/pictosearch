import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Start: React.FC = () => {
  const [windowInnerHeight, setWindowInnerHeight] = React.useState(window.innerHeight);
  const history = useHistory();
  const { t } = useTranslation();

  const handleResize = () => {
    setWindowInnerHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  const [value, setValue] = useState('');

  const onSubmit = useCallback((ev: React.FormEvent) => {
    ev.preventDefault();

    const query = value ? '?' + new URLSearchParams({ q: value }).toString() : undefined
    value ? history.push({ pathname: '/search', search: query }) : history.push({ search: query });
  }, [value, history]);

  return (
    <div>
      <Grid container spacing={0} direction="row" alignItems="center">
        <Box
          component={Grid}
          item
          md={6}
          display={{ xs: "none", md: "flex" }}
          className="kits-content-left gradient"
          style={{height: `${windowInnerHeight}px`}}
        >
          <img src="/assets/pictosearch-logo-white.svg" alt="PictoSearch Logo" />
          <div className="kits-footer-wrapper-left">
            <div className="kits-footer-text kits-footer-text-left">

              <a className="padding-8 font-white" href="https://github.com/kitsteam/pictosearch"
                >GitHub</a
              >
              <a className="padding-8 font-white" href="https://kits.blog/impressum/">Impressum</a>
              <a className="padding-8 font-white" href="https://kits.blog/datenschutzerklaerung/"
                >Datenschutz</a
              >
            </div>
          </div>
         
        </Box>
        <Box
          component={Grid}
          item
          xs={12}
          md={6}
          className="kits-content-right"
          style={{height: `${windowInnerHeight}px`}}
        >
          <div className="header">
            <a href="https://kits.blog/tools/"
                      ><img src="/assets/kits-logo.svg"  alt="Kits Logo"
                    /></a>
          </div>
          <div className="container">

            <a href="/"><h1 className="fw-bold">PictoSearch</h1></a>

            <ul className="list-border kits-list">
              <li>Nutze über 10.000 Piktogramme!</li>
              <li>Passe deine Piktogramme an!</li>
              <li>Erstelle deine eigene Sammlung!</li>
            </ul>
            
            <form onSubmit={onSubmit}>
              <Grid container alignItems="center" spacing={1} mb={3}>
                <Grid item flexGrow={1}>
                  <Autocomplete
                    size="small"
                    freeSolo
                    value={value}
                    options={[]}
                    onChange={(ev, newValue) => { setValue(newValue || '')}}
                    onInputChange={(ev, newValue) => setValue(newValue)}
                    noOptionsText=""
                    renderInput={(params) => <TextField
                      {...params}
                      label={t('search.term')} />}
                  />
                </Grid>
                <Grid item>
                    <Button
                      variant="contained"
                      className="kits-primary-button"
                      type="submit"
                      startIcon={<SearchIcon />}>
                      {t('search.action')}
                    </Button>
                </Grid>
              </Grid>
          </form>


            <div className="mt-10">
              <small className="muted">
                Dieses Tool darf nur in Bildungskontexten genutzt werden. Eine Lizenzangabe ist bei Nutzung der Piktogramme zwingend erforderlich.
              </small>
            </div>
          </div>
        </Box>
      </Grid>
      <Box
          component={Grid}
          item
          xs={12}
          display={{ xs: "flex", md: "none" }}
          className="kits-mobile-footer-wrapper"
        >
          <div className="gradient kits-footer-container">
            <div className="kits-footer-logo">
              <img src="/assets/pictosearch-logo-white.svg" alt="PictoSearch Logo" />
            </div>
            <div className="kits-footer-text kits-footer-text-right">
              <a className="padding-8 font-white" href="https://github.com/kitsteam/pictosearch"
                >GitHub</a
              >
              <a className="padding-8 font-white" href="https://kits.blog/impressum/">Impressum</a>
              <a className="padding-8 font-white" href="https://kits.blog/datenschutzerklaerung/"
                >Datenschutz</a
              >
            </div>
          </div>
        </Box>
    </div>
    )
}

export default Start;