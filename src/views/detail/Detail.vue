<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"></DetailNavBar>
    <Scroll class="content" ref="scroll" :probeType="3" :pullUpLoad="true" @scroll="contentScroll">
      <DetailSwiper :top-images="topImages"/>
      <DetailBaseInfo :goods="goods"/>
      <DetailShopInfo :shop="shop"/>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <DetailParamInfo ref="params" :paramInfo="paramInfo"/>
      <DetailCommentInfo ref="comment" :comment-info="commentInfo"/>
      <GoodsList ref="recommend" :goods="recommends"/>
    </Scroll>
    <Toast :message="result" :shows="isShow"/>
    <BackTop @click.native="backClick" v-show="isShowBackTop"/>
    <DetailBottomBar @addToCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";

  import GoodsList from "../../components/content/goods/GoodsList";
  import BackTop from "../../components/content/backTop/BackTop";
  import Toast from "../../components/common/toast/Toast";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail"


  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
      Toast
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [0, -1000, -2000, -5000],
        currentIndex: 0,
        isShowBackTop: false,
        result: '',
        isShow: false
      }
    },
    created() {
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
        this.topImages = res.result.itemInfo.topImages
        this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
        this.shop = new Shop(res.result.shopInfo)
        this.detailInfo = res.result.detailInfo
        this.paramInfo = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
        if (res.result.cRate !== 0) {
          this.commentInfo = res.result.rate.list[0]
        }
        //DOM结构加载完成，但是图片依旧没有渲染
        // this.$nextTick(()=>{
        //     this.$refs.scroll.refresh()
        //     this.themeTopYs = []
        //     this.themeTopYs.push(0)
        //     this.themeTopYs.push(-this.$refs.params.$el.offsetTop + 44)
        //     this.themeTopYs.push(-this.$refs.comment.$el.offsetTop + 44)
        //     this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop + 44)
        //     console.log(this.themeTopYs);
        // })
      })

      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(-this.$refs.params.$el.offsetTop + 44)
        this.themeTopYs.push(-this.$refs.comment.$el.offsetTop + 44)
        this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop + 44)
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 300)
      },
      contentScroll(position) {
        this.isShowBackTop = position.y < -1000
        let positionY = position.y
        for (let i in this.themeTopYs) {
          i = parseInt(i)
          //负值
          if (this.currentIndex !== i) {
            if (i <= 2) {
              if (this.themeTopYs[i] >= positionY && positionY >= this.themeTopYs[i + 1]) {
                this.currentIndex = i
              }
            } else if (positionY < this.themeTopYs[i]) {
              this.currentIndex = i
            }
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      addToCart() {
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.nowPrice
        product.iid = this.iid
        product.count = 0
        // this.$store.state.cartList.push(product)

        this.isShow = true
        setTimeout(()=>{
          this.isShow = false
          this.result = ''
        },1500)

        this.$store.dispatch('addCart', product).then(res => {
          this.result = res
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 99;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 102px);
  }
</style>
