(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4037fee1"],{"0469":function(e,t,r){},1692:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"manager"},[r("div",{staticClass:"manager-head"},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("添加管理员")]),r("el-dialog",{attrs:{title:"管理员信息",visible:e.dialogFormVisible,width:"500px"},on:{"update:visible":function(t){e.dialogFormVisible=t},close:e.cancel}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[r("el-form-item",{attrs:{label:"用户名:","label-width":e.formLabelWidth,prop:"username"}},[r("el-input",{staticClass:"common-input",attrs:{autocomplete:"off"},model:{value:e.ruleForm.username,callback:function(t){e.$set(e.ruleForm,"username",t)},expression:"ruleForm.username"}})],1),r("el-form-item",{attrs:{label:"密 码:","label-width":e.formLabelWidth,prop:"password"}},[r("el-input",{staticClass:"common-input",attrs:{autocomplete:"off"},model:{value:e.ruleForm.password,callback:function(t){e.$set(e.ruleForm,"password",t)},expression:"ruleForm.password"}})],1),r("el-form-item",{attrs:{label:"真实姓名:","label-width":e.formLabelWidth,prop:"realName"}},[r("el-input",{staticClass:"common-input",attrs:{autocomplete:"off"},model:{value:e.ruleForm.realName,callback:function(t){e.$set(e.ruleForm,"realName",t)},expression:"ruleForm.realName"}})],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.cancel}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:e.add}},[e._v("确 定")])],1)],1)],1),r("div",{staticClass:"manager-con"},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[r("el-table-column",{attrs:{prop:"username",label:"用户名",width:"180",align:"center"}}),r("el-table-column",{attrs:{prop:"password",label:"密码",width:"180",align:"center"}}),r("el-table-column",{attrs:{prop:"realName",label:"姓名",align:"center"}}),r("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[r("el-popconfirm",{attrs:{title:"确定删除吗？"},on:{confirm:function(t){return e.remove(a.id)}}},[r("el-button",{attrs:{slot:"reference",type:"danger",size:"small",disabled:"admin"===a.username},slot:"reference"},[e._v("删除")])],1),r("el-button",{staticClass:"modify",attrs:{type:"primary",size:"small",disabled:"admin"===a.username},on:{click:function(t){return e.modify(a.id)}}},[e._v("修改")])]}}])})],1)],1)])},n=[],o=r("1da1"),i=(r("7db0"),r("4de4"),r("96cf"),r("bc3a")),l=r.n(i),s={data:function(){return{tableData:[],dialogFormVisible:!1,ruleForm:{username:"",password:"",realName:""},formLabelWidth:"120px",rules:{username:[{required:!0,min:5,max:10,trigger:"blur"}],password:[{required:!0,min:6,max:16,trigger:"blur"}],realName:[{required:!0,min:2,max:16,trigger:"blur"}]}}},created:function(){this.getManager()},methods:{getManager:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l()({method:"get",url:"http://localhost:3006/manager"}).then((function(t){e.tableData=t.data}));case 2:case"end":return t.stop()}}),t)})))()},add:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.ruleForm.id){t.next=9;break}if(e.tableData.find((function(t){return t.username===e.ruleForm.username}))){t.next=6;break}return t.next=4,l()({method:"post",url:"http://localhost:3006/manager",data:e.ruleForm}).then((function(e){console.log(e.data)}));case 4:t.next=7;break;case 6:e.$message({message:"抱歉，您输入的账号已存在，请重新输入",type:"error"});case 7:t.next=11;break;case 9:return t.next=11,l()({method:"patch",url:"http://localhost:3006/manager/".concat(e.ruleForm.id),data:e.ruleForm});case 11:e.getManager(),e.cancel();case 13:case"end":return t.stop()}}),t)})))()},remove:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,l()({method:"delete",url:"http://localhost:3006/manager/".concat(e)});case 2:t.tableData=t.tableData.filter((function(t){return t.id!==e}));case 3:case"end":return r.stop()}}),r)})))()},modify:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t.dialogFormVisible=!0,r.next=3,l()({method:"get",url:"http://localhost:3006/manager/".concat(e)}).then((function(e){t.ruleForm=e.data}));case 3:case"end":return r.stop()}}),r)})))()},cancel:function(){for(var e in this.ruleForm)this.ruleForm[e]="";this.dialogFormVisible=!1}}},u=s,c=(r("5c8f"),r("2877")),m=Object(c["a"])(u,a,n,!1,null,null,null);t["default"]=m.exports},"1dde":function(e,t,r){var a=r("d039"),n=r("b622"),o=r("2d00"),i=n("species");e.exports=function(e){return o>=51||!a((function(){var t=[],r=t.constructor={};return r[i]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"4de4":function(e,t,r){"use strict";var a=r("23e7"),n=r("b727").filter,o=r("1dde"),i=o("filter");a({target:"Array",proto:!0,forced:!i},{filter:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}})},"5c8f":function(e,t,r){"use strict";r("0469")},"65f0":function(e,t,r){var a=r("861d"),n=r("e8b5"),o=r("b622"),i=o("species");e.exports=function(e,t){var r;return n(e)&&(r=e.constructor,"function"!=typeof r||r!==Array&&!n(r.prototype)?a(r)&&(r=r[i],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===t?0:t)}},"7db0":function(e,t,r){"use strict";var a=r("23e7"),n=r("b727").find,o=r("44d2"),i="find",l=!0;i in[]&&Array(1)[i]((function(){l=!1})),a({target:"Array",proto:!0,forced:l},{find:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}}),o(i)},b727:function(e,t,r){var a=r("0366"),n=r("44ad"),o=r("7b0b"),i=r("50c4"),l=r("65f0"),s=[].push,u=function(e){var t=1==e,r=2==e,u=3==e,c=4==e,m=6==e,d=7==e,f=5==e||m;return function(p,b,h,g){for(var v,w,x=o(p),F=n(x),y=a(b,h,3),k=i(F.length),A=0,C=g||l,R=t?C(p,k):r||d?C(p,0):void 0;k>A;A++)if((f||A in F)&&(v=F[A],w=y(v,A,x),e))if(t)R[A]=w;else if(w)switch(e){case 3:return!0;case 5:return v;case 6:return A;case 2:s.call(R,v)}else switch(e){case 4:return!1;case 7:s.call(R,v)}return m?-1:u||c?c:R}};e.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6),filterOut:u(7)}},e8b5:function(e,t,r){var a=r("c6b6");e.exports=Array.isArray||function(e){return"Array"==a(e)}}}]);
//# sourceMappingURL=chunk-4037fee1.3587d394.js.map