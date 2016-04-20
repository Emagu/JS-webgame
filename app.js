const USER_NAME_MIN = 6;//帳號最短
const USER_NAME_MAX = 10;//帳號最長
const USER_PW_MIN = 6;//密碼最短
const USER_PW_MAX = 10;//密碼最長
const ACTOR_NAME_MIN = 5;
const ACTOR_NAME_MAX = 10;
const ROOM_NAME_MIN = 5;
const ROOM_NAME_MAX = 10;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require("mysql");
var md5 = require("blueimp-md5");
//建立連線
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'emagu',
    password: '',
    database: 'webgame',
    port: '3306'
});

app.use('/src', express.static(__dirname + '/src'));
app.use('/lib', express.static(__dirname + '/lib'));

//當新的使用者連接進來的時候
io.on('connection', function(socket){
	socket.local = null;
	//init
	socket.on('getMap', function(data){
		var isEcho = false;
		var ActorID=0;
		if(data.UserID!=""){
			connection.query('SELECT * FROM `actor_list` WHERE `userID` = ?',[data.UserID], function(error, rows){
				if (error){
					io.emit('getMap', {
						status: 'error',
						log: error
					});
					isEcho = true;
				}else{
					if(rows.length>0) ActorID = rows[0].NO;
		    	}
			});
		}
		if(!isEcho){
			connection.query('SELECT * FROM `Map`', function(error,rows){
			    if(error){
			        io.emit('getMap', {
						status: 'error',
						log: error
					});
			    }else{
			    	io.emit('getMap', {
						status: 'secss',
						Map:rows,
						ActorID:ActorID
					});
			    }
			});
		}
	});
	//register
	socket.on('register', function(msg){
		if(msg.Name==""){
			io.emit('register', {
				status: 'error',
				log: 'Name cann`t be empty!'
			});
		}else if(msg.PW==""){
			io.emit('register', {
				status: 'error',
				log: 'Password cann`t be empty!'
			});
		}else if(msg.PW2==""){
			io.emit('register', {
				status: 'error',
				log: 'Password2 cann`t be empty!'
			});
		}else if(msg.Mail==""){
			io.emit('register', {
				status: 'error',
				log: 'Email cann`t be empty!'
			});
		}else if(msg.Name.length>USER_NAME_MAX || msg.Name.length<USER_NAME_MIN){
			io.emit('register', {
				status: 'error',
				log: 'Name length must between '+USER_NAME_MIN+' ~ '+USER_NAME_MAX
			});
		}else if(msg.PW.length>USER_PW_MAX || msg.PW.length<USER_PW_MIN){
			io.emit('register', {
				status: 'error',
				log: 'Password length must between '+USER_PW_MIN+' ~ '+USER_PW_MAX
			});
		}else if(msg.PW2.length>USER_PW_MAX || msg.PW2.length<USER_PW_MIN){
			io.emit('register', {
				status: 'error',
				log: 'Password2 length must between '+USER_PW_MIN+' ~ '+USER_PW_MAX
			});
		}else if(msg.PW!=msg.PW2){
			io.emit('register', {
				status: 'error',
				log: 'Password != Password2'
			});
		}else if(!(/^.+@.+\..{2,3}$/.test(msg.Mail))){
			io.emit('register', {
				status: 'error',
				log: 'Email type error'
			});
		}else{
			var data = {
				username: msg.Name,
				email: msg.Mail,
				password: md5(msg.PW)
			}
			connection.query('INSERT INTO `member_list` SET ?', data, function(error){
			    if(error){
			        console.log('寫入資料失敗！');
			        io.emit('register', {
						status: 'error',
						log: error
					});
			    }else{
			    	io.emit('register', {
						status: 'secss'
					});
			    }
			});
		}
	});
	//login
	socket.on('login', function(msg){
		var isEcho = false;
		connection.query('SELECT * FROM `member_list` WHERE username = ?',[msg.Name], function(error, rows, fields){
		    if (error){
		    	isEcho = true;
		    	io.emit('login', {
					status: 'error',
					log: error
				});
		    }else{
		    	for (var i in rows) {
			    	if(rows[i].password == md5(msg.PW)){
			    		io.emit('login', {
							status: 'secss',
							UserID: rows[i].NO,
							ActorID: rows[i].ActorID
						});
						isEcho = true;
						break;
			    	}
	    		}
		    }
		    if(!isEcho){
		    	io.emit('login', {
					status: 'fail'
				});
		    }
		});
	});
	//newActor
	socket.on('newActor', function(msg){
		connection.query('INSERT INTO `actor_list` SET ?', msg, function(error,result){
			if(error){
				console.log('寫入資料失敗！');
				io.emit('newActor', {
					status: 'error',
					log: error
				});
		    }else{
		    	connection.query('UPDATE `member_list` SET `ActorID` =  ? WHERE `NO` = ?', [result.insertId,msg.userID], function(error){
		    		if(error){
						console.log('寫入資料失敗！');
						io.emit('newActor', {
							status: 'error',
							log: error
						});
		    		}else{
		    			io.emit('newActor', {
							status: 'secss',
							ActorID: result.insertId
						});
		    		}
		    	});
		    }
		});
	});
	socket.on('newActorNameCheck', function(msg){
		if(msg.length>ACTOR_NAME_MAX || msg.length<ACTOR_NAME_MIN){
			io.emit('newActorNameCheck', {
				status: 'typeerror'
			});
		}else{
			connection.query('SELECT * FROM `actor_list` WHERE actorName = ?',[msg], function(error, rows, fields){
				if (error){
					io.emit('newActorNameCheck', {
						status: 'error',
						log: error
					});
				}else if(rows.length > 0){
					io.emit('newActorNameCheck', {
						status: 'Used'
					});
				}else{
					io.emit('newActorNameCheck', {
						status: 'canUse'
					});
				}
			});
		}
	});
	//Hallinit
	socket.on('getActor', function(msg){
		var isEcho = false;
		if(!isEcho){
			connection.query('SELECT * FROM `actor_list` WHERE `NO` = ?',[msg], function(error, rows){
				if (error){
					io.emit('getActor', {
						status: 'error',
						log: error
					});
					isEcho = true;
				}else{
					for (var i in rows) {
						socket.local = "hall";
						io.emit('getActor', {
							status: 'secss',
							LV: rows[i].LV,
							actorName: rows[i].actorName,
							RoomList: getRoomList()
						});
						isEcho = true;
						break;
				    }
		    	}
		    	if(!isEcho){
			    	io.emit('getActor', {
						status: 'fail'
					});
			    }
			});
		}
		
	});
	//CreateRoom
	socket.on('checkRoomName', function(msg){
		if(msg.length>ROOM_NAME_MAX || msg.length<ROOM_NAME_MIN){
			io.emit('checkRoomName', {
				status: 'typeerror'
			});
		}else{
			connection.query('SELECT * FROM `room_list` WHERE `Name` = ?',[msg], function(error, rows, fields){
				if (error){
					io.emit('checkRoomName', {
						status: 'error',
						log: error
					});
				}else if(rows.length > 0){
					io.emit('checkRoomName', {
						status: 'Used'
					});
				}else{
					io.emit('checkRoomName', {
						status: 'canUse'
					});
				}
			});
		}
	});
	socket.on('CreateRoom', function(msg){
		console.log(msg);
		/*connection.query('INSERT INTO `actor_list` SET ?', msg, function(error,result){
			if(error){
				console.log('寫入資料失敗！');
				io.emit('newActor', {
					status: 'error',
					log: error
				});
		    }else{
		    	connection.query('UPDATE `member_list` SET `ActorID` =  ? WHERE `NO` = ?', [result.insertId,msg.userID], function(error){
		    		if(error){
						console.log('寫入資料失敗！');
						io.emit('newActor', {
							status: 'error',
							log: error
						});
		    		}else{
		    			io.emit('newActor', {
							status: 'secss',
							ActorID: result.insertId
						});
		    		}
		    	});
		    }
		});*/
	});
	
	//週期任務1S一次
	setInterval(function() {
		if(roomlist_needupdate){
			io.emit('RoomList_Update', {
				data: getRoomList()
			});	
		} 
	  }, 1000);
	//left
	socket.on('disconnect',function(){
		console.log(socket.username+" left.");
		io.emit('user left',{
			username:socket.username
		});
	});
});
function getRoomList(){
	var RoomList = [];
	connection.query('SELECT * FROM `room_list`', function(error, rows){
		if (error){
			console.log(error);
			return false;	
		}else{
			for (var i in rows) {
				var roomid = rows[i].NO;
				connection.query('SELECT * FROM `room_actor_list` WHERE `roomID` = ?', [roomid], function(err, rws){
					if(err){
						console.log(err);
						return false;	
					}else{
						var roomdata = new Object();
						roomdata.RoomID = roomid;
						roomdata.RoomName = rows[i].Name;
						roomdata.Map = rows[i].Map;
						roomdata.ActorNum = rws.length;
						RoomList.push(roomdata);
					}
				});
			}
		}
	});
	return RoomList;
}
var roomlist_needupdate = false;
//指定port
http.listen(process.env.PORT || 3000, function(){
	console.log('listening on *:3000');
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
