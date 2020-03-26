<template>
    <div id="main">
        <Header />

        <div id="content">
            <div class="movie_menu">
				<router-link tag="div" to="/movie/city" class="city_name">
					<span>{{ $store.state.city.nm }}</span>
                    <i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<div tag="div" to="/movie/comingSoon" class="hot_swtich">
					<router-link tag="div" to="/movie/nowShowing" class="hot_item">
                        正在热映
                    </router-link>
					<router-link tag="div" to="/movie/comingSoon" class="hot_item">
                        即将上映
                    </router-link>
				</div>
				<router-link tag="div" to="/movie/search" class="search_entry active">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>

            <keep-alive>
                <router-view />
            </keep-alive>
        </div>

        <TabBar />
    </div>
</template>

<script>
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import storage from '@/tools/localStorage';

export default {
    name: 'Movie',
    components: {
        Header,
        TabBar
    },
}
</script>

<style lang="scss" scoped>
#content{ 
    flex:1;
    overflow:auto;
    margin-bottom: 50px;
    position: relative;
    display: flex; 
    flex-direction:column;
    .movie_menu{ 
        width: 100%;
        height: 45px;
        border-bottom:1px solid #e6e6e6;
        display: flex;
        justify-content:space-between;
        align-items:center;
        background:white; z-index:10;
        .city_name{ 
            margin-left: 20px;
            height:100%;
            line-height: 45px;
            &.router-link-active{ 
                color: #ef4238;
                border-bottom: 2px #ef4238 solid;
            }
        }
        .hot_swtich{ 
            display: flex;
            height:100%;
            line-height: 45px;
        }
        .hot_item{ 
            font-size: 15px;
            color:#666;
            width:80px;
            text-align:center;
            margin:0 12px;
            font-weight:700;
        }
        .search_entry{ 
            margin-right:20px; height:100%; line-height: 45px;
            i{  
                font-size:24px;
                color:red;
            }
        }
        .city_name, .hot_item, .search_entry{ 
            &.router-link-active{ 
                color: #ef4238;
                border-bottom: 2px #ef4238 solid;
            }
        }
    }
}
</style>