require("source-map-support/register"),module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=2)}([function(e,t){e.exports=require("nuxt")},function(e,t){e.exports=require("koa")},function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),i=n(0);!async function(){const e=new o.a,t=process.env.HOST||"127.0.0.1",r=process.env.PORT||3002;let s=n(3);s.dev=!("production"===e.env);const c=new i.Nuxt(s);if(s.dev){const e=new i.Builder(c);await e.build()}e.use(async(e,t)=>(await t(),e.status=200,new Promise((t,n)=>{e.res.on("close",t),e.res.on("finish",t),c.render(e.req,e.res,e=>{e.then(t).catch(n)})}))),e.listen(r,t),console.log("Server listening on "+t+":"+r)}()},function(e,t){e.exports={head:{title:"Naice",meta:[{charset:"utf-8"},{"http-equiv":"cleartype",content:"on"},{"http-equiv":"Cache-Control"},{name:"viewport",content:"width=device-width, initial-scale=1, user-scalable=no"},{hid:"description",name:"description",content:"Naice, 前端, blog"},{hid:"keywords",name:"keywords",content:"前端开发，JavaScript, Node, Vue，nuxt"},{name:"author",content:"370215230@qq.com"}],link:[{rel:"icon",type:"image/x-icon",href:"/favicon.ico"}],script:[{src:"https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"},{src:"https://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js"}]},css:["~assets/css/init.css","~assets/css/codeStyle.css"],loading:{color:"#3B8070"},build:{extend(e,{isDev:t,isClient:n}){t&&n&&e.module.rules.push({enforce:"pre",test:/\.(js|vue)$/,loader:"eslint-loader",exclude:/(node_modules)/})}},cache:!0}}]);
//# sourceMappingURL=main.map