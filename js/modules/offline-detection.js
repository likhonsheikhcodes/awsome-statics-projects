export function initOfflineDetection() {
    const offlineNotification = document.getElementById('offline-notification');

    function updateOnlineStatus() {
        if (navigator.onLine) {
            offlineNotification.setAttribute('aria-hidden', 'true');
            offlineNotification.style.display = 'none';
        } else {
            offlineNotification.removeAttribute('aria-hidden');
            offlineNotification.style.display = 'block';
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Initial check
    updateOnlineStatus();
}

