<template>
	<div class="newsTrends">
		<search :isBack='isBack'  id="commHed" :getList='getAllNews' ref='search'></search>
		<nav v-show="navList.length">
			<p :class="{active:categoryId==-1}">
				<span  @click="change(-1)">全部分类</span>
			</p>
			<p v-for="item in navList" :key="item.id" :class="{active:categoryId==item.id}">
				<span  @click="change(item.id)">{{item.name}}</span>
			</p>
		</nav>
		<div v-if="newsList.length" class="temp_style" :style="{ height: wrapperHeight + 'px' }"  style="overflow:scroll">
			<mt-loadmore :auto-fill='false' :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
				<have-big-img v-if="list[0].start" :newsList="newsList"></have-big-img>
				<have-small-img v-else-if="list[1].start" :newsList="newsList"></have-small-img>
				<have-big-img v-else-if="list[0].start" :newsList="newsList"></have-big-img>
				<not-have-img v-else :newsList="newsList"></not-have-img>
				<div slot="bottom" v-if="allLoaded"></div>
			</mt-loadmore>
		</div>
		<div v-else class="noNews">暂无新闻</div>
		<loading v-show="loadBol"></loading>
	</div>
</template>

<script>
import pageHead from '../public/pageHead';
import search from '../public/search';
import haveBigImg from './templates/haveBigImg';
import haveSmallImg from './templates/haveSmallImg';
import notHaveImg from './templates/notHaveImg';
import loading from '../public/loading'
export default {
	name: 'newsTrends',
	data() {
		return {
			isBack:false,
			allLoaded:false,
			wrapperHeight:0,
			title: "新闻动态",
			navList: [],
			categoryId: "-1",
			flag: true,
			newsList: [],
			loadBol: false,
			limit:15,
			page:0,
			list: [{
				id: 1,
				start: false,
				name: 'have_big_img'
			},
			{
				id: 2,
				start: false,
				name: 'have_small_img'
			},
			{
				id: 3,
				start: false,
				name: 'notHaveImg'
			},
			],
		}
	},
	components: {
		pageHead,
		search,
		haveBigImg,
		haveSmallImg,
		notHaveImg,
		loading,
	},
	methods: {
		change(id) {
			this.page = 0
			this.categoryId = id;
			this.getAllNews(this.$refs.search.showData)
		},
		getAllNews(title) {//新闻
			this.newsList = [];
			let data = {
				limit: this.limit,
				offset: this.page * this.limit ,
				categoryId: this.categoryId == -1 ? "" : this.categoryId,
				title: title || ''
			}
			this.$api.post('/app/news/newsList', data, r => {
				this.newsList = r.data
				if(r.data.length < this.limit){
					this.allLoaded = true
				}
				this.loadBol = false
				
			})
		},
		getLoadAllNews(type) {//上拉新闻
			let data = {
				limit: this.limit,
				offset: this.page * this.limit ,
				categoryId: this.categoryId == -1 ? "" : this.categoryId,
				title: this.$refs.search.showData || ''
			}
			this.$api.post('/app/news/newsList', data, r => {
				if(this.page == 0){
					this.newsList = r.data
					if(r.data.length == 0){
						this.allLoaded = true
					}
				}else{
					this.newsList.push(...r.data)
					if(r.data.length == 0){
						this.allLoaded = true
						this.wrapperHeight = document.documentElement.clientHeight - 90;
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
		getTenantSkin() {//皮肤
			this.loadBol = true
			this.$api.post('/app/news/getCategoryListAndSkin', null, r => {
				this.navList = r.data.newsCategoryList
				this.list.forEach((item, index) => {
					if (r.data.newsSkins && item.name == r.data.newsSkins.template) {
						this.list[index].start = true
					}
				})
				this.getAllNews()
			})
		},
		loadTop() {
			this.page = 0
			this.getLoadAllNews('top')
		},
		loadBottom() {
			this.page+= 1
			this.getLoadAllNews('bottom')
		},
		getUrlParam () {
            var name,value;
            var str=location.href; //取得整个地址栏
            var path = str
            var num=str.indexOf("?");
            if(num>0){
                this.path = str.substr(0,num);
            }
            str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
            var arr=str.split("&"); //各个参数放到数组里
            let json = {}
            for(var i=0;i < arr.length;i++){
                num=arr[i].indexOf("=");
                if(num>0){
                    name=arr[i].substring(0,num);
                    value=arr[i].substr(num+1);
                    json[name]=value;
                }
            }
            if(arr.length == 1){
                return
			}
            sessionStorage["token"] = json.token
			sessionStorage['userName'] = json.username
			sessionStorage['headPortrait'] = json.avatar
			// sessionStorage['dep'] = json.dep
        }, 
	},
	created() {
		this.getUrlParam()
		this.getTenantSkin()
	},
	mounted(){
		this.wrapperHeight = document.documentElement.clientHeight - 110;
	}
}
</script>

<style lang="scss" scoped>


.newsTrends {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #eee;
  overflow: hidden;
  nav {
    width: 100%;
    height: 0.35rem;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
	overflow-x: scroll;
	position: relative;
	z-index: 999;
    p {
		flex: 1;
		white-space: nowrap;
		span {
			display: block;
			padding: 0 0.15rem;
			box-sizing: border-box;
			height: 100%;
			line-height: 0.35rem;
			font-size: 0.15rem;
			text-align: center;
		}
		&.active {
			color: #90222f;
			border-bottom: 1px solid #90222f;
		}
    }
  }
  .temp_style {
    flex: 1;
    width: 100%;
	margin-top: -16px;
	// padding-bottom: 16px;
	.mint-loadmore-top{
		text-align: center;
	}
  }
  .sli {
    position: absolute;
  }
  .noNews{
	  padding-top: 20px;
	  color: #aaa;
	  text-align: center;
  }
}
</style>