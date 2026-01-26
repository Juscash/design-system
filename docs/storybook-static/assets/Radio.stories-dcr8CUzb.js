import{j as o}from"./index-BWDtiai5.js";import{R as n}from"./index-C5F2Rs35.js";import{C,d as e}from"./colors-D51g0Eqm.js";import{r as s}from"./radius-D95ghGs1.js";import{s as l}from"./spacing-9zDubETZ.js";import"./index-CqIc3cxq.js";import"./index-DFVzyPiA.js";import"./useControlledState-BlmcFhdJ.js";import"./pickAttrs-BoNuQqbq.js";import"./useCSSVarCls-DSIlCV5N.js";import"./useSize-2ERO23pv.js";import"./context-CrGhmAV9.js";import"./omit-3QAACPn7.js";import"./useForm-C5y8rwP6.js";import"./useBubbleLock-Bi18p7FW.js";import"./index-BOKFnN1K.js";import"./client-BxpwpK7q.js";import"./useOrientation-DkEgYo1X.js";const c={radioSize:16,dotSize:8,dotColorDisabled:e.neutral[400],wrapperMarginInlineEnd:l[2],buttonBg:e.neutral[50],buttonCheckedBg:e.neutral[50],buttonColor:e.brand.primary[600],buttonPaddingInline:l[4],buttonCheckedBgDisabled:e.neutral[300],buttonCheckedColorDisabled:e.neutral[100],buttonSolidCheckedColor:e.brand.primary[600],buttonSolidCheckedBg:e.neutral[50],buttonSolidCheckedHoverBg:e.neutral[50],buttonSolidCheckedActiveBg:e.neutral[50]},h={...c,buttonCheckedBg:e.feedback.red[50],buttonCheckedBgDisabled:e.feedback.red[50],buttonCheckedColorDisabled:e.neutral[400],buttonSolidCheckedBg:e.feedback.red[500],buttonSolidCheckedHoverBg:e.feedback.red[900],buttonSolidCheckedActiveBg:e.feedback.red[900],buttonSolidCheckedColor:e.neutral[50]};function r(u){const{error:i,className:p,...m}=u,b=i?h:c,k=i?{borderRadiusSM:s.md,colorPrimary:e.feedback.red[500],colorPrimaryHover:e.feedback.red[900],colorPrimaryActive:e.feedback.red[900],controlOutline:`0 0 0 3px ${e.feedback.red[50]}`,controlOutlineWidth:3,controlOutlineColor:e.feedback.red[50]}:{borderRadiusSM:s.md,colorPrimary:e.brand.primary[600],colorPrimaryHover:e.brand.primary[800],colorPrimaryActive:e.brand.primary[800],controlOutline:`0 0 0 3px ${e.neutral[300]}`,controlOutlineWidth:3,controlOutlineColor:e.neutral[300]};return o.jsx(C,{theme:{components:{Radio:b},token:k},children:o.jsx(n,{className:p,...m})})}const g=n.Group;n.Button;r.__docgenInfo={description:"",methods:[],displayName:"Radio",props:{error:{required:!1,tsType:{name:"boolean"},description:""}}};const T={title:"Components/Radio",component:r,tags:["autodocs"]},t={args:{children:"Radio option"}},a={render:()=>o.jsxs(g,{defaultValue:"a",children:[o.jsx(r,{value:"a",children:"Option A"}),o.jsx(r,{value:"b",children:"Option B"}),o.jsx(r,{value:"c",children:"Option C"})]}),name:"Radio Group"},d={args:{disabled:!0,children:"Disabled radio"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Radio option"
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <RadioGroup defaultValue="a">\r
      <Radio value="a">Option A</Radio>\r
      <Radio value="b">Option B</Radio>\r
      <Radio value="c">Option C</Radio>\r
    </RadioGroup>,
  name: "Radio Group"
}`,...a.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: "Disabled radio"
  }
}`,...d.parameters?.docs?.source}}};const $=["Default","RadioGroupStory","Disabled"];export{t as Default,d as Disabled,a as RadioGroupStory,$ as __namedExportsOrder,T as default};
