//資料交換路由器v0.2
var Server = require('socket.io');
var io = new Server();
//var io = require("socket.io").listen(6953);
io.listen(6953);
console.log("server start..");
//申請連線服務
io.on("connection",function(socket){
	console.log("link: " +socket.id);
	//連線
	socket.emit("connection",{
		id:socket.id
	});
	//進入房間
	socket.on("initRoom",function(data){
		socket.join(data.id);
		socket.emit("initRoom",{id:data.id});
	});
	//開新房間，已在房間者都斷線
	socket.on("openRoom",function(data){
		disconnectRoom(data.id);
		socket.join(data.id);
		socket.emit("openRoom",{id:data.id});
	});
	//房間廣播
	socket.on("data",function(data){
		socket.broadcast.to(data.id).emit('data', data);
	});
	//斷線
	socket.on("close",function(data){
		socket.emit("disconnect");
		socket.disconnect();
	});
	//關閉房間所有的連線，只有主控能關
	socket.on("closeRoom",function(data){
		disconnectRoom(data.id);
	});
	//斷線呼叫
	socket.on("disconnect",function(){
		console.log("close: " +socket.id);
	});
	//取回房間連線數量
	socket.on("length",function  (data) {
		socket.emit("length",{id:data.id,length:Object.keys(io.sockets.adapter.rooms[data.id]).length});
	})
	//房間重開，目前連線都斷線
	function disconnectRoom (roomId) {
		var res = []
		, room = io.sockets.adapter.rooms[roomId]
		, _socket;
		if (room) {
		    for (var id in room) {
		    	_socket = io.sockets.adapter.nsp.connected[id];
		    	_socket.emit("disconnect");
		    	_socket.disconnect();
		    }
		}
	}
});

