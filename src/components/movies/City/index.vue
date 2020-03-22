<template>
    <div class="city_body">
        <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li v-for="itemH in hotData" :key="itemH.id">{{itemH.nm}}</li>
                </ul>
            </div>
            <div class="city_sort" ref="city_sort">
                <div v-for="itemC in cityData" :key="itemC.index">
                    <h2>{{itemC.index}}</h2>
                    <ul>
                        <li v-for="itemN in itemC.list" :key="itemN.id">{{itemN.nm}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(itemC, index) in cityData" :key="itemC.index" @touchstart= "handleToIndex(index)">
                    {{itemC.index}}
                </li>
            </ul>  
        </div>
    </div>
</template>

<script>
export default {
    name: 'City',
    data() {
        return {
            cityData: [],
            hotData: [],
        }
    },
    mounted() {
        this.axios.get('/api/cityList').then((res)=>{
            if(res.data.msg == 'ok'){
                const cityData = res.data.data.cities;
                this.formatCityList(cityData);
            }
            
        })
    },
    methods: {
        // 城市数据及索引
        formatCityList(cities) {
            let cityList = [];
            let hotList = [];  // 热门城市

            function toCom(firstLetter) {
                for(let i = 0; i < cityList.length; i++){
                    if(cityList[i].index === firstLetter){
                        return false; // 累加
                    }
                }
                return true; // 新增
            }

            for(let i = 0; i < cities.length; i++){
                if (cities[i].isHot === 1){
                    hotList.push(cities[i]);
                }

                var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
                if(toCom(firstLetter)){  // 新添 加
                    cityList.push({
                        index: firstLetter,  // A
                        list: [{
                            nm: cities[i].nm,
                            id: cities[i].id,
                        }]
                    })
                }else {  // 累加
                    for(let j = 0; j < cityList.length; j++){
                        if(cityList[j].index === firstLetter){
                            cityList[j].list.push({
                                index: firstLetter,
                                nm: cities[i].nm,
                                id: cities[i].id,
                            });
                        }
                    }
                }
            }

            cityList.sort((n1, n2) => {
                if(n1.index > n2.index) {
                    return 1;
                } else if (n1.index < n2.index) {
                    return -1;
                } else {
                    return 0;
                }
            });

            this.cityData = cityList;
            this.hotData = hotList;
        },
        // 索引滚动对应位置事件
        handleToIndex(index) {
            const cityS = this.$refs.city_sort;
            const h2 = cityS.getElementsByTagName('h2');
            const top = h2[index].offsetTop;
            cityS.parentNode.scrollTop = top;
        }

    }
}
</script>

<style lang="scss" scoped>
.city_body{ 
    margin-top: 45px;
    display: flex;
    width:100%;
    position: absolute;
    top: 0;
    bottom: 0;
    .city_list{ 
        flex:1;
        overflow: auto;
        background: #FFF5F0;
        .city_list::-webkit-scrollbar{
            background-color:transparent;
            width:0;
        }
    }
    .city_hot{ 
        margin-top: 20px;
        h2{ 
            padding-left: 15px;
            line-height: 30px;
            font-size: 14px;
            background:#F0F0F0; 
            font-weight: normal;
        }
        ul{
            li{ 
                float: left;
                background: #fff;
                width: 29%;
                height: 33px; 
                margin-top: 15px;
                margin-left: 3%;
                padding: 0 4px;
                border: 1px solid #e6e6e6; 
                border-radius: 3px;
                line-height: 33px;
                text-align: center;
                box-sizing: border-box;
            }
        }
    }
    .city_sort{
        div{
            margin-top: 20px;
        }
        h2{ 
            padding-left: 15px;
            line-height: 30px;
            font-size: 14px;
            background:#F0F0F0; font-weight: normal;
        }
        ul{
            padding-left: 10px;
            margin-top: 10px;
            li{ 
                line-height: 30px;
                line-height: 30px;
            }
        }
    }
    .city_index{ 
        width:20px;
        display: flex;
        flex-direction:column;
        justify-content:center;
        text-align: center;
        border-left:1px #e6e6e6 solid;
    }
}
</style>