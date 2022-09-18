import Link from "next/link";

type TileProperties = {
    img_src: string;
    tile_text: string;
    tile_label: string;
    tile_endpoint: string;
};

const HomeTile: React.FC<TileProperties> = ({
    img_src,
    tile_label,
    tile_text,
    tile_endpoint,
}) => {
    return (
        <Link href={tile_endpoint} passHref>
            <div className="home-tile">
                <img src={img_src} alt={tile_label} />
                <div className="tile-text">{tile_text}</div>
            </div>
        </Link>
    );
};

export default HomeTile;
