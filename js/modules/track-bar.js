import Playlist from "./playlist.js"

const TrackBar = (_ => {

    // cache DOM
    const trackBarEl = document.querySelector(".track-bar")
    const trackBarFillEl = document.querySelector(".track-bar__fill");

    const state = {
        currentPlayTime: 0,
        totalPlayTime: 0
    }

    const setState = obj => {
        state.currentPlayTime = obj.currentTime;
        state.totalPlayTime = obj.duration;
        render();
    }

    const getPercentage = (num1, num2) => {
        return (num1/num2) * 100;
    }

    const init = _ => {
        listeners();
        render();
    }

    const listeners = _ => {
        trackBarEl.addEventListener('click', Playlist.jumpTo);
    }

    const render = _ => {
        trackBarFillEl.style.width = `${getPercentage(state.currentPlayTime, state.totalPlayTime)}%`;
    }

    return {
        init,
        setState,
    }
})();

export default TrackBar