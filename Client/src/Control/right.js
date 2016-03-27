//右邊工具列
function RightControlView(){
    this.self = document.createElement("div");
    this.self.style.width = "15%";
    this.self.style.height = "100%";
    this.self.style.backgroundColor = "#AAAAAA";
    this.self.style.position = "absolute";
    this.self.style.left = "85%";
    this.self.style.top = "0px";
    
    var ul = document.createElement("ul");
    this.button = document.createElement("dev");
	this.button.appendChild(document.createTextNode("player's movement"));
	this.button.style.backgroundColor="#FFFFFF";
    this.button.style.height="98%";
    this.button.style.width="90%";
    this.button.style.position="absolute";
    this.button.style.left = "5%";
    this.button.style.top = "1%";
    this.self.appendChild(this.button);
}