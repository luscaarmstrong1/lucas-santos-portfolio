"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ExpoScaleEase } from "gsap/EasePack";
import Lenis from "lenis";
import Swiper from "swiper";
import { Navigation, Controller, EffectCreative } from "swiper/modules";

const queryAll = <T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document
): T[] => Array.from(root.querySelectorAll<T>(selector));

const queryOne = <T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document
): T | null => root.querySelector<T>(selector);

export function Effects() {
  useEffect(() => {
    gsap.registerPlugin(
      ScrollTrigger,
      SplitText,
      CustomEase,
      DrawSVGPlugin,
      InertiaPlugin,
      ExpoScaleEase
    );

    CustomEase.create("smooth-ease", "0.32, 0.72, 0, 1");
    CustomEase.create(
      "elastic-ease-out",
      "M0,0 L0.076,0.5737 L0.1187,0.8382 L0.1419,0.9463 L0.1654,1.0292 L0.1897,1.0886 L0.2153,1.1258 L0.2297,1.137 L0.2448,1.1424 L0.261,1.1423 L0.2786,1.1366 L0.3101,1.1165 L0.3862,1.0507 L0.4257,1.0219 L0.4699,0.9995 L0.5163,0.9872 L0.5877,0.9842 L0.8126,1.0011 L1,1"
    );
    CustomEase.create(
      "elastic-ease-out-soft",
      "M0,0 L0.017,0.029 L0.036,0.113 L0.111,0.604 L0.15,0.809 L0.191,0.949 L0.213,0.995 L0.236,1.026 L0.262,1.044 L0.293,1.049 L0.435,1.01 L0.512,1 L1,1"
    );
    gsap.defaults({ ease: "smooth-ease" });

    const htmlEl = document.documentElement;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    const splits: SplitText[] = [];
    const mm = gsap.matchMedia();

    ScrollTrigger.clearScrollMemory("manual");
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({ lerp: 0.18, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tickerFn = (time: number) => lenis.raf(1000 * time);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const onLockScroll = (ev: Event) => {
      const customEv = ev as CustomEvent;
      if (customEv.detail) lenis.stop();
      else lenis.start();
    };
    window.addEventListener("rolagem:trava", onLockScroll);

    const onAnchorClick = (ev: MouseEvent) => {
      if (
        ev.button !== 0 ||
        ev.metaKey ||
        ev.ctrlKey ||
        ev.shiftKey ||
        ev.altKey
      )
        return;
      const target = ev.target as Element | null;
      const anchor = target?.closest?.('a[href^="#"]');
      const id = anchor?.getAttribute("href")?.slice(1);
      const dest = id ? document.getElementById(id) : null;
      if (!id || !dest) return;
      ev.preventDefault();
      let top = 0;
      for (
        let cur: HTMLElement | null = dest;
        cur;
        cur = cur.offsetParent as HTMLElement | null
      ) {
        top += cur.offsetTop;
      }
      lenis.scrollTo(top, { duration: 1.4, force: true });
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onAnchorClick);

    cleanups.push(() => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("rolagem:trava", onLockScroll);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    });

    const markReady = () => {
      htmlEl.classList.add("has-seq-ready");
      setTimeout(() => requestAnimationFrame(() => htmlEl.classList.add("is-ready")), 50);
    };

    const runStageIntro = async () => {
      const nav = queryOne("[data-load-nav]");
      const stage = queryOne("[data-load-stage]");
      if (!stage) return markReady();

      const logo = queryOne("[data-load-stage-logo]", stage);
      const cta = queryOne("[data-load-stage-cta]", stage);
      const title = queryOne("[data-load-stage-title]", stage);
      const text = queryOne("[data-load-stage-text]", stage);
      const underline = queryOne("[data-load-stage-underline]", stage);
      const facts = queryAll("[data-load-stage-fact]", stage);
      const canvas = queryOne<HTMLImageElement>("[data-load-stage-canvas]", stage);
      const decoText = queryOne("[data-load-stage-deco-text]", stage);
      const decoArrow = queryOne("[data-load-stage-deco-arrow]", stage);
      const stagePath = queryOne("[data-load-stage-svg] path", stage);
      const tracos = logo ? queryAll("[data-traco]", logo) : [];
      const ponto = logo ? queryOne("[data-ponto]", logo) : null;

      if (canvas?.decode) {
        await canvas.decode().catch(() => {});
      }
      markReady();
      if (reducedMotion || !logo) return;

      lenis.stop();
      const rect = logo.getBoundingClientRect();
      const centerOffset = innerHeight / 2 - (rect.top + rect.height / 2);

      const logoTl = gsap.timeline();
      gsap.set(tracos, { drawSVG: "0% 0%" });
      if (ponto) gsap.set(ponto, { scale: 0, transformOrigin: "50% 50%" });
      logoTl.to(
        tracos,
        { drawSVG: "0% 100%", duration: 0.55, ease: "power2.inOut", stagger: 0.045 },
        0.05
      );
      if (ponto) {
        logoTl.to(ponto, { scale: 1, duration: 0.6, ease: "elastic-ease-out" }, 0.62);
      }

      const initCommon = () => {
        gsap.set(logo, { y: centerOffset });
        gsap.set(nav, { opacity: 0 });
        gsap.set(cta, { opacity: 0, y: 60 });
        gsap.set(stagePath, { drawSVG: "50% 50%" });
        gsap.set(facts, { opacity: 0, y: 100, x: -40, rotate: -35, scale: 0.6 });
      };

      mm.add("(min-width: 992px)", () => {
        const tl = gsap.timeline();
        const splitTitle = SplitText.create(title, {
          type: "lines",
          linesClass: "split-line",
        });
        const splitParagraph = SplitText.create(text, {
          type: "lines",
          linesClass: "split-line",
        });
        splits.push(splitTitle, splitParagraph);
        initCommon();
        gsap.set(canvas, { yPercent: 6, opacity: 0 });
        gsap.set(decoText, {
          opacity: 0,
          rotate: -18,
          scale: 1.25,
          yPercent: -65,
          xPercent: -25,
        });
        gsap.set(decoArrow, {
          opacity: 0,
          rotate: -6,
          scale: 1.25,
          yPercent: 0,
          xPercent: -125,
        });
        gsap.set(splitTitle.lines, {
          transformOrigin: "100% 100%",
          yPercent: 60,
          xPercent: 25,
          opacity: 0,
          scale: 0.6,
        });
        gsap.set(splitParagraph.lines, { yPercent: 125, opacity: 0 });
        gsap.set(underline, { opacity: 0, yPercent: 45 });

        tl.to(logo, { y: 0, duration: 0.6, delay: 1 })
          .to(nav, { opacity: 1, duration: 0.25 }, "<+=.125")
          .to(cta, { y: 0, opacity: 1, duration: 0.5 }, "<+=.05")
          .to(stagePath, { drawSVG: "150% 50%", ease: "power2.out", duration: 1.4 }, "<+=.005")
          .to(
            facts,
            {
              opacity: 1,
              y: 0,
              x: 0,
              rotate: 0,
              scale: 1,
              ease: "elastic-ease-out",
              duration: 0.8,
              stagger: -0.048,
            },
            "<-=.015"
          )
          .to(
            decoText,
            { yPercent: 0, xPercent: 0, opacity: 1, scale: 1, rotate: -7, duration: 0.45 },
            "<-=.015"
          )
          .to(
            decoArrow,
            { yPercent: 10, opacity: 1, rotate: 9, scale: 1, xPercent: 0, duration: 0.45 },
            "<+=.005"
          )
          .to(canvas, { yPercent: 0, opacity: 1, duration: 0.85 }, "<-=.005")
          .to(
            splitTitle.lines,
            {
              yPercent: 0,
              xPercent: 0,
              opacity: 1,
              scale: 1,
              ease: "elastic-ease-out-soft",
              duration: 0.95,
              stagger: 0.039,
            },
            "<-=.005"
          )
          .to(splitParagraph.lines, { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.039 }, "<+=.01")
          .to(underline, { yPercent: 0, opacity: 1, duration: 0.45 }, "<+=.15");

        tl.call(() => void lenis.start(), undefined, "-=1");
      });

      mm.add("(max-width: 991px)", () => {
        const tl = gsap.timeline();
        initCommon();
        gsap.set(canvas, { yPercent: 6, opacity: 0 });
        gsap.set(decoText, { rotate: -7 });
        gsap.set(decoArrow, { rotate: -105, yPercent: -40 });

        tl.to(logo, { y: 0, duration: 0.6, delay: 1 })
          .to(nav, { opacity: 1, duration: 0.25 }, "<+=.125")
          .to(cta, { y: 0, opacity: 1, duration: 0.5 }, "<+=.05")
          .to(stagePath, { drawSVG: "150% 50%", ease: "power2.out", duration: 1.4 }, "<+=.005")
          .to(
            facts,
            {
              opacity: 1,
              y: 0,
              x: 0,
              rotate: 0,
              scale: 1,
              ease: "elastic-ease-out",
              duration: 0.8,
              stagger: -0.048,
            },
            "<-=.015"
          )
          .to(canvas, { yPercent: 0, opacity: 1, duration: 0.85 }, "<-=.005");

        tl.call(() => void lenis.start(), undefined, "-=1.25");
      });
    };

    // Sequence section (#areas)
    (() => {
      const seq = queryOne("[data-sequence]");
      if (!seq || reducedMotion) return;

      const trigger = queryOne("[data-sequence-trigger]", seq);
      const canvas = queryOne("[data-sequence-canvas]", seq);
      const platoImg = canvas ? queryOne("img", canvas) : null;
      const cards = queryAll("[data-sequence-card]", seq);
      const title = queryOne("[data-sequence-title]", seq);
      const svgPaths = queryAll("[data-sequence-svg] path", seq);
      const smileys = queryAll("[data-sequence-smiley]", seq);
      const innerSig = queryOne("[data-sequence-signature]", seq);
      const titleSplitEl = queryOne("[data-sequence-title-split]", seq);
      const finalSigs = queryAll("[data-sequence-final-signature]", seq);
      const cookie1 = queryOne("[data-sequence-cookie-first]", seq);
      const cookie2 = queryOne("[data-sequence-cookie-second]", seq);
      const straw1 = queryOne("[data-sequence-strawberry-first]", seq);
      const straw2 = queryOne("[data-sequence-strawberry-second]", seq);

      mm.add("(min-width: 992px)", () => {
        const splitWords = titleSplitEl
          ? SplitText.create(titleSplitEl, { type: "words", wordsClass: "split-word" })
          : null;
        if (splitWords) splits.push(splitWords);

        let triggeredFinal = false;
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top 60%",
            end: "bottom bottom+=25%",
            scrub: true,
          },
        });
        const wordsTl = gsap.timeline({ paused: true });
        const fruitsTl = gsap.timeline({ paused: true });

        gsap.to(platoImg, {
          rotate: 360,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top 20%",
            end: "bottom bottom",
            scrub: 0.7,
            onUpdate: (self) => {
              if (self.direction === 1 && !triggeredFinal && self.progress >= 0.85) {
                triggeredFinal = true;
                wordsTl.play(0);
                fruitsTl.play(0);
              }
              if (self.direction === -1 && triggeredFinal && self.progress <= 0.675) {
                triggeredFinal = false;
                wordsTl.pause(0);
                fruitsTl.pause(0);
              }
            },
          },
        });

        gsap.set(canvas, { transformOrigin: "center bottom" });
        gsap.to(platoImg, {
          keyframes: {
            "72%": { y: 0, scale: 1 },
            "100%": {
              y: () => 0.27 * Math.min(innerHeight, 0.75 * innerWidth),
              scale: 0.8,
            },
          },
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(canvas, {
          keyframes: {
            "75%": { scale: 1 },
            "100%": { scale: 0.85, yPercent: 3.5 },
          },
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        const h = innerHeight;
        gsap.set(cards, {
          yPercent: 50,
          y: 0.6 * h,
          xPercent: (_i, el) => (el.hasAttribute("data-sequence-card-left") ? 4 : -4),
        });
        gsap.set(innerSig, { opacity: 0 });
        gsap.set(title, { y: h, scale: 0.7 });
        gsap.set(finalSigs, { y: h });
        gsap.set(cookie1, { y: h, x: 64 });
        gsap.set(cookie2, { y: h, x: 96 });
        gsap.set(straw1, { y: h, x: -64 });
        gsap.set(straw2, { y: h, x: -96 });

        mainTl
          .to(
            cards,
            {
              yPercent: -50,
              y: -0.6 * h,
              xPercent: 0,
              duration: 1,
              rotate: (_i, el) =>
                el.hasAttribute("data-sequence-card-left")
                  ? gsap.utils.random(-5, -2)
                  : gsap.utils.random(2, 5),
              stagger: 0.85,
              ease: CustomEase.create(
                "cartao",
                "M0,0 C0,0.201 0.098,0.459 0.5,0.5 0.904,0.541 1,0.805 1,1 "
              ),
            },
            "step"
          )
          .to(
            title,
            { y: 0, scale: 0.9, duration: 1.5, ease: "expoScale(0.5,7,power2.out)" },
            ">+=.2"
          )
          .to(finalSigs, { y: 0, duration: 1, ease: "power1.inOut" }, "<")
          .to(cookie1, { y: 0, x: 0, duration: 1.25, ease: "power1.inOut" }, "<")
          .to(straw1, { y: 0, x: 0, duration: 1.25, ease: "power1.inOut" }, "<")
          .to(cookie2, { y: 0, x: 0, duration: 1.5, ease: "power1.inOut" }, "<")
          .to(straw2, { y: 0, x: 0, duration: 1.5, ease: "power1.inOut" }, "<");

        mainTl.to(
          smileys,
          {
            rotate: (_i, el) =>
              el.hasAttribute("data-sequence-smiley-left")
                ? gsap.utils.random(8, 13)
                : gsap.utils.random(-13, -8),
            stagger: 0.85,
            duration: 1,
          },
          "step"
        );

        mainTl.to(
          innerSig,
          {
            keyframes: {
              "10%": { opacity: 1 },
              "50%": { opacity: 1 },
              "68%": { opacity: 0 },
            },
            duration: 1.5,
            ease: "none",
          },
          "step+=.75"
        );

        mainTl.fromTo(
          svgPaths,
          { drawSVG: "100% 100%" },
          {
            keyframes: [
              { drawSVG: "0% 100%", duration: 0.5 },
              { drawSVG: "0% 0%", duration: 0.5 },
            ],
            ease: "none",
            stagger: 1.35,
          },
          "step+=.3"
        );

        if (splitWords) {
          wordsTl
            .from(
              splitWords.words,
              {
                xPercent: (idx, _el, arr) => 60 * (Math.floor(arr.length / 2) - idx),
                opacity: 0,
                scale: 0,
                duration: 1,
                ease: "expo.out",
                stagger: 0.039,
              },
              "step"
            )
            .from(
              splitWords.words,
              {
                yPercent: 150,
                duration: 1,
                stagger: 0.039,
                ease: "elastic-ease-out-soft",
              },
              "step+=0.05"
            );
        }

        fruitsTl
          .from(finalSigs, { opacity: 0, duration: 0.2, ease: "none" }, "step")
          .fromTo(
            cookie1,
            { opacity: 0, xPercent: 75, yPercent: 80, scale: 0.5, rotate: -140 },
            {
              opacity: 1,
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              rotate: -90,
              ease: "elastic-ease-out-soft",
              duration: 0.8,
            },
            "step+=0.08"
          )
          .fromTo(
            straw1,
            { opacity: 0, xPercent: -50, yPercent: 90, scale: 0.5, rotate: 40 },
            {
              opacity: 1,
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              rotate: -6,
              ease: "elastic-ease-out-soft",
              duration: 0.8,
            },
            "step+=0.08"
          )
          .fromTo(
            cookie2,
            { opacity: 0, xPercent: 50, yPercent: 75, scale: 0.5, rotate: -75 },
            {
              opacity: 1,
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              rotate: 0,
              filter: "blur(3px)",
              ease: "elastic-ease-out-soft",
              duration: 1.15,
            },
            "step+=0.16"
          )
          .fromTo(
            straw2,
            { opacity: 0, xPercent: -50, yPercent: 50, scale: 0.5, rotate: -75 },
            {
              opacity: 1,
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              rotate: -23,
              filter: "blur(4px)",
              ease: "elastic-ease-out-soft",
              duration: 1.15,
            },
            "step+=0.16"
          );
      });

      mm.add("(max-width: 991px)", () => {
        gsap.to(platoImg, {
          rotate: 360,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top 20%",
            end: "bottom bottom",
            scrub: 0.7,
          },
        });
        const finalMob = queryOne(".sequence-final-mobile", seq);
        const mobSigs = finalMob ? queryAll(".sequence-final-signature", finalMob) : [];
        if (finalMob && mobSigs.length) {
          gsap.set(mobSigs, { opacity: 0, y: 24 });
          ScrollTrigger.create({
            trigger: finalMob,
            start: "bottom 106%",
            onEnter: () =>
              void gsap.to(mobSigs, {
                opacity: 1,
                y: 0,
                ease: "elastic-ease-out-soft",
                duration: 0.8,
                stagger: 0.06,
                overwrite: true,
              }),
            onLeaveBack: () =>
              void gsap.to(mobSigs, { opacity: 0, y: 24, duration: 0.25, overwrite: true }),
          });
        }
        gsap.set(canvas, { transformOrigin: "center bottom" });
        gsap.to(canvas, {
          keyframes: {
            "10%": { yPercent: 0, scale: 1 },
            "15%": { yPercent: -10, scale: 0.95 },
            "70%": { scale: 0.95 },
            "75%": { scale: 1 },
            "100%": { yPercent: 5, scale: 1 },
          },
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });
    })();

    // Mouse inertia items
    (() => {
      if (!matchMedia("(hover: hover) and (pointer: fine)").matches || reducedMotion) return;
      const clampPos = gsap.utils.clamp(-1080, 1080);
      const clampRot = gsap.utils.clamp(-60, 60);

      queryAll("[data-inertia]").forEach((section) => {
        let lastX = 0;
        let lastY = 0;
        let dx = 0;
        let dy = 0;
        let rafId = 0;

        const onMove = (ev: MouseEvent) => {
          if (!rafId) {
            rafId = requestAnimationFrame(() => {
              dx = ev.clientX - lastX;
              dy = ev.clientY - lastY;
              lastX = ev.clientX;
              lastY = ev.clientY;
              rafId = 0;
            });
          }
        };
        section.addEventListener("mousemove", onMove);
        cleanups.push(() => section.removeEventListener("mousemove", onMove));

        queryAll("[data-inertia-item]", section).forEach((item) => {
          const onEnter = (ev: MouseEvent) => {
            const child = queryOne("[data-inertia-item-child]", item);
            if (!child) return;
            const r = child.getBoundingClientRect();
            const relX = ev.clientX - (r.left + r.width / 2);
            const relY = ev.clientY - (r.top + r.height / 2);
            const torque = (relX * dy - relY * dx) / (Math.hypot(relX, relY) || 1);
            gsap.to(child, {
              inertia: {
                x: { velocity: clampPos(30 * dx), end: 0 },
                y: { velocity: clampPos(30 * dy), end: 0 },
                rotation: { velocity: clampRot(15 * torque), end: 0 },
                resistance: 180,
              },
            });
          };
          item.addEventListener("mouseenter", onEnter);
          cleanups.push(() => item.removeEventListener("mouseenter", onEnter));
        });
      });
    })();

    // Marquee scroll animation & hover-to-circulate interaction
    queryAll("[data-marquee]").forEach((mEl) => {
      const tp = queryOne("[data-marquee-svg] textPath", mEl);
      if (tp && !reducedMotion) {
        let hoverLoop: gsap.core.Tween | null = null;

        gsap.fromTo(
          tp,
          { attr: { startOffset: "-30%" } },
          {
            attr: { startOffset: "-60%" },
            ease: "none",
            duration: 1,
            scrollTrigger: {
              trigger: mEl,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        mEl.addEventListener("mouseenter", () => {
          const currentAttr = tp.getAttribute("startOffset") || "-30%";
          const currentNum = parseFloat(currentAttr) || -30;
          hoverLoop = gsap.to(tp, {
            attr: { startOffset: `${currentNum - 150}%` },
            duration: 10,
            ease: "none",
            repeat: -1,
          });
        });

        mEl.addEventListener("mouseleave", () => {
          if (hoverLoop) {
            hoverLoop.kill();
            hoverLoop = null;
          }
        });
      }
    });

    // Smiley pop-in
    queryAll("[data-smiley]").forEach((sm) => {
      mm.add("(min-width: 992px)", () => {
        if (!reducedMotion) {
          gsap
            .timeline({ scrollTrigger: { trigger: sm, start: "top 95%" } })
            .fromTo(
              sm,
              { opacity: 0, scale: 0.5, rotate: 80, transformOrigin: "left bottom" },
              { opacity: 1, scale: 1, rotate: 0, ease: "elastic-ease-out", duration: 0.95 }
            );
        }
      });
    });

    // Fill lines
    queryAll("[data-fill-line]").forEach((fl) => {
      const p = queryOne("path", fl);
      if (p && !reducedMotion) {
        mm.add("(min-width: 992px)", () => {
          gsap
            .timeline({ scrollTrigger: { trigger: fl, start: "top 70%", once: true } })
            .fromTo(p, { drawSVG: "0% 0%" }, { drawSVG: "100% 0%", ease: "none", duration: 0.75 });
        });
      }
    });

    // Benefit table lines and checkmarks
    if (!reducedMotion) {
      queryAll("[data-benefit-table]").forEach((tb) => {
        const lines = queryAll("[data-benefit-table-line]", tb);
        mm.add("(min-width: 992px)", () => {
          gsap.set(lines, { transformOrigin: "left center" });
          gsap
            .timeline({ scrollTrigger: { trigger: tb, start: "top 90%", once: true } })
            .fromTo(lines, { scaleX: 0 }, { scaleX: 1, stagger: 0.076, duration: 0.85 });
        });
      });

      queryAll("[data-benefit-table-check]").forEach((chk) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: chk,
              start: "top 49%",
              end: "bottom 51%",
              toggleActions: "restart none restart none",
            },
          })
          .to(chk, {
            keyframes: {
              "0%": { scaleX: 1, yPercent: 0, rotate: 0 },
              "20%": { scaleX: 0.65, yPercent: 25, rotate: 25, ease: "power2.in" },
              "100%": { scaleX: 1, yPercent: 0, rotate: 0, ease: "elastic.out(1,0.4)" },
            },
            duration: 0.85,
          });
      });
    }

    // Contact circles entrance & ferris-wheel / orbital motion
    queryAll("[data-payment]").forEach((pay) => {
      const items = queryAll("[data-payment-item]", pay);
      mm.add("(min-width: 992px)", () => {
        if (!reducedMotion) {
          gsap
            .timeline({ scrollTrigger: { trigger: pay, start: "top 96%", once: true } })
            .fromTo(
              items,
              { opacity: 0, y: 100, x: -40, rotate: -35, scale: 0.6 },
              {
                opacity: 1,
                y: 0,
                x: 0,
                rotate: 0,
                scale: 1,
                ease: "elastic-ease-out",
                duration: 0.8,
                stagger: -0.048,
              }
            );
        }
      });
    });

    (() => {
      const container = queryOne(".pament-methods");
      const inner = queryOne(".payment-methods-inner");
      if (!container || !inner || reducedMotion) return;
      const outers = queryAll(".payment-method-item-outer", container);
      const count = outers.length;
      if (!count) return;

      mm.add("(min-width: 992px)", () => {
        container.classList.add("roda-ativa");
        const maxAngle = (42 * Math.PI) / 180;
        const step = (2 * maxAngle) / count;
        let fontSize = parseFloat(getComputedStyle(container).fontSize) || 16;
        let angleOffset = 0;
        let angularVel = 0;
        let hovered = false;
        let inView = false;

        const renderWheel = () => {
          outers.forEach((el, idx) => {
            const theta = gsap.utils.wrap(
              -maxAngle,
              maxAngle,
              angleOffset + idx * step - maxAngle + step / 2
            );
            const x = 76.9 * Math.sin(theta) * fontSize;
            const y = 76.9 * (1 - Math.cos(theta)) * fontSize;
            el.style.transform = `translate3d(${x.toFixed(2)}px, ${(-y).toFixed(2)}px, 0)`;
          });
        };

        const tickWheel = (_time: number, deltaMs: number) => {
          if (!inView) return;
          const targetVel = hovered
            ? 0
            : -(0.07 + Math.max(-0.25, Math.min(0.25, 0.004 * (lenis.velocity || 0))));
          angularVel += (targetVel - angularVel) * Math.min(1, deltaMs / 220);
          angleOffset += (angularVel * deltaMs) / 1000;
          renderWheel();
        };

        const onEnter = () => {
          hovered = true;
        };
        const onLeave = () => {
          hovered = false;
        };
        const onResize = () => {
          fontSize = parseFloat(getComputedStyle(container).fontSize) || 16;
          renderWheel();
        };

        inner.addEventListener("pointerenter", onEnter);
        inner.addEventListener("pointerleave", onLeave);
        window.addEventListener("resize", onResize);

        const st = ScrollTrigger.create({
          trigger: inner,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            inView = self.isActive;
          },
        });

        renderWheel();
        gsap.ticker.add(tickWheel);

        return () => {
          gsap.ticker.remove(tickWheel);
          inner.removeEventListener("pointerenter", onEnter);
          inner.removeEventListener("pointerleave", onLeave);
          window.removeEventListener("resize", onResize);
          st.kill();
          container.classList.remove("roda-ativa");
          outers.forEach((el) => {
            el.style.transform = "";
          });
        };
      });

      mm.add("(max-width: 991px)", () => {
        let elapsed = 0;
        let active = false;
        const st = ScrollTrigger.create({
          trigger: inner,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            active = self.isActive;
          },
        });
        const tickMob = (_time: number, deltaMs: number) => {
          if (!active) return;
          elapsed += deltaMs / 1000;
          outers.forEach((el, idx) => {
            const phase = 0.9 * elapsed + 0.95 * idx;
            el.style.transform = `translate3d(${(5 * Math.cos(phase)).toFixed(2)}px, ${(
              5 * Math.sin(phase)
            ).toFixed(2)}px, 0)`;
          });
        };
        gsap.ticker.add(tickMob);
        return () => {
          gsap.ticker.remove(tickMob);
          st.kill();
          outers.forEach((el) => {
            el.style.transform = "";
          });
        };
      });
    })();

    // Projects slider (#projetos)
    (() => {
      const slider = queryOne("[data-slider]");
      if (!slider) return;
      const items = queryAll(".testimonial-slider-item-wrap", slider);
      const count = items.length;
      const state = { pos: 0 };
      let itemWidth = items[0]?.offsetWidth ?? 1;

      const updateSlider = () => {
        const activeIdx = gsap.utils.wrap(0, count, Math.round(state.pos));
        items.forEach((el, idx) => {
          const wrapped = gsap.utils.wrap(-count / 2, count / 2, idx - state.pos);
          el.style.transform = `translate3d(${(wrapped - idx) * itemWidth}px,0,0)`;
          el.classList.toggle("is-active", idx === activeIdx);
        });
      };

      const animateTo = (targetPos: number) =>
        gsap.to(state, {
          pos: targetPos,
          duration: reducedMotion ? 0 : 0.9,
          ease: "smooth-ease",
          onUpdate: updateSlider,
          overwrite: true,
        });

      const onResize = () => {
        itemWidth = items[0]?.offsetWidth ?? 1;
        updateSlider();
      };
      onResize();
      window.addEventListener("resize", onResize);
      cleanups.push(() => window.removeEventListener("resize", onResize));

      const [leftBtn, rightBtn] = queryAll<HTMLButtonElement>("[data-slider-arrows] button");
      const onLeft = () => animateTo(Math.round(state.pos) - 1);
      const onRight = () => animateTo(Math.round(state.pos) + 1);
      leftBtn?.addEventListener("click", onLeft);
      rightBtn?.addEventListener("click", onRight);

      let startX = 0;
      let startPos = 0;
      let dragged = false;
      let pointerDown = false;

      const onPointerDown = (ev: PointerEvent) => {
        pointerDown = true;
        dragged = false;
        startX = ev.clientX;
        startPos = state.pos;
        gsap.killTweensOf(state);
      };
      const onPointerMove = (ev: PointerEvent) => {
        if (!pointerDown) return;
        const delta = ev.clientX - startX;
        if (Math.abs(delta) > 6) dragged = true;
        state.pos = startPos - delta / itemWidth;
        updateSlider();
      };
      const onPointerUp = () => {
        if (pointerDown) {
          pointerDown = false;
          animateTo(Math.round(state.pos));
        }
      };
      const onClickCapture = (ev: MouseEvent) => {
        if (dragged) ev.preventDefault();
      };
      const onDragStart = (ev: DragEvent) => ev.preventDefault();

      slider.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      slider.addEventListener("click", onClickCapture, true);
      slider.addEventListener("dragstart", onDragStart);

      cleanups.push(() => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      });

      queryAll("[data-testimonial-inview]").forEach((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 75%",
          once: true,
          onEnter: () => void animateTo(Math.round(state.pos) + 1),
        })
      );

      queryAll("[data-testimonial-parallax]").forEach((el) => {
        const pItems = queryAll("[data-testimonial-parallax-item]", el);
        mm.add("(min-width: 992px)", () => {
          if (!reducedMotion) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              })
              .to(pItems, { yPercent: 5, ease: "none", duration: 1 });
          }
        });
      });
    })();

    // DailyMeals Swiper (#prato)
    (() => {
      const contentEl = queryOne("[data-flavour-content]");
      if (!contentEl) return;
      const isMobile = matchMedia("(max-width: 991px)").matches;

      const visualSwiper = new Swiper("[data-flavour-slider]", {
        modules: [Navigation, Controller, EffectCreative],
        grabCursor: isMobile,
        allowTouchMove: isMobile,
        effect: "creative",
        loop: true,
        speed: 600,
        creativeEffect: {
          prev: {
            translate: isMobile ? ["-80%", "15%", 0] : ["-60%", "15%", 0],
            opacity: 0,
            scale: 0.35,
            rotate: [0, 0, -15],
          },
          next: {
            translate: isMobile ? ["80%", "15%", 0] : ["50%", "15%", 0],
            opacity: 0,
            scale: 0.6,
            rotate: [0, 0, 35],
          },
        },
        navigation: {
          nextEl: "[data-flavour-slider-right-button]",
          prevEl: "[data-flavour-slider-left-button]",
        },
        initialSlide: 3,
      });

      const textSwiper = new Swiper("[data-flavour-content-slider]", {
        modules: [Navigation, Controller, EffectCreative],
        effect: "creative",
        loop: true,
        speed: 600,
        allowTouchMove: isMobile,
        creativeEffect: {
          prev: {
            translate: isMobile ? ["-75%", "15%", 0] : ["-40%", "15%", 0],
            opacity: 0,
            scale: 0.5,
          },
          next: {
            translate: isMobile ? ["75%", "15%", 0] : ["40%", "15%", 0],
            opacity: 0,
            scale: 0.5,
          },
        },
        initialSlide: 3,
      });

      visualSwiper.controller.control = textSwiper;
      textSwiper.controller.control = visualSwiper;
      cleanups.push(() => {
        visualSwiper.destroy();
        textSwiper.destroy();
      });

      const bgPath = queryOne("[data-flavour-content-svg] path");
      if (bgPath) gsap.set(bgPath, { drawSVG: "65% 65%" });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: contentEl,
            start: "top 65%",
            once: true,
            onEnter: () => void gsap.delayedCall(0.1, () => visualSwiper.slideNext()),
          },
        })
        .to(bgPath, { drawSVG: "165% 65%", ease: "power2.out", duration: 1.4 });
    })();

    // Videos play/pause on scroll and mute/unmute button
    queryAll<HTMLVideoElement>("[data-video]").forEach((vid) => {
      const btn = vid.parentElement?.parentElement?.querySelector("[data-video-button]");
      vid.pause();
      ScrollTrigger.create({
        trigger: vid,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => void vid.play().catch(() => {}),
        onEnterBack: () => void vid.play().catch(() => {}),
        onLeave: () => vid.pause(),
        onLeaveBack: () => vid.pause(),
      });
      btn?.addEventListener("click", () => {
        const wasMuted = vid.muted;
        vid.muted = !wasMuted;
        btn.classList.toggle("is-clicked", wasMuted);
        if (wasMuted) vid.play().catch(() => {});
      });
    });

    // Fonts ready + highlight text animations
    document.fonts.ready.then(() => {
      htmlEl.classList.add("fonts-loaded");
      runStageIntro();
      queryAll("[data-highlight-text]").forEach((el) => {
        if (reducedMotion) return;
        const sp = SplitText.create(el, { type: "words", wordsClass: "split-word" });
        splits.push(sp);
        mm.add("(min-width: 992px)", () => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 96%", once: true },
          });
          gsap.set(sp.words, { transformOrigin: "bottom right" });
          tl.fromTo(
            sp.words,
            { yPercent: 25, xPercent: 75, opacity: 0, scale: 0.6 },
            {
              yPercent: 0,
              xPercent: 0,
              opacity: 1,
              scale: 1,
              ease: "elastic-ease-out-soft",
              duration: 1,
              stagger: 0.039,
            }
          ).to(
            sp.words,
            { color: "var(--light-green)", ease: "none", duration: 0.15, stagger: 0.039 },
            "<+.1"
          );
        });
        mm.add("(max-width: 991px)", () => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
          gsap.set(sp.words, { transformOrigin: "center center" });
          tl.to(sp.words, {
            color: "var(--light-green)",
            ease: "none",
            duration: 0.15,
            stagger: 0.039,
          });
        });
      });
      ScrollTrigger.refresh();
    });

    const mqDesktop = matchMedia("(min-width: 992px)");
    const onBpChange = () => location.reload();
    mqDesktop.addEventListener("change", onBpChange);
    cleanups.push(() => mqDesktop.removeEventListener("change", onBpChange));

    return () => {
      mm.revert();
      splits.forEach((s) => s.revert());
      cleanups.forEach((fn) => fn());
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return null;
}
