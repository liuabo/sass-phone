<template>
	<section>
		<div class="search">
      <div v-if="isBack" class="back"><a class="return" @click="$router.back()"></a></div>

			<div class="search-input">
				<input type="text" v-model="showData" @focus="iconHide()" @blur="iconShow()" />
				<img src="../../assets/images/search.png" v-if="Sbol" />
			</div>

      <div class="huakuai">
        <p @click="changeBol"></p>
      </div>
		</div>
    
		<div class="mask" v-show="bol" @click="showInfo()"></div>
		<transition name="slide-fade">
			<person-info :changeBol='changeBol'  v-show="bol"></person-info>
		</transition>
	</section>
</template>

<script>
import personInfo from "../public/personInfo";
export default {
  name: "search",
  props: ["getList",'isBack'],
  data() {
    return {
      bol: false,
      Sbol: true,
      showData: "",
    };
  },
  components: {
    personInfo
  },
  methods: {
    showInfo() {
      this.bol = !this.bol;
    },
    iconHide() {
      this.Sbol = false;
    },
    iconShow() {
      if (!this.showData.length) {
        this.Sbol = true;
      }
      this.getList(null,this.showData);
    },
    changeBol(){
      this.bol = !this.bol
    }
  },
   watch:{
	   $route(to,from){
        this.showData = ''
        this.Sbol = true;
      }
  }
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 0.45rem;
  background-color: #ffffff;
  display: flex;
  z-index: 99999;
  padding: 0 0.15rem;
  box-sizing: border-box;
  .back{
    height: 100%;
    width: 0.21rem;
    .return {
      position: relative;
      top: 50%;
			border-left: 2px solid #cecece;
			border-top: 2px solid #cecece;
			transform:translateY(-50%) rotate(-45deg) ;
			display: inline-block;
			cursor: pointer;
			width: 8px;
			height: 8px;
		}
  }
  .huakuai {
    height: 100%;
    width: 0.35rem;
    p {
      width: 100%;
      height: 100%;
      background: url("../../assets/images/menu.png") no-repeat right center;
      background-size: 0.2rem;
    }
  }

  .search-input {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    input {
      width: 100%;
      height: 0.2rem;
      padding-left: 0.05rem;
      outline: none;
      // border: solid 1px silver;
      border: 0;
      border-radius: 0.15rem;
      font-size: 12px;
      background: #eeeeee;
    }
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0.15rem;
      height: 0.15rem;
    }
  }
}

.mask {
  position: fixed;
  top: 0.45rem;
  right: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000997;
}

.slide-fade-enter-active {
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

.slide-fade-leave-active {
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(1rem);
  opacity: 0;
}
</style>