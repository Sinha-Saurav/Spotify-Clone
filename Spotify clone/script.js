const currentSong = new Audio();
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
const playMusic = (track)=>{
    currentSong.src = track;
    currentSong.play();
    play.src = "assets/logos/pause.svg";
}

async function displaySongs() {
    let music = await main();  // Wait for main() to finish
    let SongUl = document.querySelector(".songsList ul");

    //Show all the songs in playlist

    music.forEach((mu, index)=> {
        let songName = cleanSongName(mu.split('/').pop());  // Clean the song name
        SongUl.innerHTML += ` <li data-index="${index}">
                            <img class="invert"src="assets/logos/music.svg" alt="">
                            <div class="info">
                                <div>${songName}</div>
                            </div>
                            <div class="music_play">
                                <img class="invert"src="assets/logos/play.svg" alt="">
                            </div>
                        </li>`;
    });
    //attach an event listener to each song
    document.querySelectorAll(".songsList li").forEach((element) => {
        element.addEventListener("click", (e) => {
            let index = element.getAttribute("data-index");  // Get song index
            playMusic(music[index]);   // Play using full song URL
        });
    });

    //attach an event listener to play, previous and next
    play.addEventListener("click", e =>{
        if(currentSong.paused){
            currentSong.play()
            play.src = 'assets/logos/pause.svg'
        }else{
            currentSong.pause()
            play.src = 'assets/logos/play.svg'
        }
    })
}

function cleanSongName(rawName) {
    return rawName
    .replace(/-official-music-video.*|[-_]*\d{3}[-_ytshorts.savetube.me]*|\.mp3/g, "")  // Remove unwanted parts
    .replace(/-/g, " ")  // Replace hyphens with spaces
    .replace(/\s+/g, " ")  // Remove extra spaces
    .trim()
}

displaySongs();
