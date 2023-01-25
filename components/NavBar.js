/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Avatar, Button as MuiButton, Grid, ListItemText, Menu, MenuItem,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SellIcon from '@mui/icons-material/Sell';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import { useAuth } from '../utils/context/authContext';
import logo from '../public/bangazon logo nav.png';
import { signOut } from '../utils/auth';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const { user } = useAuth();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: '#000000' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div className="bangazonNavLogo">
            <Image src={logo} />
          </div>
          <Grid container justifyContent="flex-end">
            <div className="topNavIcons">
              <Link passHref href="/">
                <ShoppingCartIcon fontSize="large" className="addIcon" style={{ color: 'white' }} />
              </Link>
              <MuiButton
                id="demo-positioned-button"
                aria-controls={openMenu ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
                onClick={handleClick}
              >
                <Avatar alt={user.displayName} src={user.image} />
              </MuiButton>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <MuiButton onClick={signOut}><LogoutIcon /> Sign Out</MuiButton>
                  <Link passHref href="/"><MuiButton><AccountCircleIcon />Profile</MuiButton></Link>
                  <Link passHref href="/"><MuiButton><StoreIcon />My Orders</MuiButton></Link>
                </MenuItem>
              </Menu>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open} PaperProps={{ sx: { backgroundColor: '#000000', color: 'grey' } }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: 'white' }} /> : <ChevronLeftIcon style={{ color: 'white' }} />}
          </IconButton>
        </DrawerHeader>

        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Link passHref href="/">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HomeIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }} style={{ color: 'white' }}>Home</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>

          <hr style={{ color: 'white' }} />

          <ListItem disablePadding sx={{ display: 'block' }}>
            <Link passHref href="/">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <CategoryIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }}>Product Categories</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>

          <hr style={{ color: 'white' }} />

          <ListItem disablePadding sx={{ display: 'block' }}>
            <Link passHref href="/">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <SellIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }}>List A Product</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>

        <List>
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            style={{ marginTop: '500px' }}
          >
            <Link passHref href="/">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={signOut}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LogoutIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }}>Sign Out</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>

      </Drawer>
    </Box>
  );
}
