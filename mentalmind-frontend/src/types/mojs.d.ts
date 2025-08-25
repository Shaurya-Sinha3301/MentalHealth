declare module '@mojs/core' {
  interface ShapeOptions {
    parent?: HTMLElement;
    shape?: string;
    left?: number;
    top?: number;
    x?: number | { [key: number]: number };
    y?: number | { [key: number]: number };
    radius?: number | { [key: number]: number };
    fill?: string | string[];
    stroke?: string;
    strokeWidth?: number;
    angle?: number | { [key: number]: number };
    scale?: number | { [key: number]: number };
    duration?: number;
    delay?: number | string;
    repeat?: number;
    easing?: string;
  }

  interface BurstOptions {
    left?: number;
    top?: number;
    radius?: { [key: number]: number };
    angle?: number;
    children?: ShapeOptions;
  }

  interface HtmlOptions {
    el?: HTMLElement;
    duration?: number;
    scale?: { [key: number]: number };
    easing?: string;
  }

  class Shape {
    constructor(options: ShapeOptions);
    play(): void;
  }

  class Burst {
    constructor(options: BurstOptions);
    play(): void;
  }

  class Html {
    constructor(options: HtmlOptions);
    play(): void;
  }

  class Timeline {
    constructor();
    add(animation: Shape): Timeline;
    play(): void;
  }

  const mojs: {
    Shape: typeof Shape;
    Burst: typeof Burst;
    Html: typeof Html;
    Timeline: typeof Timeline;
  };

  export default mojs;
}