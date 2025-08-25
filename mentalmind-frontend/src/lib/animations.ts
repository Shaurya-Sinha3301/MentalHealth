// Animation utilities
export const shouldAnimate = () => {
  if (typeof window === "undefined") return false;
  try {
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return true; // Fallback if matchMedia is not supported
  }
};

export const initializeAnimations = () => {
  if (typeof window === "undefined") return;
  // Initialize any global animation settings
};

// GSAP utilities with lazy imports (SSR safe)
export const gsapUtils = {
  scrollFadeIn: async (
    element: HTMLElement,
    options: {
      delay?: number;
      start?: string;
      end?: string;
      scale?: number;
      x?: number;
      y?: number;
      scrub?: boolean;
    } = {}
  ) => {
    if (!shouldAnimate()) return null;

    const gsap = (await import("gsap")).default;
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");

    gsap.registerPlugin(ScrollTrigger);

    const fromVars: any = {
      opacity: 0,
      y: options.y !== undefined ? options.y : 30,
      scale: options.scale || 1,
    };

    if (options.x !== undefined) {
      fromVars.x = options.x;
    }

    const toVars: any = {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: 0.8,
      delay: options.delay || 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: options.start || "top 80%",
        end: options.end,
        scrub: options.scrub || false,
        toggleActions: "play none none reverse",
      },
    };

    return gsap.fromTo(element, fromVars, toVars);
  },
};

// Mo.js utilities with lazy imports (SSR safe)
export const mojsUtils = {
  // Burst animation for celebrations
  createBurst: async (x: number, y: number) => {
    const mojs = (await import("@mojs/core")).default;

    const burst = new mojs.Burst({
      left: x,
      top: y,
      radius: { 0: 100 },
      angle: 0,
      children: {
        shape: "circle",
        radius: { 6: 0 },
        fill: ["#1DD1A1", "#55A3FF", "#F368E0", "#FD79A8"],
        delay: "stagger(0, 40)",
        duration: 750,
        easing: "quad.out",
      },
    });

    return burst;
  },

  // Success celebration
  successCelebration: async (element: HTMLElement) => {
    const mojs = (await import("@mojs/core")).default;

    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const burst = await mojsUtils.createBurst(x, y);
    burst.play();

    const scale = new mojs.Html({
      el: element,
      duration: 500,
      scale: { 1: 1.2, 1.2: 1 },
      easing: "elastic.out",
    });

    scale.play();
    return { burst, scale };
  },

  // Loading spinner with mo.js
  createSpinner: async (element: HTMLElement) => {
    const mojs = (await import("@mojs/core")).default;

    const spinner = new mojs.Shape({
      parent: element,
      shape: "circle",
      stroke: "#00D2FF",
      strokeWidth: 4,
      fill: "transparent",
      radius: 20,
      angle: { 0: 360 },
      duration: 1000,
      repeat: 999,
      easing: "linear.none",
    });

    return spinner;
  },

  // Particle trail effect
  createParticleTrail: async (x: number, y: number) => {
    const mojs = (await import("@mojs/core")).default;
    const timeline = new mojs.Timeline();

    for (let i = 0; i < 5; i++) {
      const particle = new mojs.Shape({
        shape: "circle",
        left: x,
        top: y,
        radius: { 4: 0 },
        fill: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"],
        duration: 600,
        delay: i * 100,
        easing: "quad.out",
        x: { 0: Math.random() * 200 - 100 },
        y: { 0: Math.random() * 200 - 100 },
      });

      timeline.add(particle);
    }

    return timeline;
  },
};

// Anime.js utilities with lazy imports (SSR safe)
export const animeUtils = {
  floatingAnimation: async (element: HTMLElement) => {
    if (!shouldAnimate()) return;

    const anime = (await import("animejs")).default;

    anime({
      targets: element,
      translateY: [-10, 10],
      duration: 3000,
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
    });
  },

  revealText: async (target: string | HTMLElement, delay: number = 0) => {
    if (!shouldAnimate()) return;

    const anime = (await import("animejs")).default;

    anime({
      targets: target,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      delay: anime.stagger(100, { start: delay }),
      easing: "easeOutExpo",
    });
  },

  cardEntrance: async (element: HTMLElement, delay: number = 0) => {
    if (!shouldAnimate()) return;

    const anime = (await import("animejs")).default;

    anime({
      targets: element,
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 600,
      delay,
      easing: "easeOutBack",
    });
  },

  drawSVGPath: async (paths: NodeListOf<SVGPathElement> | SVGPathElement[]) => {
    if (!shouldAnimate()) return;

    const anime = (await import("animejs")).default;

    anime({
      targets: paths as any,
      strokeDashoffset: [anime.setDashoffset as any, 0],
      duration: 2000,
      delay: anime.stagger(200),
      easing: "easeInOutSine",
    });
  },
};

// Motion utilities for hover effects and interactions
export const motionUtils = {
  buttonHover: (element: HTMLElement) => {
    if (!shouldAnimate()) return () => {};

    const handleMouseEnter = () => {
      element.style.transform = "scale(1.05)";
    };

    const handleMouseLeave = () => {
      element.style.transform = "scale(1)";
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  },
};
