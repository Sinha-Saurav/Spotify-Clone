const currentSong = new Audio();
let currentPlaylist = [];
async function main(folder){
    let base_url = `http://127.0.0.1:5500/docs/assets/songs/${folder}/`;
    let response = await fetch(`${base_url}songs.json`);
    let data = await response.json();
    let songs = data.songs;
    let music = [];
    songs.forEach(song => {
        let url = base_url+song;
        music.push(url)
    });

    return music;

}
async function albums(){
    let base_url = `http://127.0.0.1:5500/docs/assets/songs/`;
    let response = await fetch(`${base_url}folder.json`);
    let data = await response.json();
    let folders = data.folder;
    let card_container = document.querySelector(".card-container");
    for(let folder of folders){
        let songsinfo = await fetch(`${base_url}${folder}/songs.json`);
        let songdata = await songsinfo.json();
        let title = songdata.title;
        let description = songdata.description;
        let image = songdata.image;
        card_container.innerHTML += `<div data-folder="${folder}" class="card">
                        <div class="play">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                                color="#000000" fill="black">
                                <path
                                    d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            </svg>

                        </div>
                        <img src="${image}" alt="image">
                        <h2>${title}</h2>
                        <p>${description}</p>
                    </div>`
    }
}
albums()


const playMusic = (track)=>{
    currentSong.src = track;
    const songName = cleanSongName(track.split('/').pop());
    currentSong.play();
    play.src = "assets/logos/pause.svg";
    document.querySelector(".songinfo").innerHTML = songName;
}
function secondsToMinutes(time){
    if(isNaN(time) || time<0){
        return "00:00";
    }

    let min = Math.floor(time/60);
    let sec = Math.floor(time % 60);

    min = String(min).padStart(2, '0');
    sec = String(sec).padStart(2, '0');

    return `${min}:${sec}`;
}


async function displaySongs(folder) {
    currentPlaylist = await main(folder);  // Wait for main() to finish
    let SongUl = document.querySelector(".songsList ul");
    SongUl.innerHTML = "";
    // 🔹 Auto-load first song on page load
    if (currentPlaylist.length > 0) {
        let firstSong = currentPlaylist[0];
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

    currentPlaylist.forEach((mu, index)=> {
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
            playMusic(currentPlaylist[index]);   // Play using full song URL
        });
    });
}

function cleanSongName(rawName) {
    return rawName
    .replace(/-official-music-video.*|[-_]*\d{3}[-_ytshorts.savetube.me]*|\.mp3/g, "")  // Remove unwanted parts
    .replace(/-/g, " ")  // Replace hyphens with spaces
    .replace(/\s+/g, " ")  // Remove extra spaces
    .trim()
}

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
    //add event listener to hamburger
    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = 0 +"%";
    })
    //add event listener to cancel button
    document.querySelector(".close").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = -120 +"%";
    })
    //add event listener to previous button
    previous.addEventListener("click", ()=>{
        let index = currentPlaylist.indexOf(currentSong.src)
        if((index-1)>=0){
            playMusic(currentPlaylist[index-1])
        }
    })
    //add event listener to next button
    next.addEventListener("click", ()=>{
        let index = currentPlaylist.indexOf(currentSong.src)
        if((index+1) < currentPlaylist.length){
            playMusic(currentPlaylist[index+1])
        }
    })
    //add event listener to volume range 
    let range = document.querySelector(".range").getElementsByTagName("input")[0];
    range.addEventListener("change", (e)=>{
        currentSong.volume = e.target.value/100;
    })

    //add event listener to volume button to make it mute
    document.querySelector(".volume img").addEventListener("click", (e)=>{
        if(e.target.src.endsWith("assets/logos/volume.svg")){
            e.target.src = "assets/logos/mute.svg";
            currentSong.volume = 0;
            range.value = 0;
        }else{
            e.target.src = "assets/logos/volume.svg";
            currentSong.volume = 0.4;
            range.value = 40;
        }
    })

//add event listener to the cards to show its song in albumns
document.addEventListener("click", async (e) => {
    let album = e.target.closest(".card");  // Find the nearest parent card

        let folder = album.getAttribute("data-folder"); 
        await displaySongs(folder);

        playMusic(currentPlaylist[0]);
    
});

displaySongs("fol1");
