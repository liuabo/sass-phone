<template>
	<div class="personInfo">
		<div class="Info_left">
			<div class='message'>
				<div class="headPic">
					<img :src="user.img" alt="">
				</div>
				<p>{{user.name}}</p>
				<p><span v-if="user.dep">{{user.dep}}</span></p>
			</div>
			<div class="comment">
				<p  v-for="item in list" :key="item.id" @click="goTo(item.id)">{{item.name}}</p>
			</div>
		</div>
	</div>
</template>

<script>
import img from "../../assets/images/head.png";
export default {
  name: "personInfo",
  props:['changeBol'],
  data() {
    return {
      list: [
        { id: 1, name: "我的评论" },
        // {id:2,name:'回复我的'},
        { id: 3, name: "我的收藏" },
        { id: 4, name: "我的点赞" }
      ],
      user: {
        name: decodeURI(sessionStorage["userName"]),
        img: sessionStorage["headPortrait"]
          ? decodeURIComponent(sessionStorage["headPortrait"])
          : img
        // dep : sessionStorage['dep'] ? decodeURI(sessionStorage['dep']) : '',
      }
    };
  },
  methods: {
    goTo(id) {
		this.changeBol()
		this.$router.push({ name: "MyComments", params: { id }});
    }
  },
 
};
</script>

<style lang="scss" scoped="scoped">
.personInfo {
  position: fixed;
  right: 0;
  top: 0.46rem;
  z-index: 1000999;
  width: 1.3rem;
  height: 100vh;
  background: #888888;
  font-size: 0.15rem;
  color: #ebebeb;
}
.Info_left {
  .headPic {
    height: 0.8rem;
    width: 0.8rem;
    margin: 0.3rem auto 0.05rem;
    border-radius: 50%;
    // border: 1px solid red;
    img {
      border-radius: 50%;
      height: 100%;
    }
  }
  .message {
    p {
      text-align: center;
      line-height: 0.23rem;
    }
    p:last-child {
      font-size: 0.13rem;
    }
  }
  .comment {
    margin-top: 0.4rem;
    p {
      padding-left: 0.2rem;
      text-align: center;
      line-height: 0.66rem;
    }
    p:first-child {
      background: url("../../assets/images/left-ico1.png") no-repeat 0.25rem
        center;
      background-size: 0.15rem;
    }
    // p:nth-child(2) {
    // 	background: url("../../assets/images/left-ico2.png") no-repeat 0.25rem center;
    // 	background-size: 0.15rem;
    // }
    p:nth-child(2) {
      background: url("../../assets/images/left-ico3.png") no-repeat 0.25rem
        center;
      background-size: 0.15rem;
    }
    p:last-child {
      background: url("../../assets/images/left-ico4.png") no-repeat 0.25rem
        center;
      background-size: 0.15rem;
    }
  }
}
</style>