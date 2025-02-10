export function refreshPinned() {
  //刷新页面时回到顶部
    const navLinks = document.querySelectorAll('.nav-link');
    // 默认选中第一个链接
    navLinks[0].classList.add('active');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
      });
    });
    window.scrollTo(0, 0);
}

export function musicPlayback() {
//播放最新音乐

  const button = document.querySelector('.music-new-message-button-listen');
  let audioPlayer = document.getElementById('audio-player');

  // 封装音频文件路径
  const audioPaths = [
    'https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/music/HolographicAction.wav',
  ];

  // 当前播放的音频索引
  let currentAudioIndex = 0;

  // 设置当前音频路径
  function setAudioSource(index) {
    audioPlayer.src = audioPaths[index];
  }

  // 初始化音频路径
  setAudioSource(currentAudioIndex);


  button.addEventListener('click', function () {
    // 检查当前音频是否为指定的音乐文件
    if (audioPlayer.src === audioPaths[currentAudioIndex]) {
      if (audioPlayer.paused) {
        console.log('HanabriJs loaded3')
        audioPlayer.play();
      } else {
        console.log('HanabriJs loaded4')
        audioPlayer.pause();
      }
    } else {
      console.log('HanabriJs loaded5')
      // 如果不是指定的音乐文件，强制设置并播放
      setAudioSource(currentAudioIndex);
      audioPlayer.play();
    }
  });

  // 可选：添加音频结束后的处理逻辑
  audioPlayer.addEventListener('ended', function () {
    // 切换到下一个音频
    currentAudioIndex = (currentAudioIndex + 1) % audioPaths.length;
    setAudioSource(currentAudioIndex);
    audioPlayer.play();
  });



  const images = document.querySelectorAll('img[data-audio]');
  audioPlayer = document.getElementById('audio-player');

  // 音频文件路径映射
  const audioSources = {
    'Moondance': 'https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/music/%E6%9C%88%E4%B9%8B%E8%88%9E.wav',
    'Unreal-memories': 'https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/music/Unreal%20memories.wav',
    'holographic-action': 'https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/music/HolographicAction.wav',
    // 可以添加更多音频映射
  };

  images.forEach(img => {
    img.addEventListener('click', function () {
      const audioId = this.getAttribute('data-audio');
      const audioSrc = audioSources[audioId];

      if (audioSrc) {
        if (audioPlayer.src !== audioSrc) {
          console.log('HanabriJs loaded6')
          audioPlayer.src = audioSrc;
        }

        if (audioPlayer.paused) {
          audioPlayer.play();
          console.log('HanabriJs loaded7')
        } else {
          console.log('HanabriJs loaded8')
          audioPlayer.pause();
        }
      }
    });
  });
}
