<template>
    <div>
        <div class="tag-box card-container base-back base-shadow">
            <div style="font-size: 21px;font-weight: 550;font-style: italic;">
                <mu-icon value="tag" color="#12a182" class="icon" size="23"></mu-icon>
                {{$route.params.tag}}
            </div>
            <div class="feui" style="white-space: pre-line;margin:10px 10px 10px 24px;">The art of losing isn't hard to master，so many things seem filled with the intent to be lost that their loss is no disaster.
                --Elizabeth Bishop《One Art》
            </div>
            <div>
                <span class="gray-color small-text">其它标签</span> 
                <div style="margin: 2px 10px 10px;">                   
                    <demo-tag v-for="(item,index) in top_tag" :key="index">{{item.tag}} ·{{item.number}}</demo-tag>
                </div>
            </div>
        </div>
        <card-list></card-list>
    </div>
</template>
<script>
    import CardList from './card_list'
    export default {
        name: "tag_writing",
        data() {
            return {
                top_tag: []
            }
        },
        created() {
            this.get_tag_top()
        },
        components: {
            CardList
        },
        mounted() {
            document.title = this.$route.meta.title + ' | ' + this.$route.params.tag
        },
        methods: {
            get_tag_top() {
                this.$http.writing.get_tag_top().then(res => {
                    if (res.data.code == '2000') {
                        this.top_tag = res.data.data.top
                    }
                })
            }
        },
    }
</script>
<style scoped>
    .tag-box {
        min-height: 50px;
        margin: 20px;
        padding: 10px;
    }
    .feui{
        font-family: Fangzhenglibian, "Open Sans", "Helvetica Neue", Helvetica, Arial,sans-serif;
        font-size: 18px;
    }
</style>