import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";

import BeerIcon from "@mui/icons-material/SportsBar";
import MenuIcon from "@mui/icons-material/Menu";

import { logout } from "./modules/authManager";

function ResponsiveAppBar({ isLoggedIn, userProfile }) {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // make sure that on login change, the menus are both CLOSED
  useEffect(() => {
    setAnchorElNav(null);
    setAnchorElUser(null);
  }, [isLoggedIn]);

  const NavLinkButton = ({ text, href }) => {
    return (
      <Button
        onClick={handleCloseNavMenu}
        sx={{ my: 2, color: "white", display: "block" }}
        href={href}
      >
        {text}
      </Button>
    );
  };

  function HamburgerMenuLink({ text, href }) {
    return (
      <MenuItem component={"a"} href={href} onClick={handleCloseNavMenu}>
        <Typography textAlign="center">{text}</Typography>
      </MenuItem>
    );
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BeerIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BeerTier
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {isLoggedIn && (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <HamburgerMenuLink text="Beers" href="/beer" />
                  <HamburgerMenuLink text="My Beers" href="/beer/me" />
                  <HamburgerMenuLink text="New Beer" href="/beer/new" />
                </Menu>
              </>
            )}
          </Box>
          <BeerIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BeerTier
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isLoggedIn && (
              <>
                <NavLinkButton text="Beers" href="/beer" />
                <NavLinkButton text="My Beers" href="/beer/me" />
                <NavLinkButton text="New Beer" href="/beer/new" />
              </>
            )}
          </Box>

          {userProfile ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="User options">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userProfile.displayName}
                    src={userProfile.imageLocation}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
