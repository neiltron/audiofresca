import{s as S,f as _,l as d,a as x,g as f,h as g,m as h,d as l,c as q,i as m,w as v,n as $,A as E,B as w}from"../chunks/scheduler.fb4d808a.js";import{S as y,i as A}from"../chunks/index.19c8eb05.js";import{d as B}from"../chunks/singletons.8eeed907.js";const C=()=>{const s=B;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},H={subscribe(s){return C().page.subscribe(s)}};function P(s){var b;let t,r=s[0].status+"",o,n,i,c=((b=s[0].error)==null?void 0:b.message)+"",u;return{c(){t=_("h1"),o=d(r),n=x(),i=_("p"),u=d(c)},l(e){t=f(e,"H1",{});var a=g(t);o=h(a,r),a.forEach(l),n=q(e),i=f(e,"P",{});var p=g(i);u=h(p,c),p.forEach(l)},m(e,a){m(e,t,a),v(t,o),m(e,n,a),m(e,i,a),v(i,u)},p(e,[a]){var p;a&1&&r!==(r=e[0].status+"")&&$(o,r),a&1&&c!==(c=((p=e[0].error)==null?void 0:p.message)+"")&&$(u,c)},i:E,o:E,d(e){e&&(l(t),l(n),l(i))}}}function j(s,t,r){let o;return w(s,H,n=>r(0,o=n)),[o]}let F=class extends y{constructor(t){super(),A(this,t,j,P,S,{})}};export{F as component};
