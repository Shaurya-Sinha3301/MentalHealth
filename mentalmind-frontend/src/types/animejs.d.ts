declare module 'animejs' {
  interface AnimeParams {
    targets?: string | HTMLElement | SVGElement | NodeList | HTMLElement[] | SVGElement[] | NodeListOf<SVGPathElement>;
    duration?: number;
    delay?: number | ((el: HTMLElement, i: number) => number);
    easing?: string;
    direction?: 'normal' | 'reverse' | 'alternate';
    loop?: boolean | number;
    autoplay?: boolean;
    opacity?: number | number[] | { [key: number]: number };
    translateY?: number | number[] | { [key: number]: number };
    translateX?: number | number[] | { [key: number]: number };
    scale?: number | number[] | { [key: number]: number };
    rotate?: number | number[] | { [key: number]: number };
    strokeDashoffset?: number | number[] | { [key: number]: number } | string | ((el: SVGPathElement) => number)[];
    [key: string]: any;
  }

  interface AnimeInstance {
    play(): void;
    pause(): void;
    restart(): void;
    reverse(): void;
    seek(time: number): void;
    finished: Promise<void>;
  }

  interface AnimeStatic {
    (params: AnimeParams): AnimeInstance;
    stagger(value: number, options?: { start?: number; from?: string }): (el: HTMLElement, i: number) => number;
    setDashoffset(el: SVGPathElement): number;
    timeline(params?: AnimeParams): AnimeTimeline;
  }

  interface AnimeTimeline {
    add(params: AnimeParams, offset?: number | string): AnimeTimeline;
    play(): void;
    pause(): void;
    restart(): void;
    reverse(): void;
    seek(time: number): void;
    finished: Promise<void>;
  }

  const anime: AnimeStatic;
  export default anime;
}