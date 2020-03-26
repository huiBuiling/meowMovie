<template>
    <div class="movie_body">
        <Model 
            v-if="isModel"
            :city="city.nm"
            :modelCancel="modelCancel"
            :modelOk="modelOk"
         />

        <Loading v-if="!isModel && isLoading" />
        <Scroller 
            v-else
            :handleScroll = "handleScroll"
            :handleTouchEnd = "handleTouchEnd"
        >
            <ul>
                <p class="msg">{{ pullDownMsg }}</p>
                <li v-for="item in hotList" :key="item.id">
                    <div class="pic_show">
                        <img :src="item.img | setWH('128.180')"  @tap="goToDetail">
                    </div>
                    <div class="info_list">
                        <h2>
                            {{item.nm}} 
                            <img v-if="item.version" src="@/assets/maxs.png">
                        </h2>
                        <p>观众评 <span class="grade">{{item.sc}}</span></p>
                        <p>主演: {{item.star}}</p>
                        <p>今天{{item.showst}}家影院放映{{item.wishst}}场</p>
                    </div>
                    <div class="btn_mall" @click="goToDetail">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>
import Scroller from '@/components/Scroller';
import Loading from '@/components/Loading';
import Model from '@/components/Model'

export default {
    name: 'NowShowing', // 正在热映
    components: {
        Scroller,
        Loading,
        Model,
    },
    data() {
        return {
           hotList: [],
           pullDownMsg: '',
           isModel: false,
           isLoading: false,
           prevCityId: -1,
           city: {},
        }
    },
    activated() {
        this.positioning();
    },
    methods: {
        positioning() {
            // setTimeout(() =>{
                this.axios.get('/api/getLocation').then((res) => {
                    if(res.data.msg == 'ok'){
                        this.city = res.data.data;
                        this.isModel = true;
                        console.log(this.city.nm)
                        this.getList();
                    }
                });
            // }, 3000);
        },
        getList() {
            const id = this.$store.state.city.id;
            if(this.city === id) { return; }
            if(this.prevCityId === id) { return; }
            this.isLoading = true;
            this.axios.get(`/api/movieOnInfoList?cityId=${id}`).then((res) => {
                if(res.data.msg == 'ok'){
                    const hotList = res.data.data.movieList;
                    this.hotList = hotList;
                    this.isLoading = false;
                    this.prevCityId = id;
                }
                
            });
        },
        goToDetail() {
            alert(111)
        },
        handleScroll(msg) {
            this.pullDownMsg = msg;
        },
        handleTouchEnd(msg) {
            this.pullDownMsg = msg;
        },
        modelCancel() {
            this.isModel = false;
        },
        modelOk() {
            const id = this.city.id;
            this.isModel = false;
            this.isLoading = true;
            this.axios.get(`/api/movieOnInfoList?cityId=${id}`).then((res) => {
                if(res.data.msg == 'ok'){
                    const hotList = res.data.data.movieList;
                    this.hotList = hotList;
                    this.isLoading = false;
                    this.prevCityId = id;
                    this.$store.commit('city/CITY_INFO', this.city)
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.movie_body{ 
    flex:1;
    overflow:auto;
    ul{ 
        margin:0 12px;
        overflow: hidden;
        .msg{
            text-align: center;
            line-height: 60px;
        }
        li{ 
            margin-top:12px;
            display: flex;
            align-items:center;
            border-bottom: 1px #e6e6e6 solid;
            padding-bottom: 10px;
        }
    }
    .pic_show{ 
        width:64px;
        height: 90px;
        img{ 
            width:100%;
        }
    }
    .info_list { 
        margin-left: 10px; flex:1; position: relative;
        h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
        p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
        .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
        img{ width:50px; position: absolute; right:10px; top: 5px;}
    }
    .btn_mall, .btn_pre{
        width:47px;
        height:27px;
        line-height: 28px; 
        text-align: center;
        background-color: #f03d37; 
        color: #fff; 
        border-radius: 4px; 
        font-size: 12px;
        cursor: pointer;
    }
    .btn_pre{ 
        background-color: #3c9fe6;
    }
}
</style>