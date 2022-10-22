import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "30vh",
                backgroundColor: "#494252",
                alignItems: "center",
                display: "flex",
                boxShadow: " 0.5em 0.5em 0.5em .5em rgba(0, 0, 0, 0.25)",
            }}
        >
            <div
                style={{
                    flex: "1",
                    display: "flex",
                    height: "90%",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: "5%",
                    paddingRight: "5%",
                    paddingTop: "1%",
                    borderRight: "1px solid #f3f4f8",
                    color: "#f3f4f8",
                    flexDirection: "column",
                }}
            >
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
            <div
                style={{
                    flex: "5",
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "2% 5%",
                    height: "90%",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "#d2d4da",
                        height: "100%",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ fontWeight: "bold", color: "#f3f4f8" }}>
                        Teams
                    </div>
                    <Link href="/teams">All Teams</Link>
                    <div style={{ fontWeight: "bold", color: "#f3f4f8" }}>
                        Team Stats
                    </div>
                    <Link href="/stats/teams/offense">Basic Offense</Link>
                    <Link href="/stats/teams/defense">Basic Defense</Link>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "#d2d4da",
                        height: "100%",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ fontWeight: "bold", color: "#f3f4f8" }}>
                        Player Stats
                    </div>
                    <Link href="/stats/players/offense">Basic Offense</Link>
                    <Link href="/stats/players/defense">Basic Defense</Link>
                    <Link href="/stats/players/receiving">
                        Advanced Receiving
                    </Link>
                    <div>—</div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "#d2d4da",
                        height: "100%",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ fontWeight: "bold", color: "#f3f4f8" }}>
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
