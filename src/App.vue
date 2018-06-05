<template>
	<div id="app">
		<router-view/>
		<div class="err_drag">
			<div class="con">
				<p class="err_title">操作提示</p>
				<p class="err_con"></p>	
				<span class="submint" @click="errShow($event)">确定</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'App',
		methods:{
			errShow(evt){
				evt.path[2].style.display = 'none'
			}
		}
	}
</script>

<style lang="scss">
.err_drag{
	display: none;
	position: fixed;
	top: 0.47rem;
	left: 0;
	background: rgba($color: #000000, $alpha: 0.5);
	height: 100%;
	width: 100%;
	z-index: 99999;
	.con{
		border-radius: 5px;
		padding: 0.15rem;
		box-sizing: border-box;
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%,-50%);
		min-height: 0.6rem;
		width: 3.2rem;
		background: #fff;
		text-align: center;
		.err_title{
			margin-bottom: 0.1rem;
		}
		.err_con{
			width : auto; 
			display : inline-block; 
			text-align : left; 
		}
	}
	.submint{
		margin-top: 0.16rem;
		color: #4949ff;
		font-size: 14px;
		float: right;
		padding: 0.04rem;
	}
}
html{
	height: 100%;
	width: 100%;
}
body{
	height: 100%;
	width: 100%;
}
#app{
	height: 100%;
	width: 100%;
	overflow: hidden;
}
	#app{
		background: #eee;
		font-size: 12px;
	}
</style>
