<template>
    <div>
        <magic-grid :maxCols="3">
            <div v-for="item in array" :key="item.index" class="item-width">
                <card :object="item" @loaded="update"></card>
            </div>
        </magic-grid>
        <div v-show="!loading_finished" style="margin-top: 10px;text-align: center;">
            <div class="button base-green-back" @click="load_more">加载更多</div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import MagicGrid from 'vue-magic-grid'
    import Card from './card'
    Vue.use(MagicGrid)

    export default {
        name: "card_list_mg",
        props: {
            user_id: {
                type: Number,
                default: 0
            },
            tag: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                page: 1,
                array: [],
                //数据是否已加载完毕
                loading_finished: false,
                //数据总数
                total: 0
            }
        },
        components: {
            Card
        },
        async created() {
            await this.get_writings(true)
        },
        mounted() {
        },
        methods: {
            //first 是否是第一次加载
            async get_writings(first) {
                // let params = new URLSearchParams()
                // params.append("page",this.page)
                await this.$http.article.getHomePageArticles(this.page, this.$route.params.user_id, this.$route.params.tag)
                    .then(res => {
                        if (res.data.code == '2000') {
                            let writings = res.data.data.writings
                            if (writings.length < 1) return
                            if (first === true) {
                                this.array = writings
                                this.total = res.data.data.total
                            } else {
                                this.array = this.array.concat(writings)
                                this.loading_finished = (this.array.length >= this.total)
                                // this.$nextTick(() => { this.instance.update() })
                            }
                            this.page++

                        }
                    });
            },
            async load_more() {
                await this.get_writings()
                // setTimeout(()=>{this.instance.update()},300)
                // this.instance.update()
            },
            update() {
                
            }
        },
    }
</script>

<style scoped>
    .card-list {
        margin: 0 auto;
    }

    .item-width {
        width: 340px;
    }

    .button {
        display: inline-block;
        padding: 4px 24px;
        border-radius: 100px;
        cursor: pointer;
        margin-bottom: 10px;
        font-weight: lighter;
    }
</style>