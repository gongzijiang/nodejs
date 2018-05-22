//工具类

var regExps = require('./regular')

var tool = {

	//字符串拆分数组
	filter_fields(list,fields){
		
		var arr = []
		list.forEach(function(item,index){

			arr.push(item[fields])

		});
		return arr.join(',');
	},

	/*特殊字符转意*/
	excludeSpecial(s) {  

	    // 去掉转义字符  
	    s = s.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');  
	    // 去掉特殊字符  
	    s = s.replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?]/g,'');  
	    return s;  
    },

    //正则验证
    validator(arr){

    	var a = [];
    	arr.forEach(function(item,index){

    		 var pattern = eval("/" + regExps[item.reg] + "/");

                if (pattern.test(item.value)) {
                   
                } else {

                  a.push(item.value);

                }

    	})

    	return a ;
    }
}
module.exports = exports = tool;