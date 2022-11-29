import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Select, { MultiValue } from "react-select";

interface SelectObject {
    value: string;
    label: string;
}

interface onOffProps {
    playersPicked?: Array<string>;
    players: Array<string>;
    pickPlayers: Function;
}

function OnOffSelector({ playersPicked, players, pickPlayers }: onOffProps) {
    const router = useRouter();
    const { pathname, query } = router;
    const playerUrlQuery: Array<string> = playersPicked ? playersPicked : [];
    const [selectedPlayers, setSelectedPlayers] =
        useState<Array<string>>(playerUrlQuery);

    useEffect(() => {
        if (query.included !== undefined && query.included !== "none") {
            const selectedPs = (query.included as string)
                ?.split(",")
                .map(String);

            pickPlayers(selectedPs);
            setSelectedPlayers(selectedPs);
        } else if (query.included === "none") {
            pickPlayers([]);
        }
    }, []);

    useEffect(() => {
        pickPlayers(selectedPlayers);
    }, [selectedPlayers]);

    useEffect(() => {
        if (Array.isArray(selectedPlayers)) {
            const urlSelectedPlayers = selectedPlayers?.map(String).join(",");

            router.push({
                pathname: pathname,
                query: {
                    ...router.query,
                    included: urlSelectedPlayers,
                },
            });
        }
    }, [selectedPlayers]);

    return (
        <div>
            {/* <Select
                options={players}
                isMulti
                value={selectedPlayers}
                onChange={(v: MultiValue<SelectObject>) => {
                    let choices = Array.from(v).map((opt) => opt.value);
                    setSelectedPlayers((prev) => [...prev, ...choices]);
                    console.log(choices);
                }}
            /> */}
        </div>
    );
}

export default OnOffSelector;
