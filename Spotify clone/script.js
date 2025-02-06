async function main(){
    let songs = ["billie-eilish-birds-of-a-feather-official-music-video-128-ytshorts.savetube.me.mp3",
        "bruno-mars-thats-what-i-like-official-music-video-128-ytshorts.savetube.me.mp3","bruno-mars-the-lazy-song-official-music-video-128-ytshorts.savetube.me.mp3","die-for-you-ft-grabbitz-official-music-video-valorant-champions-2021-128-ytshorts.savetube.me.mp3","fighter-mitti-full-video-hrithik-roshan-deepika-padukone-anil-kapoor-vishal-sheykhar-128-ytshorts.savetube.me.mp3","lady-gaga-bruno-mars-die-with-a-smile-official-music-video-128-ytshorts.savetube.me.mp3","one-direction-night-changes-128-ytshorts.savetube.me.mp3","ticking-away-ft-grabbitz-bbno-official-music-video-valorant-champions-2023-anthem-128-ytshorts.savetube.me.mp3","yung-kai-blue-official-music-video-128-ytshorts.savetube.me.mp3"];
    let base_url = "http://127.0.0.1:5500/Spotify%20clone/assets/songs/";    

    for(let song of songs){
        let url = base_url+song;
        let response = await fetch(url);
        let a = await response.text();
        console.log(a);
    }
}
main()