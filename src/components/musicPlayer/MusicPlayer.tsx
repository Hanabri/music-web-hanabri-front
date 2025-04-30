import React from "react";

function MusicPlayer(): React.JSX.Element  {
    return (
    <div className="player">
        <div className="mus">
            <audio id="audio-player" className="audio-music" controls></audio>
        </div>
    </div>
    );
}

export default MusicPlayer;