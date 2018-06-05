<template>
	<div class="page_head">
		<a class="return" @click="$router.back()"></a>
		<h4>{{title}}</h4>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props:['title'],
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.page_head {
		// position: fixed;
		top: 0;
		width: 100%;
		height: 0.45rem;
		background: #fff;
		z-index: 999;
		.return {
			position: absolute;
			left: 0.17rem;
			top: 0.17rem;
			border-left: 2px solid #cecece;
			border-top: 2px solid #cecece;
			transform: rotate(-45deg);
			display: inline-block;
			cursor: pointer;
			width: 12px;
			height: 12px;
		}
		h4 {
			line-height: 0.45rem;
			text-align: center;
			font-size: 0.16rem;
			font-weight: normal;
		}
	}
</style>