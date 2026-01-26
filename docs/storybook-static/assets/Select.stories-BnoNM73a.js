import{j as e}from"./index-BWDtiai5.js";import{r as w}from"./index-CqIc3cxq.js";import{C as O,d as r}from"./colors-D51g0Eqm.js";import{S as P}from"./index-DpWYm5eN.js";import{I as q}from"./index-DSpOHq7f.js";import{c as f}from"./createLucideIcon-BdM0yjir.js";import{C as A}from"./Checkbox-D8PshV6K.js";import{r as j}from"./radius-D95ghGs1.js";import"./index-DFVzyPiA.js";import"./useControlledState-BlmcFhdJ.js";import"./motion-DoGSblpk.js";import"./shadow-CeIA3n_7.js";import"./pickAttrs-BoNuQqbq.js";import"./Overflow-Bltdy1R3.js";import"./extends-CF3RwP-h.js";import"./omit-3QAACPn7.js";import"./KeyCode-_5CS0hxx.js";import"./motion-x2uLR_1e.js";import"./TextArea-Va9Z0Kw3.js";import"./AntdIcon-kiYxIJIa.js";import"./useCSSVarCls-DSIlCV5N.js";import"./useSize-2ERO23pv.js";import"./context-CrGhmAV9.js";import"./useVariants-Cx-y7bUQ.js";import"./Compact-9fGh2k-B.js";import"./useOrientation-DkEgYo1X.js";import"./compact-item-DgFz4dAb.js";import"./useLocale-Dh2gjuAV.js";import"./CheckOutlined-B1tqYLS_.js";import"./CloseOutlined-CK6SwoIo.js";import"./LoadingOutlined-BQMQlTda.js";import"./Input-Cjna9PY5.js";import"./ContextIsolator-4PSB4hMF.js";import"./isNonNullable-Hl1s-5mn.js";import"./useZIndex-B8GJZ240.js";import"./index-YaEaaltq.js";import"./EyeOutlined-BAiInMfr.js";import"./Button-Dz2lyeIa.js";import"./index-BOKFnN1K.js";import"./client-BxpwpK7q.js";import"./color-3_T3BsFS.js";import"./ColorPresets-Dbz-ukSB.js";import"./index-ByoHCHbK.js";import"./useBubbleLock-Bi18p7FW.js";import"./spacing-9zDubETZ.js";const L=f("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);const N=f("ChevronsUpDown",[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]]);const _=f("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);function F(o){return o==="small"?"xs":o==="middle"?"m":o==="large"?"l":"m"}function W(o){const c={xs:24,s:28,m:32,l:36}[o||"m"];if(o==="xs")return{componentToken:{},globalToken:{colorText:r.neutral[800],borderRadius:j.md,controlHeight:24,fontSize:13},height:24,menuItemHeight:c};const p=o==="s"?32:o==="m"?36:40;return{componentToken:{},globalToken:{borderRadius:j.xl,controlHeight:p,colorError:r.feedback.red[500]},height:p,menuItemHeight:c}}const $={activeBorderColor:"transparent",hoverBorderColor:"transparent",activeOutlineColor:"transparent",optionFontSize:13};function i(o){const{dsSize:y="m",size:c,style:p,className:z,suffixIcon:C,showSearch:D,maxTagCount:k="responsive",value:T,status:I,defaultValue:B,...d}=o,[b,E]=w.useState(""),[s,H]=w.useState(T??B),V=c?F(c):y,m=W(V),M=`ds-input-outline ${z||""}`.trim(),v=d.mode==="multiple"||d.mode==="tags",R=t=>s==null?!1:Array.isArray(s)?s.some(a=>(typeof a=="object"&&a!==null?a.value:a)===t):(typeof s=="object"&&s!==null?s.value:s)===t;return e.jsx(O,{theme:{components:{Select:{...$,...m.componentToken,multipleItemBorderColor:"#D4D4D4",optionHeight:m.menuItemHeight,optionPadding:"4px 8px",colorText:"rgba(38, 38, 38, 1)",colorBgElevated:"rgba(250, 250, 250, 1)",optionSelectedFontWeight:400,optionSelectedBg:r.neutral[200],multipleItemBg:"rgba(255, 255, 255, 0.01)",borderRadiusSM:8}},token:{...m.globalToken,colorBorder:"transparent",colorError:r.feedback.red[500],colorTextDisabled:r.neutral[400],colorBgContainerDisabled:r.neutral[50],colorTextPlaceholder:r.neutral[500],borderRadiusLG:8}},children:e.jsx(P,{...d,status:I,maxTagCount:k,className:M,suffixIcon:C??e.jsx(N,{size:16}),menuItemSelectedIcon:v?null:e.jsx(L,{size:16,color:r.neutral[800]}),showSearch:!1,searchValue:b,style:{height:`${m.height}px`,"--select-multi-item-border-color":"#D4D4D4",transition:"all 0.2s ease",...p},onChange:(t,n)=>{H(t),d.onChange?.(t,n)},optionRender:t=>{const n=R(t.value);return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[v&&e.jsx(A,{checked:n,style:{pointerEvents:"none"}}),e.jsx("span",{style:{flex:1},children:t.label})]})},dropdownRender:t=>e.jsxs(e.Fragment,{children:[D&&e.jsx("div",{style:{padding:"4px 8px",borderBottom:"1px solid #D4D4D4",marginBottom:"0px"},children:e.jsx(q,{placeholder:"Procurar",prefix:e.jsx(_,{size:15,color:r.neutral[500]}),value:b,onChange:n=>{const{value:a}=n.target;E(a)},variant:"borderless",style:{fontSize:"13px",color:r.neutral[800],padding:0,gap:4}})}),e.jsx("div",{style:{padding:"4px 0"},children:t})]})})})}i.__docgenInfo={description:"",methods:[],displayName:"Select",props:{dsSize:{required:!1,tsType:{name:"union",raw:'"xs" | "s" | "m" | "l"',elements:[{name:"literal",value:'"xs"'},{name:"literal",value:'"s"'},{name:"literal",value:'"m"'},{name:"literal",value:'"l"'}]},description:""},size:{required:!1,tsType:{name:'AntdSelectProps["size"]',raw:'AntdSelectProps["size"]'},description:""}}};const qe={title:"Components/Select",component:i,tags:["autodocs"],argTypes:{dsSize:{control:"select",options:["xs","s","m","l"]},disabled:{control:"boolean"},showSearch:{control:"boolean"},mode:{control:"select",options:["","multiple","tags"]}}},l=[{value:"option1",label:"Opção 1"},{value:"option2",label:"Opção 2"},{value:"option3",label:"Opção 3"}],u={args:{placeholder:"Selecione...",options:l,style:{width:200}}},h={args:{placeholder:"Buscar...",showSearch:!0,options:l,style:{width:200}}},g={args:{placeholder:"Selecione múltiplos...",mode:"multiple",options:l,style:{width:300}}},x={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(i,{dsSize:"xs",placeholder:"Extra Small",options:l,style:{width:200}}),e.jsx(i,{dsSize:"s",placeholder:"Small",options:l,style:{width:200}}),e.jsx(i,{dsSize:"m",placeholder:"Medium",options:l,style:{width:200}}),e.jsx(i,{dsSize:"l",placeholder:"Large",options:l,style:{width:200}})]})},S={args:{placeholder:"Disabled",disabled:!0,options:l,style:{width:200}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Selecione...",
    options,
    style: {
      width: 200
    }
  }
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Buscar...",
    showSearch: true,
    options,
    style: {
      width: 200
    }
  }
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Selecione múltiplos...",
    mode: "multiple",
    options,
    style: {
      width: 300
    }
  }
}`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>\r
      <Select dsSize="xs" placeholder="Extra Small" options={options} style={{
      width: 200
    }} />\r
      <Select dsSize="s" placeholder="Small" options={options} style={{
      width: 200
    }} />\r
      <Select dsSize="m" placeholder="Medium" options={options} style={{
      width: 200
    }} />\r
      <Select dsSize="l" placeholder="Large" options={options} style={{
      width: 200
    }} />\r
    </div>
}`,...x.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Disabled",
    disabled: true,
    options,
    style: {
      width: 200
    }
  }
}`,...S.parameters?.docs?.source}}};const Ae=["Default","WithSearch","Multiple","SizeVariants","Disabled"];export{u as Default,S as Disabled,g as Multiple,x as SizeVariants,h as WithSearch,Ae as __namedExportsOrder,qe as default};
