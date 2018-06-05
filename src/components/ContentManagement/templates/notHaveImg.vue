<template>
	<div>
		<div class="new" v-for="item in newsList" :key="item.id">
			<dl class="news_list" @click="$router.push({ name: 'contentDetails', params: { id:item.id }})">
				<dt>{{item.title}}</dt>
				<dd>
					<p>{{item.description}}</p>
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
	methods: {}
}
</script>

<style lang="scss" scoped>
.new{
	&:last-child{
	  margin-bottom: 0.3rem;
  }
}
.news_list {
  margin-top: 0.01rem;
  padding: 0.1rem 0.15rem;
  background-color: white;
  text-align: left;
  
  dt {
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 0.15rem;
    color: #898989;
    font-size: 14px;
    color: #484848;
    font-weight: 500;
    font-family: "PingFangSC-Semibold", sans-serif;
  }
  dd {
    font-size: 0.13rem;
    p {
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 0.2rem;
      color: #dfdfdf;
    }
    span {
      line-height: 0.29rem;
      color: #d0d0d0;
    }
  }
}
</style>