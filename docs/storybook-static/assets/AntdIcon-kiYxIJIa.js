import{r as s,R as y}from"./index-CqIc3cxq.js";import{k as j,I as T,m as N,n as O,c as z,o as A}from"./colors-D51g0Eqm.js";import{g as P}from"./shadow-CeIA3n_7.js";function B(e){return e.replace(/-(.)/g,(n,o)=>o.toUpperCase())}function D(e,n){O(e,`[@ant-design/icons] ${n}`)}function b(e){return typeof e=="object"&&typeof e.name=="string"&&typeof e.theme=="string"&&(typeof e.icon=="object"||typeof e.icon=="function")}function h(e={}){return Object.keys(e).reduce((n,o)=>{const t=e[o];return o==="class"?(n.className=t,delete n.class):(delete n[o],n[B(o)]=t),n},{})}function p(e,n,o){return o?y.createElement(e.tag,{key:n,...h(e.attrs),...o},(e.children||[]).map((t,r)=>p(t,`${n}-${e.tag}-${r}`))):y.createElement(e.tag,{key:n,...h(e.attrs)},(e.children||[]).map((t,r)=>p(t,`${n}-${e.tag}-${r}`)))}function w(e){return j(e)[0]}function x(e){return e?Array.isArray(e)?e:[e]:[]}const L=`
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
  vertical-align: inherit;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,U=e=>{const{csp:n,prefixCls:o,layer:t}=s.useContext(T);let r=L;o&&(r=r.replace(/anticon/g,o)),t&&(r=`@layer ${t} {
${r}
}`),s.useEffect(()=>{const i=e.current,c=P(i);N(r,"@ant-design-icons",{prepend:!t,csp:n,attachTo:c})},[])},m={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function _({primaryColor:e,secondaryColor:n}){m.primaryColor=e,m.secondaryColor=n||w(e),m.calculated=!!n}function q(){return{...m}}const l=e=>{const{icon:n,className:o,onClick:t,style:r,primaryColor:i,secondaryColor:c,...g}=e,u=s.useRef(null);let f=m;if(i&&(f={primaryColor:i,secondaryColor:c||w(i)}),U(u),D(b(n),`icon should be icon definiton, but got ${n}`),!b(n))return null;let a=n;return a&&typeof a.icon=="function"&&(a={...a,icon:a.icon(f.primaryColor,f.secondaryColor)}),p(a.icon,`svg-${a.name}`,{className:o,onClick:t,style:r,"data-icon":a.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",...g,ref:u})};l.displayName="IconReact";l.getTwoToneColors=q;l.setTwoToneColors=_;function $(e){const[n,o]=x(e);return l.setTwoToneColors({primaryColor:n,secondaryColor:o})}function F(){const e=l.getTwoToneColors();return e.calculated?[e.primaryColor,e.secondaryColor]:e.primaryColor}function C(){return C=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(e[t]=o[t])}return e},C.apply(this,arguments)}$(A.primary);const v=s.forwardRef((e,n)=>{const{className:o,icon:t,spin:r,rotate:i,tabIndex:c,onClick:g,twoToneColor:u,...f}=e,{prefixCls:a="anticon",rootClassName:I}=s.useContext(T),S=z(I,a,{[`${a}-${t.name}`]:!!t.name,[`${a}-spin`]:!!r||t.name==="loading"},o);let d=c;d===void 0&&g&&(d=-1);const E=i?{msTransform:`rotate(${i}deg)`,transform:`rotate(${i}deg)`}:void 0,[R,k]=x(u);return s.createElement("span",C({role:"img","aria-label":t.name},f,{ref:n,tabIndex:d,onClick:g,className:S}),s.createElement(l,{icon:t,primaryColor:R,secondaryColor:k,style:E}))});v.getTwoToneColor=F;v.setTwoToneColor=$;export{v as I};
