<template>
  <div class="toast" v-show="shows">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      message: {
        type: String,
        default() {
          return ''
        }
      },
      shows: {
        type: Boolean,
        default() {
          return false;
        }
      }
    }
  }
</script>

<style scoped>
  .toast {
    width: 125px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-63px, 250px);
    background: rgba(0, 0, 0, 0.7);
    color: #ffffff;
  }
</style>
