<template>
          <view>
			    <!--头部start-->
			    <view class="header" style="background: linear-gradient(to right,#B2A2AC,#D0A183,#B2A2AC,#D0A183)">
					     <view class="header-top">
							    <view class="header-top-one">
									<view class=" lg margin-left" >
										<image :src="avatarUrl" style="width: 150rpx;height: 100rpx;border-radius: 10rpx;" ></image>
									</view>
								</view>
								<view class="header-top-two">
									   <view class="header-top-two-top"><text class="text-bold">{{nickName}}</text></view>
									   <view class="header-top-two-bottom"><text class="text-bold"></text></view>
								</view>
								
						 </view>
				   </view>
			   <!--头部end-->
			   <scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			   	<view class="cu-item" :class="1==TabCur?'text-green cur':''"  @tap="tabSelect" :data-id="1">
			   		我的关注
			   	</view>
				<view class="cu-item" :class="2==TabCur?'text-green cur':''"  @tap="tabSelect" :data-id="2">
					观看历史
				</view>
			   </scroll-view>
			    <view class="cu-list menu-avatar">
			   	<block v-if="TabCur==1"  >
			   	<view style="width: 758upx;display: flex;flex-direction: row; flex-wrap: wrap;border-top: #EAEAEA 4upx solid;">
			   				   <view style="width:758upx;height: 200upx;line-height: 100upx;background: red;color: #DDDDDD;text-align: center;margin: 20upx;border-radius: 10upx;color: #333333;" v-for="(item,index) in itemFollow" :key="index">
								   <navigator  style="display: flex;flex-direction:row;background: white;height: 280upx;" :url="'/pages/index/detail?id='+item.move_id" >
								   <view style="margin: 20px 0 0 20px ;width:30%;height: 180upx; ">
								   	
								   	 <image style="border-radius: 20upx;width: 100%;height: 100%;" :src="item.img"></image>
								    
								   </view>
								   
								   <view  style="width: 65%;margin: 20px 0 0 20px ;">
								   	
								      <view class="text-grey  margin-b-lg">
								   		<view class="text-cut -twice text-lg text-red ">{{item.name}}</view>
								   		<view class="cu-tag round" >状态:{{item.update_title}}</view>
								   	</view>
								   </view>
								   </navigator>
							   </view>
			   				   
			   					
			   	</view>
			   	</block>
				<block v-if="TabCur==2"  >
				<view style="width: 758upx;display: flex;flex-direction: row; flex-wrap: wrap;border-top: #EAEAEA 4upx solid;">
							   <view style="width:758upx;height: 200upx;line-height: 100upx;background: red;color: #DDDDDD;text-align: center;margin: 20upx;border-radius: 10upx;color: #333333;" v-for="(item,index) in itemWacth" :key="index">
							   								   <navigator  style="display: flex;flex-direction:row;background: white;height: 280upx;" :url="'/pages/index/detail?id='+item.move_id" >
							   								   <view style="margin: 20px 0 0 20px ;width:30%;height: 180upx; ">
							   								   	
							   								   	 <image style="border-radius: 20upx;width: 100%;height: 100%;" :src="item.img"></image>
							   								    
							   								   </view>
							   								   
							   								   <view  style="width: 65%;margin: 20px 0 0 20px ;">
							   								   	
							   								      <view class="text-grey  margin-b-lg">
							   								   		<view class="text-cut -twice text-lg text-red ">{{item.name}}</view>
							   								   		<view class="cu-tag round" >状态:{{item.update_title}}</view>
							   								   	</view>
							   								   </view>
							   								   </navigator>
							   </view>
				</view>
				</block>
			   </view>
		  <view  @click="goTop"   style="position: fixed; bottom: 100rpx;right: 20rpx;"><image style="width: 64rpx;height: 64rpx;" src="/static/page/stick.png"></image></view>	
		  </view>
		  
</template>

<style>
	.header{
		display: flex;
		
		height: 200upx;
		justify-content: flex-start;
		flex-wrap:  wrap
	}
	.header .header-top{
		height: 250upx;
		
		display: flex;
		align-items: center;
	}
	.header-top-one{
		min-width: 200upx;
	}
	.header-top-two{
		min-width: 300upx;
		display: flex;
		align-items: flex-start;
		flex-wrap:  wrap
	}
	.header-top-two-top{
		  min-width: 300upx;
	}
	.header-top-two-bottom{
		min-width: 300upx;
	}
	.header-top-three{
		min-width: 285upx;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items:center;
		
	}
	.header-top-three-top{
		display: flex;
		align-items:center;
		height: 80upx;
		min-width:180upx;
		border-radius: 40upx 0 0 40upx ;
		font-size: 40upx;
	}
	.header .header-bottom{
		
		height: 80upx;
		min-width: 785upx;
		display: flex;
		justify-content:center;
		align-items:center;
		text-align: center;
	}
	.header .header-bottom view{
		width:196upx ;
	}
	
</style>
<script>
	export default {
		data() {
			return {
				TabCur: 1,
				scrollLeft: 1,
				itemFollow:[],
				itemWacth:[],
				avatarUrl: uni.getStorageSync('avatarUrl'),
				nickName: uni.getStorageSync('nickName')
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},goTop(){
				//回滚顶部
				uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
				});
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
			    title: '尼莫影视-我的'
			});
			//设置背景色
			/* uni.setBackgroundColor({
						backgroundColor: '#ffffff',
						backgroundColorTop: '#222222',
						backgroundColorBottom: '#333333'
			}); */
		}
		,
		onShow() {
			 let _self=this
			 //获取观看
			 uni.request({
			     url:_self.$websiteUrl+'weixin/wacth',
			     data: {
			         openid: uni.getStorageSync('openid'),
			     },
			     method: 'POST',
			     header: {
			         'content-type': 'application/json'
			     },
			     success: (res) => {
					 _self.itemWacth=res.data
			 		console.log(res.data)
			     }
			 });
			  //获取关注
			 uni.request({
			     url:_self.$websiteUrl+'weixin/follow',
			     data: {
			         openid: uni.getStorageSync('openid'),
			     },
			     method: 'POST',
			     header: {
			         'content-type': 'application/json'
			     },
			     success: (res) => {
					 _self.itemFollow=res.data
			 		console.log(res.data)
			     }
			    
			 });
		}
	}
</script>

