<template>
  <div class="wrapper_body" ref="wrapper_body">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    name: 'Scroller',
    props: {
        handleScroll: {
            type: Function,
            default: function(){}
        },
        handleTouchEnd: {
            type: Function,
            default: function(){}
        }
    },
    data() {
        return {
           pullDownMsg: '',
        }
    },
    mounted() {
        this.createScroll();
    },
    methods: {
        createScroll() {
            this.scroll  = new BScroll(this.$refs.wrapper_body, {
                tap: true,  // 开启tap事件
                probeType: 1,  // 监听滚动事件添加
            });

            this.scroll.on('scroll', (pos)=>{
                if( pos.y > 30){
                    this.pullDownMsg = '哼哧哼哧刷新中...';
                    this.handleScroll(this.pullDownMsg);
                }
            });

            this.scroll.on('touchEnd', (pos)=>{
                if( pos.y > 30){
                    this.pullDownMsg = '更新成功！';
                    this.handleTouchEnd(this.pullDownMsg);
                }
            });
        },
        goToLocation(y) {
            this.scroll.scrollTo(0, y);
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper_body{
    height: 100%;
}
</style>