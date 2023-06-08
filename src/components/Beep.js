const audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext)

export default () => {
  
  return {  
    play() {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(0.5)
    }
  }
}