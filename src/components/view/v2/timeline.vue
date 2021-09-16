<template>
    <div>
        <div class="timeline-box" v-for="item in data_list" :key="item.id">
            <div class="timeline-point base-green-back">
            </div>
            <div class="item-left">
                <div class="time-label">
                    {{item.only_date}}
                </div>
            </div>
            <div class="item-right">
                <div class="time-content">
                    <div class="content-detail"
                        :style="{backgroundColor:item.color,color:item.color=='#000000cc'?'#fff':'#000'}">
                        <!-- <span class="detail-header">raining</span> -->
                        {{item.type}}了{{item.object}}&nbsp;&nbsp;{{item.only_time}}<br>
                        {{item.content}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "timeline",
        data() {
            return {
                data_list: [],
                page: 1,
                date_array: []
            }
        },
        created() {
            this.get_timeline()
        },
        computed: {
            // left_date() {
            //     return function (date) {
            //         console.dir(date)
            //         let temp = date.substring(0, 10)
            //         if (this.date_array.includes(temp)) {
            //             return "1"
            //         } else {
            //             this.date_array.push(temp)
            //             return temp
            //         }
            //     }
            // }
        },
        methods: {
            get_timeline() {
                this.$http.user.get_timeline(this.$route.params.user_id, this.page).then(res => {
                    if (res.data.code == '2000') {
                        let array = res.data.data.timeline.map(item => {
                            let temp = item.date.substring(0, 10)
                            if (this.date_array.includes(temp)) {
                                item.only_date = ""
                            } else {
                                this.date_array.push(temp)
                                item.only_date = temp
                            }
                            item.only_time = item.date.substring(10, item.date.length)
                            return item
                        })
                        this.data_list = this.data_list.concat(array)
                        this.page++
                    }
                })
            }
        },
        filters: {
        }
    }
</script>
<style scoped>
    .timeline-box {
        position: relative;
        min-height: 80px;
        display: flex;
    }

    .item-left {
        width: 80px;
        /* border: 1px solid black; */
        position: relative;
    }

    .time-label {
        color: gray;
        position: absolute;
        right: 8px;
        top: calc(30% - 5px);
    }

    .item-right {
        flex: 1;
        /* border: 1px solid black; */
        position: relative;
        height: 100%;
        cursor: pointer;
    }

    .content-detail {
        display: inline-block;
        margin: 15px 15px 10px;
        /* margin-top: 30%; */
        padding: 10px 15px;
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(179, 173, 173, 0.3);
        line-height: 24px;
        transition: all 0.5s;
    }

    .content-detail:hover {
        transform: translateX(10px);
    }

    .timeline-box::before {
        content: " ";
        position: absolute;
        left: 80px;
        top: 0;
        bottom: 0;
        width: 2px;
        /* height: 100%; */
        background-color: #12a182;
    }

    .timeline-box:last-child::before {
        height: 30%;
    }

    .timeline-box:first-child::before {
        top: 30%;
    }

    /* .timeline-box::after {
    content: " ";
    position: absolute;
    left: 96px;
    top: 30%;
    width: 10px;
    height: 10px;
    background-color: #27c24c;
    border-radius: 50%;
} */
    .timeline-point {
        display: inline-block;
        position: absolute;
        left: 76px;
        top: 30%;
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .timeline-point::before {
        content: " ";
        position: absolute;
        left: 2px;
        top: 2px;
        width: 6px;
        height: 6px;
        background-color: #fff;
        border-radius: 50%;
    }

    .detail-header {
        font-weight: bold;
        color: #23b7e5;
        margin-right: 3px;
        cursor: pointer;
    }

    .white {
        background-color: rgba(255, 255, 255, 0.5);
    }

    .white-text {
        color: #fff;
    }

    .green {
        background-color: #27c24c80;
    }

    .red {
        background-color: #f0505080;
    }

    .black {
        background-color: #000000cc;
        color: #fff;
    }

    .qing {
        background-color: #b7efcd
    }

    .qiuhaitanghong {
        background-color: #ec2b24cc;
    }
</style>