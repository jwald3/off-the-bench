const TeamLinkBar: React.FunctionComponent = () => {
    return (
        <div
            style={{
                width: "90%",
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "auto",
                marginRight: "auto",
                height: "3vh",
                padding: "4%",
                backgroundColor: "#f3f4f8",
                marginBottom: "2%",
                alignItems: "center",
                boxShadow: "0px 0.3em 0.3em 0.3em rgba(0, 0, 0, 0.25)",
                textTransform: "uppercase",
            }}
        >
            <div style={{ width: "65%" }}>Team Links</div>
            <div
                style={{
                    width: "35%",
                    display: "flex",
                    gap: "2%",
                    justifyContent: "space-between",
                }}
            >
                <div>Home</div>
                <div>Usage Rates</div>
                <div>Personnel</div>
            </div>
        </div>
    );
};

export default TeamLinkBar;
