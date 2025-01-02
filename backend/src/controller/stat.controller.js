
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";


export const getStats = async (req, res, next) => {
    try {
        const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),
            Song.aggregate([
                {
        $unionWith: {
            coll: "album",
            pipeline: []
        }
    },
    {
        $group: {
            _id: "$artist", // Group by artist
        }
    },
    {
        $count: "count" // Count the unique groups
    }
            ])
        ]);
        res.status(200).json({ totalSongs, totalAlbums, totalUsers, totalArtist: uniqueArtists[0]?.count || 0 });
    } catch (error) {
        next(error);
    }
};
