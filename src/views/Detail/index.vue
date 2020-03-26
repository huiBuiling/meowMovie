<template>
    <div id="contentDetailMain" class="slide-enter-active">
        <Header :title="title" :back="back" :goBack="goBack" />

        <Loading v-if="isLoading" />

        <div v-else id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg" :style="{ 'background-image' : 'url('+ bgImg +')' }"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="detail.img | setWH('148.208')" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{detail.nm}}</h2>
						<p>{{detail.enm}}</p>
						<p>{{detail.sc}}</p>
						<p>{{detail.cat}}</p>
						<p>{{detail.src}} / {{ detail.dur }}分钟</p>
						<p>{{detail.pubDesc}}</p>
					</div>
				</div>
			</div>

			<div class="detail_intro">
                <p>{{detail.dra}}</p>
			</div>

			<div class="detail_player swiper-container" ref="detail_swiper">
				<ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="(item, index) in detail.photos" :key="index">
						<div>
							<img :src="item | setWH('140.127')" alt="">
						</div>
						<p>{{detail.star}}</p>
						<p>{{detail.star}}</p>
					</li>
				</ul>
			</div>
		</div>
    </div>
</template>

<script>
import Header from '@/components/Header';
import Loading from '@/components/Loading';

export default {
    name: 'Detail',
    components: {
        Header,
        Loading,
    },
    props: ['movieId'],
    data() {
        return {
            title: '影片详情',
            back: true,
            detail: {},
            bgImg: '',
            isLoading: true,
        }
    },
    mounted() {
        this.axios.get(`/api/detailmovie?movieId=${this.movieId}`).then((res) => {
            if(res.data.msg == 'ok'){
                const detail = res.data.data.detailMovie;
                this.detail = detail;
                this.isLoading = false;
                this.setBG();
                this.$nextTick(() => {
                    new Swiper(this.$refs.detail_swiper , {
                        slidesPerView : 'auto',
                        freeMode : true,
                        freeModeSticky: true
                    });
                });
            }
        })
    },
    methods: {
        setBG() {
            if(this.detail && this.detail.img != null) {
                // img = img | setWH(120.80);
                this.bgImg =  this.detail.img.replace(/w\.h/,'148.208');
            }
        },
        goBack() {
            // this.$router.push("movie/nowShowing");
            this.$router.go(-1);
        }
    }
}
</script>
    
<style lang="scss" scoped>
    #contentDetailMain{
        position: absolute; 
        left:0; 
        top:0; 
        z-index: 100; 
        width:100%; 
        min-height:100%; 
        background:white;
        &.slide-enter-active{
            animation: 0.3s slideMove;
        }
        @keyframes slideMove {
            0%{
                transform: translateX(100%);
            }
            100%{
                transform: translateX(0);
            }
        }
        .contentDetail{ 
            display: block;
            margin-bottom: 0;
            .detail_list {
                height: 200px;
                width: 100%;
                position: relative;
                overflow: hidden;
                .detail_list_bg {
                    width: 100%;
                    height: 100%;
                    filter: blur(20px);
                    background-size: cover;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                .detail_list_filter {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    background-color: #40454d;
                    opacity: .55;
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 1;
                }
                .detail_list_content {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 2;
                }
                .detail_list_img {
                    width: 108px;
                    height: 150px;
                    border: solid 1px #f0f2f3;
                    margin: 20px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .detail_list_info {
                    margin-top: 20px;
                    h2 {
                        font-size: 20px;
                        color: white;
                        font-weight: normal;
                        line-height: 40px;
                    }
                    p {
                        color: white;
                        line-height: 20px;
                        font-size: 14px;
                        color: #ccc;
                    }
                }
            }
            .detail_intro {
                padding: 10px;
            }
            .detail_player {
                margin: 20px;
                .swiper-slide {
                    width: 70px;
                    margin-right: 20px;
                    text-align: center;
                    font-size: 14px;
                    float: left;
                    img {
                        width: 100%;
                        margin-bottom: 5px;
                    }
                    p {
                        &:nth-of-type(2) {
                            color: #999;
                        }
                    }
                }
            }
        }
    }
</style>