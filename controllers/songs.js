export async function handleGetSongs(req, res) {
    const songs = [
        { title: "song1", artist: "artist1" },
        { title: "song2", artist: "artist2" }
    ];
    return res.status(200).json(songs);
}