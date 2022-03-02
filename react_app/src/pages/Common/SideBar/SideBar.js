import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { styled, useTheme } from '@mui/material/styles';
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
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ConstructionIcon from '@mui/icons-material/Construction';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import SideBarList from './SideBarList';
import { Stack } from '@mui/material';
import { logout } from '../../Account/Login/LoginActions'

const openedMixin = (theme, width) => ({
  width: width,
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
    width: `calc(${theme.spacing(9)} + 1px)`,
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
})(({ theme, open, width }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: width,
    width: `calc(100% - ${width}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, width }) => ({
    width: width,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme, width),
      '& .MuiDrawer-paper': openedMixin(theme, width),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const BorderedAvatar = styled(Avatar)`
    border: 3px solid ${(props) =>{
      switch(props.permissions)
      {
          case 1: 
            return '#2196f3' //blue
          case 2: 
            return '#f48fb1' //pink
          case 3: 
            return '#00bcd4' //cyan
          default: 
            return 'f44336'
      }}};
`;


// const BorderedAvatar = styled(Avatar)`
//   border: 3px solid lightseagreen;
// `;

export default function MiniDrawer(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  const [greetings, setGreetings] = React.useState("");

  React.useEffect(() => {

    var today = new Date()
    var time = today.getHours()
    if ((time >= 0 && time <= 5) || time >= 21)
      setGreetings("Доброй ночи")
    else if (time >= 6 && time <= 11)
      setGreetings("Доброе утро")
    else if (time >= 12 && time <= 16)
      setGreetings("Добрый день")
    else if (time >= 17 && time <= 20)
      setGreetings("Добрый вечер")
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const page_name = useSelector(state => state.sideBar.page_name)
  const width = useSelector(state => state.sideBar.width)
  const menu_type = useSelector(state => state.sideBar.menu_type)

  const user = useSelector(state => state.login.user)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} width={width}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {page_name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} width={width}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Card elevation={0}>
          <CardContent sx={{ padding: "8px" }}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              <IconButton onClick={() => { navigate('/account/manage') }}>
                <BorderedAvatar src="/broken-image.jpg" permissions = {user.permissions}/>
              </IconButton>
              <Box sx={{
                ...(!open && { display: 'none' }),
              }}>
                <Typography variant="h6" align="left" >
                  {greetings},
                </Typography>
                <Typography variant="subtitle1" style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                  {user.first_name}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
          <CardActions sx={{
            ...(!open && { display: 'none' }),
          }}>
            <Button size="small" color="primary" onClick={() => { navigate('/account/manage') }}>
              Настройки
            </Button>
            <Button size="small" color="primary" onClick={() => { logout(dispatch, navigate) }}>
              Выйти
            </Button>
          </CardActions>
        </Card>



        <Divider />
        <List>
          <ListItem button onClick={() => navigate('/constructor')}>
            <ListItemIcon>
              <ConstructionIcon />
            </ListItemIcon>
            <ListItemText primary="Конструктор анкет" />
          </ListItem>
          <ListItem button onClick={() => navigate('/quetionnaireViewer')}>
            <ListItemIcon>
              <QuestionAnswerIcon />
            </ListItemIcon>
            <ListItemText primary="Анкетирование" />
          </ListItem>
          <ListItem button onClick={() => navigate('/dataAnalysis')}>
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Анализ данных" />
          </ListItem>
        </List>

        <Divider />
        <SideBarList menu_type={menu_type} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}
