var crypto = require('crypto'); //加密方式
var token = {

	createToken: function(obj, timeout) {

	
		var obj2 = {
			data: obj, //payload
			created: parseInt(Date.now() / 1000), //token生成的时间的，单位秒
			exp: parseInt(timeout) || 10 //token有效期
		};

		//payload信息
		var base64Str = Buffer.from(JSON.stringify(obj2), "utf8").toString("base64");

		//添加签名，防篡改
		var secret = "jj.cc.520";
		var hash = crypto.createHmac('sha256', secret);
		hash.update(base64Str);
		var signature = hash.digest('base64');

		return base64Str + "." + signature;
	},
	decodeToken: function(token){

		var decArr=token.split(".");
        if(decArr.length<2){
            //token不合法
            return false;
        }
        var payload={};
        try{
            payload=JSON.parse(Buffer.from(decArr[0],"base64").toString("utf8"));
        }catch(e){
            return false;
        }

        //检验签名
        var secret="jj.cc.520";        
        var hash=crypto.createHmac('sha256',secret);
            hash.update(decArr[0]);
        var checkSignature=hash.digest('base64');

        return {
            payload:payload,
            signature:decArr[1],
            checkSignature:checkSignature //检查是否和signature 的加密是否一样
        }

	}
}

module.exports = exports = token;