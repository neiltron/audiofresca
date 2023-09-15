import{C as Ce,s as G,f as w,g as b,h as E,d as _,k as ce,j as d,i as C,w as v,A as k,D as Ie,B as P,E as $e,l as z,a as S,m as B,c as D,u as V,F,n as M,G as ke,H as ue,I as pe,e as fe,o as Te,J as de,p as je}from"../chunks/scheduler.d4ff9e85.js";import{S as J,i as H,t as O,c as _e,a as A,b as Z,d as x,m as ee,e as te,g as me}from"../chunks/index.07348c5b.js";import{d as Ae,w as U}from"../chunks/index.ca00c9cf.js";import{_ as he}from"../chunks/preload-helper.a4192956.js";function ge(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}const I=U({resources:[],spritemap:{}});Ae(I,n=>new Blob([JSON.stringify(n)],{type:"application/json"}));const Re=Ae(I,n=>{const e={src:["audio.mp3","audio.ogg"],sprite:n.resources.map(t=>({[t]:[n.spritemap[t].start,n.spritemap[t].end-n.spritemap[t].start]})).reduce((t,s)=>({...t,...s}),{})};return new Blob([JSON.stringify(e)],{type:"application/json"})}),ve="https://unpkg.com/@ffmpeg/core@0.12.3/dist/esm";let L=null;const se=U(!1),Ue=async()=>{const{FFmpeg:n}=await he(()=>import("../chunks/index.23e2fae8.js"),[],import.meta.url),{toBlobURL:e}=await he(()=>import("../chunks/index.c5152193.js"),[],import.meta.url);L=new n,await L.load({coreURL:await e(`${ve}/ffmpeg-core.js`,"text/javascript"),wasmURL:await e(`${ve}/ffmpeg-core.wasm`,"applicaiton/wasm")}),se.set(!0)};let Se=!1,Y=null,De=null,Le=U(null),W=null,X=0,q=[],we=null,ze=0;var Ne=(n=>(n.Idle="IDLE",n.Loading="LOADING",n.Processing="PROCESSING",n.Concatenating="CONCATENATING",n.Complete="COMPLETE",n))(Ne||{});const R=U("IDLE"),Pe=U(0),Be=async n=>{console.log(n),R.set("PROCESSING");const e=qe(n),t=await Promise.all(e);R.set("CONCATENATING"),await L.writeFile("concat_list.txt",t.join(`
`)),await L.exec(["-f","concat","-safe","0","-i","concat_list.txt","outputAll.mp3"]),Me(),W=await L.readFile("outputAll.mp3"),Y=new File([W.buffer],"audio.mp3",{type:"audio/mpeg"}),De=new File([W.buffer],"audio.ogg",{type:"audio/ogg"}),Le.set(URL.createObjectURL(Y)),Se=!0,R.set("COMPLETE"),setTimeout(()=>{R.set("IDLE")},1e3)},Me=()=>{let n=Ce(I);console.log("spritedef",n),n.resources.forEach((e,t)=>{console.log("what",e),n.spritemap[e]={start:X,end:X+q[t]},X+=q[t]}),I.set(n)},qe=n=>{const e=Ce(I),t=new AudioContext;return Array.from(n).map(async(s,l)=>{let r=new FileReader;return new Promise(async(a,o)=>{e.resources.push(s.name),e.spritemap[s.name]={start:0,end:0},we=new Uint8Array(await s.arrayBuffer()),await L.writeFile(s.name,we),r.onloadend=async u=>{const i=await t.decodeAudioData(u.target.result);q[l]=i.duration,await L.exec(["-i",e.resources[l],"-af",`afade=in:st=0:d=0.01,afade=out:st=${q[l]-.01}:d=0.01`,`item${l}.mp3`]),await L.deleteFile(e.resources[l]),Pe.set(++ze/n.length*100),a(`file 'item${l}.mp3'`)},r.readAsArrayBuffer(s)})})};function Ge(n){let e,t;return{c(){e=w("div"),t=w("div"),this.h()},l(s){e=b(s,"DIV",{class:!0});var l=E(e);t=b(l,"DIV",{style:!0,class:!0}),E(t).forEach(_),l.forEach(_),this.h()},h(){ce(t,"width",n[0]+"%"),d(t,"class","svelte-2iemiy"),d(e,"class","progress_bar svelte-2iemiy")},m(s,l){C(s,e,l),v(e,t)},p(s,[l]){l&1&&ce(t,"width",s[0]+"%")},i:k,o:k,d(s){s&&_(e)}}}function Ve(n,e,t){let{progress:s=0}=e;return n.$$set=l=>{"progress"in l&&t(0,s=l.progress)},[s]}class Je extends J{constructor(e){super(),H(this,e,Ve,Ge,G,{progress:0})}}function be(n,e,t){const s=n.slice();return s[5]=e[t][0],s[6]=e[t][1],s}function ye(n){let e,t,s=n[5]+"",l,r,a,o,u=Math.floor(n[6].start*1e4)/1e4+"",i,c,m,p,h=Math.floor(n[6].end*1e4)/1e4+"",T,j,f,y,$,ne="Play",K,Q,le;function Fe(){return n[2](n[6])}function Oe(){return n[3](n[6])}return{c(){e=w("li"),t=w("span"),l=z(s),a=S(),o=w("span"),i=z(u),m=S(),p=w("span"),T=z(h),f=S(),y=w("span"),$=w("button"),$.textContent=ne,K=S(),this.h()},l(N){e=b(N,"LI",{class:!0});var g=E(e);t=b(g,"SPAN",{title:!0,class:!0});var ae=E(t);l=B(ae,s),ae.forEach(_),a=D(g),o=b(g,"SPAN",{title:!0,class:!0});var re=E(o);i=B(re,u),re.forEach(_),m=D(g),p=b(g,"SPAN",{title:!0,class:!0});var oe=E(p);T=B(oe,h),oe.forEach(_),f=D(g),y=b(g,"SPAN",{class:!0});var ie=E(y);$=b(ie,"BUTTON",{"data-svelte-h":!0}),V($)!=="svelte-r26d3t"&&($.textContent=ne),ie.forEach(_),K=D(g),g.forEach(_),this.h()},h(){d(t,"title",r=n[5]),d(t,"class","svelte-fz4vs6"),d(o,"title",c=n[6].start.toString()),d(o,"class","svelte-fz4vs6"),d(p,"title",j=n[6].end.toString()),d(p,"class","svelte-fz4vs6"),d(y,"class","svelte-fz4vs6"),d(e,"class","svelte-fz4vs6")},m(N,g){C(N,e,g),v(e,t),v(t,l),v(e,a),v(e,o),v(o,i),v(e,m),v(e,p),v(p,T),v(e,f),v(e,y),v(y,$),v(e,K),Q||(le=[F($,"click",Fe),F($,"keydown",Oe)],Q=!0)},p(N,g){n=N,g&1&&s!==(s=n[5]+"")&&M(l,s),g&1&&r!==(r=n[5])&&d(t,"title",r),g&1&&u!==(u=Math.floor(n[6].start*1e4)/1e4+"")&&M(i,u),g&1&&c!==(c=n[6].start.toString())&&d(o,"title",c),g&1&&h!==(h=Math.floor(n[6].end*1e4)/1e4+"")&&M(T,h),g&1&&j!==(j=n[6].end.toString())&&d(p,"title",j)},d(N){N&&_(e),Q=!1,ke(le)}}}function He(n){let e,t=ge(Object.entries(n[0].spritemap)),s=[];for(let l=0;l<t.length;l+=1)s[l]=ye(be(n,t,l));return{c(){e=w("ul");for(let l=0;l<s.length;l+=1)s[l].c();this.h()},l(l){e=b(l,"UL",{class:!0});var r=E(e);for(let a=0;a<s.length;a+=1)s[a].l(r);r.forEach(_),this.h()},h(){d(e,"class","svelte-fz4vs6")},m(l,r){C(l,e,r);for(let a=0;a<s.length;a+=1)s[a]&&s[a].m(e,null)},p(l,[r]){if(r&3){t=ge(Object.entries(l[0].spritemap));let a;for(a=0;a<t.length;a+=1){const o=be(l,t,a);s[a]?s[a].p(o,r):(s[a]=ye(o),s[a].c(),s[a].m(e,null))}for(;a<s.length;a+=1)s[a].d(1);s.length=t.length}},i:k,o:k,d(l){l&&_(e),Ie(s,l)}}}function Ke(n,e,t){let s;P(n,I,u=>t(0,s=u));const l=$e();function r(u){l("playSegment",{sprite:u})}return[s,r,u=>r(u),u=>r(u)]}class Qe extends J{constructor(e){super(),H(this,e,Ke,He,G,{})}}function We(n){let e,t,s,l;return{c(){e=w("div"),t=w("input"),this.h()},l(r){e=b(r,"DIV",{class:!0,role:!0,tabindex:!0});var a=E(e);t=b(a,"INPUT",{type:!0,accept:!0,class:!0}),a.forEach(_),this.h()},h(){d(t,"type","file"),t.multiple=!0,d(t,"accept","audio/*"),d(t,"class","svelte-7eeame"),d(e,"class","dropzone svelte-7eeame"),d(e,"role","button"),d(e,"tabindex","0"),ue(e,"over",n[1])},m(r,a){C(r,e,a),v(e,t),s||(l=[F(t,"change",n[3]),F(t,"change",n[2]),F(e,"dragover",pe(n[4])),F(e,"dragleave",pe(n[5]))],s=!0)},p(r,[a]){a&2&&ue(e,"over",r[1])},i:k,o:k,d(r){r&&_(e),s=!1,ke(l)}}}function Xe(n,e,t){let s=null,l=!1;const r=$e();function a(c){console.log(c),c.target.files,r("drop",s)}function o(){s=this.files,t(0,s)}return[s,l,a,o,c=>t(1,l=!0),c=>t(1,l=!1)]}class Ye extends J{constructor(e){super(),H(this,e,Xe,We,G,{})}}function Ze(n){let e,t;return e=new Ye({props:{$$slots:{default:[tt]},$$scope:{ctx:n}}}),e.$on("drop",n[7]),{c(){Z(e.$$.fragment)},l(s){x(e.$$.fragment,s)},m(s,l){ee(e,s,l),t=!0},p(s,l){const r={};l&8192&&(r.$$scope={dirty:l,ctx:s}),e.$set(r)},i(s){t||(A(e.$$.fragment,s),t=!0)},o(s){O(e.$$.fragment,s),t=!1},d(s){te(e,s)}}}function xe(n){let e,t,s,l,r;return l=new Je({props:{progress:n[2]}}),{c(){e=w("p"),t=z(n[1]),s=S(),Z(l.$$.fragment)},l(a){e=b(a,"P",{});var o=E(e);t=B(o,n[1]),o.forEach(_),s=D(a),x(l.$$.fragment,a)},m(a,o){C(a,e,o),v(e,t),C(a,s,o),ee(l,a,o),r=!0},p(a,o){(!r||o&2)&&M(t,a[1]);const u={};o&4&&(u.progress=a[2]),l.$set(u)},i(a){r||(A(l.$$.fragment,a),r=!0)},o(a){O(l.$$.fragment,a),r=!1},d(a){a&&(_(e),_(s)),te(l,a)}}}function et(n){let e,t="Loading ffmpeg...";return{c(){e=w("p"),e.textContent=t},l(s){e=b(s,"P",{"data-svelte-h":!0}),V(e)!=="svelte-v5qt5p"&&(e.textContent=t)},m(s,l){C(s,e,l)},p:k,i:k,o:k,d(s){s&&_(e)}}}function tt(n){let e,t="Drop audio files here";return{c(){e=w("p"),e.textContent=t},l(s){e=b(s,"P",{"data-svelte-h":!0}),V(e)!=="svelte-1yo73gu"&&(e.textContent=t)},m(s,l){C(s,e,l)},p:k,d(s){s&&_(e)}}}function Ee(n){let e,t,s,l,r,a="Download",o,u,i,c,m;return u=new Qe({}),u.$on("playSegment",n[6]),{c(){e=w("div"),t=w("audio"),l=S(),r=w("button"),r.textContent=a,o=S(),Z(u.$$.fragment),this.h()},l(p){e=b(p,"DIV",{class:!0});var h=E(e);t=b(h,"AUDIO",{src:!0,class:!0}),E(t).forEach(_),l=D(h),r=b(h,"BUTTON",{"data-svelte-h":!0}),V(r)!=="svelte-3kqluj"&&(r.textContent=a),h.forEach(_),o=D(p),x(u.$$.fragment,p),this.h()},h(){t.controls=!0,de(t.src,s=n[4])||d(t,"src",s),d(t,"class","svelte-19cfqz8"),d(e,"class","audio_container svelte-19cfqz8")},m(p,h){C(p,e,h),v(e,t),n[8](t),v(e,l),v(e,r),C(p,o,h),ee(u,p,h),i=!0,c||(m=F(r,"click",n[5]),c=!0)},p(p,h){(!i||h&16&&!de(t.src,s=p[4]))&&d(t,"src",s)},i(p){i||(A(u.$$.fragment,p),i=!0)},o(p){O(u.$$.fragment,p),i=!1},d(p){p&&(_(e),_(o)),n[8](null),te(u,p),c=!1,m()}}}function st(n){let e,t,s,l,r;const a=[et,xe,Ze],o=[];function u(c,m){return se?c[1]!==Ne.Idle?1:Se?-1:2:0}~(e=u(n))&&(t=o[e]=a[e](n));let i=n[3].resources.length>0&&Ee(n);return{c(){t&&t.c(),s=S(),i&&i.c(),l=fe()},l(c){t&&t.l(c),s=D(c),i&&i.l(c),l=fe()},m(c,m){~e&&o[e].m(c,m),C(c,s,m),i&&i.m(c,m),C(c,l,m),r=!0},p(c,[m]){let p=e;e=u(c),e===p?~e&&o[e].p(c,m):(t&&(me(),O(o[p],1,1,()=>{o[p]=null}),_e()),~e?(t=o[e],t?t.p(c,m):(t=o[e]=a[e](c),t.c()),A(t,1),t.m(s.parentNode,s)):t=null),c[3].resources.length>0?i?(i.p(c,m),m&8&&A(i,1)):(i=Ee(c),i.c(),A(i,1),i.m(l.parentNode,l)):i&&(me(),O(i,1,1,()=>{i=null}),_e())},i(c){r||(A(t),A(i),r=!0)},o(c){O(t),O(i),r=!1},d(c){c&&(_(s),_(l)),~e&&o[e].d(c),i&&i.d(c)}}}function nt(n,e,t){let s,l,r,a,o,u;P(n,Re,f=>t(11,s=f)),P(n,se,f=>t(12,l=f)),P(n,R,f=>t(1,r=f)),P(n,Pe,f=>t(2,a=f)),P(n,I,f=>t(3,o=f)),P(n,Le,f=>t(4,u=f));let i=null,c=null,m=null;Te(async()=>{l||await Ue()});const p=async()=>{m=new File([s],"sprite.json",{type:"application/json"}),[Y,De,m].forEach(f=>{console.log(f);const y=document.createElement("a");y.href=URL.createObjectURL(f),y.download=f.name,y.click(),y.remove()})},h=f=>{const{start:y,end:$}=f.detail.sprite;t(0,i.currentTime=y,i),i.play(),c&&clearTimeout(c),c=setTimeout(()=>{i.pause()},($-y)*1e3)},T=f=>Be(f.detail);function j(f){je[f?"unshift":"push"](()=>{i=f,t(0,i)})}return[i,r,a,o,u,p,h,T,j]}class it extends J{constructor(e){super(),H(this,e,nt,st,G,{})}}export{it as component};
