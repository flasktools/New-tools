// ==UserScript==
// @name The Script
// @description A script for grepolis
// @version 0.0.1
// @author Sau1707
// @match https://*.grepolis.com/game/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(()=>{"use strict";const t=require("fs"),e=require("path");!function(n,i){const r=t.readdirSync(n).reduce(((i,r)=>{const o=e.join(n,r);if(t.statSync(o).isFile()){const e=function(e){return t.readFileSync(e,"utf-8").split("\n").filter((t=>!/^import\s/.test(t))).join("\n")}(o);return i+"\n"+e}return i}),"");t.writeFileSync("./path/to/outputFile.js",r)}("./path/to/module")})();