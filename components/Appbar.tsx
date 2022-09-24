import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "../styles/Appbar.module.scss";
import Link from "next/link";

const drawerWidth = 240;
const navItems = ["Home", "Team Stats", "Player Stats"];
const navPaths = ["/", "/stats/teams?phase=offense", "/stats/players/offense"];

export default function DrawerAppBar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" component="a" sx={{ my: 2 }} href="/">
                OFF THE BENCH
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: "center" }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div className={styles.navbar}>
            <div className={styles.appLogo}>OFF THE BENCH</div>
            <div className={styles.navbarLinks}>
                <div className={styles.navbarLink}>
                    <Link href="/stats/teams?phase=offense">TEAM STATS</Link>
                </div>
                <div className={styles.navbarLink}>
                    <Link href="/stats/players/offense">PLAYER STATS</Link>
                </div>
                <div className={styles.navbarLink}>
                    <Link href="/">HOME ICON</Link>
                </div>
            </div>
        </div>
    );

    // return (
    //     <Box sx={{ display: "flex" }}>
    //         <AppBar component="nav">
    //             <Toolbar>
    //                 <IconButton
    //                     color="inherit"
    //                     aria-label="open drawer"
    //                     edge="start"
    //                     onClick={handleDrawerToggle}
    //                     sx={{ mr: 2, display: { sm: "none" } }}
    //                 >
    //                     <MenuIcon />
    //                 </IconButton>
    //                 <Typography
    //                     variant="h6"
    //                     component="a"
    //                     href="/"
    //                     sx={{
    //                         flexGrow: 1,
    //                         display: { xs: "none", sm: "block" },
    //                     }}
    //                 >
    //                     OFF THE BENCH
    //                 </Typography>
    //                 <Box sx={{ display: { xs: "none", sm: "block" } }}>
    //                     {navItems.map((item, key) => (
    //                         <Button key={item} sx={{ color: "#fff" }}>
    //                             <Typography
    //                                 variant="h6"
    //                                 component="a"
    //                                 href={navPaths[key]}
    //                                 sx={{
    //                                     flexGrow: 1,
    //                                     display: { xs: "none", sm: "block" },
    //                                     fontSize: ".75rem",
    //                                 }}
    //                             >
    //                                 {item}
    //                             </Typography>
    //                         </Button>
    //                     ))}
    //                 </Box>
    //             </Toolbar>
    //         </AppBar>
    //         <Box component="nav">
    //             <Drawer
    //                 variant="temporary"
    //                 open={mobileOpen}
    //                 onClose={handleDrawerToggle}
    //                 ModalProps={{
    //                     keepMounted: true, // Better open performance on mobile.
    //                 }}
    //                 sx={{
    //                     display: { xs: "block", sm: "none" },
    //                     "& .MuiDrawer-paper": {
    //                         boxSizing: "border-box",
    //                         width: drawerWidth,
    //                     },
    //                 }}
    //             >
    //                 {drawer}
    //             </Drawer>
    //         </Box>
    //     </Box>
    // );
}
