export function musicBorder() {
    const imgs = document.querySelectorAll('.music-flex img')
    const pointer = document.querySelector('.pointer-border')
    for (const img of imgs){
      img.onmouseenter = ()=>{
        pointer.style.setProperty('--x',img.offsetLeft+'px')
        pointer.style.setProperty('--y',img.offsetTop+'px')
        pointer.style.setProperty('--s',img.offsetWidth+'px')
      }
    }
}
