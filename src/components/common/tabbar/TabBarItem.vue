<template>
    <div class="tab-bar-item" @click="btnClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="activeStyle">
        <slot name="item-text"></slot>
    </div>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        data() {
            return {
                // isActive: true
            }
        },
        computed: {
            isActive() {
                return this.$route.path.includes(this.path);
            },
            activeStyle() {
                return this.isActive ? {color: this.activeColor} : {}
            }
        },
        props: {
            path: String,
            activeColor: {
                type: String,
                default: 'red'
            }
        },
        methods: {
            btnClick() {
                //catch(()=>{})防止重复点报错
                this.$router.push(this.path).catch(() => {
                })
            }
        }
    }
</script>

<style scoped>
    .tab-bar-item {
        flex: 1;
        height: 49px;
        width: 100px;
        /*line-height: 49px;*/
        text-align: center;
    }

    .tab-bar-item img {
        height: 28px;
        margin-top: 3px;
        vertical-align: middle;
    }

    /*.active {
        color: red;
    }*/
</style>
