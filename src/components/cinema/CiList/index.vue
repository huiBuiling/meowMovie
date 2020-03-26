<template>
    <div class="cinema_body">
        <Scroller 
            :handleScroll = "handleScroll"
            :handleTouchEnd = "handleTouchEnd"
        >
            <ul>
                <p class="msg">{{ pullDownMsg }}</p>
                <li v-for="item in cinemaData" :key="item.id">
                    <div>
                        <span>{{item.nm}}</span>
                        <span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
                    </div>
                    <div class="address">
                        <span>{{item.addr}}</span>
                        <span>{{item.distance}}</span>
                    </div>
                    <div class="card">
                        <div 
                            v-for="(itemT, index) in formatData(item.tag)" 
                            :key="index"
                            :class="index | formatVal('class')"
                        >
                            {{index | formatVal('value')}}
                        </div>
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>
import Scroller from '@/components/Scroller';

export default {
    name: 'CiList',  // 影院列表
    components: {
        Scroller,
    },
    data() {
        return {
            cinemaData: [],
            pullDownMsg: '',
            prevCityId: -1,
        }
    },
    activated() {
        const id = this.$store.state.city.id;
        if(this.prevCityId === id) { return; }
        console.log(25);

        this.axios.get(`/api/cinemaList?cityId=${id}`).then((res) => {
            if(res.data.msg == 'ok'){
                const cinemaData = res.data.data.cinemas;
                this.cinemaData = cinemaData;
                this.prevCityId = id;
            }
        })
    },
    methods: {
        formatData(data) {
            let newData = {};
            for(let item in data) {
                if (data[item] === 1) {
                    newData[item] = 1;
                }
            }
            return newData;
        },
        goToDetail() {
            console.log(1111)
        },
        handleScroll(msg) {
            this.pullDownMsg = msg;
        },
        handleTouchEnd(msg) {
            this.pullDownMsg = msg;
        }
    },
    filters: {
        formatVal(key, type) {
            const data = [
                {key: 'allowRefund', class: 'or', value: '改签'},
                {key: 'endorse', class: 'or', value: '退票'},
                {key: 'sell', class: 'bl', value: '小吃'},
                {key: 'snack', class: 'bl', value: '折扣卡'}
            ];

            for(let i = 0; i < data.length; i++){
                if(data[i].key === key) {
                    return type === 'value' ? data[i].value : data[i].class;
                }
            }

            return '';
        }
    }
}
</script>

<style lang="scss" scoped>
#content .cinema_body{ 
    flex:1;
    overflow:auto;
    ul{ 
        padding:0 20px;
        .msg{
            text-align: center;
            line-height: 60px;
        }
        li{ 
            border-bottom:1px solid #e6e6e6; margin-bottom: 20px;
        }
    }
    div{ margin-bottom: 10px;}
    .q{ font-size: 11px; color:#f03d37;}
    .price{ font-size: 18px;}
    .address{ font-size: 13px; color:#666;}
    .address span:nth-of-type(2){ float:right; }
    .card{ 
        display: flex;
        div{ 
            padding: 0 3px; height: 15px; line-height: 15px;
            border-radius: 2px; color: #f90; border: 1px solid #f90;
            font-size: 13px; margin-right: 5px;
            &.or{ color: #f90; border: 1px solid #f90;}
            &.bl{ color: #589daf; border: 1px solid #589daf;}
        }
    }
}
</style>