import Mock from 'mockjs';  /*引用mockjs*/

// 获取 mock.Random 对象
const Random = Mock.Random;
//用户登录
Mock.mock('http://192.168.0.110:8080/demo/api/user/login', 'post', {
    code: "2000",
    msg: "成功",
    time: "2019-04-24 20:57:21",
    data: {
        id: "1001",
        name: "花间舞",
        account: "1001",
        sign: "直道相思了无益，未尝惆怅是轻狂"
    }
});
//首页数据加载
Mock.mock('http://192.168.0.110:8080/demo/api/artices', 'get', {
    code: "2000",
    msg: "成功",
    time: "2019-04-24 20:57:21",
    data: [
        {
            id: "123",
            title: "盛名之下，其实难却",
            picture: require("@/assets/images/carousel1.jpg"),
            author: "Nidhogg",
            content:
                "“您太天真了，所有死物的命运不过是受活人需要来驱动罢了，您认为能够流传的，不过是它们还有被需要和利用的价值而已，所以说永恒才是最虚假的玄幻啊。”西装笔挺的秘书长摘掉了他的眼镜，文质彬彬的气息一下子从他身上流走了。取而代之的是一种不可见底的深不可测。",
            sendTime: "2019-04-08 20:33:14",
            tags: "原创|历史"
        },
        {
            id: "124",
            title: "盛名之下，其实难却",
            picture: require("@/assets/images/carousel1.jpg"),
            author: "Nidhogg",
            content:
                "忘记历史即意味着背叛，然而还有多少人记起那战火里的惨无人道呢？",
            sendTime: "2019-04-08 20:33:14",
            tags: "日记"
        },
        {
            id: "130",
            type: "atlas", //类型为图集
            title: "这是个图集",
            picture:
              "http://uploads.5068.com/allimg/1712/151-1G202120Q9-50.jpg|http://www.lzshuli.com/game_images/105317829.jpeg|http://img3.imgtn.bdimg.com/it/u=234200694,2958848013&fm=26&gp=0.jpg|https://www.xiazaiba.com/uploadfiles/content/2017/1117/water_1510903919594499.png|http://image.9game.cn/2017/11/13/18553901.jpg",
            author: "高天原",
            content:
              "今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩",
            sendTime: "2019-04-08 20:33:14",
            tags: "原创|图集"
          },
          {
            id: "125",
            title: "盛名之下，其实难却",
            picture: require("@/assets/logo.png"),
            author: "Nidhogg",
            content:
              "忘记历史即意味着背叛，然而还有多少人记起那战火里的惨无人道呢？",
            sendTime: "2019-04-08 20:33:14",
            tags: "读书笔记|西游记"
          },
          {
            id: "126",
            title: "盛名之下，其实难却",
            picture: require("@/assets/images/404.jpg"),
            author: "Nidhogg",
            content:
              "忘记历史即意味着背叛，然而还有多少人记起那战火里的惨无人道呢？",
            tags: "原创|历史"
          },
          {
            id: "127",
            title: "盛名之下，其实难却",
            picture: "",
            author: "Nidhogg",
            content:
              "“您太天真了，所有死物的命运不过是受活人需要来驱动罢了，您认为能够流传的，不过是它们还有被需要和利用的价值而已，所以说永恒才是最虚假的玄幻啊。”西装笔挺的秘书长摘掉了他的眼镜，文质彬彬的气息一下子从他身上流走了。取而代之的是一种不可见底的深不可测。",
            tags: "原创|历史"
          },
          {
            id: "128",
            title: "盛名之下，其实难却",
            picture: require("@/assets/images/test1.jpg"),
            author: "Nidhogg",
            content:
              "忘记历史即意味着背叛，然而还有多少人记起那战火里的惨无人道呢？",
            tags: "原创|历史"
          },
          {
            id: "129",
            title: "盛名之下，其实难却",
            picture: require("@/assets/images/test2.jpg"),
            author: "Nidhogg",
            content:
              "忘记历史即意味着背叛，然而还有多少人记起那战火里的惨无人道呢？"
          }
    ]
});
Mock.mock('http://192.168.0.110:8080/demo/api/artice/detail/123', 'get', {
    code: "2000",
    msg: "成功",
    time: "2019-04-24 20:57:21",
    data: {
        codeStyle: "googlecode",
        title: "午后时光",
        comment: false,//允许评论
        datatime: "2019-3-17 16:03",
        author: "花间舞",
        tags:"原创|文学|读书笔记",
        content: "> 没有什么是永恒的\n\n散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影.调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！\n```Java\n\nString str = \"Hello World!\" \n\nSystem.out.println(str);\n```\n> 没有什么是永恒的\n\n**文字加粗了**",
        readerNum:'99',//浏览量
	    approval:'122',//赞成
        oppose:'12',//反对
        favorite:'11'
    }
});