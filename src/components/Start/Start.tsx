import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import React from 'react';
import Button from '@mui/material/Button';

const Start: React.FC = () => {
  return (
    <div>
      <Grid container spacing={0} direction="row" alignItems="center">
        <Box
          component={Grid}
          item
          md={6}
          display={{ xs: "none", md: "flex" }}
          className="kits-content-left gradient"
        >
          <img src="/assets/pictosearch-logo-white.svg" alt="Pictosearch Logo" />
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
        >
          <div className="header">
            <a href="https://kits.blog/tools/"
                      ><img src="/assets/kits-logo.svg"  alt="Kits Logo"
                    /></a>
          </div>
          <div className="container">

            <a href="/"><h1 className="fw-bold">Pictosearch</h1></a>

            <ul className="list-border kits-list">
              <li>Erstelle Mindmaps gemeinsam mit anderen!</li>
              <li>Gestalte deine Mindmap mit Farben!</li>
              <li>Ergänze Bilder!</li>
            </ul>
            <br />

            <a href="/#/search">
              <Button variant="contained" className="kits-primary-button">Loslegen</Button>
            </a>
            <div className="mt-10">
              <small className="muted">
                Dieses Tool darf nur in Bildungskontexten genutzt werden. Die Eingabe personenbezogener Daten ist nicht gestattet.
              </small>
            </div>
          </div>
        </Box>
        <Box
          component={Grid}
          item
          xs={12}
          display={{ xs: "flex", md: "none" }}
          className="kits-mobile-footer-wrapper"
        >
          <div className="gradient kits-footer-container">
            <div className="kits-footer-logo">
              <img src="/assets/pictosearch-logo-white.svg" alt="Pictosearch Logo" />
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
      </Grid>
    </div>
    )
}

export default Start;