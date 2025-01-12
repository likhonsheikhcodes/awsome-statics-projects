import { initTheme } from './modules/theme.js';
import { initProjects } from './modules/projects.js';
import { initInfiniteScroll } from './modules/infinite-scroll.js';
import { initOfflineDetection } from './modules/offline-detection.js';
import { initBackToTop } from './modules/back-to-top.js';
import { initPerformanceMonitoring } from './modules/performance-monitoring.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initProjects();
    initInfiniteScroll();
    initOfflineDetection();
    initBackToTop();
    initPerformanceMonitoring();
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

