<script type="text/javascript">
// 定义一些公共的属性和方法
const imageAccessPref = "http://192.168.149.110:9090/static";
//tag可以选取的颜色
const tagColor = [
  {
    name: "green",
    color: "rgba(88, 201, 144)",
    background: "rgba(88, 201, 144,0.1)",
    nameZh: "青色"
  },
  {
    name: "blue",
    color: "rgba(33, 150, 243)",
    background: "rgba(33, 150, 243,0.1)",
    nameZh: "蓝色"
  },
  {
    name: "red",
    color: "rgba(243, 0, 0)",
    background: "rgba(243, 0, 0,0.1)",
    nameZh: "红色"
  },
  // { name: "yellow", color: "rgba(248, 228, 46)",background:"rgba(248, 228, 46,0.1)" },
  {
    name: "purple",
    color: "rgba(65, 33, 243)",
    background: "rgba(65, 33, 243,0.1)",
    nameZh: "紫色"
  },
  {
    name: "gray",
    color: "rgba(145, 148, 150)",
    background: "rgba(145, 148, 150,0.1)",
    nameZh: "灰色"
  },
  {
    name: "white",
    color: "rgba(255, 255, 255)",
    background: "rgba(255, 255, 255,0.1)",
    nameZh: "白色"
  }
];
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
  } else if (dateTime >= 24 * 60 * 60 * 1000) {
    return parseInt(dateTime / (24 * 60 * 60 * 1000)) + "天前";
  }
}
//时间格式化
function formatDate(time,format='YY-MM-DD hh:mm:ss'){
	var date = new Date(time);

	var year = date.getFullYear(),
		month = date.getMonth()+1,//月份是从0开始的
		day = date.getDate(),
		hour = date.getHours(),
		min = date.getMinutes(),
		sec = date.getSeconds();
	var preArr = Array.apply(null,Array(10)).map(function(elem, index) {
		return '0'+index;
	});////开个长度为10的数组 格式为 00 01 02 03

	var newTime = format.replace(/YY/g,year)
						.replace(/MM/g,preArr[month]||month)
						.replace(/DD/g,preArr[day]||day)
						.replace(/hh/g,preArr[hour]||hour)
						.replace(/mm/g,preArr[min]||min)
						.replace(/ss/g,preArr[sec]||sec);

	return newTime;			
}

//防抖
export function _debounce(fn, delay) {
  var delay = delay || 200;
  var timer;
  return function() {
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      timer = null;
      fn.apply(th, args);
    }, delay);
  };
}
// 暴露出这些属性和方法
export default {
  imageAccessPref,
  tagColor,
  consoleObj,
  dateSubtract,
  formatDate
};
</script>