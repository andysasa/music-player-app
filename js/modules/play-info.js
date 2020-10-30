import Playlist from "./playlist.js"

const PlayInfo = (_ => {

    // cache DOM
    let playerHeaderEl = document.querySelector(".player__header");
    let playerImageEl = document.querySelector(".player__image");
    let playerTriggerEl = document.querySelector(".player__trigger");
    let playerCountEl = document.querySelector(".player__counter");

    // data
    const state = {
        coverArt: 0,
        playlistLength: 0,
        isPlaying: false
    }

    const setState = obj => {
        state.coverArt = obj.coverArt;
        state.playlistLength = obj.playlistLength;
        state.isPlaying = obj.isPlaying;
        render();
    }

    const listeners = _ => {
        playerTriggerEl.addEventListener("click", _ => {
            state.isPlaying = state.isPlaying ? false : true;
            render();
            Playlist.flip();
        });

        playerTriggerEl.addEventListener("keypress", event => {
            if (event.keyCode === 32) {
                Playlist.flip();
            }
        })
    }

    const init = _ => {
        render();
        listeners();
    }

    const render = _ => {
        playerImageEl.src = state.coverArt;
        playerTriggerEl.innerHTML = state.isPlaying ? "pause" : "play";
        playerCountEl.innerHTML = `${state.playlistLength} songs`;
    }

    return {
        init,
        setState,
    }

})();

export default PlayInfo