type Coordinate = { x: number; y: number };

export function clickEffect(): void {
  interface Ball {
    x: number;
    y: number;
    angle: number;
    multiplier: number;
    vx: number;
    vy: number;
    r: number;
    color: string;
    update: () => void;
  }

  let balls: Ball[] = [];
  let longPressed = false;
  let longPress: NodeJS.Timeout;
  let multiplier = 0;
  let width: number;
  let height: number;
  let origin: Coordinate;
  let normal: Coordinate;
  let ctx: CanvasRenderingContext2D;

  const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  document.body.appendChild(canvas);
  canvas.setAttribute(
      "style",
      "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;"
  );

  const pointer = document.createElement("span") as HTMLSpanElement;
  pointer.classList.add("pointer");
  document.body.appendChild(pointer);

  const updateSize = (): void => {
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.scale(2, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    origin = {
      x: width / 2,
      y: height / 2,
    };
    normal = {
      x: width / 2,
      y: height / 2,
    };
  };

  class BallImpl implements Ball {
    x: number;
    y: number;
    angle: number;
    multiplier: number;
    vx: number;
    vy: number;
    r: number;
    color: string;

    constructor(x: number = origin.x, y: number = origin.y) {
      this.x = x;
      this.y = y;
      this.angle = Math.PI * 2 * Math.random();
      this.multiplier = longPressed
          ? randBetween(14 + multiplier, 15 + multiplier)
          : randBetween(6, 12);
      this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
      this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
      this.r = randBetween(8, 12) + 3 * Math.random();
      this.color = colours[Math.floor(Math.random() * colours.length)];
    }

    update(): void {
      this.x += this.vx - normal.x;
      this.y += this.vy - normal.y;
      normal.x = (-2 / window.innerWidth) * Math.sin(this.angle);
      normal.y = (-2 / window.innerHeight) * Math.cos(this.angle);
      this.r -= 0.3;
      this.vx *= 0.9;
      this.vy *= 0.9;
    }
  }

  const pushBalls = (count: number = 1, x: number = origin.x, y: number = origin.y): void => {
    for (let i = 0; i < count; i++) {
      balls.push(new BallImpl(x, y));
    }
  };

  const randBetween = (min: number, max: number): number => {
    return Math.floor(Math.random() * max) + min;
  };

  const loop = (): void => {
    ctx.fillStyle = "rgba(255, 255, 255, 0)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach((b) => {
      if (b.r < 0) return;
      ctx.fillStyle = b.color;
      ctx.beginPath();
      // 修正后的arc调用
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
      ctx.fill();
      b.update();
    });

    if (longPressed) {
      multiplier += 0.2;
    } else if (multiplier >= 0) {
      multiplier -= 0.4;
    }

    removeBall();
    requestAnimationFrame(loop);
  };

  const removeBall = (): void => {
    balls = balls.filter((b) => {
      return !(
          b.x + b.r < 0 ||
          b.x - b.r > width ||
          b.y + b.r < 0 ||
          b.y - b.r > height ||
          b.r < 0
      );
    });
  };

  // 初始化执行
  if (canvas.getContext && window.addEventListener) {
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    updateSize();

    window.addEventListener("resize", updateSize, false);
    window.addEventListener("mousedown", (e: MouseEvent) => {
      pushBalls(randBetween(10, 20), e.clientX, e.clientY);
      document.body.classList.add("is-pressed");
      longPress = setTimeout(() => {
        document.body.classList.add("is-longpress");
        longPressed = true;
      }, 500);
    });

    window.addEventListener("mouseup", (e: MouseEvent) => {
      clearTimeout(longPress);
      if (longPressed) {
        document.body.classList.remove("is-longpress");
        pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
        longPressed = false;
      }
      document.body.classList.remove("is-pressed");
    });

    window.addEventListener("mousemove", (e: MouseEvent) => {
      pointer.style.top = `${e.clientY}px`;
      pointer.style.left = `${e.clientX}px`;
    });

    loop();
  } else {
    console.log("canvas or addEventListener is unsupported!");
  }
}
