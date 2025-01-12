export function initPerformanceMonitoring() {
    if ('performance' in window && 'getEntriesByType' in performance) {
        window.addEventListener('load', () => {
            const paintMetrics = performance.getEntriesByType('paint');
            const navigationTiming = performance.getEntriesByType('navigation')[0];

            console.log('First Contentful Paint:', paintMetrics.find(({ name }) => name === 'first-contentful-paint').startTime);
            console.log('DOM Content Loaded:', navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart);
            console.log('Load Time:', navigationTiming.loadEventEnd - navigationTiming.loadEventStart);
        });
    }
}

