<template>
    <div class="model">
        <h3>定位</h3>
        <p>城市：{{city}}</p>
        <div class="model-btn">
            <span @touchstart="modelCancel">取消</span>
            <span @touchstart="modelOk">切换定位</span>
        </div>
    </div>
</template>

<script>
import Scroller from '@/components/Scroller';

export default {
    name: 'Modal', 
    props: {
        city: {
            type: String,
            default: '北京',
        },
        modelCancel: {
            type: Function,
        },
        modelOk: {
            type: Function,
        }
    } 
}
</script>

<style lang="scss" scoped>
.model{
    position: absolute;
    left: calc(50% - 100px);
    top: calc(50% - 90px);
    width: 200px;
    height: 180px;
    background: #fff;
    // border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 1px 1px 10px #ddd;
    z-index: 99;
    h3{
        margin: 20px 0;
        text-align: center;
        line-height: 50px;
    }
    p{
        text-align: center;
        line-height: 30px;
    }
    .model-btn{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
        padding: 10px 0;
        border-top: 1px solid #ddd;
        span{
            display: inline-block;
            width: calc(50% - 1px);
            &:first-child{
                border-right: 1px solid #ddd;
            }
        }
    }
}
</style>

