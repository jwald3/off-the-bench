import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/PhaseToggle.module.scss";

interface PhaseProps {
    phaseUrl: string;
}

const PhaseToggle: React.FunctionComponent<PhaseProps> = ({ ...props }) => {
    const router = useRouter();
    const { pathname } = router;
    const [showSelector, setShowSelector] = useState(false);
    const phase = pathname.includes("offense")
        ? "offense"
        : pathname.includes("defense")
        ? "defense"
        : "offense";

    const handleToggle = (phs: string) => {
        if (phs !== phase) {
            router.push({
                pathname: props.phaseUrl,
                query: {
                    ...router.query,
                    phase: phs,
                },
            });
        }
    };

    return (
        <div className={styles.cardArea}>
            <div className={styles.phaseCard}>
                <div className={styles.cardHeader}>Phase</div>
                <div
                    onClick={() => setShowSelector(!showSelector)}
                    className={styles.cardBody}
                >
                    {phase}
                </div>
            </div>
            {showSelector && (
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
