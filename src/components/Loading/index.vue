<template>
    <div class="loading">
        <div class="loading-con">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading',
}
</script>

<style lang="scss" scoped>
.loading{
    width: 100%;
    height: 100%;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    .loading-con{
        display: flex;
        align-content: space-between;
        justify-content: center;
        align-items: center; 
        width: 80px;
        height: 100%;
        margin: 0 auto;
        span{
            width: 8px;
            height: 30px;
            margin: 0 4px;;
            border-radius: 4px;
            background: #FFF5F0;
            animation: load 1s ease infinite;
            &:nth-child(2){
                animation-delay:0.2s;
            }
            &:nth-child(3){
                animation-delay:0.4s;
            }
            &:nth-child(4){
                animation-delay:0.6s;
            }
            &:nth-child(5){
                animation-delay:0.8s;
            }
        }

        @keyframes load{
            0%,100%{
                height: 30px;
                background: #FFF5F0;
            }
            50%{
                height: 60px;
                margin: -15px 4px;
                background: #E54847;
            }
        }
    }
}


</style>