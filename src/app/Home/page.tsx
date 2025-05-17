"use client";
import React, {useLayoutEffect} from 'react';
import {musicPlayback} from "@/utils/hanabriJs";
import {clickEffect} from "@/utils/clickEffects";
// import {trailingEffect} from "../js/trailingEffect"
import {musicBorder} from "@/utils/musicBorder";
import MusicPlayer from "@/components/musicPlayer/MusicPlayer";
import FloatingBall from "@/components/floatingBall/FloatingBall";
import styles from './home.module.css';
function HomePage(): React.JSX.Element  {
    useLayoutEffect(() => {
        //音乐播放相关
        musicPlayback(styles.musicNewMessageButtonListen);
        // 鼠标点击动效
        clickEffect();
        // 鼠标拖尾动效
        // trailingEffect();
        // 音乐选中框
        musicBorder(styles.pointerBorder,styles.musicFlex);
    }, []);

    return (
        <main>
            {/*首页*/}
            <div>
                {/*首页新作品*/}
                <section>
                    {/*<div class="background-img">*/}
                    <div className={styles.videoContainer}>
                        <video src="https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/vedio/Anime%20Living%20Room.mp4"
                               className={styles.backgroundVideo} autoPlay={true} loop={true} muted={true}></video>
                        <div className={styles.musicNew}>
                            <div className={`${styles.musicNewDiv} ${styles.admissionTopUnder}`}><img
                                className={`${styles.musicNewImg} ${styles.admissionTopUnder}`}
                                alt={"musicNewImg"}
                                src="https://i.pixiv.re/img-master/img/2021/01/13/22/50/38/87031447_p0_master1200.jpg"/></div>
                            <div className={styles.musicNewMessage}>
                                <a
                                    href="https://www.bilibili.com/video/BV1RRrLY1E2o/?spm_id_from=333.999.0.0&vd_source=a0edde2bece62e1658401e4496bb73bd"
                                    target="_blank" rel="noopener noreferrer">
                                    <button className={`${styles.musicNewMessageButton} ${styles.admissionUnderTop}`}>WATCH NOW</button>
                                </a>
                                <div className={`${styles.musicNewMessageTitle} ${styles.admissionUnderTop}`}>Holographic Action</div>
                                <div className={`${styles.musicNewMessageAuthor} ${styles.admissionUnderTop}`}>By HANABRI</div>
                                <p className={`${styles.newText} ${styles.admissionUnderTop}`}><span className="textWhite50">Releases on </span>6 January
                                    2025</p>
                                <button className={`${styles.musicNewMessageButtonListen} ${styles.admissionUnderTop}`}>LISTEN NOW</button>
                            </div>
                        </div>
                    </div>
                    {/*</div>*/}
                </section>
                {/*音乐作品*/}
                <section className={styles.works}>
                    <a className={styles.musicA}>MUSIC</a>
                    {/*flex容器*/}
                    <div className={styles.musicFlex}>
                        <div className={styles.pointerBorder}></div>
                        <div className={styles.explode}>
                            {/*歌曲背景*/}
                            <img className={styles.imgThumbnail} data-audio="Moondance" alt={styles.imgThumbnail}
                                 src="https://img.hongyoubizhi.com/picture/pages/regular/2023/10/25/12/116649004_p0_master1200.jpg?x-oss-process=image/resize,m_fill,w_1000"/>
                            <audio id="Moondance" data-audio="Moondance">
                                <source
                                    src="https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/music/%E6%9C%88%E4%B9%8B%E8%88%9E.wav"
                                    type="audio/mpeg"/>
                            </audio>
                            <div className={styles.overlayBox}>
                                <div className={styles.overlay}>
                                    <span className={styles.textUppercaseAuthor}>HANABRI<br/></span>
                                    <span className={styles.textUppercaseWork}>Moondance</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.explode}>
                            {/*歌曲背景*/}
                            <img className={styles.imgThumbnail} data-audio="Unreal-memories" alt={styles.imgThumbnail}
                                 src="https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/imgs/picture2.png"/>
                            <audio id="Unreal-memories" data-audio="Unreal-memories">
                                <source src="https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/music/Unreal%20memories.wav"
                                        type="audio/mpeg"/>
                            </audio>
                            <div className={styles.overlayBox}>
                                <div className={styles.overlay}>
                                    <span className={styles.textUppercaseAuthor}>HANABRI<br/></span>
                                    <span className={styles.textUppercaseWork}>Unreal Memories</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.explode}>
                            {/*歌曲背景*/}
                            <img className={styles.imgThumbnail} data-audio="holographic-action" alt={styles.imgThumbnail}
                                 src="https://i.pixiv.re/img-master/img/2021/01/13/22/50/38/87031447_p0_master1200.jpg"/>
                            <audio id="holographic-action" data-audio="Unreal-memories">
                                <source src="https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/music/HolographicAction.wav"
                                        type="audio/mpeg"/>
                            </audio>
                            <div className={styles.overlayBox}>
                                <div className={styles.overlay}>
                                    <span className={styles.textUppercaseAuthor}>HANABRI<br/></span>
                                    <span className={styles.textUppercaseWork}>Holographic Action</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <MusicPlayer />
            <FloatingBall>Log in</FloatingBall>
        </main>
    );
}
export default HomePage;