import { useState } from "react";
import styles from "../styles/ChartHeader.module.scss";

interface ChartHeaderProps {
    headerTitle: string;
    altOptionOne: string;
    altOptionTwo: string;
    altOptionThree: string;
    changeView: Function;
}

const ChartHeader: React.FunctionComponent<ChartHeaderProps> = ({
    ...props
}) => {
    const [selectedData, setSelectedData] = useState("all");

    const handleChange = (view: string) => {
        props.changeView(view);
        setSelectedData(view);
    };

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerTitle}>
                <h1>{props.headerTitle}</h1>
            </div>
            <div className={styles.chartOptions}>
                <div className={styles.headerOption}>
                    <h2
                        className={
                            selectedData == "all" ? styles.activeItem : ""
                        }
                        onClick={() => handleChange("all")}
                    >
                        {props.altOptionOne}
                    </h2>
                </div>
                <div className={styles.headerOption}>
                    <h2
                        className={
                            selectedData == "rz" ? styles.activeItem : ""
                        }
                        onClick={() => handleChange("rz")}
                    >
                        {props.altOptionTwo}
                    </h2>
                </div>
                <div className={styles.headerOption}>
                    <h2
                        className={
                            selectedData == "ez" ? styles.activeItem : ""
                        }
                        onClick={() => handleChange("ez")}
                    >
                        {props.altOptionThree}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default ChartHeader;
