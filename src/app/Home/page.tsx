"use client";
import React, {useLayoutEffect} from 'react';
import {musicPlayback} from "@/utils/hanabriJs";
import {clickEffect} from "@/utils/clickEffects";
// import {trailingEffect} from "../js/trailingEffect"
import {musicBorder} from "@/utils/musicBorder";
import MusicPlayer from "@/components/musicPlayer/MusicPlayer";
import FloatingBall from "@/components/floatingBall/FloatingBall";
function HomePage(): React.JSX.Element  {
    useLayoutEffect(() => {
        //音乐播放相关
        musicPlayback();
        // 鼠标点击动效
        clickEffect();
        // 鼠标拖尾动效
        // trailingEffect();
        // 音乐选中框
        musicBorder();
    }, []);

    return (
        <main>
            {/*首页*/}
            <div>
                {/*首页新作品*/}
                <section>
                    {/*<div class="background-img">*/}
                    <div className="video-container" id="#video-postion">
                        <video src="https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/vedio/Anime%20Living%20Room.mp4"
                               className="background-video" autoPlay={true} loop={true} muted={true}></video>
                        <div className="music-new">
                            <div className="music-new-div admission-top-under" id="music-new-div-id"><img
                                className="music-new-img admission-top-under"
                                alt={"music-new-img"}
                                src="https://i.pixiv.re/img-master/img/2021/01/13/22/50/38/87031447_p0_master1200.jpg"/></div>
                            <div className="music-new-message">
                                <a
                                    href="https://www.bilibili.com/video/BV1RRrLY1E2o/?spm_id_from=333.999.0.0&vd_source=a0edde2bece62e1658401e4496bb73bd"
                                    target="_blank" rel="noopener noreferrer">
                                    <button className="music-new-message-button admission-under-top">WATCH NOW</button>
                                </a>
                                <div className="music-new-message-title admission-under-top">Holographic Action</div>
                                <div className="music-new-message-author admission-under-top">By HANABRI</div>
                                <p className="new-text admission-under-top"><span className="text-white-50">Releases on </span>6 January
                                    2025</p>
                                <button className="music-new-message-button-listen admission-under-top">LISTEN NOW</button>
                            </div>
                        </div>
                    </div>
                    {/*</div>*/}
                </section>
                {/*音乐作品*/}
                <section className="works">
                    <a className="music-a" href={"#video-postion"}>MUSIC</a>
                    {/*flex容器*/}
                    <div className="music-flex">
                        <div className="pointer-border"></div>
                        <div className="explode">
                            {/*歌曲背景*/}
                            <img className="img-thumbnail" data-audio="Moondance" alt={"img-thumbnail"}
                                 src="https://img.hongyoubizhi.com/picture/pages/regular/2023/10/25/12/116649004_p0_master1200.jpg?x-oss-process=image/resize,m_fill,w_1000"/>
                            <audio id="Moondance" data-audio="Moondance">
                                <source
                                    src="https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/music/%E6%9C%88%E4%B9%8B%E8%88%9E.wav"
                                    type="audio/mpeg"/>
                            </audio>
                            <div className="overlay-box">
                                <div className="overlay">
                                    <span className="text-uppercase-author">HANABRI<br/></span>
                                    <span className="text-uppercase-work">Moondance</span>
                                </div>
                            </div>
                        </div>
                        <div className="explode">
                            {/*歌曲背景*/}
                            <img className="img-thumbnail" data-audio="Unreal-memories" alt={"img-thumbnail"}
                                 src="https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/imgs/picture2.png"/>
                            <audio id="Unreal-memories" data-audio="Unreal-memories">
                                <source src="https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/music/Unreal%20memories.wav"
                                        type="audio/mpeg"/>
                            </audio>
                            <div className="overlay-box">
                                <div className="overlay">
                                    <span className="text-uppercase-author">HANABRI<br/></span>
                                    <span className="text-uppercase-work">Unreal Memories</span>
                                </div>
                            </div>
                        </div>
                        <div className="explode">
                            {/*歌曲背景*/}
                            <img className="img-thumbnail" data-audio="holographic-action" alt={"img-thumbnail"}
                                 src="https://i.pixiv.re/img-master/img/2021/01/13/22/50/38/87031447_p0_master1200.jpg"/>
                            <audio id="holographic-action" data-audio="Unreal-memories">
                                <source src="https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/music/HolographicAction.wav"
                                        type="audio/mpeg"/>
                            </audio>
                            <div className="overlay-box">
                                <div className="overlay">
                                    <span className="text-uppercase-author">HANABRI<br/></span>
                                    <span className="text-uppercase-work">Holographic Action</span>
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