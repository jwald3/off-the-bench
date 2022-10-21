import Link from "next/link";
import styles from "../styles/PageNotFound.module.scss";

export default function Custom404() {
    return (
        <div className={styles.pageNotFoundContainer}>
            <div className={styles.header}>404</div>
            <div className={styles.errorText}>User out of bounds.</div>
            <Link href="/">
                <a className={styles.linkHome}>Return Home</a>
            </Link>
        </div>
    );
}
