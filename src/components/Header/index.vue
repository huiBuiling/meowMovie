<template>
    <header id="header">
        <i v-if="back" class="iconfont icon-right" @touchstart="goBack"></i>
        <h1>{{title}}</h1>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: {
            type: String,
            default: '中华小当家',
        },
        back: {
            type: Boolean,
            default: false,
        },
        goBack: {
            type: Function,
        }
    }
}
</script>

<style lang="scss" scoped>
    #header{
        width:100%;
        height:50px;
        color: #fff;
        background: #e54847;
        border-bottom: 1px solid #e54847;
        position: relative;
        h1{ 
            font-size: 18px;
            text-align: center;
            line-height: 50px;
            font-weight: normal;
        }
        i{ 
            position: absolute;
            left: 5px; top: 50%;
            margin-top: -13px;
            font-size: 26px;
        }
    }
</style>