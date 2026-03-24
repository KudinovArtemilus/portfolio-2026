import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scrolling (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Hero Animations
const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

tl.from(".hero-bg img", {
    scale: 1.2,
    duration: 2.5,
    opacity: 0,
})
    .from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.5,
    }, "-=1.5")
    .from(".reveal-text-sub", {
        y: 30,
        opacity: 0,
        duration: 1,
    }, "-=1")
    .from(".cta-container", {
        y: 20,
        opacity: 0,
        duration: 1,
    }, "-=0.8");

// Scroll Reveal Animations
const revealItems = document.querySelectorAll('.reveal-item, .timeline-item, .skill-tag, .edu-card');
const sectionTitles = document.querySelectorAll('.section-title');

sectionTitles.forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: -20,
        duration: 1,
        ease: "power2.out"
    });
});

revealItems.forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: item.classList.contains('skill-tag') ? (index % 5) * 0.1 : item.classList.contains('timeline-item') ? (index % 2) * 0.2 : 0
    });
});

// About section specific parallax
gsap.to(".about-text", {
    scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    y: -50,
    ease: "none"
});

// Navbar change on scroll
const navbar = document.querySelector('.navbar');
ScrollTrigger.create({
    start: "top -50",
    onUpdate: (self) => {
        if (self.direction === 1) {
            gsap.to(navbar, { y: -100, duration: 0.3 });
        } else {
            gsap.to(navbar, { y: 0, duration: 0.3 });
        }
    }
});

// Link smoothing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target);
        }
    });
});
