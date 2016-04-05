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
    
    //變數區
    //var ItemList=["重生徽章","轟炸坐標","核彈(?)","雙頭龍"];//道具清單
    var ItemList=["Grass","Forest","Mountain","Sea"];//道具清單
    var arms=["通訊兵","工程師","狙擊手","醫護兵","野戰兵","水鬼","裝甲兵"];//兵種清單
    //移動按鈕
    this.MoveButton = document.createElement("div");
    this.MoveButton.style.textAlig='center';
	this.MoveButton.appendChild(document.createTextNode("開始移動"));
	this.MoveButton.style.position = "absolute";
	this.MoveButton.style.backgroundColor = "#AAAA00";
	this.MoveButton.style.width = "90%";
	this.MoveButton.style.height = "9%";
	this.MoveButton.style.left = "5%";
    this.MoveButton.style.top = "1%";
    this.MoveButton.style.cursor = "pointer";
   
    this.self.appendChild(this.MoveButton);
    
  	//攻擊按鈕
    this.AttackButton = document.createElement("div");
	this.AttackButton.appendChild(document.createTextNode("開始攻擊"));
	this.AttackButton.style.position = "absolute";
	this.AttackButton.style.backgroundColor = "#AAAA00";
	this.AttackButton.style.width = "90%";
	this.AttackButton.style.height = "9%";
	this.AttackButton.style.left = "5%";
    this.AttackButton.style.top = "15%";
    this.AttackButton.style.cursor = "pointer";
    this.self.appendChild(this.AttackButton);
    
    //建築按鈕(?)
    this.BulidButton = document.createElement("div");
	this.BulidButton.appendChild(document.createTextNode("蓋房子!!"));
	this.BulidButton.style.position = "absolute";
	this.BulidButton.style.backgroundColor = "#AAAA00";
	this.BulidButton.style.width = "90%";
	this.BulidButton.style.height = "9%";
	this.BulidButton.style.left = "5%";
    this.BulidButton.style.top = "29%";
    this.BulidButton.style.cursor = "pointer";
    this.self.appendChild(this.BulidButton);
    
    //道具按鈕    
    var ItemButton = document.createElement("div");
	ItemButton.appendChild(document.createTextNode("使用道具"));
	ItemButton.style.position = "absolute";
	ItemButton.style.backgroundColor = "#AAAA00";
	ItemButton.style.width = "90%";
	ItemButton.style.height = "9%";
	ItemButton.style.left = "5%";
    ItemButton.style.top = "43%";
    ItemButton.style.cursor = "pointer";
 
    ItemButton.addEventListener("click",function(){
		//判斷是否展開
		if(ItemBoard.style.height=="0%") OpenList();//未展開時 展開
		else if(ItemBoard.style.height=="20%") CloseList();//展開時 隱藏
	});
	//道具展開版面
	var ItemBoard = document.createElement("div")
    ItemBoard.style.left = "5%";
	ItemBoard.style.top = "52%";
	ItemBoard.style.height = "0%";
	ItemBoard.style.width = "90%";
	ItemBoard.style.position = 'absolute';
	ItemBoard.style.overflow = 'auto';
	ItemBoard.style.backgroundColor = "#DCDCDC";
	ItemBoard.style.zIndex=99;//版面至頂，使之顯示在最上層
	
	var Itemtable =document.createElement("ul");//removeChild()只能刪掉<il> 所以只好幫他做TABLE
	ItemBoard.appendChild(Itemtable);
	this.self.appendChild(ItemBoard);
	this.self.appendChild(ItemButton);
    
    function OpenList(){//作業區
		ItemButton.innerHTML = "隱藏道具選單";
		ItemBoard.style.height = "20%";
		//新增node到List
			function addEvent(node,i){
				node.addEventListener("click",function(){
					resetButton();
					VARIABLE.View.GameArea.iframe.contentWindow.Paint(ItemList[i]);
				});
			}
			for(var i = 0; i <ItemList.length;i++){
				var node=document.createElement("il");
				node.innerHTML=ItemList[i]+"<br>";
				addEvent(node,i);
				node.style.cursor = "pointer";
				Itemtable.appendChild(node);
			}
		
		
	}
	function CloseList(){
		ItemButton.innerHTML = "使用道具";
		while (Itemtable.firstChild) {
			Itemtable.removeChild(Itemtable.firstChild);
		}
		ItemBoard.style.height = "0%";
	}
    
    //結束回合按鈕
    this.stay = document.createElement("div");
	this.stay.appendChild(document.createTextNode("結束回合"));
	this.stay.style.position = "absolute";
	this.stay.style.backgroundColor = "#AAAA00";
	this.stay.style.width = "90%";
	this.stay.style.height = "9%";
	this.stay.style.left = "5%";
    this.stay.style.top = "57%";
    this.stay.style.cursor = "pointer";
    this.self.appendChild(this.stay);
    /*
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
	var nodetable = document.createElement("ul");
	openList.appendChild(nodetable);
	this.self.appendChild(openList);
	this.self.appendChild(openButton);
	

	//方法
	
	
	function OpenList(){//作業區
		openButton.innerHTML = "點我隱藏!";
		openList.style.height = "20%";
		//新增node到openList
		
			for(var i = 0; i <arms.length;i++){
				var node=document.createElement("il");
				node.innerHTML=arms[i]+"<br>";
				nodetable.appendChild(node);
			}
		
		
	}
	function CloseList(){
		openButton.innerHTML = "點我展開!";
		while (nodetable.firstChild) {
			nodetable.removeChild(nodetable.firstChild);
		}
		openList.style.height = "0%";
	}
    */
}
