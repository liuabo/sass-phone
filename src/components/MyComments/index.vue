<template>
    <div id="myRev">
        <div class="header">
          <search :isBack='isBack' :getList='getList' ref='search'></search>
        </div>
        <div class="wu" v-if="!list.length">暂无数据</div>
        <loading v-show="loadBol"></loading>
        <section class="content" v-if="list.length" :style="{ height: wrapperHeight + 'px' }"  style="overflow:scroll">
          <mt-loadmore :auto-fill='false' :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <dl v-for="item in list" :key="item.id" @click="changeRouter(item.outlink,item.id)">
                <dt><img :src="item.cover_image" alt=""></dt>
                <dd>
                    <h2 class="ellipsis1">{{item.title}}</h2>
                    <p>
                        <span class="date_style">{{item.create_time | timeFilter(false,'/')}}</span>
                    </p>
                </dd>
            </dl>
            <div slot="bottom" v-if="list.length<limit" ></div>
            <div slot="bottom" v-if="allLoaded" class="wu">暂无更多数据</div>
          </mt-loadmore>
        </section>
    </div>
</template>

<script>
import pageHeader from "../public/pageHead";
import search from "../public/search";
import loading from "../public/loading";
export default {
  name: "myRev",
  components: { pageHeader, search, scroll, loading },
  data() {
    return {
      isBack:true,
      allLoaded: false,
      wrapperHeight: 0,
      // title: "",
      list: [],
      id: this.$route.params.id,
      loadBol: false,
      limit: 15,
      page: 0
    };
  },
  methods: {
    getMyLikeNewsList(type,title) {
      //点赞
      let data = {
        limit: this.limit,
        offset: this.page * this.limit,
        title:title || ''
      };
      type ? (this.loadBol = "") : true;
      this.$api.post("/app/news/getMyLikeNewsList", data, r => {
        this.loadBol = false;
        this.assing(r.data);
      });
      this.updet(type);
    },
    getMyStoreNewsList(type,title) {
      //收藏
      let data = {
        limit: this.limit,
        offset: this.page * this.limit,
        title:title || ''
      };
      type ? (this.loadBol = "") : true;
      this.$api.post("/app/news/getMyStoreNewsList", data, r => {
        this.loadBol = false;
        this.assing(r.data);
      });
      this.updet(type);
    },
    getReplyMeNewsList(type,title) {
      //回复
      let data = {
        limit: this.limit,
        offset: this.page * this.limit,
        title:title || ''
      };
      type ? (this.loadBol = "") : true;
      this.$api.post("/app/news/getReplyMeNewsList", data, r => {
        this.loadBol = false;
        this.assing(r.data);
      });
      this.updet(type);
    },
    getMyCommentNewsList(type,title) {
      //评论
      let data = {
        limit: this.limit,
        offset: this.page * this.limit,
        title:title || ''
      };
      type ? (this.loadBol = "") : true;
      this.$api.post("/app/news/getMyCommentNewsList", data, r => {
        this.loadBol = false;
        this.assing(r.data);
      });
      this.updet(type);
    },
    assing(data) {
      if (this.page == 0) {
        this.list = data;
        if(data.length == 0){
            this.allLoaded = true
        }
      } else {
        this.list.push(...data);
        if (data.length == 0) {
          this.allLoaded = true;
        }
      }
    },
    // changeTitle() {
    //   let id = this.$route.params.id;
    //   if (id == 1) {
    //     this.title = "我的评论";
    //   } else if (id == 2) {
    //     this.title = "回复我的";
    //   } else if (id == 3) {
    //     this.title = "我的收藏";
    //   } else if (id == 4) {
    //     this.title = "我的点赞";
    //   }
    // },
    changeRouter(outlink, id) {
      if (outlink.length) {
      } else {
        this.$router.push({ name: "contentDetails", params: { id } });
      }
    },
    getList(type,title) {
      if (this.id == 1) {
        this.getMyCommentNewsList(type,title);
      } else if (this.id == 2) {
        this.getReplyMeNewsList(type,title);
      } else if (this.id == 3) {
        this.getMyStoreNewsList(type,title);
      } else if (this.id == 4) {
        this.getMyLikeNewsList(type,title);
      }
    },
    loadTop() {
      this.page = 0;
      this.getList("top");
      if (this.list.length < this.limit) {
        this.allLoaded = true;
      }
    },
    loadBottom() {
      this.page += 1;
      this.getList("bottom");
    },
    updet(type) {
      if (type == "top") {
        this.allLoaded = false;
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded();
        }, 1000);
      } else if (type == "bottom") {
        this.$refs.loadmore.onBottomLoaded();
      }
    }
  },
  mounted() {
    // this.changeTitle();
    this.wrapperHeight = document.documentElement.clientHeight;
    this.getList();
  },
  watch:{
      $route(to,from){
        this.id = to.params.id
        this.getList();
      }
  }
};
</script>

<style lang="scss" scoped>
#myRev {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #eee;
  .header {
    height: 0.45rem;
    position: relative;
    z-index: 1000;
  }
  .content {
    margin-top: -16px;
    flex: 1;
    overflow-y: auto;
    background: #eee;
    dl {
      height: 0.9rem;
      box-sizing: border-box;
      margin-top: 2px;
      display: flex;
      padding: 0.15rem;
      background: #fff;
      justify-content: space-between;
      align-items: center;
      dt {
        width: 0.6rem;
        height: 0.6rem;
        img {
          width: 0.6rem;
          height: 0.6rem;
        }
      }
      dd {
        width: 100%;
        height: 100%;
        text-align: left;
        margin-left: 0.15rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h2 {
          text-align: left;
          font-size: 14px;
          color: #484848;
          font-weight: 500;
          font-family: "PingFangSC-Semibold", sans-serif;
        }
        p {
          text-align: right;
          color: #8b8b8b;
        }
      }
    }
    .nodata {
      display: block;
      width: 100%;
      margin: 0 auto;
      text-align: center;
      font-size: 14px;
      line-height: 60px;
    }
  }
  .date_style {
    font-size: 12px;
  }
  .slide {
    position: absolute;
    top: 0.45rem;
  }
  .wu {
    padding-top: 10px;
    text-align: center;
    color: #aaa;
  }
}
</style>
