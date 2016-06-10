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
var fs = require('fs'); //載入node.js的檔案系統模組
//建立連線
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'emagu',
    password: '',
    database: 'webgame',
    port: '3306'
});
connection.query("UPDATE `member_list` SET Connect = 0;",[],function(error) {
    if(error) console.log(error);
});
connection.query("DELETE FROM `room_list`;",[],function(error) {
    if(error) console.log(error);
});
connection.query("DELETE FROM `room_actor_list`;",[],function(error) {
    if(error) console.log(error);
});
connection.query("DELETE FROM `room_AI`;",[],function(error) {
    if(error) console.log(error);
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
	    			var ErrorMsg = "";
	    			connection.query('UPDATE `member_list` SET `Connect` = 1 WHERE `username` = ?',[msg.Name], function(error){
		    			if (error) ErrorMsg = error;
		    		});
		    		updateConnect(UserID);
		    		setTimeout(function(){
		    			if(ErrorMsg!=""){
		    				socket.emit('login', {
								status: 'error',
								log: error
							});
		    			}else{
		    				socket.User.UserID = UserID;
		    				socket.emit('login', {
								status: 'secss',
								UserID: UserID,
								ActorID: ActorID,
								User: msg.Name,
								PW: msg.PW
							});
		    			}
		    		},500);
	    		}else{
	    			socket.emit('login', {
						status: 'Connected'
					});
	    		}
		    }
		});
	});
	socket.on('logout', function(msg){
	    logout(msg);
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
				status: 'typeerror',
				length: msg
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
		if(socket.User.UserID!=null) updateConnect(socket.User.UserID);
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
		if(socket.User.UserID!=null) updateConnect(socket.User.UserID);
		updateRoom(msg);
	});//updateRoom
	socket.on('SetRoomSide', function(msg){//RoomPostion
		if(socket.User.UserID!=null) updateConnect(socket.User.UserID);
		connection.query('UPDATE `room_actor_list` SET `side` = ? WHERE `actorID` = ?', [msg.Side,msg.ActorID], function(error){
			if(error){
				console.log(error);
			}else{
				setTimeout(function() {
					updateRoom(msg.RoomID);
				}, 50);
			}
		});
	});//SetRoomSide
	socket.on('SetItem', function(msg){//RoomPostion
		if(socket.User.UserID!=null) updateConnect(socket.User.UserID);
		switch(msg.Type){
			case 0:
		    	connection.query('UPDATE `room_actor_list` SET `item1` = ? WHERE `actorID` = ?', [msg.ItemID,msg.ActorID], function(error){
		    		if(error) console.log(error);	
		    	});
		    	break;
		    case 1:
		    	connection.query('UPDATE `room_actor_list` SET `item2` = ? WHERE `actorID` = ?', [msg.ItemID,msg.ActorID], function(error){
		    		if(error) console.log(error);	
		    	});
		    	break;
		    case 2:
		    	connection.query('UPDATE `room_actor_list` SET `item3` = ? WHERE `actorID` = ?', [msg.ItemID,msg.ActorID], function(error){
		    		if(error) console.log(error);	
		    	});
		    	break;
		}
		setTimeout(function() {
			updatePreSelect(msg.RoomID);
		}, 50);
	});//SetType
	socket.on('RoomNewMsg', function(msg){
		if(socket.User.UserID!=null) updateConnect(socket.User.UserID);
		io.emit('RoomNewMsg',{
			RoomID:msg.RoomID,
			Message:msg.ActorName + " : " + msg.Message
		});
	});//RoomNewMsg
	socket.on('addAI', function(msg){
		if(msg.Side == 0){
			connection.query('UPDATE `room_list` SET `SideA_AI` = `SideA_AI` + 1 WHERE `NO` = ?;', msg.RoomID, function(error){
				if(error){
					console.log(error);
				}else{
					setTimeout(function() {
						updateRoom(msg.RoomID);
					}, 50);
				}
			});
		}else{
			connection.query('UPDATE `room_list` SET `SideB_AI` = `SideB_AI` + 1 WHERE `NO` = ?;', msg.RoomID, function(error){
				if(error){
					console.log(error);
				}else{
					setTimeout(function() {
						updateRoom(msg.RoomID);
					}, 50);
				}
			});
		}
		
	});//addAI
	socket.on('deleteAI', function(msg){
		if(msg.Side == 0){
			connection.query('UPDATE `room_list` SET `SideA_AI` -= 1 WHERE `NO` = ?;', msg.RoomID, function(error){
				if(error){
					console.log(error);
				}else{
					setTimeout(function() {
						updateRoom(msg.RoomID);
					}, 50);
				}
			});
		}else{
			connection.query('UPDATE `room_list` SET `SideB_AI` -= 1 WHERE `NO` = ?;', msg.RoomID, function(error){
				if(error){
					console.log(error);
				}else{
					setTimeout(function() {
						updateRoom(msg.RoomID);
					}, 50);
				}
			});
		}
	});//deleteAI
	socket.on('quitRoom', function(msg){//quitRoom
		socket.roomID = 0;
		quitRoom(socket,msg);
	});//quitRoom
	//PreSelect
	socket.on('preSelect',function(roomID){
	    io.emit('preSelect',roomID);
	    socket.local = "preSelect";
	    connection.query("UPDATE `room_list` SET status = 1 WHERE `NO` = ?",[roomID],function(error) {
	       if(error) console.log(error);
	    });
	    setTimeout(function(){
	    	updatePreSelect(roomID,socket.User.ActorID);
	    },100);
	});
	socket.on('SetReady', function(msg){
		if(socket.User.UserID!=null) updateConnect(socket.User.UserID);
		connection.query('UPDATE `room_actor_list` SET `Ready` = ? WHERE `actorID` = ?', [msg.Status,msg.ActorID], function(error){
			if(error){
				console.log(error);
			}else{
				setTimeout(function() {
                    updatePreSelect(msg.RoomID);
				}, 50);
			}
		});
	});
	socket.on('SetPostion', function(msg){//RoomPostion
		if(socket.User.UserID!=null) updateConnect(socket.User.UserID);
		connection.query('UPDATE `room_actor_list` SET `Postion` = ? WHERE `actorID` = ?', [msg.Postion,msg.ActorID], function(error){
			if(error){
				console.log(error);
			}else{
				setTimeout(function() {
					updatePreSelect(msg.RoomID);
				}, 50);
			}
		});
	});//SetRoomPostion
	socket.on('SetActorType', function(msg){//SetActorType
		if(socket.User.UserID!=null) updateConnect(socket.User.UserID);
		connection.query('UPDATE `room_actor_list` SET `Type` = ? WHERE `actorID` = ?', [msg.Type,msg.ActorID], function(error){
			if(error){
				console.log(error);
			}else{
				setTimeout(function() {
					updatePreSelect(msg.RoomID);
				}, 50);
			}
		});
	});//SetActorType
	//週期任務1S一次
	setInterval(function() {
		connection.query('SELECT * FROM `member_list`;',function(error, rows) {
			if(error) console.log(error);
		   	else{
		   		var nowTime = new Date();
		   		for(var i=0;i<rows.length;i++) {
		   			if(rows[i].lasttime!=null) {
		   				var timetemp = new Date(rows[i].lasttime);
		   				if((nowTime.getMinutes() - timetemp.getMinutes())>40){
		   					console.log("userID:"+rows[i].NO+" disconnect!");
		   					logout(rows[i].NO);
		   				}
		   			}
		   		}
		   	}
		});
	  }, 3000);
	setInterval(function() {
		if(socket.User.RoomID!=null){
			connection.query('UPDATE `room_list` SET `reciprocal` = `reciprocal` - 1 WHERE `status` = 1 AND `NO` = ? AND `RoomMaster` = ?;',[socket.User.RoomID,socket.User.ActorID],function(error) {
				if(error) console.log(error);
				else{
					connection.query('SELECT `status` FROM `room_list` WHERE `status` = 1 AND `NO` = ?;',[socket.User.RoomID],function(error,rw) {		
						if(error) console.log(error);
						else{
							if(rw.length>0){
								updatePreSelect(socket.User.RoomID,socket.User.ActorID);
							}
						}
					});
				}
				
			});
		}
	}, 1000);
	socket.on('disconnect',function(){
		if(socket.local == "room" || socket.local == "preSelect"){
			quitRoom(socket,socket.User);//玩家離房	
		} 
		logout(socket.User.UserID);
		socket.local = "null";
	});//left
});
function updateConnect(userID){
	var date = new Date();
	connection.query('UPDATE `member_list` SET `lasttime` = ? WHERE `NO` = ?',[date,userID], function(error){
		if (error) console.log(error);
	});	
}
function logout(userID){
	connection.query('UPDATE `member_list` SET `Connect` = 0 WHERE `NO` = ?',[userID], function(error){
		if (error) console.log(error);
	});
	connection.query('UPDATE `member_list` SET `lasttime` = null WHERE `NO` = ?',[userID], function(error){
		if (error) console.log(error);
	});
}
function updatePreSelect(RoomID,ActorID){
	var SideA=[],SideB=[],SideA_AI=[],SideB_AI=[],RoomData,status;
	connection.query('SELECT A.actorName,B.actorID,B.side,B.type,B.local,B.item1,B.item2,B.item3,B.Postion,B.Ready FROM `actor_list` AS A RIGHT JOIN `room_actor_list` AS B ON A.NO = B.actorID WHERE B.roomID = ? AND B.side = 0', [RoomID], function(error,rows){
		if(error)console.log(error);
		else SideA = rows;
	});
	connection.query('SELECT A.actorName,B.actorID,B.side,B.type,B.local,B.item1,B.item2,B.item3,B.Postion,B.Ready FROM `actor_list` AS A RIGHT JOIN `room_actor_list` AS B ON A.NO = B.actorID WHERE B.roomID = ? AND B.side = 1', [RoomID], function(error,rows){
		if(error)console.log(error);
		else SideB = rows;
	});
	connection.query('SELECT * FROM `room_list` WHERE `NO` = ?', [RoomID], function(error,rows){
		if(error)console.log(error);
		else {
			RoomData = rows[0];
			if(RoomData.reciprocal == -1){
				gameStart(RoomData,ActorID);
			}else {
				var sideAReady = true;
				var sideBReady = true;
				for(var i=0;i<SideA.length;i++){
					if(SideA[i].Ready==0){
						sideAReady = false;
						break;
					}
				}
				for(var i=0;i<SideB.length;i++){
					if(SideB[i].Ready==0){
						sideBReady = false;
						break;
					}
				}
				if((sideAReady&&sideBReady&&(RoomData.RoomMaster==ActorID))){
					gameStart(RoomData,ActorID);
				}else{
					io.emit("updatePreSelect",{SideA:SideA,SideB:SideB,SideA_AI:SideA_AI,SideB_AI:SideB_AI,RoomData:RoomData});
				}
			}
		}
	});
}
function gameStart(RoomData,ActorID){
	var MapData = null,PlayData = null;
	fs.readFile(__dirname+'/src/Data/Map/'+RoomData.Map+'.txt',function(error, content){ //讀取file.txt檔案的內容
	    if(error){ //如果有錯誤就列印訊息並離開程式
	        console.log('檔案讀取錯誤。');
	    }else {
	        MapData = JSON.parse(content.toString());
	        connection.query("SELECT `actorID`,`Postion` FROM `room_actor_list` WHERE `roomID` = ?",[RoomData.NO],function(error,row) {
				if(error) console.log(error);
				else{
					var Player = MapData.Player;
					var Item = MapData.House;
					for(var i = 0;i<row.length;i++){
						var actorID = row[i].actorID;
						var actorPos = Player[row[i].Postion];
						connection.query("INSERT INTO `game_player_table` SET ?;",{ActorID:actorID, HP:100, AP:100, command:""},function(error,result) {
							if(error) console.log(error);
							else{
								connection.query("INSERT INTO `game_table` SET ?;",{RoomID:RoomData.NO, ItemID:result.insertId, X:actorPos.X, Y:actorPos.Y, type:"player"},function(error) {
									if(error) console.log(error);
								});
							}
						});
					}
				}
			});
			connection.query("SELECT `item1`,`item2`,`item3` FROM `room_actor_list` WHERE `roomID` = ? AND `actorID` = ?",[RoomData.NO,ActorID],function(error,row) {
				if(error) console.log(error);
				else PlayData = row[0];
			});
			connection.query("UPDATE `room_list` SET `status` = 2 WHERE `status` = 1 AND `NO` = ?",[RoomData.NO],function(error) {
				if(error) console.log(error);
			});
	    }
	});
	setTimeout(function(){
		io.emit("gameStart",{MapData:MapData,RoomData:RoomData,PlayData:PlayData});
		gameSynchronize(RoomData.NO);
	},500);
}
//msg =>{ActorID,RoomID,Echo("是否回傳")}
function quitRoom(socket,msg){
	console.log(msg);
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
										});
										connection.query('DELETE FROM `room_AI` WHERE `RoomID` = ?', [msg.RoomID], function(error){
											if(error)console.log(error);
										});
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
			connection.query('SELECT A.Name,A.Map,A.Mode,A.RoomMaster,A.SideA_AI,A.SideB_AI,B.MapName FROM `room_list` AS A RIGHT JOIN `Map` AS B ON A.Map = B.NO WHERE A.NO = ?', [msg], function(error,rows){
				if(error){
					console.log(error);
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
							SideA_AI: rows[0].SideA_AI,
							SideB_AI: rows[0].SideB_AI,
							RoomID: msg
						});
					}
				}
			});	
		}
	});
}
function updateRoomList(){
	connection.query('SELECT A.NO,A.Name,A.Map,COUNT(actorID) FROM room_list AS A RIGHT JOIN room_actor_list AS B ON A.NO = B.roomID WHERE A.status = 0 GROUP BY A.NO', function(error, rows){
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
function gameSynchronize(roomID){
	var Item=[],turn,recount;
	connection.query("SELECT `ItemID`,`X`,`Y`,`type` FROM `game_table` WHERE `RoomID` = ?",[roomID],function(error,row) {
		if(error) console.log(error);
		else{
			for(var i=0;i<row.length;i++){
				var temp = row[i];
				if(temp.type=='player'){
					console.log(temp);
					connection.query("SELECT `ActorID`,`HP`,`AP`,`command` FROM `game_player_table` WHERE `NO` = ?",[temp.ItemID],function(error,rw) {
						if(error) console.log(error);
						else Item.push({ItemID:temp.ItemID,type:"player",Postion:{X:temp.X,Y:temp.Y},ActorData:rw});
					});
				}else Item.push({ItemID:temp.ItemID,type:"bulid",Postion:{X:temp.X,Y:temp.Y}});
			}
		}
	});
	connection.query("SELECT `turn` FROM `room_list` WHERE `NO` = ?",[roomID],function(error,row) {
		if(error) console.log(error);
		else turn = row[0].turn;
	});
	connection.query("SELECT `reciprocal` FROM `room_list` WHERE `NO` = ?",[roomID],function(error,row) {
		if(error) console.log(error);
		else recount = row[0].reciprocal;
	});
	setTimeout(function(){
		io.emit("gameSynchronize",{Item:Item,turn:turn,recount:recount});
	},500);
}
//指定port
http.listen(process.env.PORT || 3000, function(){
	console.log('listening on *:3000');
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
