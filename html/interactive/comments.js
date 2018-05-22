//异步
var async = require('async');

//生成唯一id
var uuid = require('node-uuid');

//js工具包
var _ = require('lodash');

/*加载时间工具*/
var creattime = require('./../../js/tool/time.js');

//promise异步回调
var promise = require('promise');

//加载sql
var operatesql = require('./../../js/sql/sql');

//加载状态
var status = require('./../../js/status');

//加载工具包
var tool = require('./../../js/tool/tool');


var interface_comments = function (app){
    
     /*
     后台管理评论接口调用
     参数：
     token,page,pagesize
     */
     app.post('/comments',function(req, res){
         
        res.status(200);
        
        try{

	        //当前页数
	     	var page = JSON.parse(req.body.data).page;
	     	//显示条数
	     	var pagesize =JSON.parse(req.body.data).pagesize;

        }catch(e){
        	
        	res.json(status.fail);
        	return;
        }
        
     	//正则验证
        if(tool.validator([{value:page,reg:'int'},{value:pagesize,reg:'int'}]).length != 0){
        	
            res.json(status.fail);
         	return
        }

     	var task1 = function(callback){
              
              var sql = 'select count(*) from wh_comment where type = 0';
              operatesql.operatingmysql(sql,function(result){
     	 	 
	     	 	 callback(null,result[0]['count(*)']);

     	       },function(result){ 

     	       	 callback('err',result);
     	       })
     	 };

     	 var task2 = function(q,callback){

     	 	var p1 = (page-1)*pagesize ;
         	var p2 = pagesize;

         	 //正则验证
	         if(tool.validator([{value:p1,reg:'int'},{value:p2,reg:'int'}]).length != 0){
	            
	            res.json(status.fail);
	         	return
	         }
         
         	var sql = 'select * from wh_comment where type = 0 order by create_time DESC limit '+ p1 +',' + p2 ;

         	 operatesql.operatingmysql(sql,function(result){
         	 	
         	 	callback(null,{count:q,lists:result});
     	 	 
     	     },function(result){ 

     	     	callback('err',result);

     	     })

     	 };

     	 var task3 = function(q,callback){

     	 	//筛选id字段
     	 	var fields = tool.filter_fields(q.lists,'id');
     	 	var sql = 'select * from wh_comment_ar where comment_id in('+fields+')';

         	 operatesql.operatingmysql(sql,function(result){
         	 
         	 	q.lists.forEach(function(item,index){
         	 		item.list = [];

         	 		result.forEach(function(obj,index){

         	 			if(item.id == obj.comment_id){
         	 				item.list.push(obj)
         	 			}
         	 		})
         	 	});

         	 	callback(null,q);

     	     },function(result){ 

     	     	callback('err',result);

     	     })

     	 };

     	 async.waterfall([task1,task2,task3],function(err, result){

     	 	if(err){
                res.json({data:status.fail});
     	 	}else{
     	 		var obj = {data:result}
         	 	res.json(_.extend( _.cloneDeep(status.success), obj))
     	 	}

     	 })

    });


    /*操作*/
    app.post('/ht/comment_operating',function(req, res){
           
           res.status(200);
           try{

	           /*产品id*/
	           var id =  JSON.parse(req.body.data).id;
	           //类型
	     	   var type =  JSON.parse(req.body.data).type;

	     	   //内容
	     	   var v = JSON.parse(req.body.data).v;

           }catch(e){

           	    res.json(status.fail);
	         	return;
           }

     	   //正则验证
	       if(tool.validator([{value:id,reg:'int'},{value:v,reg:'int'}]).length != 0){
	            res.json(status.fail);
	         	return
	       }
     	  
     	   var arr = ['isessence','is_on','sorting','thumbsup'];
     	   var hi = _.filter(arr, function(o) {
                return o == type
           });

           if (hi.length == 0) {
                res.json(status.fail);
                return;
           }

           var sql = "update wh_comment set  "+ type +" = '" + v + "' where id = " + "'" + id + "'";
           operatesql.operatingmysql(sql,function(result){

         	  res.json(status.success);

     	    },function(result){

              res.json(status.fail);

     	    });
           
    });

    /*管理员回复*/
    app.post('/ht/comment_reply',function(req, res){
     	  
     	  res.status(200);

     	  try{

	     	  var comment_id = JSON.parse(req.body.data).comment_id;
	     	  var content = tool.excludeSpecial(JSON.parse(req.body.data).content);
	     	  var uid = JSON.parse(req.body.data).uid;
	     	  var is_type = 1 ;//管理员回复
	     	  var operat_date = new Date().Format("yyyy-MM-dd hh:mm:ss");

     	  }catch(e){

     	  	 res.json(status.fail);
	         return;
     	  }
     	  //正则验证
	         if(tool.validator([{value:comment_id,reg:'int'}]).length != 0){
	            res.json(status.fail);
	         	return
	      }
          
          var sql = "insert into wh_comment_ar(`comment_id`,`content`,`uid`,`is_type`,`operat_date`) values('" + comment_id + "','" + content + "','" + uid + "','" + is_type + "','" + operat_date + "')";
          operatesql.operatingmysql(sql,function(result){

         	res.json(status.success);

     	  },function(result){

            res.json(status.fail);

     	  });
    });

    /* 删除回复或追加评论 */ 
    app.post('/ht/comment_dele',function(req, res){

     	res.status(200);

     	try{

     		var id = JSON.parse(req.body.data).id;

     	}catch(e){

     		res.json(status.fail);
     		return;
     	}
     	  
     	//正则验证
	    if(tool.validator([{value:id,reg:'int'}]).length != 0){
	        res.json(status.fail);
	        return
	    }

     	var sql = "delete from wh_comment_ar where id = " + id;
        operatesql.operatingmysql(sql,function(result){

         	res.json(status.success);

     	},function(result){

            res.json(status.fail);

     	});
    })
}

module.exports = exports = interface_comments;