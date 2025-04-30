type AudioSourceMap = Record<string, string>;

export function musicPlayback(): void {
  // 获取元素并添加类型断言
  const button = document.querySelector<HTMLButtonElement>('.music-new-message-button-listen');
  const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement;

  // 类型化音频路径数组
  const audioPaths: string[] = [
    'https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/music/HolographicAction.wav',
  ];

  // 显式类型声明
  let currentAudioIndex: number = 0;

  // 添加参数类型
  function setAudioSource(index: number): void {
    audioPlayer.src = audioPaths[index];
  }

  // 初始化检查
  if (!button || !audioPlayer) {
    console.error('Required elements not found');
    return;
  }

  setAudioSource(currentAudioIndex);

  button.addEventListener('click', () => {
    if (audioPlayer.src === audioPaths[currentAudioIndex]) {
      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    } else {
      setAudioSource(currentAudioIndex);
      audioPlayer.play();
    }
  });

  audioPlayer.addEventListener('ended', () => {
    currentAudioIndex = (currentAudioIndex + 1) % audioPaths.length;
    setAudioSource(currentAudioIndex);
    audioPlayer.play();
  });

  // 类型化图片元素集合
  const images = document.querySelectorAll<HTMLImageElement>('img[data-audio]');

  // 定义音频源映射类型
  const audioSources: AudioSourceMap = {
    'Moondance': 'https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/music/%E6%9C%88%E4%B9%8B%E8%88%9E.wav',
    'Unreal-memories': 'https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/music/Unreal%20memories.wav',
    'holographic-action': 'https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/music/HolographicAction.wav',
  };

  images.forEach((img: HTMLImageElement) => {
    img.addEventListener('click', (event: MouseEvent) => {
      const target = event.currentTarget as HTMLImageElement;
      const audioId = target.dataset.audio;

      if (!audioId) return;

      const audioSrc = audioSources[audioId];
      if (!audioSrc) return;

      if (audioPlayer.src !== audioSrc) {
        audioPlayer.src = audioSrc;
      }

      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    });
  });
}
