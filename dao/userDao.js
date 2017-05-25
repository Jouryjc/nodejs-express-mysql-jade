// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/conf');
// var $util = require('../util/util');
var $sql = require('./userSqlMapping');

// 使用连接池，提升性能
// var pool  = mysql.createPool($util.extend({}, $conf.mysql));
var pool = mysql.createPool( $conf.mysql );

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;

			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.insert, [param.name, param.age], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};    
				}
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
				// 释放连接 
				connection.release();
			});
		});
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			console.log(req.query.id);
			var id = +req.query.id;
			connection.query($sql.delete, id, function(err, result) {
				if(result.affectedRows > 0) {
					jsonWrite(res, result);
					result = {
						code: 200,
						msg:'删除成功'
					};
				} else {
					result = void 0;
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	updateUser: function (req, res, next) {
		var param = req.body;
		console.log(param);
		if(param.name == null || param.age == null) {
			jsonWrite(res, undefined);
			return;
		}
		pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.name, param.age, param.id], function(err, result) {
				// 使用页面进行跳转提示
				// if(result.affectedRows) {
				// 	res.render('suc',{
				// 		title:'成功页',
				// 		result: result
				// 	}); 					// 第二个参数可以直接在jade中使用
				// } else {
				// 	res.render('fail',  {
				// 		result: result
				// 	});
				// }
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	queryById: function (req, res, next) {
		var id = +req.query.id; 					// 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, id, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	queryAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				console.log(result);
				res.render('list',{
					title:'列表页',
					result:result
				});
				connection.release();
			});
		});
	}
};