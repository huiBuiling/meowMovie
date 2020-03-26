<template>
    <div class="movie_body">
        <Loading v-if="isLoading" />
            <Scroller 
                v-else
                :handleScroll = "handleScroll"
                :handleTouchEnd = "handleTouchEnd"
            >
                <ul>
                    <p class="msg">{{ pullDownMsg }}</p>
                    <li v-for="item in soonList" :key="item.id" @tap="goToDetail(item.id)">
                        <div class="pic_show"><img :src="item.img | setWH('128.180')"></div>
                        <div class="info_list">
                            <h2>{{item.nm}} <img v-if="item.version" src="@/assets/maxs.png"></h2>
                            <p><span class="person">{{item.wish}}</span> 人想看</p>
                            <p>主演: {{item.star}}</p>
                            <p>{{item.rt}}上映</p>
                        </div>
                        <div class="btn_pre">
                            预售
                            <!-- {{!item.preShow ? '预售' : '上映'}} -->
                        </div>
                    </li>
                </ul>
            </Scroller>
        </div>
</template>

<script>
import Scroller from '@/components/Scroller';
import Loading from '@/components/Loading';

export default {
    name: 'ComingSoon', 
    components: {
        Scroller,
        Loading,
    },
    data() {
        return {
            soonList: [],
            pullDownMsg: '',
            isLoading: true,
            prevCityId: -1,
        }
    },
    activated() {
        const id = this.$store.state.city.id;
        if(this.prevCityId === id) { return; }
        console.log(24);

        this.axios.get(`/api/movieComingList?cityId=${id}`).then((res) => {
            if(res.data.msg == 'ok'){
                const soonList = res.data.data.comingList;
                this.soonList = soonList;
                this.isLoading = false;
                this.prevCityId = id;
            }
            
        });
    },
    methods: {
        handleScroll(msg) {
            this.pullDownMsg = msg;
        },
        handleTouchEnd(msg) {
            this.pullDownMsg = msg;
        },
        goToDetail(movieId) {
            this.$router.push('/movie/detail/' + movieId);

        },
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