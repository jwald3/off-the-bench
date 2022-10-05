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
import { AiFillHome } from "react-icons/ai";
import { useRouter } from "next/router";

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

    const router = useRouter();
    const { phase } = router.query;
    const path = router.pathname;
    const { query } = router;
    const sznVal = query.season || 2022;

    const allChecked: Array<number> = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ];

    const urlAllChecked = allChecked.map(String).join(",");

    return (
        <div className={styles.navbar}>
            <div className={styles.appLogo}>
                <Link href="/">OFF THE BENCH</Link>
            </div>
            <div className={styles.navbarLinks}>
                <div className={styles.navbarLink}>
                    <div>
                        <span
                            onClick={() =>
                                router.replace({
                                    pathname: "/teams",
                                })
                            }
                        >
                            TEAMS
                        </span>
                    </div>
                </div>
                <div className={styles.navbarLink}>
                    <div>
                        <span
                            onClick={() =>
                                router
                                    .replace({
                                        pathname: "/stats/teams",
                                        query: {
                                            phase: "offense",
                                            weeks: urlAllChecked,
                                            season: 2022,
                                        },
                                    })
                                    .then(() => router.reload())
                            }
                        >
                            TEAM STATS
                        </span>
                    </div>
                </div>
                <div className={styles.navbarLink}>
                    <div>
                        <span
                            onClick={() =>
                                router
                                    .replace({
                                        pathname: "/stats/players/offense",
                                        query: {
                                            weeks: urlAllChecked,
                                            season: 2022,
                                        },
                                    })
                                    .then(() => router.reload())
                            }
                        >
                            PLAYER STATS
                        </span>
                    </div>
                </div>
                <div className={styles.navbarHomeLink}>
                    <Link href="/" passHref>
                        <span>
                            <AiFillHome />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
