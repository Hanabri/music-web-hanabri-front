export function musicBorder(): void {
    // 使用类型断言确保元素存在
    const pointer = document.querySelector<HTMLElement>('.pointer-border');

    if (!pointer) {
        console.error('Pointer border element not found');
        return;
    }

    // 使用更严格的图片元素选择
    const imgs = document.querySelectorAll<HTMLImageElement>('.music-flex img');

    imgs.forEach(img => {
        // 添加事件前的元素存在检查
        if (!img) return;

        img.addEventListener('mouseenter', () => {
            // 数值有效性检查
            const setPosition = (prop: string, value: number) => {
                if (isNaN(value)) {
                    console.warn(`Invalid value for ${prop}: ${value}`);
                    return;
                }
                pointer.style.setProperty(prop, `${value}px`);
            };

            setPosition('--x', img.offsetLeft);
            setPosition('--y', img.offsetTop);
            setPosition('--s', img.offsetWidth);
        });
    });
}

