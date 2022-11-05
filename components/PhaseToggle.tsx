import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/PhaseToggle.module.scss";

interface PhaseProps {
    phaseUrl: string;
}

const PhaseToggle: React.FunctionComponent<PhaseProps> = ({ ...props }) => {
    const router = useRouter();
    const { pathname } = router;
    const [showSelector, setShowSelector] = useState(false);
    let menuRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const phase = pathname.includes("offense")
        ? "offense"
        : pathname.includes("defense")
        ? "defense"
        : "N/A";

    const handleToggle = (phs: string) => {
        if (phs !== phase && phase !== "N/A") {
            router.push({
                pathname: props.phaseUrl,
                query: {
                    ...router.query,
                },
            });
        }
    };

    useEffect(() => {
        let handler = (e: any) => {
            if (!menuRef.current.contains(e.target)) {
                setShowSelector(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    return (
        <div className={styles.cardArea} ref={menuRef}>
            <div className={styles.phaseCard}>
                <div className={styles.cardHeader}>Phase</div>
                <div
                    onClick={() => setShowSelector(!showSelector)}
                    className={styles.cardBody}
                >
                    {phase}
                </div>
            </div>
            {phase !== "N/A" && showSelector && (
                <div className={styles.expandedBody}>
                    <div className={styles.phasesLabel}>Phases</div>
                    <div className={styles.phaseButtons}>
                        <div
                            className={
                                pathname.includes("defense")
                                    ? styles.controlBtn
                                    : styles.disabledBtn
                            }
                            onClick={() => handleToggle("offense")}
                        >
                            Offense
                        </div>
                        <div
                            className={
                                pathname.includes("offense")
                                    ? styles.controlBtn
                                    : styles.disabledBtn
                            }
                            onClick={() => handleToggle("defense")}
                        >
                            Defense
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div
                            className={styles.closeBtn}
                            onClick={() => setShowSelector(!showSelector)}
                        >
                            Close
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhaseToggle;
