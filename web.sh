ma="\033[91m"
ku="\033[93m"
ijo="\033[92m"
ka="\033[93m"
biru="\033[94m"
reset="\033[0m"
ala="\033[1;97m"
cyan="\033[1;96m"
bl="\033[;94m"
ex="echo -e"
pip="curl ifconfig.me"

$ex "${ala}[${biru}INFO${ala}] opening web server ..."
$ex "${ala}[${biru}INFO${ala}] ur web gui open : "
$ex "${ala}[${ku}PRIVATE${ala}] http://localhost:1337/"
$ex "${ala}[${ijo}PUBLIC${ala}] `$pip` :1337"
$ex
$ex "${ala}[${ma}WARNING${ala}] make sure u have opened botnet api (api/api.js) or have api online list in api.txt"
$ex
php -S localhost:1337
