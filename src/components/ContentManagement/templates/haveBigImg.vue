<template>
	<ul class="news_list">
		<li v-for="item in newsList" :key="item.id">
			<div @click="$router.push({ name: 'contentDetails', params: { id:item.id }})">
				<div>
					<img v-lazy="item.coverImage" />
				</div>
				<p>{{item.title}}</p>
				<span>{{item.createTime| timeFilter(false,false)}}</span>
			</div>
		</li>
	</ul>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["newsList"],
  methods: {}
};
</script>

<style lang="scss" scoped>
.news_list {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  // display: flex;
  // flex-wrap: wrap;
  box-sizing: border-box;
  text-align: left;
  // justify-content: space-around;
  padding: 0 0.16rem;
  li {
    width: 1.65rem;
    height: 1.75rem;
    margin-top: 0.16rem;
    background-color: white;
    &:nth-of-type(2n+1){
      float: left;
    }
    &:nth-of-type(2n){
      float: right;
    }
    div {
      width: 100%;
      height: 1rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      height: 0.35rem;
      padding: 0 0.1rem;
      line-height: 0.18rem;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: #898989;
      font-size: 0.14rem;
      padding-top: 10px;
    }
    span {
      padding-left: 0.1rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: #d0d0d0;
    }
  }
}
</style>