(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/live"],{"17ce":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return a})},3258:function(t,n,e){"use strict";e.r(n);var o=e("ea41"),a=e.n(o);for(var r in o)"default"!==r&&function(t){e.d(n,t,function(){return o[t]})}(r);n["default"]=a.a},"3a79":function(t,n,e){"use strict";e.r(n);var o=e("17ce"),a=e("3258");for(var r in a)"default"!==r&&function(t){e.d(n,t,function(){return a[t]})}(r);e("8721");var u=e("2877"),i=Object(u["a"])(a["default"],o["a"],o["b"],!1,null,null,null);n["default"]=i.exports},"3ef8":function(t,n,e){},5602:function(t,n,e){"use strict";(function(t){e("7756"),e("921b");o(e("66fd"));var n=o(e("3a79"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},8721:function(t,n,e){"use strict";var o=e("3ef8"),a=e.n(o);a.a},ea41:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{src:"",danmuList:[{text:"获取更多资源，请关注微信公众号：尼莫看看   获取更多资源，请关注微信公众号：尼莫看看",color:"#000000",time:60},{text:"获取更多资源，请关注微信公众号：尼莫看看     获取更多资源，请关注微信公众号：尼莫看看",color:"#000000",time:500},{text:"获取更多资源，请关注微信公众号：尼莫看看     获取更多资源，请关注微信公众号：尼莫看看",color:"#000000",time:1e3}],danmuValue:""}},onLoad:function(t){var n=JSON.parse(t.id);console.log(n),this.src=n.url,this.watch(n.id)},methods:{sendDanmu:function(){this.videoContext.sendDanmu({text:this.danmuValue,color:this.getRandomColor()}),this.danmuValue=""},videoErrorCallback:function(n){console.log("视频异常，请更换线路，或联系我们更新资源，我们的微信公众号：尼莫看看"),t.showModal({content:n.target.errMsg,showCancel:!1})},getRandomColor:function(){for(var t=[],n=0;n<3;++n){var e=Math.floor(256*Math.random()).toString(16);e=1==e.length?"0"+e:e,t.push(e)}return"#"+t.join("")},watch:function(n){console.log(n),t.request({url:this.$websiteUrl+"weixin/wacthDo",data:{openid:t.getStorageSync("openid"),move_id:n},method:"POST",header:{"content-type":"application/json"},success:function(t){console.log(t.data)}})}}};n.default=e}).call(this,e("543d")["default"])}},[["5602","common/runtime","common/vendor"]]]);