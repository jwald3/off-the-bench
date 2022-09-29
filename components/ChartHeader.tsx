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
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                alignItems: "baseline",
                textAlign: "end",
                textTransform: "uppercase",
                marginBottom: "1%",
                maxWidth: "1800px",
            }}
        >
            <div style={{ display: "flex", width: "60%" }}>
                <h1>{props.headerTitle}</h1>
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "2%",
                    width: "40%",
                    justifyContent: "flex-end",
                }}
            >
                <div style={{ cursor: "pointer" }}>
                    <h2
                        className={
                            selectedData == "all" ? styles.activeItem : ""
                        }
                        onClick={() => handleChange("all")}
                    >
                        {props.altOptionOne}
                    </h2>
                </div>
                <div style={{ cursor: "pointer" }}>
                    <h2
                        className={
                            selectedData == "rz" ? styles.activeItem : ""
                        }
                        onClick={() => handleChange("rz")}
                    >
                        {props.altOptionTwo}
                    </h2>
                </div>
                <div style={{ cursor: "pointer" }}>
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
