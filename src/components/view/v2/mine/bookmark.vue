<template>
    <div class="main-container">
        <div style="margin: 10px 1.6% 0; padding: 3px 0;">
            <!-- <input type="text" class="form-input" placeholder="搜索233个文件"> -->
            <mu-text-field v-model="value1" placeholder="搜索233个文件">
                <mu-icon value="search" slot="append"></mu-icon>
            </mu-text-field>

        </div>
        <div class="folder-box">
            <div class="card folder-item">
                <div>
                    <img :src="fingerprint_icon" alt="" style="vertical-align: middle;width: 30px;">
                    <div>加密文件夹</div>
                </div>
            </div>
            <div class="card folder-item" v-for="(item,index) in array" @click="">
                <div>
                    <img :src="folder_icon" alt="" style="vertical-align: middle;width: 30px;">
                    <br>
                    {{item.title}}<span v-if="item.total>0">({{item.total}})</span>
                </div>
                <div style="position: absolute;top: 0;right: 10px;">
                    <mu-menu cover placement="bottom-end">
                        <mu-icon value="more_horiz"></mu-icon>
                        <mu-list slot="content" dense >
                            <mu-list-item button>
                                <mu-list-item-title>编辑</mu-list-item-title>
                            </mu-list-item>
                            <mu-list-item button>
                                <mu-list-item-title>删除</mu-list-item-title>
                            </mu-list-item>
                            <mu-list-item button>
                                <mu-list-item-title>详情</mu-list-item-title>
                            </mu-list-item>
                            <mu-list-item button>
                                <mu-list-item-title>添加文件夹</mu-list-item-title>
                            </mu-list-item>
                        </mu-list>
                    </mu-menu>
                </div>
            </div>
            <!-- <div class="card folder-item">
                <div>
                    <img :src="folder_icon" alt="" style="vertical-align: middle;width: 30px;">
                    <br>
                    New Folder
                </div>
            </div> -->
        </div>
        <div class="favorite-box">
            <label style="font-size: small;">以下是默认收藏条目[{{array1.length}}]，它们不在任何文件夹内</label>
            <div class="card mark-item" v-for="(item,index) in array1">
                <div style="flex:1;white-space: nowrap;overflow: hidden;">{{item.title}}</div>
                <div class="small-font" style="flex:1;white-space: nowrap;overflow: hidden;">{{item.url}}</div>
                <div class="small-font" style="flex:1;white-space: nowrap;overflow: hidden;">{{item.time}}</div>
                <div style="width: 30px;height: 24px;">
                    <!-- <mu-icon value="more_horiz"></mu-icon> -->
                    <mu-menu cover placement="bottom-end">
                        <mu-icon value="more_horiz"></mu-icon>
                        <mu-list slot="content" dense>
                            <mu-list-item button>
                                <mu-list-item-title>编辑</mu-list-item-title>
                            </mu-list-item>
                            <mu-list-item button>
                                <mu-list-item-title>删除</mu-list-item-title>
                            </mu-list-item>
                            <mu-list-item button>
                                <mu-list-item-title>详情</mu-list-item-title>
                            </mu-list-item>
                            <mu-list-item button>
                                <mu-list-item-title>添加文件</mu-list-item-title>
                            </mu-list-item>
                        </mu-list>
                    </mu-menu>
                </div>

            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'bookmark',
        data() {
            return {
                value1: "",
                array: [
                    { "id": 1000, "title": "Java", "total": 10, "time": "2021/01/27 09:58:04" },
                    { "id": 1001, "title": "blog", "total": 0, "time": "2021/01/27 09:58:04" },
                    { "id": 1002, "title": "JavaScript", "total": 233, "time": "2021/01/27 09:58:04" },
                    { "id": 1003, "title": "Android", "total": 56, "time": "2021/01/27 09:58:04" },
                ],
                array1: [
                    { "id": 1000, "title": "this is test 1", "url": "www.baidu.com", "text": "123", "menu": false, "time": "2021/01/27 09:58:04" },
                    { "id": 1001, "title": "this is test 2", "url": "www.baidu.com", "text": "123", "menu": false, "time": "2021/01/27 09:58:04" },
                    { "id": 1002, "title": "this is test 3", "url": "www.baidu.com", "text": "123", "menu": false, "time": "2021/01/27 09:58:04" }
                ],
                folder_icon: require("@/assets/svg/24px_folder-open.svg"),
                fingerprint_icon: require("@/assets/svg/24px_red_fingerprint-three.svg"),
            }
        }
    }
</script>
<style scoped>
    .button {
        display: inline;
        padding: 4.5px 10px;
        background-color: #006cf8;
        color: azure;
        cursor: pointer;
        border-radius: 3px;
        vertical-align: middle;
    }

    .folder-box {
        display: flex;
        flex-wrap: wrap;
    }

    .card {
        background-color: rgba(255, 255, 255, 0.7);
        box-shadow: 0 4px 8px rgba(179, 173, 173, 0.3);
        border-radius: 4px;
        cursor: pointer;
        margin: 10px 1.6%;
    }

    .folder-item {
        line-height: 25px;
        padding: 8px 0;
        width: 30%;
        text-align: center;
        font-size: small;
        position: relative;
    }

    .mark-item {
        display: flex;
        line-height: 25px;
        padding: 8px;
        cursor: pointer;
    }

    .small-font {
        font-size: small;
        color: gray;
    }
</style>