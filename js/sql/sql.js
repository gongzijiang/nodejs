//加载数据库
var mysql = require('mysql');

var operatesql = {
    /*链接数据库*/
    createconnection: function() {

        var connection = mysql.createConnection({
            host: '192.168.0.16',
            user: 'root',
            password: '123654',
            database: 'interactive',
            port: 3306,
            dateStrings:true,
            multipleStatements: true //多条查询
        });
        return connection
    },

    //数据库操作
    operatingmysql: function(sql, fn_operate,fn_fail) { 

        
        try{

            var connection = this.createconnection();

            connection.connect();
            connection.query(sql, function(err, result) {

                if (err) {

                    //失败
                    fn_fail(err);
                    console.log('[SELECT ERROR] - ', err.message);
                    return;

                } else {

                    //成功
                    fn_operate(result);
                }
            })
            connection.end();

         }catch(e){

             //失败
             fn_fail(err);
        }
    },

}
module.exports = exports = operatesql;