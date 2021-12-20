<template>
    <mu-slide-right-transition>
        <div v-show="open" class="drawer-wrap" @click="close_drawer">
            
            <div class="operate-area" @click.stop="">
                <mu-list>
                    <mu-list-item button>
                      <mu-list-item-title>Menu Item 1</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button>
                      <mu-list-item-title>Menu Item 2</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item  @click="close_drawer" button>
                      <mu-list-item-title>Close</mu-list-item-title>
                    </mu-list-item>
                  </mu-list>
            </div>
        </div>
    </mu-slide-right-transition>
</template>
<script>
    export default {
        name: 'demo-drawer',
        props: {
            open: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {

            }
        },
        methods: {
            close_drawer() {
                this.$emit('toggle', false)
            }
        },
    }
</script>
<style scoped>
    .drawer-wrap {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        /* background-color: rgba(53, 55, 56, 0.6); */
        z-index: 100;
    }

    .operate-area {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 200px;
        background-color: #fff;
        box-shadow: 0 8px 10px -5px rgb(0 0 0 / 20%), 0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%);
    }
    @media screen and (min-width: 768px) {
        .drawer-wrap{
            display: none;
        }
  }
</style>