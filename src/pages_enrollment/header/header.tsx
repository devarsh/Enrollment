import { Fragment, useState } from "react";
import "assets/css/bootstrap.min.css";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Hidden from "@material-ui/core/Hidden";
import { useNavigate } from "react-router-dom";
import CallIcon from "@material-ui/icons/Call";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { BootstrapNav, SideBarNav } from "components/navigation";
import Logo from "assets/images/logo.svg";
import { siteNav } from "./metaData";
import { useStyles } from "./style";

export const Header = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Hidden smDown={true}>
        <FullScreenNav classes={classes} />
      </Hidden>
      <Hidden mdUp={true}>
        <MobileNav classes={classes} />
      </Hidden>
    </Fragment>
  );
};

export const MobileNav = ({ classes }) => {
  const [drawerOpen, setDrawerState] = useState(false);

  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar}></AppBar>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => setDrawerState((old) => !old)}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <a href="/">
          <img src={Logo} alt="Ratnaafin" className={classes.logo} />
        </a>
      </Toolbar>
      {drawerOpen ? (
        <SideBarNav
          metaData={siteNav}
          handleDrawerOpen={() => true}
          drawerOpen={true}
        />
      ) : null}
    </Fragment>
  );
};

export const FullScreenNav = ({ classes }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((open) => !open);
  return (
    <header>
      <Container fluid={true}>
        <Navbar
          color="light"
          light
          expand="lg"
          fixed="top"
          className={classes.navBarCSS}
        >
          <NavbarToggler onClick={toggle} />
          <Collapse navbar isOpen={open}>
            <Container className="header-navbar-container" fluid={true}>
              <div className="py-1 BrandLogo">
                <NavbarBrand
                  className="mr-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("./");
                  }}
                >
                  <img src={Logo} alt="Ratnaafin" />
                </NavbarBrand>
              </div>
              <div className="navigation-links">
                <Nav className="mr-0 nav-one" navbar>
                  <NavItem>
                    <NavLink
                      className={classes.font13}
                      href="tel:+919016130471"
                    >
                      <CallIcon />
                      +91 90161 30471
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classes.font13}
                      href="https://ratnaafin.com/company-profile/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Company Profile
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="ml-auto nav-two" navbar>
                  <BootstrapNav metaData={siteNav} />
                </Nav>
              </div>
            </Container>
          </Collapse>
        </Navbar>
      </Container>
    </header>
  );
};
