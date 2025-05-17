import React from "react";
import styles from "./musicPlayer.module.css"
function MusicPlayer(): React.JSX.Element  {
    return (
    <div className="player">
        <div className="mus">
            <audio id="audio-player" className={styles.audioMusic} controls></audio>
        </div>
    </div>
    );
}

export default MusicPlayer;