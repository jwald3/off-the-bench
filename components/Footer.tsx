import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Footer.module.scss";

const Footer = () => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.leftFooter}>
                <Image
                    src="/logo1.png"
                    alt="Logo"
                    quality={100}
                    width={600}
                    height={175}
                    style={{ zIndex: "999" }}
                />
                <div>Off The Bench, 2022</div>
            </div>
            <div className={styles.rightFooter}>
                <div className={styles.linkColumn}>
                    <div className={styles.linkHeader}>Teams</div>
                    <Link href="/teams">All Teams</Link>
                    <div className={styles.linkHeader}>Team Stats</div>
                    <Link href="/stats/teams/offense">Basic Offense</Link>
                    <Link href="/stats/teams/defense">Basic Defense</Link>
                </div>
                <div className={styles.linkColumn}>
                    <div className={styles.linkHeader}>Player Stats</div>
                    <Link href="/stats/players/offense">Basic Offense</Link>
                    <Link href="/stats/players/defense">Basic Defense</Link>
                    <Link href="/stats/players/receiving">
                        Advanced Receiving
                    </Link>
                    <div>—</div>
                </div>
                <div className={styles.linkColumn}>
                    <div className={styles.linkHeader}>
                        Over The Bench Links
                    </div>
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="https://twitter.com/chimp_otb">Contact Us</Link>
                    <Link href="https://www.buymeacoffee.com/offthebench">
                        Support Us
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
