(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6cc5646e"],{"159b":function(t,e,r){var n=r("da84"),a=r("fdbc"),o=r("17c2"),i=r("9112");for(var c in a){var s=n[c],u=s&&s.prototype;if(u&&u.forEach!==o)try{i(u,"forEach",o)}catch(l){u.forEach=o}}},"17c2":function(t,e,r){"use strict";var n=r("b727").forEach,a=r("a640"),o=a("forEach");t.exports=o?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"1dde":function(t,e,r){var n=r("d039"),a=r("b622"),o=r("2d00"),i=a("species");t.exports=function(t){return o>=51||!n((function(){var e=[],r=e.constructor={};return r[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"65f0":function(t,e,r){var n=r("861d"),a=r("e8b5"),o=r("b622"),i=o("species");t.exports=function(t,e){var r;return a(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!a(r.prototype)?n(r)&&(r=r[i],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===e?0:e)}},7936:function(t,e,r){},8418:function(t,e,r){"use strict";var n=r("c04e"),a=r("9bf2"),o=r("5c6c");t.exports=function(t,e,r){var i=n(e);i in t?a.f(t,i,o(0,r)):t[i]=r}},"94f0":function(t,e,r){"use strict";r("7936")},"99af":function(t,e,r){"use strict";var n=r("23e7"),a=r("d039"),o=r("e8b5"),i=r("861d"),c=r("7b0b"),s=r("50c4"),u=r("8418"),l=r("65f0"),d=r("1dde"),f=r("b622"),h=r("2d00"),p=f("isConcatSpreadable"),v=9007199254740991,m="Maximum allowed index exceeded",b=h>=51||!a((function(){var t=[];return t[p]=!1,t.concat()[0]!==t})),g=d("concat"),w=function(t){if(!i(t))return!1;var e=t[p];return void 0!==e?!!e:o(t)},y=!b||!g;n({target:"Array",proto:!0,forced:y},{concat:function(t){var e,r,n,a,o,i=c(this),d=l(i,0),f=0;for(e=-1,n=arguments.length;e<n;e++)if(o=-1===e?i:arguments[e],w(o)){if(a=s(o.length),f+a>v)throw TypeError(m);for(r=0;r<a;r++,f++)r in o&&u(d,f,o[r])}else{if(f>=v)throw TypeError(m);u(d,f++,o)}return d.length=f,d}})},a640:function(t,e,r){"use strict";var n=r("d039");t.exports=function(t,e){var r=[][t];return!!r&&n((function(){r.call(null,e||function(){throw 1},1)}))}},b727:function(t,e,r){var n=r("0366"),a=r("44ad"),o=r("7b0b"),i=r("50c4"),c=r("65f0"),s=[].push,u=function(t){var e=1==t,r=2==t,u=3==t,l=4==t,d=6==t,f=7==t,h=5==t||d;return function(p,v,m,b){for(var g,w,y=o(p),x=a(y),_=n(v,m,3),D=i(x.length),k=0,L=b||c,R=e?L(p,D):r||f?L(p,0):void 0;D>k;k++)if((h||k in x)&&(g=x[k],w=_(g,k,y),t))if(e)R[k]=w;else if(w)switch(t){case 3:return!0;case 5:return g;case 6:return k;case 2:s.call(R,g)}else switch(t){case 4:return!1;case 7:s.call(R,g)}return d?-1:u||l?l:R}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6),filterOut:u(7)}},cf2a:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"order"},[r("div",{staticClass:"order-head"},[r("span",[t._v("全部订单")]),r("i",{ref:"needRotate",staticClass:"icon-ic_refresh iconfont myicon",on:{click:t.needRotate}})]),r("div",{staticClass:"order-main"},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[r("el-table-column",{attrs:{prop:"orderNum",label:"序号",align:"center",width:"60"}}),r("el-table-column",{attrs:{prop:"user",label:"用户名",align:"center",width:"80"}}),r("el-table-column",{attrs:{align:"center",width:"200",label:"订单号和下单时间"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[r("div",[t._v(t._s(n.orderId))]),r("div",[t._v(t._s(n.createTime))])]}}])}),r("el-table-column",{attrs:{prop:"phone",label:"手机号",align:"center",width:"150"}}),r("el-table-column",{attrs:{prop:"address",label:"下单地址",width:"320"}}),r("el-table-column",{attrs:{align:"center",label:"下单商品和数量"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return t._l(n.goodsList,(function(e,n){return r("div",{key:n,staticClass:"goods-item"},[r("span",[t._v(t._s(e.goodsName))]),r("span",[t._v(" x"+t._s(e.quantity))])])}))}}])}),r("el-table-column",{attrs:{prop:"cost",align:"center",label:"实付款",width:"100"}}),r("el-table-column",{attrs:{label:"操作",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[r("el-button",{attrs:{type:"primary",size:"mini",disabled:t._f("isDisabled")(n)},on:{click:function(e){return t.deliverGoods(n.id)}}},[t._v("发货")])]}}])}),r("el-table-column",{attrs:{prop:"orderStatus",align:"center",label:"订单状态",width:"100"}})],1),r("el-pagination",{staticClass:"order-pagi",attrs:{background:"",layout:"prev, pager, next",total:t.orderLen,"page-size":6,"current-page":t.page},on:{"current-change":t.change}})],1)])},a=[],o=r("1da1"),i=(r("99af"),r("159b"),r("96cf"),r("bc3a")),c=r.n(i),s=r("c1df"),u=r.n(s),l={data:function(){return{tableData:[],page:0,orderLen:0,timeout:null}},created:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.requestAllData();case 2:t.requestData(t.orderLen-6,6);case 3:case"end":return e.stop()}}),e)})))()},filters:{isDisabled:function(t){if("待发货"!==t.orderStatus)return!0}},methods:{requestData:function(t,e){var r=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,c()({method:"get",url:"http://localhost:3006/order?_start=".concat(t,"&_limit=").concat(e)}).then((function(t){var e=t.data;e.sort((function(t,e){return e.createTime-t.createTime}));for(var n=0;n<e.length;n++)e[n].createTime=u()(e[n].createTime).format("YYYY-MM-DD, HH:mm:ss"),e[n].orderNum=n+1,e[n].orderStatus=1===e[n].orderStatus?"待发货":2===e[n].orderStatus?"待收货":3===e[n].orderStatus?"待评价":"已评价";e.forEach((function(t){t.orderId=Date.parse(t.createTime)})),r.tableData=e}));case 2:case"end":return n.stop()}}),n)})))()},requestAllData:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c()({method:"get",url:"http://localhost:3006/order"});case 2:r=e.sent,t.orderLen=r.data.length;case 4:case"end":return e.stop()}}),e)})))()},change:function(t){this.page=t;var e=1===this.page?this.orderLen-6:Math.ceil(this.orderLen/6)===this.page?0:this.orderLen-6*this.page,r=1===this.page?6:Math.ceil(this.orderLen/6)===this.page?this.orderLen%(6*(this.page-1)):6;console.log(e,r),this.requestData(e,r)},requestOrderByPage:function(){var t=this;c()({method:"get",url:"http://localhost:3006/order/".concat(id),data:{orderStatus:2}}).then((function(e){console.log(e.data),t.requestData()}))},deliverGoods:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return console.log(t),r.next=3,c()({method:"patch",url:"http://localhost:3006/order/".concat(t),data:{orderStatus:2}}).then((function(t){console.log(t.data),e.requestData(e.orderLen-6,6)}));case 3:case"end":return r.stop()}}),r)})))()},needRotate:function(){var t=this;this.timeout||(this.timeout=1,this.$refs.needRotate.classList.add("rotate"),this.requestAllData(),this.page=0,this.tableData=[],setTimeout((function(){t.requestData(t.orderLen-6,6)}),400),setTimeout((function(){t.$refs.needRotate.classList.remove("rotate"),t.timeout=null}),1e3))}}},d=l,f=(r("94f0"),r("2877")),h=Object(f["a"])(d,n,a,!1,null,null,null);e["default"]=h.exports},e8b5:function(t,e,r){var n=r("c6b6");t.exports=Array.isArray||function(t){return"Array"==n(t)}}}]);
//# sourceMappingURL=chunk-6cc5646e.8701ebd0.js.map