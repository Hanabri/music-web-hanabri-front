type Position = { x: number; y: number };
type Velocity = { x: number; y: number };
type Styles = Record<string, string>;

export function trailingEffect(): void {
  const colors: string[] = ["#D61C59", "#E7D84B", "#1B8798"];
  const characters: string[] = ["♬", "♪"];
  const elementGroup: Element[] = [];

  class Element {
    num: number;
    character: string;
    lifeSpan: number;
    initialStyles: Styles;
    velocity!: Velocity;
    position!: Position;
    element!: HTMLSpanElement;

    constructor() {
      this.num = Math.floor(Math.random() * characters.length);
      this.character = characters[this.num];
      this.lifeSpan = 120;
      this.initialStyles = {
        position: "fixed",
        top: "0",
        display: "block",
        pointerEvents: "none",
        "z-index": "10000000",
        fontSize: "25px",
        "will-change": "transform",
        color: "#000000",
      };
    }

    init(x: number, y: number, color: string): void {
      this.velocity = {
        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
        y: 1,
      };
      this.position = { x: x - 10, y: y - 20 };
      this.initialStyles.color = color;
      this.element = document.createElement("span");
      this.element.innerHTML = this.character;
      applyStyle(this.element, this.initialStyles);
      this.update();
      document.body.appendChild(this.element);
    }

    update(): void {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.lifeSpan--;
      this.element.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0) scale(${
          this.lifeSpan / 120
      })`;
    }

    die(): void {
      this.element.parentNode?.removeChild(this.element);
    }
  }

  const applyStyle = (element: HTMLElement, style: Styles): void => {
    Object.entries(style).forEach(([key, value]) => {
      // 使用CSSStyleDeclaration的原生方法
      element.style.setProperty(key, value);
    });
  };

  const createElement = (x: number, y: number, color: string): void => {
    const e = new Element();
    e.init(x, y, color);
    elementGroup.push(e);
  };

  const onMouseMove = (e: MouseEvent): void => {
    const num = Math.floor(Math.random() * colors.length);
    createElement(e.clientX, e.clientY, colors[num]);
  };

  const handleTouch = (e: TouchEvent): void => {
    if (e.touches.length > 0) {
      Array.from(e.touches).forEach((touch) => {
        const num = Math.floor(Math.random() * colors.length);
        createElement(touch.clientX, touch.clientY, colors[num]);
      });
    }
  };

  const addListeners = (): void => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", handleTouch);
    document.addEventListener("touchstart", handleTouch);
  };

  const render = (): void => {
    for (let i = elementGroup.length - 1; i >= 0; i--) {
      elementGroup[i].update();
      if (elementGroup[i].lifeSpan < 0) {
        elementGroup[i].die();
        elementGroup.splice(i, 1);
      }
    }
  };

  addListeners();
  const animate = () => {
    render();
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}
