<template>
	<view>
		
			<view class="cu-modal" :class="modalName=='gridModal'?'show':''" @tap="hideModal" >
				<view class="cu-dialog" @tap.stop>
					<radio-group class="block" @change="Gridchange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in 3" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub">{{index +3}} 列</view>
									<radio class="round" :value="(index + 3) + ''" :class="gridCol==index+3?'checked':''" :checked="gridCol==index+3"></radio>
								</label>
							</view>
						</view>
					</radio-group>
					<view class="cu-list menu text-left solid-top">
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">边框</text>
							</view>
							<view class="action">
								<switch @change="Gridswitch" :class="gridBorder?'checked':'checked'" :checked="gridBorder?true:true"></switch>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index"  @click="clickType(item.type)"    >
					<view :class="['cuIcon-' + item.color,'text-' + item.color]" >
						<view class="cu-tag badge" v-if="item.count!=0">
							<block v-if="item.count!=1">{{item.count>99?'99+':item.count}}</block>
						</view>
					</view>
					<view  :style="{color:item.color}"  >{{item.type}}</view>
				</view>
			</view>
			<!--推荐-->
			<view style="margin-bottom: 5rpx;">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<navigator url="/pages/index/test"></navigator>
						<text class="cuIcon-title text-red  text-bold" ></text> {{type}}
					</view>
				</view>
				<view class="cu-list menu-avatar">
					<view  :scroll-top="scrollTop" class="lg" style="height: 240upx;" v-for="(item,index) in hotList" :key="index"  >
						<navigator  style="display: flex;flex-direction:row;background: white;height: 240upx;" :url="'/pages/index/detail?id='+item.id" >
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
		
					<view style="display: flex;justify-content: center;height: 80upx;line-height: 80upx;">
						<text class="loading-text">
							{{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}</text>
						
					</view>
				</view>
			</view>
			<view  @click="goTop"   style="position: fixed; bottom: 100rpx;right: 20rpx;"><image style="width: 64rpx;height: 64rpx;" src="/static/page/stick.png"></image></view>	
			
			</view>
			
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
	var  _self,
	page = 2;
	export default {
		data() {
			return {
				'id':'',
				cuIconList:[],
				modalName: null,
				gridCol: 3,
				page:1,
				type:'',
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
				cardCur: 3,
				'hotList':[],
				'color':'',
				dotStyle: false,
				towerStart: 0,
				direction: '',
				loadingType: 0,
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
		},
		onLoad(options){
			_self = this;
			_self.id=options.id
			console.log(options.id)
			this.getType(options.id);
		    this.getHotList();
			
		},
		onPullDownRefresh(e) {
			  
				
        },onReachBottom(){
				//上拉
			    console.log('上拉')		
				if (_self.loadingType != 0) {//loadingType!=0;直接返回
					console.log('正在加载中...')
					return false;
				}
				_self.loadingType = 1;
			
				uni.request({
					        
							url:_self.$websiteUrl+'index/getList/platform/'+_self.id+'/page/'+page+'/type/'+_self.type,
							success: function(res) {
								
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
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},goTop(){
				//回滚顶部
				uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
				});
			},
			hideModal(e) {
				console.log(11)
				this.modalName = null
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			SwitchSex(e) {
				this.skin = e.detail.value
			},

			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			getHotList: function() {//第一次回去数据
				_self.loadingType = 0;
				//uni.showNavigationBarLoading();
				uni.request({
					url:_self.$websiteUrl+'index/getList/platform/'+_self.id+'/page/'+_self.page+'/type/'+_self.type,
					success: function(res) {
						
						uni.setNavigationBarTitle({
						    title: '尼莫影视-'+res.data.platform
						});
						console.log(res.data.data)
						_self.hotList=res.data.data
						
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();//得到数据后停止下拉刷新
					}
				});
				
			},
			getType:function(e){
				
				uni.request({
					url:this.$websiteUrl+'index/getType/platform/'+e,
					success: function(res) {
						console.log(res.data)
						_self.cuIconList=res.data
						
					}
				});
			},
			 scroll: function(e) {
					this.old.scrollTop = e.detail.scrollTop
					console.log(11)
			},
			clickType:function(e){
				this.type=e
				uni.request({
					url:this.$websiteUrl+'index/getList/platform/'+_self.id+'/page/1/type/'+_self.type,
					success: function(res) {
						page=2
						_self.hotList=res.data.data
						_self.loadingType = 0;
						if (_self.hotList.length>=res.data.pages_count) {//没有数据
							_self.loadingType = 2;
							uni.hideNavigationBarLoading();//关闭加载动画
							return false;
						}
						
					},
				})
				
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
