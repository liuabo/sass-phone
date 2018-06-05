<template>
    <div class="newsComment">
            <ul class="list" v-for="(item,index) in newsCommentList" :key="item.id">
                <li class="item">
                    <dl>
                        <dt><img :src="[item.userPhoto ? item.userPhoto:imgSrc]" alt=""></dt>
                        <dd>
                            <p class="ct " :class="[arr[index] ? 'ellipsis0' : 'ellipsis2']"><span>{{item.userName}}：</span>{{item.content}}</p>
                            <p class="time">
                                <span><span v-if="arrShow[index]" style="color:#67a3ec;" @click="isSHow(index)">{{arr[index] ? "收起显示" :'查看更多'}}<b style="color:#fff;">多</b></span>{{item.createTime | timeFilter(false,'/')}}</span>
                                <span v-if="item.delete" class="del"  @click="del(item.id)" >删除</span>
                                <!-- <span class="del">回复</span> -->
                                
                            </p>
                        </dd>
                    </dl>
                </li>
            </ul>
            <div v-if="isDel" class="delComm">
                <div class="delCon">
                    <p>删除评论?</p>
                    <p><span><span  @click="del(0)">取消</span></span><span><span  @click="del(id,1)">删除</span></span></p>
                </div>
            </div>
    </div>
</template>
<script>
import imgSrc from '../../assets/images/head.png'
export default {
    name:'newsComment',
    props:['newsCommentList','remove',],
    data(){
        return{
            isDel:false,
            imgSrc,
            arr:[],
            arrShow:[],
            id:'',
        }
    },
    methods:{
        init(){
            this.arr.length = this.newsCommentList.length
            this.arr.fill(false)
        },
        isSHow(index){
            if(!this.arr.length){
                this.init()
            }
            this.arr.forEach((r,i) => {
                if(index == i){
                    this.arr[i] = !this.arr[i]
                    this.$forceUpdate()
                }
            });
        },
        del(id,num){
            if(num){ 
                this.remove(id)
            }
            this.id = id
            this.isDel = !this.isDel
        },
        isHeight(){
            setTimeout(()=>{
                var ct = document.getElementsByClassName('ct')
                this.arrShow.length = ct.length
                this.arrShow.fill(false)
                for(var i = 0; i < ct.length;i++){
                    if(ct[i].offsetHeight>24 &&ct[i].offsetHeight ){
                        this.arrShow[i] = true
                    }
                }
                this.$forceUpdate()
            },1200)

        }
    },
    mounted(){
        this.isHeight()
    }

}
</script>
<style lang="scss" scoped>
    .newsComment{
        .list{
            width: 100%;
            overflow: hidden;
            .item{
                padding: 0.15rem;
                box-sizing: border-box;
                height: 100%;
                background: #fff;
                margin-top: 2px;
                dl{
                    display: flex;
                    height: 100%;
                    dt{
                        width: 0.45rem;
                        img{
                            width:0.45rem;
                            height: 0.45rem;
                            border-radius: 50%;
                        }
                    }
                    dd{
                        height: 100%;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        font-size: 12px;
                        padding-left: 0;
                        margin-left: 0.15rem;
                        .ct{
                            line-height: 0.24rem;
                            color: #424242;
                            // max-height: 0.72rem;
                            overflow: hidden;
                        }
                        .time{
                            padding-top: 0.21rem;
                            font-size: 12px;
                            display: flex;
                            justify-content: space-between;
                            span:nth-child(1){
                                color: #878787;
                            }
                            .del{
                                color: #4f8ed3;
                            }
                        }
                    }
                }
            }
        }
        .delComm{
            position: fixed;
            height: 100%;
            width: 100%;
            top: 0.45rem;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            .delCon{
                position: absolute;
                top: 40%;
                left: 50%;
                transform: translate(-50%,-50%);
                height: 1rem;
                width: 3.2rem;
                background: #fff;
                padding: 0.1rem;
                box-sizing: border-box;
                border-radius: 4px;
                P{
                    font-size: 14px;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    text-align: center;
                    span{
                        display: inline-block;
                        width: 50%;
                        color: #4f8ed3;
                    }
                }
            }
        }
    }
</style>
