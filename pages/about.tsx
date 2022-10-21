import styles from "../styles/About.module.scss";

const AboutPage = () => {
    return (
        <div className={styles.aboutContainer}>
            <div className={styles.aboutCard}>
                <h2>About Us</h2>
                <div className={styles.cardText}>
                    <div className={styles.paragraph}>
                        Off The Bench is an NFL stat website designed for people
                        who demand greater control over their research tools.
                        Each table and chart is paired with season, week, and
                        down filters to narrow queries down to match your
                        questions about player production and involvement in any
                        situation.
                    </div>
                    <div className={styles.paragraph}>
                        For each team, we provide numerous breakdowns for their
                        tendencies and usage. Playcalling trends, such as
                        running vs. passing for each down and personnel usage,
                        are noted in frequency, production, and success. Charts
                        and tables within the teams page outline usage in snap
                        counts, target shares, and backfield splits.
                    </div>
                    <div className={styles.paragraph}>
                        We have tons of additional features to add, but if you
                        have any ideas for things you would like to see, please
                        get in touch with us!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
