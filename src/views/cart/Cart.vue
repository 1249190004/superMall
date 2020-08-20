<template>
  <div class="cart">
    <NavBar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </NavBar>
    <Scroll class="content" ref="scroll">
      <CartList></CartList>
    </Scroll>
    <CartBottomBar/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import Scroll from "../../components/common/scroll/Scroll";

  import {mapGetters} from "vuex"

  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    computed: {
      //辅助函数将store中的getter映射到局部计算属性
      ...mapGetters(['cartLength'])
    },
    activated(){
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
    overflow: hidden;
  }

  .content {
    height: calc(100% - 88px);
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 99;
  }
</style>
