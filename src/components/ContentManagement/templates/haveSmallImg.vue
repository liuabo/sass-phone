<template>
	<div>
		<div v-for="item in newsList" :key="item.id">
			<dl class="news_list" @click="$router.push({ name: 'contentDetails', params: { id:item.id }})">
				<dt>
					<img v-lazy="item.coverImage"/>
				</dt>
				<dd>
					<p>{{item.title}}</p>
					<span>{{item.createTime| timeFilter(false,false)}}</span>
				</dd>
			</dl>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: ["newsList"],
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.news_list {
		margin-top: 0.01rem;
		padding: 0.15rem;
		display: flex;
		background-color: white;
		text-align: left;
		dt {
			width: 0.75rem;
			height: 0.75rem;
			margin-right: 0.15rem;
			img {
				width: 0.75rem;
				height: 0.75rem;
			}
		}
		dd {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			p {
				line-height: 0.25rem;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
				font-size: 0.15rem;
				color: #898989;
			}
			span {
				line-height: 0.33rem;
				font-size: 0.13rem;
				color: #D0D0D0;
			}
		}
	}
</style>