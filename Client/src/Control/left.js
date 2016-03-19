//左邊工具列
function LeftControl(){
    this.self = document.createElement("div");
    
    this.self.style.width = "15%";
    this.self.style.height = "100%";
    this.self.style.backgroundColor = "#AAAAAA";
    this.self.style.position = "absolute";
    this.self.style.left = "0px";
    this.self.style.top = "0px";
    
    this.MoveButton = document.createElement("div");
	this.MoveButton.appendChild(document.createTextNode("開始移動"));
	this.MoveButton.style.position = "absolute";
	this.MoveButton.style.backgroundColor = "#AAAA00";
	this.MoveButton.style.width = "90%";
	this.MoveButton.style.height = "10%";
	this.MoveButton.style.left = "5%";
    this.MoveButton.style.top = "1%";
    this.MoveButton.style.cursor = "pointer";
    this.MoveButton.style.textAlig= "center";
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
}
