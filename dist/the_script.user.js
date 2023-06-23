// ==UserScript==
// @name The Script
// @description A script for grepolis
// @version 0.0.1
// @author Sau1707
// @match https://*.grepolis.com/game/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(()=>{"use strict";const e=class{subscribe(e,s){$.Observer(GameEvents.window.open).subscribe(s.name,((n,i)=>{i.wnd&&i.wnd.type===e&&s(i.wnd)}))}unsubscribe(e){$.Observer(GameEvents.window.open).unsubscribe(e.name)}},s=unsafeWindow;s.bugFix=new class extends e{activate(){this.subscribe(GPWindowMgr.TYPE_PLAYER_SETTINGS,this.onOpenSettings)}deactivate(){this.unsubscribe(this.onOpenSettings)}onOpenSettings(){$("#version").css("position","unset")}},s.bugFix.activate(),console.log("Active")})();