import { songsList } from "../data/songs.js"
import PlayInfo from "./play-info.js";
import TrackBar from "./track-bar.js"

const Playlist = (_ => {

    // data
    const songs = songsList;
    let currentIndex = 0;
    let currentSong = new Audio(songsList[currentIndex].url);

    // cache the DOM
    const playlistEl = document.querySelector('.playlist');
    const playPauseEl = document.querySelector('.playlist__play-pause');

    const init = _ => {
        render();
        listeners();
        PlayInfo.setState({
            coverArt: songs[currentIndex].image,
            playlistLength: songs.length,
            isPlaying: !currentSong.paused
        });
    }

    const flip = _ => {
        togglePlayPause();
        render();
    }

    const jumpTo = e => {
        const trackBarEl = document.querySelector(".track-bar")
        currentSong.currentTime = currentSong.duration * (e.offsetX / trackBarEl.offsetWidth);
    }

    const playNext = index => {
        if (songs[index + 1]) {
           currentIndex++;
           changeAudioSrc(currentIndex);
           togglePlayPause();
           render();
        }
        PlayInfo.setState({
            coverArt: songs[currentIndex].image,
            playlistLength: songs.length,
            isPlaying: !currentSong.paused
        });
    }

    const togglePlayPause = _ => {
        return currentSong.paused ? currentSong.play() : currentSong.pause();
    }
    
    const changeAudioSrc = index => {
        currentSong.src = songs[index].url;
    }

    const mainPlay = clickedIndex => {
        if (currentIndex === clickedIndex) {
            togglePlayPause();
        } else {
            currentIndex = clickedIndex;
            changeAudioSrc(clickedIndex);
            togglePlayPause();
            render();
        }

        PlayInfo.setState({
            coverArt: songs[currentIndex].image,
            playlistLength: songs.length,
            isPlaying: !currentSong.paused
        });
    }

    const keyPlay = event => {
        if (event.keyCode === 32) {
            flip();
        }
        PlayInfo.setState({
            coverArt: songs[currentIndex].image,
            playlistLength: songs.length,
            isPlaying: !currentSong.paused
        });
    }

    const playPauseIcon = index => {
        if (currentIndex === index) {
            return currentSong.paused ? "fa-play" : "fa-pause";
        } else {
            return "fa-play"
        }
    }

    // listeners
    const listeners = _ => {
        playlistEl.addEventListener('click', event => {
            if (event.target.matches('.playlist__icon')) {
                const songElem = event.target.parentNode.parentNode;
                const songElemIndex = [...songElem.parentNode.children].indexOf(songElem);
                mainPlay(songElemIndex);
                render();
            }
        });

        window.addEventListener('keypress', keyPlay);

        currentSong.addEventListener('ended', _ => {
            playNext(currentIndex);
        });

        currentSong.addEventListener('timeupdate', _ => {
            TrackBar.setState(currentSong);
        }
        );

    }

    const render = _ => {
        let markup = "";
        songs.forEach((songObj, index) => {
            markup += `
            <li class="playlist__song ${index === currentIndex ? 'playlist__song--active' : 'playlist__song'}">
                <div class="playlist__play-pause">
                    <i class="playlist__icon fa ${playPauseIcon(index)}"></i>
                </div>
                <div class="playlist__song-details">
                    <span class="playlist__song-title">${songObj.title}</span>
                    <br>
                    <span class="playlist__song-artist">${songObj.artist}</span>
                </div>
                <div class="playlist__duration">${songObj.time}</div>
            </li>
            `;
        });
        playlistEl.innerHTML = markup;
    }

    return {
        init,
        flip,
        jumpTo
    }
})();

export default Playlist;