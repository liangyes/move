<template>
	<view>
		
			<view class="cu-bar bg-red search" style="position: fixed; top: 0rpx;width: 100%;height: 50rpx;z-index: 999;">
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input  @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索" confirm-type="search"></input>
				</view>
				<view class="action">
					<text class="cuIcon-close"></text>
					<text>取消</text>
				</view>
			</view>
		<!-- </scroll-view> -->
		<view style="margin-bottom: 5rpx;margin-top: 80rpx;">
			
			<view class="cu-list menu-avatar" >
				<view  :scroll-top="scrollTop" class="lg" style="height: 240upx;margin-top:30rpx;" v-for="(item,index) in hotList" :key="index"  >
					<navigator :url="'/pages/index/detail?id='+item.id" style="display: flex;flex-direction:row;background: white;height: 240upx;">
					<view style="margin: 20px 0 0 20px ;width:30%;height: 180upx; ">
						
						 <image style="border-radius: 20upx;width: 100%;height: 100%;" :src="item.img"></image>
					 
					</view>
					
					<view  style="width: 65%;margin: 20px 0 0 20px ;">
						
					   <view class="text-grey  margin-b-lg">
							<view class="text-cut -twice text-lg text-red ">{{item.name}}</view>
							<view class="cu-tag round bg-red sm" style="width: 50upx;" >热</view>
						</view>
						<view class="text-gray  margin-tb-sm">
							<view class="text-cut">
							  状态:{{item.update_title}}
							</view>
						</view>
						<view class="text-gray text-sm flex margin-tb-sm">
							<view class="text-cut">
							   {{item.content}}	
							</view>
						</view>
						
					</view>
					</navigator>
				</view>
				
			</view>
		</view>
		<view  @click="goTop"   style="position: fixed; bottom: 100rpx;right: 20rpx;"><image style="width: 64rpx;height: 64rpx;" src="/static/page/stick.png"></image></view>	
	    <view class="cu-load load-modal"  v-if="loadModal" >
			
			<image src="/static/logo.png" mode="aspectFit"></image>
			<view class="gray-text">拼命搜索中...</view>
		</view>
		<view class="flex-sub text-center"  style="margin-top: 250rpx;"  v-if="loadModalText" >
			<view class="solid-bottom text-xl padding">
				<text class="text-black text-bold">该资源还没收录!关注我们公众号：尼莫看看，给我们留言!我们会第一时间更新！</text>
			</view>
			<!-- <view class="padding">页面大标题，用于结果页等单一信息页</view> -->
		</view>
		<view style="display: flex;justify-content: center;height: 80upx;line-height: 80upx;">
			<text class="loading-text">
				{{loadingType === 0  && page>2 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : (page>2?contentText.contentnomore:''))}}</text>
			
		</view>
	</view>
	
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
	var  _self,
	page = 2;
	export default {
		data() {
			return {
				hotList:[],
				search: '',
				page:'',
				loadingType: '',
				loadModal:0,
				loadModalText:0,
				modalName: null,
				contentText: {
					contentdown: "拼命加载中...",
					contentrefresh: "拼命加载中...",
					contentnomore: "没有更多数据了!"
				},
				old:{
					scrollTop:0
				},
				scrollTop: 0,
			};
		},onLoad() {
			_self=this
			uni.setNavigationBarTitle({
			    title: '尼莫影视-搜索'
			});
		},
		onPullDownRefresh(e) {
			
			
		},
		onReachBottom(){
				//上拉
		
				if (_self.loadingType != 0) {//loadingType!=0;直接返回
					console.log(88)
					return false;
				}
				_self.loadingType = 1;
			    _self.page=page
				uni.request({
					        
							url:this.$websiteUrl+'index/search/name/'+_self.search+'/id/'+uni.getStorageSync('openid')+'/page/'+page
							,success: function(res) {
								
								if (_self.hotList.length>=res.data.pages_count) {//没有数据
									_self.loadingType = 2;
									uni.hideNavigationBarLoading();//关闭加载动画
									return false;
								}
								page++;//每触底一次 page +1
								 console.log(page);
								for(var i=0;i<res.data.data.length;i++){
									//console.log(res.data.data[i])
									_self.hotList = _self.hotList.concat(res.data.data[i]);//将数据拼接在一起
								}
								_self.loadingType = 0;//将loadingType归0重置
								//uni.hideNavigationBarLoading();//关闭加载动画
								 uni.pageScrollTo({
									duration:0,
									scrollTop:res.top
								}) 
								uni.createSelectorQuery().selectViewport().scrollOffset(res => {
										console.log("竖直滚动位置" + res.scrollTop);
										_self.scrollTop=res.scrollTop
								}).exec(); 
							}
				});
		},
		methods: {
			getHotList: function(e) {//第一次回去数据
			
			  
			    console.log(e)
				if (!e){
					return false;
				}
				_self.loadingType = 0;
				//uni.showNavigationBarLoading();
				_self.loadModal=1
				_self.search=e
				_self.loadModalText=0
				page=2
				uni.request({
					url:this.$websiteUrl+'index/search/name/'+e+'/id/'+uni.getStorageSync('openid')
					,
					success: function(res) {
						console.log(res.data)
						_self.loadModal=0
						if(!(res.data.data.length)){
							_self.loadModalText=1
						}
						_self.hotList=res.data.data
						if(res.data.data.length<res.data.pages_count){
							_self.loadingType
						}
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();//得到数据后停止下拉刷新
					}
				});
				
			},
			InputBlur:function(e){
				this.getHotList(e.detail.value)
			},goTop(){
				//回滚顶部
				uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
				});
			},
		}
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
</style>
