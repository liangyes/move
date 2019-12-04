<script>
	export default {
		globalData: {  
		            websiteUrl: 'http://106.13.206.82/'  
		}, 
		onLaunch: function() {
			console.log('App Launch')
			//登录
			
				
		},
		onLoad:function  () {
				//设置背景色
				uni.setBackgroundColor({
							backgroundColor: '#ffffff',
							backgroundColorTop: '#ffffff',
							backgroundColorBottom: '#ffffff'
				 });
				uni.setBackgroundTextStyle({
					textStyle: 'dark' // 下拉背景字体、loading 图的样式为dark
				})
				
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "components/colorui/main.css";
	@import "components/colorui/icon.css";
</style>
