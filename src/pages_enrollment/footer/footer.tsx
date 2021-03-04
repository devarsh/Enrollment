import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { useStyles } from "./style";

export const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footerBackground}>
      <Container>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={4} md={8}>
            <Link href="https://ratnaafin.com/" target="_blank">
              <h3 className={classes.h3Class}>www.ratnaafin.com</h3>
            </Link>
          </Grid>
          <Grid item xs={12} sm={8} md={4} className={classes.followLinks}>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Grid item xs={3} sm={3} md={3} className={classes.textRight}>
                <Link
                  className={classes.followLink + " follow-link"}
                  href="https://www.linkedin.com/company/ratnaafin"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18.563"
                    height="18.563"
                    viewBox="0 0 18.563 18.563"
                  >
                    <path
                      id="Icon_awesome-linkedin-in"
                      data-name="Icon awesome-linkedin-in"
                      d="M4.155,18.563H.307V6.17H4.155ZM2.229,4.479a2.239,2.239,0,1,1,2.229-2.25A2.248,2.248,0,0,1,2.229,4.479Zm16.33,14.084h-3.84V12.53c0-1.438-.029-3.282-2-3.282-2,0-2.308,1.562-2.308,3.178v6.137H6.566V6.17h3.691V7.861h.054a4.044,4.044,0,0,1,3.641-2c3.895,0,4.611,2.565,4.611,5.9v6.808Z"
                      transform="translate(0 0)"
                      fill="#26a456"
                    />
                  </svg>
                </Link>
              </Grid>
              <Grid item xs={3} sm={3} md={3} className={classes.textRight}>
                <Link
                  className={classes.followLink + " follow-link"}
                  href=""
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18.563"
                    height="15.105"
                    viewBox="0 0 18.563 15.105"
                  >
                    <path
                      id="Icon_ionic-logo-twitter"
                      data-name="Icon ionic-logo-twitter"
                      d="M19.976,6.29a7.7,7.7,0,0,1-2.187.6,3.822,3.822,0,0,0,1.676-2.108,7.567,7.567,0,0,1-2.419.924,3.807,3.807,0,0,0-6.589,2.6,3.729,3.729,0,0,0,.1.869A10.793,10.793,0,0,1,2.7,5.2a3.816,3.816,0,0,0,1.184,5.09A3.72,3.72,0,0,1,2.157,9.81v.047a3.812,3.812,0,0,0,3.056,3.737,3.834,3.834,0,0,1-1,.134,3.593,3.593,0,0,1-.716-.071A3.814,3.814,0,0,0,7.054,16.3a7.636,7.636,0,0,1-4.732,1.632,7.719,7.719,0,0,1-.909-.055,10.645,10.645,0,0,0,5.83,1.723A10.771,10.771,0,0,0,18.088,8.756c0-.165,0-.33-.012-.492A7.753,7.753,0,0,0,19.976,6.29Z"
                      transform="translate(-1.413 -4.5)"
                      fill="#26a456"
                    />
                  </svg>
                </Link>
              </Grid>
              <Grid item xs={3} sm={3} md={3} className={classes.textRight}>
                <Link
                  className={classes.followLink + " follow-link"}
                  href="https://www.facebook.com/theratnaafin"
                  target="_blank"
                >
                  <svg
                    //className={classes.svg}
                    xmlns="http://www.w3.org/2000/svg"
                    width="9.942"
                    height="18.563"
                    viewBox="0 0 9.942 18.563"
                  >
                    <path
                      id="Icon_awesome-facebook-f"
                      data-name="Icon awesome-facebook-f"
                      d="M10.9,10.442l.516-3.359H8.192V4.9a1.68,1.68,0,0,1,1.894-1.815h1.465V.227A17.871,17.871,0,0,0,8.95,0C6.3,0,4.56,1.609,4.56,4.522v2.56H1.609v3.359H4.56v8.121H8.192V10.442Z"
                      transform="translate(-1.609)"
                      fill="#26a456"
                    />
                  </svg>
                </Link>
              </Grid>
              <Grid item xs={3} sm={3} md={3} className={classes.textRight}>
                <Link
                  className={classes.followLink + " follow-link"}
                  href="https://www.instagram.com/ratnaafin/"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17.916"
                    height="17.917"
                    viewBox="0 0 17.916 17.917"
                  >
                    <g
                      id="Group_1979"
                      data-name="Group 1979"
                      transform="translate(-1259.297 -6416.06)"
                    >
                      <path
                        id="Path_460"
                        data-name="Path 460"
                        d="M17.191,5.993a3.744,3.744,0,0,1,3.733,3.733v7.465a3.744,3.744,0,0,1-3.733,3.733H9.726a3.744,3.744,0,0,1-3.733-3.733V9.726A3.744,3.744,0,0,1,9.726,5.993h7.465m0-1.493H9.726A5.241,5.241,0,0,0,4.5,9.726v7.465a5.241,5.241,0,0,0,5.226,5.226h7.465a5.241,5.241,0,0,0,5.226-5.226V9.726A5.241,5.241,0,0,0,17.191,4.5Z"
                        transform="translate(1254.797 6411.56)"
                        fill="#26a456"
                      />
                      <path
                        id="Path_461"
                        data-name="Path 461"
                        d="M24.745,11.24a1.12,1.12,0,1,1,1.12-1.12A1.117,1.117,0,0,1,24.745,11.24Z"
                        transform="translate(1248.364 6410.046)"
                        fill="#26a456"
                      />
                      <path
                        id="Path_462"
                        data-name="Path 462"
                        d="M15.729,12.743a2.986,2.986,0,1,1-2.986,2.986,2.989,2.989,0,0,1,2.986-2.986m0-1.493a4.479,4.479,0,1,0,4.479,4.479,4.48,4.48,0,0,0-4.479-4.479Z"
                        transform="translate(1252.526 6409.289)"
                        fill="#26a456"
                      />
                    </g>
                  </svg>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
