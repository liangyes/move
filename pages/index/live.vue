<template>
	 <view>
		<view>
               <!-- <video style="width: 758upx;" id="myVideo" :src="src"
                    @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video> -->
					<video id="myVideo" :src="src" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" data-setup='{}' style='width: 100%;height: auto'>
					            <source id="source" src="https://yun.kubo-zy-youku.com/ppvod/2203CA7EF32732817CC4BE645D7A58C9.m3u8" type="application/x-mpegURL"></source>
					        </video>
         </view>
		 <view style="width: 758upx;display: flex;flex-direction: row;">
		 <view style="line-height: 50upx;background: #333333;color: red;text-align: center;margin: 10upx;">当出现播放按钮时点击就可以播放了,由于网络问题,加载有可能会有点慢,如果加载时间超过一分钟请切换其他线路。如果其他线路还是看不了,请联系我们，我们更新资源！</view>
			   
		 </view>
	</view> 

</template>

 <link href="https://vjs.zencdn.net/7.4.1/video-js.css" rel="stylesheet">
    <script src='https://vjs.zencdn.net/7.4.1/video.js'></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/5.15.0/videojs-contrib-hls.min.js" type="text/javascript"></script>
 <style>
        .video-js .vjs-tech {position: relative !important;}
    </style>
<script>
	export default {
		data() {
			return {
				src: '',
                danmuList: [{
                    text: '获取更多资源，请关注微信公众号：尼莫看看   获取更多资源，请关注微信公众号：尼莫看看',
                    color: '#000000',
                    time: 60
                },
				{
					text: '获取更多资源，请关注微信公众号：尼莫看看     获取更多资源，请关注微信公众号：尼莫看看',
					color: '#000000',
					time: 500
				},
				{
					text: '获取更多资源，请关注微信公众号：尼莫看看     获取更多资源，请关注微信公众号：尼莫看看',
					color: '#000000',
					time: 1000
				}
				],
                danmuValue: ''
			};
		},
		onLoad(options) {
			var data = JSON.parse(options.id); // 字符串转对象
            console.log(data)
			
			this.src=data.url
			//this.watch(data.id)
			 // videojs 简单使用
			    var myVideo = videojs('myVideo', {
			        bigPlayButton: true,
			        textTrackDisplay: false,
			        posterImage: false,
			        errorDisplay: false,
			    })
			    myVideo.play()
			    var changeVideo = function (vdoSrc) {
			        if (/\.m3u8$/.test(vdoSrc)) { //判断视频源是否是m3u8的格式
			            myVideo.src({
			                src: vdoSrc,
			                type: 'application/x-mpegURL' //在重新添加视频源的时候需要给新的type的值
			            })
			        } else {
			            myVideo.src(vdoSrc)
			        }
			        myVideo.load();
			        myVideo.play();
			    }
			    var src = 'https://yun.kubo-zy-youku.com/ppvod/2203CA7EF32732817CC4BE645D7A58C9.m3u8';
			    document.querySelector('.qiehuan').addEventListener('click', function () {
			        changeVideo(src);
			    })
		},
		methods: {
			sendDanmu: function() {
            this.videoContext.sendDanmu({
                text: this.danmuValue,
                color: this.getRandomColor()
            });
            this.danmuValue = '';
        },
        videoErrorCallback: function(e) {
           console.log('视频异常，请更换线路，或联系我们更新资源，我们的微信公众号：尼莫看看')

			uni.showModal({
                content: e.target.errMsg,
                showCancel: false
            })
        },
        getRandomColor: function() {
            const rgb = []
            for (let i = 0; i < 3; ++i) {
                let color = Math.floor(Math.random() * 256).toString(16)
                color = color.length == 1 ? '0' + color : color
                rgb.push(color)
            }
            return '#' + rgb.join('')
        },watch:function(e){
			    console.log(e)
				uni.request({
					url:this.$websiteUrl+'weixin/wacthDo',
					data: {
					    openid: uni.getStorageSync('openid'),
						move_id:e
					},
					method: 'POST',
					header: {
					    'content-type': 'application/json'
					},
					success: (res) => {
								
								console.log(res.data)
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
