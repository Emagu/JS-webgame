function PreSelectView(windowSize,Option){
    /*global OriginView */
    OriginView.call(this,windowSize,Option.getWindowSize());//繼承 
    this.self.style.backgroundImage = "url('./src/pic/PreSelect/BackGround.png')";
    //宣告變數
    var itemArray = [];
    var PlayLocal = null;
    var Ready = false;
    var command_Ready = document.createElement("div");
    command_Ready.style.width = "720px";
    command_Ready.style.height = "25px";
    command_Ready.style.left = "280px";
    command_Ready.style.top = "450px";
    command_Ready.style.position = "absolute";
    command_Ready.style.cursor = "pointer";
    command_Ready.style.backgroundImage = "url('./src/pic/PreSelect/BTN_Ready.png')"
    command_Ready.addEventListener("click",function() {
        if(Ready){
        	Ready = false;
        	command_Ready.style.backgroundImage = "url('./src/pic/PreSelect/BTN_Ready.png')";
        	VARIABLE.Socket.emit("SetReady",{Status:0,ActorID:VARIABLE.USER.ActorID,RoomID:VARIABLE.USER.RoomID});
        }else{
        	Ready = true;
        	command_Ready.style.backgroundImage = "url('./src/pic/PreSelect/BTN_Canncel.png')";
        	VARIABLE.Socket.emit("SetReady",{Status:1,ActorID:VARIABLE.USER.ActorID,RoomID:VARIABLE.USER.RoomID});
        }
    });
    
    var TypeSelect = document.createElement("div");
    TypeSelect.style.width = "32px";
    TypeSelect.style.height = "32px";
    TypeSelect.style.left = "439px";
    TypeSelect.style.top = "399px";
    TypeSelect.style.position = "absolute";
    TypeSelect.style.cursor = "pointer";
    TypeSelect.addEventListener("click",function() {
        TypeDiv.style.display = "";
    });
    var WeaponSelect = document.createElement("div");
    WeaponSelect.style.width = "32px";
    WeaponSelect.style.height = "32px";
    WeaponSelect.style.left = "684px";
    WeaponSelect.style.top = "399px";
    WeaponSelect.style.position = "absolute";
    WeaponSelect.style.cursor = "pointer";
    WeaponSelect.addEventListener("click",function() {
        WeaponDiv.style.display = "";
    });
    var SupportSelect = document.createElement("div");
    SupportSelect.style.width = "32px";
    SupportSelect.style.height = "32px";
    SupportSelect.style.left = "719px";
    SupportSelect.style.top = "399px";
    SupportSelect.style.position = "absolute";
    SupportSelect.style.cursor = "pointer";
    SupportSelect.addEventListener("click",function() {
        SupportDiv.style.display = "";
    });
    var StrategySelect = document.createElement("div");
    StrategySelect.style.width = "32px";
    StrategySelect.style.height = "32px";
    StrategySelect.style.left = "754px";
    StrategySelect.style.top = "399px";
    StrategySelect.style.position = "absolute";
    StrategySelect.style.cursor = "pointer";
    StrategySelect.addEventListener("click",function() {
        StrategyDiv.style.display = "";
    });
    
    var TypeDiv = document.createElement("div");
    TypeDiv.style.width = "300px";
    TypeDiv.style.height = "100px";
    TypeDiv.style.left = "490px";
    TypeDiv.style.top = "310px";
    TypeDiv.style.position = "absolute";
    TypeDiv.style.backgroundImage = "url('./src/pic/PreSelect/type.png')";
    TypeDiv.style.display = "none";
    var TypeArray = Option.getActorTypeArray();
    for(var i=0;i<TypeArray.length;i++){
    	var temp = document.createElement("div");
    	temp.style.width = "32px";
	    temp.style.height = "32px";
	    temp.style.left = (10+i*41) + "px";
	    temp.style.top = "50px";
	    temp.style.position = "absolute";
	    temp.style.backgroundImage = "url('./src/pic/Actor/blue/"+i+"/down.png')";
	    temp.style.cursor = "pointer";
	    addTypeEvent(i,temp);
	    TypeDiv.appendChild(temp);
    }
    
    var WeaponDiv = document.createElement("div");
    WeaponDiv.style.width = "300px";
    WeaponDiv.style.height = "160px";
    WeaponDiv.style.left = "490px";
    WeaponDiv.style.top = "280px";
    WeaponDiv.style.position = "absolute";
    WeaponDiv.style.backgroundImage = "url('./src/pic/PreSelect/weapon.png')";
    WeaponDiv.style.display = "none";
    
    var SupportDiv = document.createElement("div");
    SupportDiv.style.width = "300px";
    SupportDiv.style.height = "160px";
    SupportDiv.style.left = "490px";
    SupportDiv.style.top = "280px";
    SupportDiv.style.position = "absolute";
    SupportDiv.style.backgroundImage = "url('./src/pic/PreSelect/support.png')";
    SupportDiv.style.display = "none";
    
    var StrategyDiv = document.createElement("div");
    StrategyDiv.style.width = "300px";
    StrategyDiv.style.height = "160px";
    StrategyDiv.style.left = "490px";
    StrategyDiv.style.top = "280px";
    StrategyDiv.style.position = "absolute";
    StrategyDiv.style.backgroundImage = "url('./src/pic/PreSelect/strategy.png')";
    StrategyDiv.style.display = "none";
    
    var messageField = document.createElement("div");
    messageField.style.height = "180px";
    messageField.style.width = "720px";
    messageField.style.left = "280px";
    messageField.style.top = "495px";
    messageField.style.overflowY = "auto";
    messageField.style.position = "absolute";
    messageField.style.listStyleType = "none";
    
    var messageInput = document.createElement("input");
    messageInput.style.backgroundColor = "transparent";
	messageInput.style.fontSize = "x-large";
	messageInput.style.color = "#000000";
	messageInput.style.border = "0px";
	messageInput.style.position = "absolute";
	messageInput.style.top = "684px";
	messageInput.style.left = "280px";
	messageInput.style.width = "640px";
	messageInput.style.height="26px";
	messageInput.addEventListener("keydown",function(e) {
	    if(e.keyCode==13) {
	        VARIABLE.Socket.emit("RoomNewMsg",{Message:messageInput.value,ActorName:VARIABLE.USER.ActorName,RoomID:VARIABLE.USER.RoomID});
	        messageInput.value = "";
	    }
	});
	
	var messageSend = document.createElement("div");
	messageSend.style.position = "absolute";
	messageSend.style.top = "684px";
	messageSend.style.left = "930px";
	messageSend.style.width = "72px";
	messageSend.style.height="26px";
	messageSend.style.cursor="pointer";
	messageSend.addEventListener("click",function(){
	   VARIABLE.Socket.emit("RoomNewMsg",{Message:messageInput.value,ActorName:VARIABLE.USER.ActorName,RoomID:VARIABLE.USER.RoomID});
	   messageInput.value = "";
	});
    this.self.appendChild(command_Ready);
    this.self.appendChild(messageField);
    this.self.appendChild(messageSend);
    this.self.appendChild(messageInput);
    this.self.appendChild(TypeSelect);
    this.self.appendChild(WeaponSelect);
    this.self.appendChild(SupportSelect);
    this.self.appendChild(StrategySelect);
    this.self.appendChild(TypeDiv);
    this.self.appendChild(WeaponDiv);
    this.self.appendChild(SupportDiv);
    this.self.appendChild(StrategyDiv);
	//變數宣告完畢
	function ActorDiv(data,i){
		var dark = document.createElement("div");
		dark.style.width = "140px";
	    dark.style.height = "110px";
	    dark.style.backgroundImage = "url('./src/pic/PreSelect/playbox_dark.png')";
	    dark.style.backgroundPosition = "center center";
	    dark.style.position = "absolute";
	    dark.style.top = "0px";
	    dark.style.left = "0px";
	    
	    this.Div = document.createElement("div");
	    this.Div.style.width = "140px";
	    this.Div.style.height = "110px";
	    this.Div.style.top = ((i*120)+78)+"px";
	    if(data.side==0)this.Div.style.left = "50px";
	    else this.Div.style.left = "1080px";
	    this.Div.style.backgroundImage = "url('./src/pic/PreSelect/playbox.png')";
	    this.Div.style.backgroundPosition = "center center";
	    this.Div.style.position = "absolute";
	    if(data.Ready==1){
	    	this.Div.appendChild(dark);
	    }
	    var TypeDiv = document.createElement("div");
	    TypeDiv.style.width = "75px";
	    TypeDiv.style.height = "75px";
	    TypeDiv.style.top = "5px";
	    TypeDiv.style.left = "15px";
	    TypeDiv.style.backgroundPosition = "center center";
	    TypeDiv.style.position = "absolute";
	    
	    var ItemDiv_1 = document.createElement("div");
	    ItemDiv_1.style.width = "32px";
	    ItemDiv_1.style.height = "32px";
	    ItemDiv_1.style.top = "5px";
	    ItemDiv_1.style.left = "100px";
	    ItemDiv_1.style.backgroundPosition = "center center";
	    ItemDiv_1.style.position = "absolute";
	    
	    var ItemDiv_2 = document.createElement("div");
	    ItemDiv_2.style.width = "32px";
	    ItemDiv_2.style.height = "32px";
	    ItemDiv_2.style.top = "39px";
	    ItemDiv_2.style.left = "100px";
	    ItemDiv_2.style.backgroundPosition = "center center";
	    ItemDiv_2.style.position = "absolute";
	    
	    var ItemDiv_3 = document.createElement("div");
	    ItemDiv_3.style.width = "32px";
	    ItemDiv_3.style.height = "32px";
	    ItemDiv_3.style.top = "73px";
	    ItemDiv_3.style.left = "100px";
	    ItemDiv_3.style.backgroundPosition = "center center";
	    ItemDiv_3.style.position = "absolute";
	    
	    var Name = document.createElement("div");
	    Name.style.width = "100px";
	    Name.style.height = "30px";
	    Name.style.top = "82px";
	    Name.style.left = "4px";
	    Name.style.fontSize = "x-large";
	    Name.style.color = "#FFFFFF";
	    Name.style.position = "absolute";
	    Name.style.textAlign = "center";
	    Name.appendChild(document.createTextNode(data.actorName));
	    
	    this.Div.appendChild(Name);
	    this.Div.appendChild(TypeDiv);
	    this.Div.appendChild(ItemDiv_1);
	    this.Div.appendChild(ItemDiv_2);
	    this.Div.appendChild(ItemDiv_3);
	}
	function AIDiv(side,i){
	    this.Div = document.createElement("div");
	    this.Div.style.width = "140px";
	    this.Div.style.height = "110px";
	    this.Div.style.top = ((i*120)+78)+"px";
	    if(side==0)this.Div.style.left = "50px";
	    else this.Div.style.left = "1080px";
	    this.Div.style.backgroundImage = "url('./src/pic/PreSelect/playbox.png')"
	    this.Div.style.backgroundPosition = "center center";
	    this.Div.style.position = "absolute";
	    
	    this.TypeDiv = document.createElement("div");
	    this.TypeDiv.style.width = "75px";
	    this.TypeDiv.style.height = "75px";
	    this.TypeDiv.style.top = "5px";
	    this.TypeDiv.style.left = "15px";
	    this.TypeDiv.style.backgroundPosition = "center center";
	    this.TypeDiv.style.position = "absolute";
	    
	    this.ItemDiv_1 = document.createElement("div");
	    this.ItemDiv_1.style.width = "32px";
	    this.ItemDiv_1.style.height = "32px";
	    this.ItemDiv_1.style.top = "5px";
	    this.ItemDiv_1.style.left = "100px";
	    this.ItemDiv_1.style.backgroundPosition = "center center";
	    this.ItemDiv_1.style.position = "absolute";
	    
	    this.ItemDiv_2 = document.createElement("div");
	    this.ItemDiv_2.style.width = "32px";
	    this.ItemDiv_2.style.height = "32px";
	    this.ItemDiv_2.style.top = "39px";
	    this.ItemDiv_2.style.left = "100px";
	    this.ItemDiv_2.style.backgroundPosition = "center center";
	    this.ItemDiv_2.style.position = "absolute";
	    
	    this.ItemDiv_3 = document.createElement("div");
	    this.ItemDiv_3.style.width = "32px";
	    this.ItemDiv_3.style.height = "32px";
	    this.ItemDiv_3.style.top = "73px";
	    this.ItemDiv_3.style.left = "100px";
	    this.ItemDiv_3.style.backgroundPosition = "center center";
	    this.ItemDiv_3.style.position = "absolute";
	    
	    this.Div.appendChild(this.TypeDiv);
	    this.Div.appendChild(this.ItemDiv_1);
	    this.Div.appendChild(this.ItemDiv_2);
	    this.Div.appendChild(this.ItemDiv_3);
	}
	function PlayLocalInit(data,side,actorID){
		PlayLocal = document.createElement("select");
		PlayLocal.style.position = "absolute";
		PlayLocal.style.top = "400px";
	    PlayLocal.style.width = "75px";
	    PlayLocal.style.height = "33px";
	    PlayLocal.style.left = "920px";
	    var temp = document.createElement("option");
		temp.setAttribute("value",0);
		temp.appendChild(document.createTextNode(""));
		PlayLocal.appendChild(temp);
	    for(var i=side;i<(5+side);i++){
	    	var used = false;
	    	for(var j=0;j<data.length;j++){
	    		if(data[j].local==i) {
	    			used = true;
	    			break;
	    		}
	    	}
	    	if(!used){
	    		var temp = document.createElement("option");
		    	temp.setAttribute("value",i);
				temp.appendChild(document.createTextNode(i));
		    	PlayLocal.appendChild(temp);
	    	}
	    }
	    PlayLocal.selectedIndex = data[actorID].Postion;
	    PlayLocal.addEventListener("change",function() {
	    	VARIABLE.Socket.emit("SetPostion",{Postion:PlayLocal.value,ActorID:VARIABLE.USER.ActorID,RoomID:VARIABLE.USER.RoomID});
	    });
	    
	}
	function addTypeEvent(i,Div){
		Div.addEventListener("click",function() {
	        TypeDiv.style.display = "none";
	        VARIABLE.Socket.emit("SetActorType",{Type:i,ActorID:VARIABLE.USER.ActorID,RoomID:VARIABLE.USER.RoomID});
	    });
	}
	//宣告函式
	this.update = function(data){
	    console.log(data);
	    /*global VARIABLE*/
        if(data.RoomData.NO!=VARIABLE.USER.RoomID || VARIABLE.SCENES!="PreSelect") return;
        for(var i=0;i<itemArray.length;i++){
        	this.self.removeChild(itemArray[i].Div);
        }
        itemArray = [];
        var SideA = 0,SideB = 0;
        if(PlayLocal!=null) this.self.removeChild(PlayLocal);
        for(var i=0;i<data.SideA.length;i++){
        	if(data.SideA[i].actorID==VARIABLE.USER.ActorID){
        		PlayLocalInit(data.SideA,1,i);
        		TypeSelect.style.backgroundImage = "url('./src/pic/Actor/blue/"+data.SideA[i].type+"/down.png')";
        	}
	        var temp = new ActorDiv(data.SideA[i],i);
	        itemArray.push(temp);
	        this.self.appendChild(temp.Div);
	        SideA++;
	    }
	    for(var i=0;i<data.SideB.length;i++){
	    	if(data.SideB[i].actorID==VARIABLE.USER.ActorID){
        		PlayLocalInit(data.SideB,1,i);
        		TypeSelect.style.backgroundImage = "url('./src/pic/Actor/blue/"+data.SideA[i].type+"/down.png')";
        	}
	        var temp = new ActorDiv(data.SideB[i],i);
	        itemArray.push(temp);
	        this.self.appendChild(temp.Div);
	        SideB++;
	    }
	    for(var i=0;i<data.RoomData.SideA_AI;i++){
	        var temp = new AIDiv(0,i+SideA);
	        itemArray.push(temp);
	        this.self.appendChild(temp.Div);
	    }
	    for(var i=0;i<data.RoomData.Sideb_AI;i++){
	        var temp = new AIDiv(1,i+SideB);
	        itemArray.push(temp);
	        this.self.appendChild(temp.Div);
	    }
	    this.self.appendChild(PlayLocal);
	};
	this.getMessage = function(msg){
        var newMsg = document.createElement("li");
        newMsg.style.fontSize = "14pt";
        newMsg.style.color = "#FFFF00";
        newMsg.appendChild(document.createTextNode(msg));
        messageField.appendChild(newMsg);
        messageField.scrollTop = messageField.scrollHeight;
    };
    //函式宣告完畢
    
    //初始化函式執行
    //執行初始化函式完畢
}



