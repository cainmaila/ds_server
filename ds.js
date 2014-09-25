//資料交換路由器v0.02
var io = require("socket.io").listen(6953);
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
		var clients = io.sockets.clients(data.id);
		for ( var s in clients){
			socket.emmit("disconnect");
			clients[s].disconnect();
		}
	});
	//斷線呼叫
	socket.on("disconnect",function(){
		console.log("close: " +socket.id);
	});
});

