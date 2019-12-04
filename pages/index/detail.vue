<template>
	<view>
		 <view  style="width: 758upx;display: flex;flex-direction: row;height: 400upx;background: linear-gradient(to right,#B2A2AC,#D0A183,#B2A2AC,#D0A183)">
                <view style="width: 40%;height: 300upx;margin:50upx 0;padding-left: 10upx;">
					<image style="width: 100%;height: 100%;" :src="move.img"></image>
				</view>  
				<view  style="width: 60%;height: 300upx;display: flex;flex-direction: column;margin:50upx 0 ;">
					<view style="height: 100upx;font-size: 40upx;padding:20upx 0 0 20upx;color: #F0F0F0;">{{move.name}}</view>
					<view style="height: 100upx;font-size: 30upx;padding:20upx 0 0 20upx;color: #F0F0F0;">{{move.update_title}}</view>
				
				</view>  
         </view>
		 <text>{{testdes}}</text>
		 <scroll-view scroll-x class="bg-mauve nav text-center" style="background: #8B0000">
		 	
			<view class="cu-item" :class="index==TabCur?'text-white cur':''" @tap="tabSelect" :data-id="index"  v-for="(item,index) in List" :key="index">
		 		<text></text> 线路{{index+1}}
		 	</view>
		 	
		 </scroll-view>
		 <view class="cu-list menu-avatar">
		 	<block v-if="TabCur==indexs" v-for="(item,indexs) in List" :key="indexs" >
		 	<view style="width: 758upx;display: flex;flex-direction: row; flex-wrap: wrap;border-top: #EAEAEA 4upx solid;">
		 				   <view style="max-width: 300upx;min-width: 100upx;height: 100upx;line-height: 100upx;background: #EAEAEA;color: #DDDDDD;text-align: center;margin: 10upx;border-radius: 10upx;color: #333333;" v-for="(item,indexss) in item.list" :key="indexss"><text style="max-width: 300upx;min-width: 100upx;height: 100upx;line-height: 100upx;background: #EAEAEA;color: #DDDDDD;text-align: center;margin: 10upx;border-radius: 10upx;color: #333333;" @click="dataClick" :data-url="item.url" :data-id="item.move_id" :data-title="item.title">{{item.title}}</text></view>
		 				 
		 	</view>
		 	</block>
		 </view>
	</view>
</template>
<style>
	a{
		text-decoration:none
	}
</style>

<script>
	var _self
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				id:'',
				'List':[],
				move:'',
				follow:'',
				'testdes':''
			};
		},
		onLoad(options){
			_self = this;
			this.id=options.id
			console.log(options.id)
			this.getMove()	
			/* uni.showShareMenu(
						
			) */
			
		},
		methods: {
			 tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getMove:function(){
				uni.request({
					url:this.$websiteUrl+'index/getMove/id/'+this.id,
					success: function(res) {
						console.log(res.data.data)
						
						_self.List=res.data.data
						_self.move=res.data.move
						_self.follow=res.data.follow
						_self.testdes=res.data.testdes
						uni.setNavigationBarTitle({
						    title: '尼莫影视-'+res.data.move.name
						});
					}
				});		
			},followClick: function(e){
				console.log(this.id)
				uni.request({
					url:this.$websiteUrl+'weixin/followDo',
					data: {
					    openid: uni.getStorageSync('openid'),
						move_id:this.id
					},
					method: 'POST',
					header: {
					    'content-type': 'application/json'
					},
					success: (res) => {
								this.follow=res.data
								console.log(res.data)
					}
				});	
			},shareClick:function(e){
						
			},
			 dataClick(e){
                let that = this;
				
				console.log(e.target.dataset.id)
				console.log(e.target.dataset.url)
                var navData = JSON.stringify(e.target.dataset); // 这里转换成 字符串
                var url=this.$websiteUrl+'index/live?id='+e.target.dataset.id+'&url='+e.target.dataset.url+'&title='+e.target.dataset.title
				window.open(url);
				 /* uni.navigateTo({
                    url:'./live?id='+navData
                }) */
            }
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
