<template>
    <div>
        <div class="card-list">
            <div v-for="item in array" :key="item.index" class="item-width">
                <card :object="item" @loaded="update"></card>
            </div>
        </div>
        <div style="margin-top: 10px;text-align: center;">
            <div class="button base-green-back" @click="load_more">加载更多</div>
        </div>
    </div>
</template>

<script>
    import Bricks from 'bricks.js'
    import Card from './card'

    export default {
        name: "card_list",
        data() {
            return {
                page: 1,
                instance: null,
                array: [],
            }
        },
        components: {
            Card
        },
        async created() {
            await this.get_writings(true)
            this.instance.resize(true).update()
        },
        mounted() {
            const sizes = [{
                columns: 1,
                gutter: 10
            }, {
                mq: '716px',
                columns: 2,
                gutter: 15
            },
            {
                mq: '1108px',
                columns: 3,
                gutter: 15
            },
                // {
                //     mq: '1024px',
                //     columns: 4,
                //     gutter: 50
                // }
            ]
            this.instance = Bricks({
                container: '.card-list',
                packed: 'packed',
                sizes: sizes,
                position: true
            })
            this.instance
                .on('pack', () => console.log('pack()'))
                .on('update', () => console.log('update()'))
                .on('resize', () => console.log('resize()'));
            // setTimeout(()=>{this.instance.resize(true).pack()},300)
            this.instance.resize(true).pack()
            // document.addEventListener('DOMContentLoaded', event => {
                // this.instance
                //     .resize(true) // bind resize handler
                //     .pack() // pack initial items
            // })
            // this.$nextTick(()=>{this.instance.resize(true).pack()})
        },
        methods: {
            //first 是否是第一次加载
            async get_writings(first) {
                // let params = new URLSearchParams()
                // params.append("page",this.page)
                await this.$http.article.getHomePageArticles(this.page, null)
                    .then(res => {
                        if (res.data.code == '2000') {
                            let writings = res.data.data.writings
                            if(writings.length < 1) return
                            if(first === true){
                                this.array = writings
                            } else {
                                this.array = this.array.concat(writings)
                                this.$nextTick(() => {this.instance.update()})
                            }
                            this.page++
                            
                        }
                    });
            },
            async load_more(){
                await this.get_writings()
                // setTimeout(()=>{this.instance.update()},300)
                // this.instance.update()
            },
            update(){
                this.instance.resize(true).pack() 
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