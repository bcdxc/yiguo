(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8fd8d018"],{"159b":function(e,t,r){var o=r("da84"),a=r("fdbc"),n=r("17c2"),s=r("9112");for(var i in a){var c=o[i],l=c&&c.prototype;if(l&&l.forEach!==n)try{s(l,"forEach",n)}catch(u){l.forEach=n}}},"17c2":function(e,t,r){"use strict";var o=r("b727").forEach,a=r("a640"),n=a("forEach");e.exports=n?[].forEach:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}},"1dde":function(e,t,r){var o=r("d039"),a=r("b622"),n=r("2d00"),s=a("species");e.exports=function(e){return n>=51||!o((function(){var t=[],r=t.constructor={};return r[s]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"4de4":function(e,t,r){"use strict";var o=r("23e7"),a=r("b727").filter,n=r("1dde"),s=n("filter");o({target:"Array",proto:!0,forced:!s},{filter:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},"65f0":function(e,t,r){var o=r("861d"),a=r("e8b5"),n=r("b622"),s=n("species");e.exports=function(e,t){var r;return a(e)&&(r=e.constructor,"function"!=typeof r||r!==Array&&!a(r.prototype)?o(r)&&(r=r[s],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===t?0:t)}},8629:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"goods"},[r("div",{staticClass:"goods-head"},[r("router-link",{attrs:{to:{name:"AddGoods"}}},[r("el-button",{attrs:{type:"primary",size:"large"}},[e._v("添加商品")])],1)],1),r("div",{staticClass:"goods-con"},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[r("el-table-column",{attrs:{prop:"goodsName",label:"商品名称",width:"150",align:"center"}}),r("el-table-column",{attrs:{prop:"price",label:"价格",width:"150",align:"center"}}),r("el-table-column",{attrs:{prop:"stock",label:"库存数量",width:"150",align:"center"}}),r("el-table-column",{attrs:{prop:"purchase",label:"已售",width:"150",align:"center"}}),r("el-table-column",{attrs:{prop:"className",label:"类别",width:"150",align:"center"}}),r("el-table-column",{attrs:{prop:"isCarousel",label:"是否是轮播图",width:"150",align:"center"}}),r("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.row;return[r("el-popconfirm",{attrs:{title:"确定删除吗？"},on:{confirm:function(t){return e.remove(o.id)}}},[r("el-button",{staticClass:"delete",attrs:{slot:"reference",type:"danger",size:"small"},slot:"reference"},[e._v("删除")])],1),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.modify(o.id)}}},[e._v("修改")]),r("el-button",{attrs:{type:"否"===o.isCarousel?"primary":"warning",size:"small"},on:{click:function(t){return e.setCarousel(o.id,o.isCarousel)}}},[e._v(e._s("否"===o.isCarousel?"设置为轮播图":"取消该轮播图"))])]}}])})],1),r("el-dialog",{attrs:{title:"修改商品信息",visible:e.dialogFormVisible,width:"500px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[r("el-form-item",{staticClass:"form-item",attrs:{label:"商品名称",prop:"goodsName"}},[r("el-input",{staticClass:"common-input2",model:{value:e.ruleForm.goodsName,callback:function(t){e.$set(e.ruleForm,"goodsName",t)},expression:"ruleForm.goodsName"}})],1),r("el-form-item",{staticClass:"form-item",attrs:{label:"商品价格",prop:"price"}},[r("el-input",{staticClass:"common-input2",model:{value:e.ruleForm.price,callback:function(t){e.$set(e.ruleForm,"price",e._n(t))},expression:"ruleForm.price"}})],1),r("el-form-item",{staticClass:"form-item",attrs:{label:"商品库存",prop:"stock"}},[r("el-input",{staticClass:"common-input2",model:{value:e.ruleForm.stock,callback:function(t){e.$set(e.ruleForm,"stock",e._n(t))},expression:"ruleForm.stock"}})],1),r("el-form-item",{attrs:{label:"商品类别",prop:"className"}},[r("el-select",{attrs:{placeholder:"请选择商品类别"},model:{value:e.ruleForm.className,callback:function(t){e.$set(e.ruleForm,"className",t)},expression:"ruleForm.className"}},e._l(e.goodsCategory,(function(e){return r("span",{key:e},[r("el-option",{attrs:{label:e,value:e}})],1)})),0)],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.cancel}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:e.add}},[e._v("确 定")])],1)],1),r("div",{staticClass:"page-pos"},[r("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-size":8,total:e.goodsLen},on:{"current-change":e.change}})],1)],1)])},a=[],n=r("1da1"),s=(r("4de4"),r("159b"),r("96cf"),r("bc3a")),i=r.n(s),c={data:function(){return{tableData:[],isDisable:!1,dialogFormVisible:!1,rules:{goodsName:[{required:!0,min:2,max:18,trigger:"blur"}],price:[{required:!0,min:1,max:1e4,trigger:"blur",type:"number"}],stock:[{required:!0,min:1,max:1e4,trigger:"blur",type:"number"}],className:[{required:!0,min:2,max:18,trigger:"blur"}]},ruleForm:{id:"",goodsName:"",className:"",price:"",stock:"",purchase:0},goodsCategory:[],goodsLen:8,page:0}},created:function(){this.getGoods(),this.getEightGoods(this.page),this.setGoodsCategory()},methods:{getGoods:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,i()({method:"get",url:"http://localhost:3006/goods"}).then((function(t){e.goodsLen=t.data.length}));case 2:case"end":return t.stop()}}),t)})))()},getEightGoods:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,i()({method:"get",url:"http://localhost:3006/goods?_start=".concat(e,"&_limit=8")}).then((function(e){console.log(e.data),t.tableData=e.data}));case 2:case"end":return r.stop()}}),r)})))()},add:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,i()({method:"patch",url:"http://localhost:3006/goods/".concat(e.ruleForm.id),data:e.ruleForm});case 2:e.getGoods(),e.cancel();case 4:case"end":return t.stop()}}),t)})))()},cancel:function(){for(var e in this.ruleForm)this.ruleForm[e]="";this.dialogFormVisible=!1},remove:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,i()({method:"delete",url:"http://localhost:3006/goods/".concat(e)});case 2:t.tableData=t.tableData.filter((function(t){return t.id!==e}));case 3:case"end":return r.stop()}}),r)})))()},modify:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t.dialogFormVisible=!0,r.next=3,i()({method:"get",url:"http://localhost:3006/goods/".concat(e)}).then((function(e){t.ruleForm=e.data}));case 3:case"end":return r.stop()}}),r)})))()},setCarousel:function(e,t){var r=this;return Object(n["a"])(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,i()({method:"patch",url:"http://localhost:3006/goods/".concat(e),data:{isCarousel:"否"===t?"是":"否"}});case 2:r.getGoods(),r.getEightGoods(8*r.page);case 4:case"end":return o.stop()}}),o)})))()},setGoodsCategory:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,i()({method:"get",url:"http://localhost:3006/classify"}).then((function(t){t.data.forEach((function(t){e.goodsCategory.push(t.className)}))}));case 2:case"end":return t.stop()}}),t)})))()},change:function(e){this.page=e-1,this.getEightGoods(8*this.page)}}},l=c,u=(r("8824"),r("2877")),d=Object(u["a"])(l,o,a,!1,null,null,null);t["default"]=d.exports},8824:function(e,t,r){"use strict";r("e2d6")},a640:function(e,t,r){"use strict";var o=r("d039");e.exports=function(e,t){var r=[][e];return!!r&&o((function(){r.call(null,t||function(){throw 1},1)}))}},b727:function(e,t,r){var o=r("0366"),a=r("44ad"),n=r("7b0b"),s=r("50c4"),i=r("65f0"),c=[].push,l=function(e){var t=1==e,r=2==e,l=3==e,u=4==e,d=6==e,m=7==e,p=5==e||d;return function(f,g,h,b){for(var v,w,y=n(f),x=a(y),k=o(g,h,3),F=s(x.length),C=0,N=b||i,_=t?N(f,F):r||m?N(f,0):void 0;F>C;C++)if((p||C in x)&&(v=x[C],w=k(v,C,y),e))if(t)_[C]=w;else if(w)switch(e){case 3:return!0;case 5:return v;case 6:return C;case 2:c.call(_,v)}else switch(e){case 4:return!1;case 7:c.call(_,v)}return d?-1:l||u?u:_}};e.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6),filterOut:l(7)}},e2d6:function(e,t,r){},e8b5:function(e,t,r){var o=r("c6b6");e.exports=Array.isArray||function(e){return"Array"==o(e)}}}]);
//# sourceMappingURL=chunk-8fd8d018.e8d83eeb.js.map