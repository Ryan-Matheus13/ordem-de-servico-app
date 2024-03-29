import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DrawerCostum() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [cargo, setCargo] = React.useState("");
  const [menuOptions, setMenuOptions] = React.useState([]);

  const axiosPrivateInstance = useAxiosPrivate();

  const navigate = useNavigate();
  const logout = useLogout();

  React.useEffect(() => {
    getUser();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onLogout = async () => {
    await logout();
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const getUser = async () => {

    try {
      const { data } = await axiosPrivateInstance.get("user");
  
      setCargo(data.cargo);
    } catch (error) {
      navigate("/")
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{ backgroundColor: "#0F0F0F", boxShadow: "none" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label=""
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          backgroundColor: "red",
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={"Dashboard"} disablePadding>
            <ListItemButton onClick={() => navigate("/dashboard")}>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          {cargo == "Admin" && (
            <>
              <ListItem key={"Servicos"} disablePadding>
                <ListItemButton onClick={() => navigate("/servicos")}>
                  <ListItemText primary={"Servicos"} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"Atendentes"} disablePadding>
                <ListItemButton onClick={() => navigate("/atendentes")}>
                  <ListItemText primary={"Atendentes"} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"Helpers"} disablePadding>
                <ListItemButton onClick={() => navigate("/helpers")}>
                  <ListItemText primary={"Helpers"} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"Formas de pagamento"} disablePadding>
                <ListItemButton
                  onClick={() => navigate("/formas-de-pagamento")}
                >
                  <ListItemText primary={"Formas de pagamento"} />
                </ListItemButton>
              </ListItem>
            </>
          )}
          {cargo == "Gerente" && (
            <>
              <ListItem key={"Servicos"} disablePadding>
                <ListItemButton onClick={() => navigate("/servicos")}>
                  <ListItemText primary={"Servicos"} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"Atendentes"} disablePadding>
                <ListItemButton onClick={() => navigate("/atendentes")}>
                  <ListItemText primary={"Atendentes"} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"Helpers"} disablePadding>
                <ListItemButton onClick={() => navigate("/helpers")}>
                  <ListItemText primary={"Helpers"} />
                </ListItemButton>
              </ListItem>
            </>
          )}
          <ListItem key={"Clientes"} disablePadding>
            <ListItemButton onClick={() => navigate("/clientes")}>
              <ListItemText primary={"Clientes"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Atendimentos"} disablePadding>
            <ListItemButton onClick={() => navigate("/atendimentos")}>
              <ListItemText primary={"Atendimentos"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Sair"} disablePadding>
            <ListItemButton onClick={() => onLogout()}>
              <ListItemText primary={"Sair"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
