(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[962],{8196:function(e,r,t){Promise.resolve().then(t.bind(t,5295))},5295:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return Page}});var n=t(7437),o=t(2265),i=t(8308),s=t.n(i);function NewsletterForm(){let[e,r]=(0,o.useState)("");async function handleSubmit(r){r.preventDefault();try{let r=await fetch("http://localhost:5000/api/email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(!r.ok){console.error("Failed to send email");return}let t=await r.json();console.log("Successfully sent email:",t)}catch(e){console.error("Error while sending email:",e)}}return(0,n.jsx)("div",{className:s()["form-container"],children:(0,n.jsxs)("form",{className:s().form,onSubmit:handleSubmit,children:[(0,n.jsx)("input",{type:"email",placeholder:"Email Address",className:s()["form-input"],value:e,name:"email",required:!0,onChange:e=>r(e.target.value)}),(0,n.jsx)("button",{className:s()["form-submit"],children:"Submit"})]})})}function Page(){return(0,n.jsx)("div",{className:"p-8",children:(0,n.jsx)(NewsletterForm,{})})}t(3054)},3054:function(){},8308:function(e){e.exports={"form-container":"Signup_form-container__IT54u",form:"Signup_form__8jRIb","form-input":"Signup_form-input__O_wwv","form-submit":"Signup_form-submit__SRSt7"}},622:function(e,r,t){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=t(2265),o=Symbol.for("react.element"),i=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),s=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function q(e,r,t){var n,u={},l=null,c=null;for(n in void 0!==t&&(l=""+t),void 0!==r.key&&(l=""+r.key),void 0!==r.ref&&(c=r.ref),r)i.call(r,n)&&!a.hasOwnProperty(n)&&(u[n]=r[n]);if(e&&e.defaultProps)for(n in r=e.defaultProps)void 0===u[n]&&(u[n]=r[n]);return{$$typeof:o,type:e,key:l,ref:c,props:u,_owner:s.current}}r.jsx=q,r.jsxs=q},7437:function(e,r,t){"use strict";e.exports=t(622)}},function(e){e.O(0,[971,864,744],function(){return e(e.s=8196)}),_N_E=e.O()}]);