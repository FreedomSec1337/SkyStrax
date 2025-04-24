function updateDateTime() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  document.getElementById('current-date').textContent = dateStr;
  document.getElementById('current-time').textContent = timeStr;
}
setInterval(updateDateTime, 1000);
updateDateTime();

function showNotification(type = 'success', message = '') {
  const notif = document.getElementById('notification');
  const icon = notif.querySelector('.notification-icon');
  const msg = notif.querySelector('.notification-message');

  const iconClasses = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle'
  };

  notif.className = `notification notification-${type} show`;
  icon.className = `notification-icon ${iconClasses[type] || ''}`;
  msg.textContent = message;

  setTimeout(() => notif.classList.remove('show'), 5000);
}

function startProgress(duration = 10) {
  const progress = document.getElementById('progress-fill');
  const timer = document.getElementById('timer');
  const container = document.getElementById('operation-progress');

  container.style.display = 'block';
  progress.style.transition = `width ${duration}s linear`;
  progress.style.width = '0%';

  let timeLeft = duration;
  timer.textContent = `${timeLeft}s`;

  setTimeout(() => {
    progress.style.width = '100%';
  }, 50);

  const interval = setInterval(() => {
    timeLeft--;
    timer.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(interval);
      container.style.display = 'none';
      showNotification('success', 'Attack completed');
    }
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('api.txt')
    .then(res => res.text())
    .then(text => {
      const count = text.split('\n').filter(line => line.trim()).length;
      document.getElementById('apis-count').textContent = count;
    })
    .catch(() => {
      document.getElementById('apis-count').textContent = '?';
    });

  const attackCount = localStorage.getItem('attackCount') || '0';
  document.getElementById('attacks-count').textContent = attackCount;
});
