import React from 'react'
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

import PersonIcon from '@mui/icons-material/Person';
import FactCheckIcon from '@mui/icons-material/FactCheck';



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

const darkTheme = createTheme({
  palette: {
    // palette values for dark mode
    primary: { main: '#030637' },
    divider: { main: '#030637' },
    background: {
      default: "#fff",
      paper: "#030637",
    },
    text: {
      primary: { main: '#000' },
      secondary: { main: '#000' },
    },
  }
});


const Dashboard = () => {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId')
  const logoutFromAccount = () => {
    localStorage.clear()
    navigate('/')
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (
    <Box sx={{ display: 'flex' }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
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
            <Typography sx={{ typography: { sm: 'h6', md: 'h5', xl: 'h4' } }} className='hidden sm:block'>
              Placement Portal
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{ marginLeft: "auto" }}>
              <img src='/static/image/logo.png' alt='ddu-logo' />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose} sx={{ color: '#fff' }}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem key={'Dashboard'} disablePadding sx={{ display: 'block' }} >
              <ListItemButton href='/student/'
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
                    color: '#fff'
                  }}
                >
                  <Tooltip title="Dashboard" placement='right-start'>
                    <DashboardIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={'Dashboard'} sx={{ opacity: open ? 1 : 0, color: '#fff' }} />
              </ListItemButton>
            </ListItem>



            <ListItem key={'Active Drives'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton href='/student/drives'
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
                    color: '#fff'
                  }}
                >

                  <Tooltip title="Current Drives" placement='right-start'>
                    <WorkIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={'Active Drives'} sx={{ opacity: open ? 1 : 0, color: '#fff' }} />
              </ListItemButton>
            </ListItem>


            <ListItem key={'Profile'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton href={`/student/profile/${studentId}`}
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
                    color: '#fff'
                  }}
                >
                  <Tooltip title="Your Profile" placement='right-start'>
                    <PersonIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={'Student Profile'} sx={{ opacity: open ? 1 : 0, color: '#fff' }} />
              </ListItemButton>
            </ListItem>

            <ListItem key={'Application Request'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton href='/student/request'
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
                    color: '#fff'
                  }}
                >
                  <Tooltip title="Your Applications" placement='right-start'>
                    <FactCheckIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={'Your Application'} sx={{ opacity: open ? 1 : 0, color: '#fff' }} />
              </ListItemButton>
            </ListItem>

            <ListItem key={'Logout'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={logoutFromAccount}
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
                    color: '#fff'
                  }}
                >
                  <Tooltip title="Logout" placement='right-start'>
                    <LogoutIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0, color: '#fff' }} />
              </ListItemButton>
            </ListItem>
          </List>

        </Drawer>
      </ThemeProvider>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
      <ToastContainer />
    </Box>
  )
}

export default Dashboard