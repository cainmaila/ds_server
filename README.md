ds_server
=========

資料交換路由器v0.4


處發事件===========================

connection 連線觸發

disconnect 斷線觸發

====================================

命令=================================

openRoom 新開房間，原房間內連線斷線並觸發disconnect

initRoom 進入房間

close 斷線

length 返回房間連線數量

closeRoom 關閉房間所有的連線，只有主控能關

toRoom  指定房間廣播，需指定id參數
