function CreateRoomView(windowSize,OptionSize){
	/*global OriginView */
    OriginView.call(this,windowSize,OptionSize);//繼承
    
    //宣告變數
    this.self.style.backgroundColor = "#FFFFFF";
    
    var title = document.createElement("div");
    title.style.width = "100%";
    title.style.height = "10%";
    title.style.backgroundColor = "#00AAAA";
    title.style.position = "absolute";
    title.style.left = "0px";
    title.style.top = "0px";
    title.style.textAlign = "center";
    title.appendChild(document.createTextNode("新建房間"));
    this.self.appendChild(title);
    
    var roomnametxt = document.createElement("P");
	roomnametxt.style.position = "absolute";
	roomnametxt.style.top = "30%";
	roomnametxt.style.width = "10%";
	roomnametxt.style.left = "2%";
	roomnametxt.appendChild(document.createTextNode("房間名稱:"));
	this.self.appendChild(roomnametxt);
	        
	var roomname = document.createElement("input");
	roomname.setAttribute("type", "text");
	roomname.style.position = "absolute";
	roomname.style.top = "31.5%";
	roomname.style.width = "10%";
	roomname.style.left = "14%";
	roomname.addEventListener("change",function(){//確認角色名稱可否使用
	    /*global  checkRoomName 實作於ajax*/
	    checkRoomName(roomname.value);
	});
	
	var roomnameCheckMsg = document.createTextNode("");
	
	var roomnameCheckMsgBox = document.createElement("P");
	roomnameCheckMsgBox.style.position = "absolute";
	roomnameCheckMsgBox.style.top = "30%";
	roomnameCheckMsgBox.style.width = "15%";
	roomnameCheckMsgBox.style.left = "26%";
	roomnameCheckMsgBox.style.color = "red";
	roomnameCheckMsgBox.appendChild(roomnameCheckMsg);
	
	var commit = document.createElement("P");
	commit.style.position = "absolute";
	commit.style.top = "90%";
    commit.style.width = "50%";
    commit.style.left = "0%";
    commit.style.cursor = "pointer";
    commit.style.textAlign = "center";
    commit.appendChild(document.createTextNode("建立!"));
    commit.addEventListener("click",function() {
		/*global ViewInit,VARIABLE 宣告於index*/
		/*global createRoom 實作於ajax*/
		if(VARIABLE.USER.ActorID){
			var data = new Object();
			data.ActorID = VARIABLE.USER.ActorID;
			data.Map = 0;//測試
			data.RoomName = roomname.value;
			ViewInit(VARIABLE.View.Block.self);
         	createRoom(JSON.stringify(data));
		}
	});
    
    var canncel = document.createElement("P");
	canncel.style.position = "absolute";
	canncel.style.top = "90%";
    canncel.style.width = "50%";
    canncel.style.left = "50%";
    canncel.style.cursor = "pointer";
    canncel.style.textAlign = "center";
    canncel.appendChild(document.createTextNode("返回!"));
    canncel.addEventListener("click",function() {
		/*global HallViewInit 實作於index*/
		ViewInit(VARIABLE.View.Block.self);
	    HallViewInit();
	});
	
	this.self.appendChild(roomnameCheckMsgBox);
	this.self.appendChild(commit);
	this.self.appendChild(roomname);
	this.self.appendChild(canncel);
    //變數宣告完畢
    
    //宣告函式
    this.checkRoomNameRes = function(){
		/*global  request 實作於ajax*/
	    if (request.readyState == 4) {//完成狀態有好幾種，4代表資料傳回完成
			var data = request.responseText;//取得傳回的資料存在變數中
			if(data=="Success"){
			    roomnameCheckMsgBox.removeChild(roomnameCheckMsg);
			    roomnameCheckMsgBox.style.color = "red";
    	        roomnameCheckMsg = document.createTextNode("房間名稱重複!");
    	        roomnameCheckMsgBox.appendChild(roomnameCheckMsg);
			}else{
			    roomnameCheckMsgBox.removeChild(roomnameCheckMsg);
    	        roomnameCheckMsg = document.createTextNode("房間名稱可以使用");
    	        roomnameCheckMsgBox.style.color = "green";
    	        roomnameCheckMsgBox.appendChild(roomnameCheckMsg);
			}
		}
	};//確認房名是否重複      
    //函式宣告完畢
	
	//初始化函式執行
	//執行初始化函式完畢
}

