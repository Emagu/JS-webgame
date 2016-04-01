//左邊工具列
function LeftControlView(){
    this.self = document.createElement("div");
    
    this.self.style.width = "15%";
    this.self.style.height = "100%";
    this.self.style.backgroundColor = "#AAAAAA";
    this.self.style.position = "absolute";
    this.self.style.left = "0px";
    this.self.style.top = "0px";
    this.self.style.textAlig='center';
    
    //隱藏選單
	var openList = document.createElement("div")
    openList.style.left = "5%";
	openList.style.top = "65%";
	openList.style.height = "0%";
	openList.style.width = "90%";
	openList.style.position = 'absolute';
	openList.style.overflow = 'auto';
	openList.style.backgroundColor = "#DCDCDC";
	
	
	//開啟按鈕
	var openButton = document.createElement("div");
	openButton.style.left = "5%";
	openButton.style.top = "60%";
	openButton.style.height = "5%";
	openButton.style.width = "90%";
	openButton.style.position = 'absolute';
	openButton.innerHTML = "點我展開";
	openButton.style.backgroundColor = "#AAAA00";
	openButton.addEventListener("click",function(){
		//判斷是否展開
		if(openList.style.height=="0%") OpenList();//未展開時 展開
		else if(openList.style.height=="20%") CloseList();//展開時 隱藏
	});
	this.self.appendChild(openList);
	this.self.appendChild(openButton);
	
	//方法
	function OpenList(){//作業區
		openButton.innerHTML = "點我隱藏!";
		openList.style.height = "20%";
		//新增node到openList
		/*
			for(var i = 0; i <node.lenght;i++){
				openList.appendChild(node[i]);
			}
		*/
		
	}
	function CloseList(){
		openButton.innerHTML = "點我展開!";
		while (openList.firstChild) {
			openList.removeChild(openButton.firstChild);
		}
		openList.style.height = "0%";
	}
    
    this.MoveButton = document.createElement("div");
    this.MoveButton.style.textAlig='center';
	this.MoveButton.appendChild(document.createTextNode("開始移動"));
	this.MoveButton.style.position = "absolute";
	this.MoveButton.style.backgroundColor = "#AAAA00";
	this.MoveButton.style.width = "90%";
	this.MoveButton.style.height = "10%";
	this.MoveButton.style.left = "5%";
    this.MoveButton.style.top = "1%";
    this.MoveButton.style.cursor = "pointer";
   
    this.self.appendChild(this.MoveButton);
    
  
    this.AttackButton = document.createElement("div");
	this.AttackButton.appendChild(document.createTextNode("開始攻擊"));
	this.AttackButton.style.position = "absolute";
	this.AttackButton.style.backgroundColor = "#AAAA00";
	this.AttackButton.style.width = "90%";
	this.AttackButton.style.height = "10%";
	this.AttackButton.style.left = "5%";
    this.AttackButton.style.top = "15%";
    this.AttackButton.style.cursor = "pointer";
    this.self.appendChild(this.AttackButton);
    
    this.BulidButton = document.createElement("div");
	this.BulidButton.appendChild(document.createTextNode("蓋房子!!"));
	this.BulidButton.style.position = "absolute";
	this.BulidButton.style.backgroundColor = "#AAAA00";
	this.BulidButton.style.width = "90%";
	this.BulidButton.style.height = "10%";
	this.BulidButton.style.left = "5%";
    this.BulidButton.style.top = "29%";
    this.BulidButton.style.cursor = "pointer";
    this.self.appendChild(this.BulidButton);
        
    //之後換名子
    //換好惹OAO
    this.stay = document.createElement("div");
	this.stay.appendChild(document.createTextNode("代命!!"));
	this.stay.style.position = "absolute";
	this.stay.style.backgroundColor = "#AAAA00";
	this.stay.style.width = "90%";
	this.stay.style.height = "10%";
	this.stay.style.left = "5%";
    this.stay.style.top = "45%";
    this.stay.style.cursor = "pointer";
    this.self.appendChild(this.stay);
}
