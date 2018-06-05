<template>
    <div class="detail" >
        <div class="content" >
            <loading v-show="loadBol"></loading>
            <div class="top" v-if="isShow" >
                <h2 class="title">{{comment.title}}</h2>
                <p class="time">{{comment.create_time | timeFilter(false,'/')}}</p>
                <div class="con">
                    <div v-html='content'></div>
                    <div class="count">
                        <span class="like">{{comment.like_count}}</span>
                        <span class="read">{{comment.read_count}}</span>
                    </div>
                </div>
            </div>
            <p class="nodata" v-if="noData">您无法查看该新闻</p>
            <div class="com" >
                <news-comment ref="newsComment" :remove="remove" :newsCommentList='newsCommentList'></news-comment>
            </div>
            
        </div>
            <footer :class="[!issue? 'foot' : '']" >
                <a class="return" @click="$router.back()"></a>
                <textarea v-model="commentIssue" :class="[!issue? 'input' : '']" type="text" @focus="focus()" @blur="blur()" placeholder="整点啥不？"></textarea>
                <div class="handle" :class="[!issue? 'handleShow' : '']">
                    <router-link tag="span" :to="{name: 'observer', params: {id:id}}" v-if="issue" class="comment">
                        <b v-if="commontNum!=0">{{commontNum}}</b>
                    </router-link>
                    <p @click="submit()" v-else class="issue" :class="[activeIssue ? 'activeIssue' : '']">发布</p>
                    <span v-if="issue" class="like" :class="[likeActive ? 'likeActive':'']" @click="like()"></span>
                    <span v-if="issue" class="collect" :class="[storeActive ? 'storeActive':'']" @click="store()"></span>
                </div>
            </footer>
    </div>
</template>
<script>
import pageHeader from "../public/pageHead";
import newsComment from "./newsComment";
import loading from "../public/loading";
import axios from "axios";

export default {
  name: "detail",
  components: { pageHeader, newsComment, loading },
  data() {
    return {
      title: "内容详情",
      comment: {},
      content: "",
      id: "",
      isShow: false,
      issue: true,
      activeIssue: false,
      commentIssue: "",
      newsCommentList: [],
      likeActive: false,
      storeActive: false,
      loadBol: false,
      commontNum: 0,
      noData: false,
      isLike: true,
      isStore: true
    };
  },
  methods: {
    getDetail() {
      //获取新闻
      let data = {
        id: this.id
      };
      this.loadBol = true;
      this.$api.post("app/news/getNewsDetail", data, r => {
        if (r.data.outlink) {
          location.href = r.data.outlink;
          return;
        }
        this.loadBol = false;
        this.comment = r.data;

        if (!r.data || !r.data.title) {
          this.noData = true;
          return;
        }

        axios.get(r.data.contentOssUrl).then(r => {
          this.content = r.data;
        });

        if (r.data.title.length) {
          this.isShow = true;
        }
        this.commontNum = r.data.content_count;
        this.likeActive = this.comment.isLike;
        this.storeActive = this.comment.isStore;
        let data_01 = {
          newsId: this.id
        };
        if (!this.comment.isRead) {
          this.$api.post("app/news/readNews", data_01, r => {});
        }
        this.getNewsCommentList(); //获取评论
      });
    },
    getNewsCommentList() {
      //获取评论
      let data = {
        limit: 8,
        offset: 0,
        newsId: this.id
      };
      this.$api.post("app/news/newsCommentList", data, r => {
        this.newsCommentList = r.data;
      });
    },
    spliceLength(str, length) {
      let num = 0;
      if (/[a-z]/.test(str)) {
        num = str.match(/[a-z]/g).length;
      }
      var length = length + num * 0.5;
    },
    focus() {
      //得焦
      this.issue = false;
    },
    blur() {
      //失焦
      if (this.commentIssue) {
        return;
      }
      this.issue = true;
      this.activeIssue = false;
    },
    submit() {
      //发布
      if (this.activeIssue) {
        let data = {
          newsId: this.id,
          content: this.commentIssue
        };
        this.$api.post("app/news/commentNews", data, r => {
          this.getNewsCommentList();
          this.commontNum = this.commontNum * 1 + 1;
          this.$refs.newsComment.isHeight();
        });
        this.commentIssue = "";
        this.activeIssue = false;
        this.issue = true;
      }
      this.$forceUpdate();
    },
    like() {
      //点赞
      let data = {
        newsId: this.id
      };
      if (this.isLike) {
        this.isLike = false
        this.likeActive = !this.likeActive;

        this.$api.post(
          "app/news/like",
          data,
          r => {
            this.isLike = true
            if (this.likeActive) {
              this.comment.like_count -= 1;
            } else {
              this.comment.like_count = this.comment.like_count * 1 + 1;
            }
            this.$forceUpdate();
          },
          r => {
            this.likeActive = !this.likeActive;
          }
        );
      }
    },
    store() {
      //收藏
      let data = {
        newsId: this.id
      };
      if (this.isStore) {
        this.isStore = false;
        this.storeActive = !this.storeActive;
        this.$api.post(
          "app/news/store",
          data,
          r => {
            this.isStore = true;
          },
          r => {
            this.storeActive = !this.storeActive;
          }
        );
      }
    },
    remove(id) {
      //删除评论
      let data = {
        id
      };
      this.$api.post("/app/news/remove", data, r => {
        this.commontNum--;
        this.newsCommentList.forEach((r, index) => {
          if (r.id == id) {
            this.newsCommentList.splice(index, 1);
          }
        });
      });
    },
    getUrlParam() {
      var name, value;
      var str = location.href; //取得整个地址栏
      var path = str;
      var num = str.indexOf("?");
      if (num > 0) {
        this.path = str.substr(0, num);
      }
      str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
      var arr = str.split("&"); //各个参数放到数组里
      let json = {};
      for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
          name = arr[i].substring(0, num);
          value = arr[i].substr(num + 1);
          json[name] = value;
        }
      }
      if (arr.length == 1) {
        return;
      }
      sessionStorage["token"] = json.token;
    }
  },
  mounted() {
    this.getUrlParam();
    this.id = this.$route.params.id;
    this.getDetail();
  },
  watch: {},
  updated() {
    if (this.commentIssue.length) {
      this.activeIssue = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.return {
  position: absolute;
  bottom: 0.16rem;
  left: 0.16rem;
  border-left: 2px solid #cecece;
  border-top: 2px solid #cecece;
  transform: rotate(-45deg);
  display: inline-block;
  cursor: pointer;
  width: 8px;
  height: 8px;
}
.nodata {
  text-align: center;
  color: #aaa;
  margin-top: 0.4rem;
}

.detail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  overflow: hidden;
  .head {
    height: 0.45rem;
    width: 100%;
  }
  .content {
    flex: 1;
    margin-top: 0.05rem;
    overflow: auto;
    overflow-x: hidden;
    background: #eee;
    padding-bottom: 0.45rem;
    .top {
      background: #fff;
      padding: 0 0.16rem;
      margin-bottom: 0.15rem;
    }
    h2 {
      font-size: 0.16rem;
      line-height: 0.44rem;
      color: #474747;
    }
    .time {
      font-size: 0.11rem;
      line-height: 0.5rem;
      color: #828282;
    }
    .con {
      font-size: 0.12rem;
      color: #434343;
      line-height: 0.3rem;
      .count {
        height: 0.37rem;
        padding-top: 0.03rem;
        text-align: right;
        span {
          color: #cccccc;
          padding-left: 0.14rem;
          background-repeat: no-repeat;
          background-position: left center;
        }
        .like {
          background-size: 0.12rem 0.12rem;
          background-image: url(../../assets/images/zan2.png);
        }
        .read {
          margin-left: 0.14rem;
          background-image: url(../../assets/images/read.png);
          background-size: 0.12rem 0.1rem;
        }
      }
    }
    .com {
      width: 100%;
      .itemBottom {
        font-size: 14px;
        height: 0.75rem;
        width: 100%;
        line-height: 0.75rem;
        text-align: center;
        color: #aaa;
      }
    }
  }
  .foot {
    height: 0.96rem !important;
  }
  footer {
    // display: block;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    height: 0.45rem;
    width: 100%;
    background: #fff;
    padding-left: 0.14rem;
    line-height: 0.45rem;
    font-size: 12px;
    position: relative;
    textarea {
      position: absolute;
      top: 50%;
      left: 0.39rem;
      transform: translateY(-50%);
      padding-left: 0.1rem;
      height: 0.2rem;
      line-height: 0.2rem;
      width: 1.97rem;
      border-radius: 0.125rem;
      border: 1px solid #cccccc;
      color: #aaa;
    }
    .input {
      height: 0.72rem;
      width: 2.6rem;
    }
    .handle {
      float: right;
      padding-right: 0.12rem;
      height: 100%;
      padding-top: 0.125rem;
      p {
        width: 0.4rem;
        position: absolute;
        bottom: 0;
        right: 0;
      }
      span {
        float: left;
        height: 0.2rem;
        width: 0.2rem;
        background-size: 100% 100%;
        margin-right: 0.24rem;
      }
      .comment {
        background-image: url(../../assets/images/pinglun.png);
        position: relative;
        b {
          position: absolute;
          top: -0.11rem;
          right: -0.11rem;
          height: 0.25rem;
          width: 0.25rem;
          padding: 0.02rem;
          color: #fff;
          font-size: 20px;
          transform: scale(0.5);
          transform-origin: right top;
          line-height: 0.22rem;
          border: 5px solid #fff;
          text-align: center;
          background: red;
          border-radius: 50%;
        }
      }
      .like {
        background-image: url(../../assets/images/zan.png);
      }
      .likeActive {
        background-image: url(../../assets/images/zan3.png);
      }
      .collect {
        background-image: url(../../assets/images/shoucang.png);
        margin: 0;
      }
      .storeActive {
        background-image: url(../../assets/images/xing.png);
      }
      .issue {
        font-size: 15px;
        color: #ccc;
        padding-right: 0.1rem;
      }
      .activeIssue {
        font-weight: 600;
        color: #26aff7;
      }
    }
    .handleShow {
      padding-top: 0;
      line-height: 0.45rem;
    }
  }
}
</style>
