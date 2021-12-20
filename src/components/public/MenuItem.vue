<template>
    <div class="menu-box base-back">
        <div v-for="item in nav_array" :key="item.id" class="operate-item" @click="$router.push(item.to)">
            <mu-icon :value="item.type" color="#12a182"></mu-icon>
            <br>
            {{item.app}}
        </div>
        <!-- <div style="margin: 5px 25px 0;width: 100%;">
            <mu-button color="#12a182" :ripple="false" full-width>sign in</mu-button>
        </div> -->
    </div>
    

</template>
<script>
    export default {
        name: "menu_item",
        data() {
            return {
                show: false,
                nav_array: [
                    
                    { id: '101', type: 'navigation', app: 'Navigation',to: "/mine" },
                    { id: '102', type: 'bookmark', app: 'Bookmark' },
                    { id: '103', type: 'double_arrow', app: 'Consume' },
                    { id: '100', type: 'file_copy', app: 'Log' },
                    { id: '104', type: 'mail_outline', app: 'Email' },
                    { id: '105', type: 'settings', app: 'Setting' },
                ]
            }
        }
    }
</script>
<style scoped>
    .menu-box {
        /* background-color: #fff; */
        /* border-radius: 5px; */
        /* width: 243px; */
        /* box-shadow: -.2em .2em .3em -.1em rgba(0, 0, 0, .15); */
        padding: 10px;
        text-align: center;
        display: flex;
        /* justify-content: space-between; */
        flex-wrap: wrap;
        /* width: 260px; */
    }

    .operate-item {
        width: 25%;
        margin: 8px 0;
        text-align: center;
        line-height: normal;
        cursor: pointer;
    }
</style>