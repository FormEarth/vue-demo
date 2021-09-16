<template>
    <main>
        <div class="top-box">
            <div style="display: flex;">
                <img src="http://127.0.0.1:9090/static/thumbnail/writing/IMG202108220022.jpg" title="头像" class="avatar">
                <div style="padding: 5px 0 0 5px">
                    <div>Qiyuan wong&nbsp;
                        <!-- <img src="./image/svg/femenine.svg" width="12px" style="vertical-align: middle;"> -->
                    </div>
                    <div style="color: gray;font-size: small;line-height: 25px;">
                        万一禅关砉然破，美人如玉剑如虹
                    </div>
                </div>
            </div>

            <div style="padding-top: 14px;">
                <div class="button">
                    关&nbsp;注
                </div>
            </div>
        </div>
        <div class="content-box">
            <!-- <div class="card-item">
            </div> -->
            <div class="card-item">
                <div style="display: flex;justify-content: space-around; text-align: center;">
                    <div>
                        <p>动态</p>
                        <label for="" style="font-weight: bold;">456</label>
                    </div>
                    <div>
                        <p>关注</p>
                        <label for="" style="font-weight: bold;">123</label>
                    </div>
                    <div>
                        <p>粉丝</p>
                        <label for="" style="font-weight: bold;">456</label>
                    </div>
                </div>
                <div style="display: inline-block;margin-left: 10%;font-weight: lighter;">
                    <!-- <p>获得点赞 615</p> -->
                    <p>文章被阅读 64,573</p>
                    <p>排行榜 1,419</p>
                    <p>领域 Android & Java</p>
                </div>

            </div>
            <div class="card-item" style="padding-bottom: 5px;">
                <h5 class="header-title prefix-content">他的标签</h5>
                <demo-tag>Java</demo-tag>
                <demo-tag>JavaScript</demo-tag>
                <demo-tag>Linux</demo-tag>
                <demo-tag>Docker</demo-tag>
                <demo-tag>C++</demo-tag>
                <demo-tag>Android</demo-tag>
            </div>
            <div class="card-item">
                <h5 class="header-title prefix-content suffix-content">图片</h5>
                <div class="img-box">
                    <img src="http://127.0.0.1:9090/static/thumbnail/writing/014f0641b3254a1381605cf6a9600be0.jpg"
                        alt="">
                    <img src="http://127.0.0.1:9090/static/thumbnail/writing/014f0641b3254a1381605cf6a9600be0.jpg"
                        alt="">
                    <img src="http://127.0.0.1:9090/static/thumbnail/writing/014f0641b3254a1381605cf6a9600be0.jpg"
                        alt="">
                </div>

            </div>
            <div class="card-item">
                <h5 class="header-title prefix-content suffix-content">文章</h5>
                <div class="article-item">Java 从入门到精通</div>
                <div class="article-item">JavaScript 从入门到精通</div>
                <!-- <div class="article-item query-all">查看全部 &#5171;&#5171;</div> -->
            </div>
            <div class="card-item">
                <h5 class="header-title prefix-content">关于我</h5>
                <div style="padding-left: 5px;line-height: 24px;white-space: pre-line;">Java开发工程师
                    1996，20年服务端开发经验
                    对于前端兴趣盎然
                    GitHub：<a href="www.baidu.com" style="text-decoration: none;">www.github.com/qwer</a>
                </div>

            </div>
        </div>
        <p>
            Qiyuan wong的时间线
        </p>
        <timeline></timeline>
        <div style="text-align: center;">
            登录查看更多 &nbsp;
            <div class="button">
                登录
            </div>
        </div>
    </main>
</template>
<script>
    import timeline from './timeline'
    export default {
        name: "homepage",
        data() {
            return {

            }
        },
        components: {
            timeline
        }
    }
</script>
<style scoped>
    main {
        overflow: hidden;
        margin: 0 auto;
        max-width: 800px;
        /* padding: 0 12px; */
    }

    .top-box {
        margin-top: 10px;
        /* background-color: #fff; */
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 10px;
        display: flex;
        padding: 10px;
        justify-content: space-between;
        max-width: 400px;
        box-shadow: 0 4px 8px rgba(179, 173, 173, 0.3);
    }

    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .button {
        display: inline-block;
        padding: 3px 24px;
        border-radius: 100px;
        background-image: linear-gradient(45deg, #0059ff, #87b1ff);
        color: #fff;
        cursor: pointer;
        margin-bottom: 10px;
        font-weight: lighter;
    }

    .content-box {
        overflow: hidden;
        column-count: 3;
        column-width: 240px;
        column-gap: 24px;
        margin-top: 20px;
    }

    .card-item {
        break-inside: avoid;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 6px;
        /* box-shadow: -.2em .2em .3em -.1em #00000026; */
        /* min-height: 100px; */
        padding: 10px;
        margin-bottom: 10px;
        box-shadow: 0 4px 8px rgba(179, 173, 173, 0.3);
    }

    .card-item p {
        margin: 8px 0;
    }

    .gray {
        background: none;
        background-color: #CED1E0;
        color: #000;
    }

    .small {
        font-size: small;
        padding: 2px 15px;
    }

    .header-title {
        margin: 10px;
        position: relative;
    }

    .prefix-content::before {
        content: "";
        position: absolute;
        top: 4.4px;
        left: -14px;
        height: 8px;
        width: 8px;
        border-radius: 50%;
        background-color: #ffd209;
        line-height: 16.8px;
    }

    .suffix-content::after {
        content: '全部 ❯❯';
        position: absolute;
        top: 0;
        right: 0;
        font-size: small;
        font-weight: normal;
        color: #2b5af3;
        cursor: pointer;
    }

    .img-box {
        font-size: 0;
    }

    .img-box img {
        max-height: 200px;
        margin-bottom: 6px;
        height: 113px;
        object-fit: cover;
    }

    .img-box img:nth-child(1) {
        width: 100%;
    }

    .img-box img:nth-child(2) {
        width: calc(50% - 3px);
        padding-right: 3px;
    }

    .img-box img:nth-child(3) {
        width: calc(50% - 3px);
        padding-left: 3px;

    }

    .article-item {
        /* color: #2b5af3; */
        /* background-color: rgb(0, 0, 0,0.7); */
        font-weight: lighter;
        /* padding: 3px; */
        margin: 0 18px 3px;
        border-radius: 3px;
        cursor: pointer;
    }

    .blur-back {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(16px);
    }
</style>