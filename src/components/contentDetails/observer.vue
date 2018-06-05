<template>
    <div class="observer">
        <div class="head">
            <page-header :title="title"></page-header>
        </div>
        <div class="content" :style="{ height: wrapperHeight + 'px' }" style="overflow:scroll">
            <mt-loadmore :auto-fill='false' :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                <news-comment :newsCommentList='newsCommentList' :remove='remove'></news-comment>
                <div slot="bottom" v-if="newsCommentList.length<limit"></div>
            </mt-loadmore>
        </div>
        <loading v-show="loadBol"></loading>
    </div>
</template>
<script>
import pageHeader from '../public/pageHead'
import newsComment from './newsComment'
import loading from '../public/loading'

export default {
    name: 'observer',
    components: { pageHeader, newsComment,  loading },
    data() {
        return {
            allLoaded:false,
            wrapperHeight:0,
            title: '评论详情',
            newsCommentList: [],
            loadBol: false,
            limit:15,
            page:0,
        }
    },
    methods: {
        getNewsCommentList() {//获取评论
        this.newsCommentList = []
            let data = {
                limit: this.limit,
                offset: this.page * this.limit,
                newsId: this.$route.params.id
            }
            this.loadBol = true
            this.$api.post('app/news/newsCommentList', data, r => {
                this.newsCommentList = r.data
                this.loadBol = false
            })
        },
        remove(id) {//删除评论
            let data = {
                id
            }
            this.$api.post('/app/news/remove', data, r => {
                this.newsCommentList.forEach((r, index) => {
                    if (r.id == id) {
                        this.newsCommentList.splice(index, 1)
                    }
                })
            })
        },
        getLoadNewsCommentList(type) {//获取评论
            let data = {
                limit: this.limit,
                offset: this.page * this.limit,
                newsId: this.$route.params.id
            }
            this.$api.post('app/news/newsCommentList', data, r => {
                if(this.page == 0){
					this.newsCommentList = r.data
				}else{
					this.newsCommentList.push(...r.data)
					if(r.data.length == 0){
						this.allLoaded = true
					}
				}
            })
            if(type=='top'){　　
				this.allLoaded = false
				this.$refs.loadmore.onTopLoaded();
			}else if(type=='bottom'){
				this.$refs.loadmore.onBottomLoaded();
			}
        },
        loadTop() {
			this.page = 0
			this.getLoadNewsCommentList('top')
		},
		loadBottom() {
			this.page += 1
			this.getLoadNewsCommentList('bottom')
		}

    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight
        this.getNewsCommentList()
    }
}
</script>
<style lang="scss" scoped>
.comm_del {
  position: absolute;
  top: 0.44rem !important;
}
.observer {
  display: flex;
  flex-direction: column;
  .head {
    position: relative;
    height: 0.45rem;
    width: 100%;
    z-index: 100;
  }
  .content {
    flex: 1;
    overflow: auto;
    margin-top: -16px;
  }
}
</style>
