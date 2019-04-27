<script type="text/javascript">
    // 定义一些公共的属性和方法
    const httpUrl = 'http://39.105.17.99:8080/'
    //打印对象
    function consoleObj(obj) {
        var description = "";
        for (var i in obj) {
            var property = obj[i];
            description += i + " = " + property + "\n";
        }
        console.log(description);
    }
    // 暴露出这些属性和方法
    export default {
        httpUrl,
        consoleObj
    }
</script>