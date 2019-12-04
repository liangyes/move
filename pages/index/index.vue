<template>
	<view>
		
			
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="false" :circular="true"
			 :autoplay="true" interval="5000" duration="1000">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<navigator :url="'/pages/index/detail?id='+item.id"  style="width:100%;height: 800rpx;"><image :src="item.img" mode="aspectFill" ></image></navigator>
					<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
				</swiper-item>
			</swiper>
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="text-red">{{title}}</text> 
				</view>
				
			</view>
			
			<view class="cu-modal" :class="modalName=='gridModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop>
					<radio-group class="block" @change="Gridchange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in 4" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub">{{index +4}} 列</view>
									<radio class="round" :value="(index + 4) + ''" :class="gridCol==index+4?'checked':''" :checked="gridCol==index+4"></radio>
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
								<switch @change="Gridswitch" :class="gridBorder?'checked':''" :checked="gridBorder?true:false"></switch>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" >
					<navigator   :url="'/pages/index/list?id='+item.id" :extra-data="item.id">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]" >
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					
										<text>{{item.name}}</text>
					</navigator>
					
				</view>
			</view>
			<!--推荐-->
			<view style="margin-bottom: 5rpx;" v-for="(item,index) in hotList" :key="index">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title  text-bold" :class="item.color"></text> {{item.name}}
					</view>
				</view>
				<view class="cu-list menu-avatar">
					<view  :scroll-top="scrollTop" class="lg" style="height: 240upx;" v-for="(item,index) in item.list" :key="index"  >
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
						
						<!-- <view class="action">
							<view class="text-grey text-xs"></view>
							<view class="cu-tag round bg-grey sm">22:20</view>
						</view> -->
						</navigator>
					</view>
					<view style="height: 80rpx;background: white;">
						<view class="text-center">
							<navigator   :url="'/pages/index/list?id='+item.id" :extra-data="item.id">
							<button class="cu-btn round " :class="item.color">更多</button>
							</navigator>
						</view>
					</view>
					<!-- <view style="display: flex;justify-content: center;height: 80upx;line-height: 80upx;">
						<text class="loading-text">
							{{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}</text>
						
					</view> -->
					
				</view>
			</view>
			<view class="flex-sub text-center">
							<view class="solid-bottom text-xl padding">
								<text class="text-black text-bold"></text>
							</view>
							<view class="padding">如果有任何法律问题,请给我们邮箱来信:mmkk4436@gmail.com，我们会及时处理和回复，谢谢!</view>
							<!-- <view class="padding">尼莫看看提供的资源均系自动采集自各大视频网站，尼莫看看旨在给广大剧迷提供一个交流学习的平台，并不提供资源的存储服务，也不参与录制、上传等工作
			若收录的视频无意侵犯了贵司版权，请给我们邮箱来信:mmkk4436@gmail.com，我们会及时处理和回复，谢谢!</view> -->
						</view>
			<view  @click="goTop"   style="position: fixed; bottom: 100rpx;right: 20rpx;z-index: 999;"><image style="width: 64rpx;height: 64rpx;" src="/static/page/stick.png"></image></view>	
			
			</view>
			
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
	var  _self,
	page = 1;
	export default {
		data() {
			return {
				cuIconList: [/* {
					cuIcon: 'video',
					color: 'blue',
					badge: 120,
					name: '美剧'
				}, {
					cuIcon: 'video',
					color: 'red',
					badge: 10,
					name: '国产剧'
				},{
					cuIcon: 'video',
					color: 'yellow',
					badge: 0,
					name: '韩剧'
				},
				{
					cuIcon: 'video',
					color: 'yellow',
					badge: 0,
					name: '经典电影'
				}, 
				{
					cuIcon: 'video',
					color: 'yellow',
					badge: 22,
					name: '日剧'
				},
				{
					cuIcon: 'video',
					color: 'olive',
					badge: 22,
					name: '动漫'
				},
				{
					cuIcon: 'video',
					color: 'cyan',
					badge: 0,
					name: '泰剧'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '排行榜'
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '更新表'
				},
				{
					cuIcon: 'video',
					color: 'yellow',
					badge: 0,
					name: '成人'
				} */
				],
				modalName: null,
				gridCol: 4,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
				cardCur: 0,
				 SessionKey: '',
				OpenId: '',
				nickName: null,
				avatarUrl: null,
				city: null,
				country: null,
				language: null,
				gender: null,
				province: null,
				isCanUse: '',
				swiperList: [],
				'hotList':[],
				'color':'',
				dotStyle: false,
				towerStart: 0,
				direction: '',
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多!",
					contentrefresh: "努力加载中...",
					contentnomore: "没有更多数据了!"
				},
				old:{
					scrollTop:0
				},
				scrollTop: 0,
				title: 0,
			};
		},
		onLoad(options){
			_self = this;
			
			
			
			this.getHotList();
		    
		
			
			this.getBanner();
			uni.setNavigationBarTitle({
			    title: '尼莫影视-首页'
			});
			
		},
		onPullDownRefresh(e) {
			  
				
        },onReachBottom(){
				
		
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
					url:this.$websiteUrl+'index/getHot',
					success: function(res) {
						console.log(res.data.data)
						_self.hotList=res.data.data
						_self.title=res.data.title
						
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();//得到数据后停止下拉刷新
					}
				});
				uni.request({
					url:this.$websiteUrl+'index/indexType',
					
				    //url:this.$websiteUrl+'index/index',
					success: function(res) {
						console.log(res.data)
						_self.cuIconList=res.data
					
					}
				});
				
			},
			 scroll: function(e) {
					this.old.scrollTop = e.detail.scrollTop
					console.log(11)
			},//向后台更新信息
            updateUserInfo() {
				uni.setStorageSync('avatarUrl',_self.avatarUrl)
				uni.setStorageSync('nickName',_self.nickName)
                uni.request({
                    url:_self.$websiteUrl+'weixin/update',
                    data: {
                        //appKey: this.$store.state.appKey,
                        openid: uni.getStorageSync('openid'),
                        name: _self.nickName,
                        url: _self.avatarUrl,
						city: _self.city,
						country: _self.country,
						language: _self.language,
						gender: _self.gender,
						province: _self.province,
						
                    },
                    method: 'POST',
                   
                    success: (res) => {
						console.log('更新完毕！')
                    }
                   
                });
            },//获取banner
            getBanner() {
				
                uni.request({
                    url:_self.$websiteUrl+'index/banner',
                    data: {
                    },
                    method: 'GET',
                    success: (res) => {
						_self.swiperList=res.data
						console.log('获取banner！')
                    }
                   
                });
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
