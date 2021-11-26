<template>
    <div class="card-container white-back">
        <div class="time">
            <span class="link" @click="$router.push(`/v2/${object.user.userId}/homepage`)">{{object.user.userName}}</span>
            {{object.sendTime}}
        </div>
        <div v-if="object.type == 1 && object.frontCover" style="padding: 0 15px;">
            <img :src="object.frontCover" class="picture">
        </div>
        <div v-if="object.title" class="title">{{object.title}}</div>
        <div v-if="object.atlasPictures&&object.atlasPictures.length>0" style="padding: 0 15px;position: relative;"  @click="to_writing">
            <div v-if="object.atlasPictures.length!=2" style="font-size: 0;">
                <img :src="object.atlasPictures[0]" class="picture" @load="image_loaded">
            </div>
            <div v-if="object.atlasPictures.length==2" style="font-size: 0;display: flex;max-height: 250px;">
                <div style="flex:1;padding-right: 1%;">
                    <img :src="object.atlasPictures[0]" class="picture" @load="image_loaded">
                </div>
                <div style="flex:1;padding-left: 1%;">
                    <img :src="object.atlasPictures[1]" class="picture" @load="image_loaded">
                </div>
            </div>
            <div v-if="object.atlasPictures.length>2" class="img-tag">
                {{object.atlasPictures.length}} img
            </div>
        </div>
        <div @click="to_writing">
            <div v-if="object.content" class="content-text vetical-center">{{object.type==1?object.summary:object.content}}
                <!-- <div v-for="(tag,index) in object.tags" class="tag" :key="index">{{tag}}</div> -->
            </div>
           
            <div style="padding: 0 15px;">
                <demo-tag color="#4286f3" v-if="object.type==1" >长文</demo-tag>
                <demo-tag v-for="(tag,index) in object.tags" :key="index" @click.native="$router.push('/v2/tag/'+tag)">{{tag}}</demo-tag>
            </div>
        </div>
        <div class="operate-box">
            <div class="operate-item">
                <mu-icon value="favorite_border" color="red" class="icon"></mu-icon>
                <span>123</span>
            </div>
            <div class="operate-item">
                <mu-icon value="bookmark_border" color="red" class="icon"></mu-icon>
                <span>123</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "card",
        props: {
            object: {
                type: Object,
                default: () => { return {} }
            }
        },
        data() {
            return {
                counter: 0
            }
        },
        methods: {
            image_loaded() {
                let length = this.object.atlasPictures.length
                if (length < 1) return
                this.counter++
                if (length === 2) {
                    if (this.counter === length) {
                        this.$emit("loaded")
                    }
                } else {
                    this.$emit("loaded")
                }
            },
            to_writing(){
                if(this.object.type == 1 || (this.object.atlasPictures && this.object.atlasPictures.length > 0)){
                    this.$router.push('/writing/' + this.object.writingId)
                }
                
            }
        },
    }
</script>
<style scoped>
    .card-container {
        /* 防止多列布局，分页媒体和多区域上下文中的意外中断 */
        break-inside: avoid;
        /* background-color: #ffffff; */
        border-radius: 5px;
        /* width: 243px; */
        box-shadow: -.2em .2em .3em -.1em rgba(0, 0, 0, .15);
        margin-bottom: 13px;
        position: relative;
        cursor: pointer;
        transition: all .5s;
        /* padding: 8px 0; */
    }

    .card-container .time {
        padding: 10px 15px 6px;
        color: gray;
        font-size: small;
        font-weight: bold;
    }

    .card-container .title {
        padding: 5px 15px 0;
        font-size: large;
    }

    .link {
        color: rgb(89, 141, 219);
        cursor: pointer;
    }

    .content-text {
        line-height: 24px;
        padding: 0 15px;
        font-weight: lighter;
        white-space: pre-line;
        /* word-break: break-all; */
    }

    /* 垂直居中 */
    /* .vetical-center {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 48px;
    } */

    .tag {
        background-color: #12a182;
        color: #fff;
        font-size: 12px;
        padding: 2.8px 8px;
        line-height: normal;
        border-radius: 0.2em;
        display: inline-block;
        margin: 4.2px 4.2px 4.2px 0;
    }

    .operate-box {
        display: flex;
        justify-content: flex-end;
        padding: 6px 15px 10px;
        color: gray;
        font-size: small;
    }

    .operate-item {
        margin: 0 10px;
    }

    .picture {
        width: 100%;
        height: 100%;
        object-fit: cover;
        max-height: 400px;
        min-height: 100px;
    }

    .img-tag {
        position: absolute;
        right: 15px;
        top: 5px;
        background-color: rgba(0, 0, 0, .3);
        color: #fff;
        width: 50px;
        text-align: center;
        font-size: small;
        font-style: italic;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        padding: 3px 0;
    }

    .icon {
        vertical-align: middle;
    }
</style>