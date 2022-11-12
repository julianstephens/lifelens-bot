import fetch from "node-fetch";

interface ISpotifyEvent {
    id: number;
    timestamp: string;
    duration: number;
    data: {
        danceability: number;
        energy: number;
        key: number;
        loudness: number;
        mode: number;
        speechiness: number;
        acousticness: number;
        instrumentalness: number;
        liveness: number;
        valence: number;
        tempo: number;
        type: string;
        id: string;
        uri: string;
        track_href: string;
        analysis_url: string;
        duration_ms: number;
        time_signature: number;
        title: string;
        popularity: number;
        album: string;
        artist: string;
    };
}

interface ISpotifyResp {
    data: ISpotifyEvent[];
}

const BUCKET_URL = "http://192.168.16.1:5600/api/0/buckets";

const getSpotifyEvents = async () => {
    try {
        const url = `${BUCKET_URL}/aw-watcher-spotify_HAL/events`;
        console.log(`URL: ${url}`);
        const resp = await fetch(url, {
            method: "GET",
        });
        console.log("Got resp");

        if (!resp.ok) throw new Error(`Error:\n${resp.status}`);

        const res = (await resp.json()) as ISpotifyResp;

        console.log(JSON.stringify(res));
        return res;
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            return err.message;
        }

        console.log(err);
        return err;
    }
};

getSpotifyEvents();
