<template>
    <div class="main-container">
        <div class="card-container" style="position: relative;cursor:auto;">
            <div class="float-card base-back base-shadow">
                <img class="avatar" src="http://127.0.0.1:9090/static/49578911_p0.jpg">
                <div class="name">raining_heavily</div>
                <div class="desc">Java C&V Engineer</div>
                <div class="content-box" style="border-radius: 5px;display: flex;text-align: center;">
                    <div class="data-item" v-for="(num,index) in nums" :key="index">
                        <span style="font-weight: bold;">{{num.total}}</span>
                        <br>
                        {{num.title}}
                    </div>
                </div>
            </div>
            <div class="card-header"
                style="height:140px;background-image: url(http://127.0.0.1:9090/static/thumbnail/front_cover/8c9b7e3930154e4399f7031b603ddb31.jpg);">
            </div>
        </div>

        <div class="content-box" style="margin-top: 138px;">
            <!-- <menu-item></menu-item> -->
        </div>
        <div class="content-box">
            <div class="list-item base-back base-shadow" v-for="(nav,index) in navs" :key="index" @click="$router.push(nav.page)">
                <div style="flex: 1;line-height: 34px;">
                    <span>{{nav.title}}</span>
                </div>
                <div style="width: 30px;">
                    <!-- <icon-park type="Right" theme="outline" size="30" fill="#000" strokeWidth="2" class="icon" /> -->
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import MenuItem from "@/components/public/MenuItem"
    export default {
        name: "mine_v2",
        data() {
            return {
                nums: [{ title: "Followers", total: 123 }, { title: "Following", total: 223 }, { title: "Writing", total: 2333 }],
                navs: [{ title: "设置", page: "/app/home" }, { title: "空间 [123/1000]", page: "ert" }, { title: "使用指北", page: "ert" }, { title: "关于我们", page: "ert" }]
            }
        },
        components: {
            MenuItem
        }
    }
</script>
<style scoped>
    /* .main-container {
        background-color: rgb(255, 255, 255, 0.5);
        padding: 0;
        border-radius: 0;
        min-height: 100%;
    } */

    .content-box {
        margin: 0 auto;
        padding: 10px 0;
        border-radius: 8px;
        position: relative;
        margin: 0 10%;
    }

    .data-item {
        flex: 1;
        color: rgb(92, 83, 83);
    }

    .card-container {
        /* 防止多列布局，分页媒体和多区域上下文中的意外中断 */
        break-inside: avoid;
        /* background-color:  rgb(255, 255, 255, 0.5); */
        margin-bottom: 13px;
        position: relative;
        cursor: pointer;
        transition: all .5s;
    }

    .float-card {
        position: absolute;
        left: 10%;
        top: 54px;
        width: 80%;
        background-image: linear-gradient(to bottom, #dfe9f3 0%, white 100%);
        /* background-image: url(http://127.0.0.1:9090/static/thumbnail/front_cover/8c9b7e3930154e4399f7031b603ddb31.jpg);
        background-repeat: no-repeat;
        background-size: cover; */
        z-index: 1;
        text-align: center;
        padding: 12px 0;
        border-radius: 3px;
    }

    .float-card .avatar {
        width: 52px;
        height: 52px;
        border-radius: 50%;
    }

    .float-card .name {
        font-size: large;
        font-weight: bold;
        margin: 6px 0;
    }

    .float-card .desc {
        color: gray;
    }

    .shortcut {
        margin: 5px;
        padding: 5px;
        border-radius: 4px;
        background-color: #6495ed;
    }

    .card-header {
        background-repeat: no-repeat;
        background-size: cover;
        min-height: 120px;
        padding: 6px;
        color: #ffffff;
    }

    .card-title {
        margin: 8px 6px;
        font-weight: bold;
    }

    .list-item {
        margin: 10px 0;
        display: flex;
        cursor: pointer;
        position: relative;
        border-radius: 5px;
        padding: 3px 7px;
    }

    .small-font {
        font-size: small;
    }
</style>