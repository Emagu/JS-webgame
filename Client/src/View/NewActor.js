function NewActorView(windowSize,OptionSize){
    /*global OriginView */
    OriginView.call(this,windowSize,OptionSize);//繼承 
    
    //宣告變數
    this.self.style.backgroundColor = "#FFFFFF";
    
    var title = document.createElement("H1");
    title.style.width = "100%";
    title.style.height = "10%";
    title.style.backgroundColor = "#00AAAA";
    title.style.position = "absolute";
    title.style.left = "0px";
    title.style.top = "0px";
    title.style.textAlign = "center";
    title.appendChild(document.createTextNode("創建角色"));
    
    var actortxt = document.createElement("P");
	actortxt.style.position = "absolute";
	actortxt.style.top = "30%";
	actortxt.style.width = "10%";
	actortxt.style.left = "2%";
	actortxt.appendChild(document.createTextNode("角色名稱:"));
	
	var actor = document.createElement("input");
	actor.setAttribute("type", "text");
	actor.style.position = "absolute";
	actor.style.top = "31.5%";
	actor.style.width = "10%";
	actor.style.left = "14%";
	actor.addEventListener("change",function(){//確認角色名稱可否使用
	    /*global  checkActorConfig 實作於ajax*/
	    checkActorConfig(actor.value);
	});
	
	var actorCheckMsg = document.createTextNode("角色名稱長度5~10字");
	
	var actorCheckMsgBox = document.createElement("P");
	actorCheckMsgBox.style.position = "absolute";
	actorCheckMsgBox.style.top = "30%";
	actorCheckMsgBox.style.width = "15%";
	actorCheckMsgBox.style.left = "26%";
	actorCheckMsgBox.style.color = "red";
	actorCheckMsgBox.appendChild(actorCheckMsg);
	
	var commit = document.createElement("P");
	commit.style.position = "absolute";
	commit.style.top = "90%";
    commit.style.width = "100%";
    commit.style.left = "0%";
    commit.style.cursor = "pointer";
    commit.style.textAlign = "center";
    commit.appendChild(document.createTextNode("建立!"));
    commit.addEventListener("click",function() {
		/*global VARIABLE 宣告於index*/
		/*global  newActor 實作於ajax*/
        if(VARIABLE.USER.UserID) newActor(actor.value,VARIABLE.USER.UserID);
        else alert("未登入!");
	});
	
    this.self.appendChild(title);
    this.self.appendChild(actortxt);
    this.self.appendChild(actorCheckMsgBox);
	this.self.appendChild(commit);
	this.self.appendChild(actor);
	//變數宣告完畢
	
	//宣告函式
	this.CheckActorName = function(){
		/*global  request 實作於ajax*/
	    if (request.readyState == 4) {//完成狀態有好幾種，4代表資料傳回完成
			var data = request.responseText;//取得傳回的資料存在變數中
			switch(data){
			    case "error#1"://長度不符
			        actorCheckMsgBox.removeChild(actorCheckMsg);
    			    actorCheckMsg = document.createElement("div");
    			    actorCheckMsg.style.textAlign = "center";
    			    actorCheckMsg.style.color = "red";
    	            actorCheckMsg.appendChild(document.createTextNode("角色名稱長度不符"));
    	            actorCheckMsg.appendChild(document.createElement("br"));
    	            actorCheckMsg.appendChild(document.createTextNode("要求:5~10字"));
    	            actorCheckMsgBox.appendChild(actorCheckMsg);
    	            break;
    	        case "error#4"://可以創建
			        actorCheckMsgBox.removeChild(actorCheckMsg);
    	            actorCheckMsg = document.createTextNode("角色名稱可以使用");
    	            actorCheckMsgBox.style.color = "green";
    	            actorCheckMsgBox.appendChild(actorCheckMsg);
    	            break;
    	        default://角色名稱重複
    	            actorCheckMsgBox.removeChild(actorCheckMsg);
    	            actorCheckMsgBox.style.color = "red";
    	            actorCheckMsg = document.createTextNode("角色名稱重複!");
    	            actorCheckMsgBox.appendChild(actorCheckMsg);
    	            break;
			}
		}
	};
    //函式宣告完畢
    
    //初始化函式執行
    //執行初始化函式完畢
}

