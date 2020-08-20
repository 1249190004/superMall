<template>
  <div id="home">
    <div class="home-nav">
      <NavBar>
        <h2 slot="center">购物街</h2>
      </NavBar>
    </div>
    <div class="tab-controls">
      <TabControl :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl1"
                  class="tab-control"
                  v-show="isTabFixed">
      </TabControl>
    </div>
    <Scroll class="content"
            ref="scroll" :probeType="3"
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <HomeRecommendView :recommends="recommends"></HomeRecommendView>
      <FeatureView></FeatureView>
      <div class="tab-controls">
        <TabControl :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl2">
        </TabControl>
      </div>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import Scroll from "../../components/common/scroll/Scroll";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import BackTop from "../../components/content/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata, getHomeData} from "../../network/home"

  // import {debounce} from '../../common/utils'

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeData('pop')
      this.getHomeData('new')
      this.getHomeData('sell')
    },
    mounted() {
      // const refresh = debounce(this.$refs.scroll.refresh(), 50)
      this.$bus.$on('itemImagLoad', () => {
        // refresh()
        this.$refs.scroll.refresh()
      })
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      //通过ref得到组件对象调用函数
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        this.isTabFixed = (-position.y) > this.tabOffsetTop
        this.isShowBackTop = position.y < -1000
      },
      loadMore() {
        this.getHomeData(this.currentType)
        // this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        }).catch(err => {
          console.log(err);
        })
      },
      getHomeData(type) {
        const page = this.goods[type].page + 1
        getHomeData(type, page).then(res => {
          // console.log(res.data.list)
          this.goods[type].list.push(...res.data.list)
          // for(let item of res.data.list){
          //   this.goods[type].list.push(item)
          // }
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;
    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    /*z-index: 999;*/
  }

  .tab-controls {
    /*position: sticky;*/
    /*top: 44px;*/
    /*z-index: 99;*/
    background: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 1;
    background: #fff;
  }
</style>
