import HomeTile from "./HomeTile";

const HomeGrid = () => {
    return (
        <div className="home-grid">
            <HomeTile
                tile_label="player-week-stats"
                img_src="https://user-images.githubusercontent.com/59290280/188775606-faca9396-b0dc-4a82-9c17-20c20bc7e98f.png"
                tile_text="View player stats by week"
                tile_endpoint="/stats/players/offense"
            />
            <HomeTile
                tile_label="team-week-stats"
                img_src="https://user-images.githubusercontent.com/59290280/188776807-e4398f30-2bc1-46d6-9984-e1abea7df047.png"
                tile_text="View team stats by week"
                tile_endpoint="/stats/teams/offense"
            />
            <HomeTile
                tile_label="team-season-stats"
                img_src="https://user-images.githubusercontent.com/59290280/188776599-da50012c-e66a-44f3-aa85-cc8485b502bc.png"
                tile_text="View team stats by season"
                tile_endpoint="/stats/teams/season"
            />

            <HomeTile
                tile_label="player-season-stats"
                img_src="https://user-images.githubusercontent.com/59290280/188775503-9a464d5c-5e7c-41d8-94eb-9b45ea323602.png"
                tile_text="View player stats by season"
                tile_endpoint="/stats/players/season"
            />
        </div>
    );
};

export default HomeGrid;
