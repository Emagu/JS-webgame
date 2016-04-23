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
	socket.User = new Object();
	//init
	socket.on('getMap', function(){
		connection.query('SELECT * FROM `Map`', function(error,rows){
		    if(error){
		        socket.emit('getMap', {
					status: 'error',
					log: error
				});
		    }else{
		    	socket.emit('getMap', {
					status: 'secss',
					Map:rows
				});
			}
		});
	});
	socket.on('getActor', function(userID){
		connection.query('SELECT * FROM `actor_list` WHERE `userID` = ?',[userID], function(error, rows){
			if (error){
				socket.emit('getActor', {
					status: 'error',
					log: error
				});
			}else{
				if(rows.length>0) {
					socket.emit('getActor', {
						status: 'error',
						ActorID: rows[0].NO
					});
				}else{
					socket.emit('getActor', {
						status: 'fail',
						ActorID: 0
					});
				}
		    }
		});
	});
	//register
	socket.on('register', function(msg){
		if(msg.Name==""){
			socket.emit('register_res', {
				status: 'error',
				log: 'Name cann`t be empty!'
			});
		}else if(msg.PW==""){
			socket.emit('register_res', {
				status: 'error',
				log: 'Password cann`t be empty!'
			});
		}else if(msg.PW2==""){
			socket.emit('register_res', {
				status: 'error',
				log: 'Password2 cann`t be empty!'
			});
		}else if(msg.Mail==""){
			socket.emit('register_res', {
				status: 'error',
				log: 'Email cann`t be empty!'
			});
		}else if(msg.Name.length>USER_NAME_MAX || msg.Name.length<USER_NAME_MIN){
			socket.emit('register_res', {
				status: 'error',
				log: 'Name length must between '+USER_NAME_MIN+' ~ '+USER_NAME_MAX
			});
		}else if(msg.PW.length>USER_PW_MAX || msg.PW.length<USER_PW_MIN){
			socket.emit('register_res', {
				status: 'error',
				log: 'Password length must between '+USER_PW_MIN+' ~ '+USER_PW_MAX
			});
		}else if(msg.PW2.length>USER_PW_MAX || msg.PW2.length<USER_PW_MIN){
			socket.emit('register_res', {
				status: 'error',
				log: 'Password2 length must between '+USER_PW_MIN+' ~ '+USER_PW_MAX
			});
		}else if(msg.PW!=msg.PW2){
			socket.emit('register_res', {
				status: 'error',
				log: 'Password != Password2'
			});
		}else if(!(/^.+@.+\..{2,3}$/.test(msg.Mail))){
			socket.emit('register_res', {
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
			        socket.emit('register_res', {
						status: 'error',
						log: error
					});
			    }else{
			    	socket.emit('register_res', {
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
		    	socket.emit('login', {
					status: 'error',
					log: error
				});
		    }else{
		    	var UserID,ActorID,Connect;
		    	for (var i in rows) {
			    	if(rows[i].password == md5(msg.PW)){
			    		UserID = rows[i].NO;
			    		ActorID = rows[i].ActorID;
			    		Connect = rows[i].Connect;
						break;
			    	}
	    		}
	    		if(Connect==0){
	    			connection.query('UPDATE `member_list` SET `Connect` = 1 WHERE `username` = ?',[msg.Name], function(error){
		    			if (error){
		    				isEcho = true;
					    	socket.emit('login', {
								status: 'error',
								log: error
							});
		    			}else{
		    				isEcho = true;
		    				socket.emit('login', {
								status: 'secss',
								UserID: UserID,
								ActorID: ActorID
							});
		    			}
		    			if(!isEcho){
					    	socket.emit('login', {
								status: 'fail'
							});
					    }
		    		});	
	    		}else{
	    			socket.emit('login', {
						status: 'Connected'
					});
	    		}
		    }
		});
	});
	socket.on('logout', function(msg){
	    connection.query('UPDATE `member_list` SET `Connect` = 0 WHERE `NO` = ?',[msg], function(error){
			if (error) console.log(error);
		});
	});
	//newActor
	socket.on('newActor', function(msg){
		connection.query('INSERT INTO `actor_list` SET ?', msg, function(error,result){
			if(error){
				console.log('寫入資料失敗！');
				socket.emit('newActor_res', {
					status: 'error',
					log: error
				});
		    }else{
		    	connection.query('UPDATE `member_list` SET `ActorID` =  ? WHERE `NO` = ?', [result.insertId,msg.userID], function(error){
		    		if(error){
						console.log('寫入資料失敗！');
						socket.emit('newActor_res', {
							status: 'error',
							log: error
						});
		    		}else{
		    			socket.emit('newActor_res', {
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
			socket.emit('newActorNameCheck_res', {
				status: 'typeerror'
			});
		}else{
			connection.query('SELECT * FROM `actor_list` WHERE actorName = ?',[msg], function(error, rows, fields){
				if (error){
					socket.emit('newActorNameCheck_res', {
						status: 'error',
						log: error
					});
				}else if(rows.length > 0){
					socket.emit('newActorNameCheck_res', {
						status: 'Used'
					});
				}else{
					socket.emit('newActorNameCheck_res', {
						status: 'canUse'
					});
				}
			});
		}
	});
	//Hall
	socket.on('hallinit', function(actorID){
		hallinit(socket,actorID)
	});
	//Room
	socket.on('checkRoomName', function(msg){
		if(msg.length>ROOM_NAME_MAX || msg.length<ROOM_NAME_MIN){
			socket.emit('checkRoomName_res', {
				status: 'typeerror'
			});
		}else{
			connection.query('SELECT * FROM `room_list` WHERE `Name` = ?',[msg], function(error, rows, fields){
				if (error){
					socket.emit('checkRoomName_res', {
						status: 'error',
						log: error
					});
				}else if(rows.length > 0){
					socket.emit('checkRoomName_res', {
						status: 'Used'
					});
				}else{
					socket.emit('checkRoomName_res', {
						status: 'canUse'
					});
				}
			});
		}
	});
	socket.on('CreateRoom', function(msg){
		connection.query('INSERT INTO `room_list` SET ?', msg, function(error,result){
			if(error){
				console.log('寫入資料失敗！');
				socket.emit('addRoom_res', {
					status: 'error',
					log: error
				});
			}else{
				var side = addRoom(result.insertId,msg.RoomMaster,socket);
				if(side!=-1){
					socket.emit('addRoom_res', {
						status: 'secss',
						Side: side,
						RoomID: result.insertId,
						RoomMaster: true
					});
					setTimeout(function(){
						updateRoomList();
					},50);
				}else{
					socket.emit('addRoom_res', {
						status: 'fail'
					});
				}
		    }
		});
	});
	socket.on('addRoom', function(msg){
		var side = addRoom(msg.RoomID,msg.ActorID,socket);
		if(side!=-1){
			socket.User.RoomID = msg.RoomID;
			setTimeout(function(){
				updateRoomList();
			},50);
			io.emit('addRoom_res', {
				status: 'secss',
				Side: side,
				RoomID: msg.RoomID,
				ActorID: msg.ActorID,
				RoomMaster: false
			});
		}else{
			socket.emit('addRoom_res', {
				status: 'fail'
			});
		}
	});//addRoom
	socket.on('updateRoom', function(msg){
		updateRoom(msg);
	});//updateRoom
	/*socket.on('SetRoomStatus', function(msg){
		connection.query('UPDATE `room_actor_list` SET `state` = ? WHERE `actorID` = ?', [msg.Status,msg.ActorID], function(error){
			if(error){
				console.log(error);
			}else{
				setTimeout(function() {
                    updateRoom(msg.RoomID);
				}, 50);
			}
		});
	});*///SetRoomStatus
	socket.on('SetRoomPostion', function(msg){//RoomPostion
		connection.query('UPDATE `room_actor_list` SET `Postion` = ? WHERE `actorID` = ?', [msg.Postion,msg.ActorID], function(error){
			if(error){
				console.log(error);
			}else{
				setTimeout(function() {
					updateRoom(msg.RoomID);
				}, 50);
			}
		});
	});//SetRoomPostion
	socket.on('SetRoomSide', function(msg){//RoomPostion
		connection.query('UPDATE `room_actor_list` SET `side` = ? WHERE `actorID` = ?', [msg.Side,msg.ActorID], function(error){
			if(error){
				console.log(error);
			}else{
				setTimeout(function() {
					updateRoom(msg.RoomID);
				}, 50);
			}
		});
	});//SetRoomPostion
	socket.on('RoomNewMsg', function(msg){//RoomPostion
		io.emit('RoomNewMsg',{
			RoomID:msg.RoomID,
			Message:msg.ActorName + " : " + msg.Message
		});
	});//SetRoomPostion
	socket.on('SetActorType', function(msg){//RoomPostion
		connection.query('UPDATE `room_actor_list` SET `Type` = ? WHERE `actorID` = ?', [msg.Type,msg.ActorID], function(error){
			if(error){
				console.log(error);
			}else{
				setTimeout(function() {
					updateRoom(msg.RoomID);
				}, 50);
			}
		});
	});//SetActorType
	socket.on('quitRoom', function(msg){//RoomPostion
		socket.roomID = 0;
		quitRoom(socket,msg);
	});//SetActorType
	//週期任務1S一次
	setInterval(function() {
	  }, 1000);
	//left
	socket.on('disconnect',function(){
		console.log(socket.local);
		if(socket.local == "room"){
			console.log(socket.User);
			quitRoom(socket,socket.User);//玩家離房	
		} 
	});
});
//msg =>{ActorID,RoomID,Echo("是否回傳")}
function quitRoom(socket,msg){
	connection.query('DELETE FROM `room_actor_list` WHERE `actorID` = ?', [msg.ActorID], function(error){
		if(error)console.log(error);
		else{
			connection.query('SELECT `RoomMaster` FROM `room_list` WHERE `NO` = ?', [msg.RoomID], function(error,rows){
				if(error)console.log(error);
				else{
					if(rows.length>0){
						if(rows[0].RoomMaster==msg.ActorID){
							connection.query('SELECT `actorID` FROM `room_actor_list` WHERE `roomID` = ?', [msg.RoomID], function(error,rows){
								if(error)console.log(error);
								else{
									if(rows.length>0){
										var newMaster = rows[0].actorID;
										connection.query('UPDATE `room_list` SET `RoomMaster`= ? WHERE `NO` = ?', [newMaster,msg.RoomID], function(error){
											if(error)console.log(error);
										})
									}else{
										connection.query('DELETE FROM `room_list` WHERE `NO` = ?', [msg.RoomID], function(error){
											if(error)console.log(error);
										})
									}
								}
							});
						}
					}
				}
			});
			setTimeout(function(){
				updateRoom(msg.RoomID);
			},50);
			setTimeout(function(){
				updateRoomList();
			},50);
			if(msg.Echo){
				hallinit(socket,msg.ActorID);
			}
		}
	});
}
function hallinit(socket,actorID){
	connection.query('SELECT * FROM `actor_list` WHERE `NO` = ?',[actorID], function(error, rows){
		if (error){
			socket.emit('hallinit', {
				status: 'error',
				log: error
			});
		}else{
			if(rows.length>0){
				updateRoomList();
				socket.User.ActorID = actorID;
				socket.local = "hall";
				socket.emit('hallinit', {
					status: 'secss',
					LV: rows[0].LV,
					actorName: rows[0].actorName
				});
			}
		}
	});
}
function updateRoom(msg){
	connection.query('SELECT A.actorName,A.LV,B.actorID,B.side FROM `actor_list` AS A RIGHT JOIN `room_actor_list` AS B ON A.NO = B.actorID WHERE B.roomID = ?', [msg], function(error,rows){
		if(error)console.log(error);
		else{
			var PlayData = rows;
			connection.query('SELECT A.Name,A.Map,A.Mode,A.RoomMaster,B.MapName FROM `room_list` AS A RIGHT JOIN `Map` AS B ON A.Map = B.NO WHERE A.NO = ?', [msg], function(err,rows){
				if(err){
					console.log(err);
				}else{
					if(rows.length>0){
						io.emit('updateRoom_res', {
							status: "secss",
							PlayData: PlayData,
							Master: rows[0].RoomMaster,
							RoomName: rows[0].Name,
							Map: rows[0].Map,
							Mode: rows[0].Mode,
							MapName: rows[0].MapName,
							RoomID: msg
						});
					}
				}
			});
		}
	});
}
function updateRoomList(){
	connection.query('SELECT A.NO,A.Name,A.Map,COUNT(actorID) FROM room_list AS A RIGHT JOIN room_actor_list AS B ON A.NO = B.roomID GROUP BY A.NO', function(error, rows){
		if (error){
			console.log(error);
			return false;	
		}else{
			var finsh = false;
			io.emit('RoomListUpdate',rows);
		}
	});
}
function addRoom(roomID,actorID,socket){
	var date = new Date();
	var sideA = 0;
	connection.query('SELECT * FROM `room_actor_list` WHERE `roomID` = ?',[roomID], function(error, rows){
		if (error){
			console.log(error);
			return -1;
		}else{
			for(var i in rows){
				if(rows[i].side == 0) sideA++;
			}
			var side = 0;
			if(sideA>5) side = 1;
			var data = {
				roomID: roomID,
				actorID: actorID,
				lasttime: date,
				side: side
			}
			connection.query('INSERT INTO `room_actor_list` SET ?', data, function(error){
				if (error){
					console.log(error);
					return -1;
				}else{
					socket.local = "room";
					socket.User.RoomID = roomID;
					return side;
				}
			});
		}
	});
}
//指定port
http.listen(process.env.PORT || 3000, function(){
	console.log('listening on *:3000');
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
