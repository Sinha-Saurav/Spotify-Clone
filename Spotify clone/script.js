async function main(){
    let base_url = "http://127.0.0.1:5500/Spotify%20clone/assets/songs/";
    let response = await fetch("http://127.0.0.1:5500/Spotify%20clone/assets/songs.json");
    let data = await response.json();
    let songs = data.songs;
    let music = []
    songs.forEach(song => {
        let url = base_url+song;
        music.push(url)
    });
    return music;
}
async function displaySongs() {
    let music = await main();  // Wait for main() to finish
    let SongUl = document.querySelector(".songsList ul");

    music.forEach(mu => {
        let songName = cleanSongName(mu.split('/').pop());  // Clean the song name
        SongUl.innerHTML += `<li>${songName}</li>`;
    });
}

function cleanSongName(rawName) {
    return rawName
    .replace(/-official-music-video.*|[-_]*\d{3}[-_ytshorts.savetube.me]*|\.mp3/g, "")  // Remove unwanted parts
    .replace(/-/g, " ")  // Replace hyphens with spaces
    .replace(/\s+/g, " ")  // Remove extra spaces
    .trim()
}

displaySongs();
