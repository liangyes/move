(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mescroll-uni/mescroll-uni"],{"5a0d":function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},a=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return a})},"5d7f":function(n,t,e){"use strict";e.r(t);var o=e("d780"),a=e.n(o);for(var i in o)"default"!==i&&function(n){e.d(t,n,function(){return o[n]})}(i);t["default"]=a.a},"64bf":function(n,t,e){"use strict";var o=e("e8df"),a=e.n(o);a.a},"9ddd":function(n,t,e){"use strict";(function(n){e("7756"),e("921b");o(e("66fd"));var t=o(e("d6a8"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},d6a8:function(n,t,e){"use strict";e.r(t);var o=e("5a0d"),a=e("5d7f");for(var i in a)"default"!==i&&function(n){e.d(t,n,function(){return a[n]})}(i);e("64bf");var u=e("2877"),d=Object(u["a"])(a["default"],o["a"],o["b"],!1,null,null,null);t["default"]=d.exports},d780:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,a=function(){return e.e("components/uni-load-more/uni-load-more").then(e.bind(null,"8595"))},i=1,u={components:{uniLoadMore:a},data:function(){return{newsList:[],loadingType:0,contentText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}},onLoad:function(n){o=this,this.getNewsList()},onPullDownRefresh:function(){console.log(222),this.getNewsList()},onReachBottom:function(){if(console.log(o.newsList.length),console.log(111),0!=o.loadingType)return!1;o.loadingType=1,n.showNavigationBarLoading(),n.request({url:"http://127.0.0.1:8000/index/index/index?page="+i,success:function(t){if(o.newsList.length==t.data.pages_count)return o.loadingType=2,n.hideNavigationBarLoading(),!1;i++;for(var e=o.newsList.length;e<t.data.pages_count;e++)o.newsList=o.newsList.concat(t.data.data[e]);o.loadingType=0,n.hideNavigationBarLoading()}})},methods:{}};t.default=u}).call(this,e("543d")["default"])},e8df:function(n,t,e){}},[["9ddd","common/runtime","common/vendor"]]]);