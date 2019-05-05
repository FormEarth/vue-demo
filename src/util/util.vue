<script type="text/javascript">
// 定义一些公共的属性和方法
const httpUrl = "http://39.105.17.99:8080/";
//打印对象
function consoleObj(obj) {
  var description = "";
  for (var i in obj) {
    var property = obj[i];
    description += i + " = " + property + "\n";
  }
  console.log(description);
}
//根据时间计算
function dateSubtract(date) {
  var now = new Date(); //结束时间
  var dateTime = now.getTime() - new Date(date).getTime(); //时间差的毫秒数
  if (dateTime < 60 * 1000) {
    return parseInt(dateTime / 1000) + "秒前";
  } else if (dateTime >= 60 * 1000 && dateTime < 60 * 60 * 1000) {
    return parseInt(dateTime / (60 * 1000)) + "分钟前";
  } else if (dateTime >= 60 * 60 * 1000 && dateTime < 24 * 60 * 60 * 1000) {
    return parseInt(dateTime / (60 * 60 * 1000)) + "小时前";
  } else if(dateTime >= 24 * 60 * 60 * 1000){
    return parseInt(dateTime / (24 * 60 * 60 * 1000)) + "天前";
  }
}
// 暴露出这些属性和方法
export default {
  httpUrl,
  consoleObj,
  dateSubtract
};
</script>