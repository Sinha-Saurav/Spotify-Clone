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
const playMusic = (track , song)=>{
    currentSong.src = track;
    currentSong.play();
    play.src = "assets/logos/pause.svg";
    document.querySelector(".songinfo").innerHTML = song;
}

async function displaySongs() {
    let music = await main();  // Wait for main() to finish
    let SongUl = document.querySelector(".songsList ul");

    function secondsToMinutes(time){
        let min = Math.floor(time/60);
        let sec = Math.floor(time % 60);

        min = String(min).padStart(2, '0');
        sec = String(sec).padStart(2, '0');

        return `${min}:${sec}`;
    }

    // 🔹 Auto-load first song on page load
    if (music.length > 0) {
        let firstSong = music[0];
        let firstSongName = cleanSongName(firstSong.split('/').pop());

        currentSong.src = firstSong;
        document.querySelector(".songinfo").innerHTML = firstSongName;
        document.querySelector(".songtime").innerHTML = "00:00 / 00:00"; // Reset time

        // Once metadata is loaded, update duration
        currentSong.addEventListener("loadedmetadata", () => {
            document.querySelector(".songtime").innerHTML = `00:00 / ${secondsToMinutes(currentSong.duration)}`;
        });
    }

    //Show all the songs in playlist

    music.forEach((mu, index)=> {
        const songName = cleanSongName(mu.split('/').pop());  // Clean the song name
        SongUl.innerHTML += ` <li data-index="${index}", data-songname = "${songName}">
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
            let songName = element.getAttribute("data-songname");  // Get song naem without url
            playMusic(music[index],songName);   // Play using full song URL
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

    //listen for timeupdate event
    currentSong.addEventListener("timeupdate", e=>{
        document.querySelector(".songtime").innerHTML = `${secondsToMinutes(currentSong.currentTime)} / ${secondsToMinutes(currentSong.duration)}`; 
        document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%";
        document.querySelector(".progress").style.width = (currentSong.currentTime/currentSong.duration)*100 + "%";
    })
    //add a event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX / e.target.getBoundingClientRect().width)*100
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent)/100;
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
