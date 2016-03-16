//右邊工具列
function RightControl(){
    this.self = document.createElement("div");
    this.self.style.width = "200px";
    this.self.style.height = "100%";
    this.self.style.backgroundColor = "#AAAAAA";
    this.self.style.position = "absolute";
    this.self.style.left = "1580px";
    this.self.style.top = "0px";
    //可以考慮用DIV作按鈕 參考left.js (以後按鈕套圖片)
    //what happend?
    var ul = document.createElement("ul");
    this.button = document.createElement("dev");
	this.button.appendChild(document.createTextNode("player's movement"));
///	this.button.appendChild(document.adoptNode("eeee"))
//this.button.appendChild(document.clear());
	this.button.style.backgroundColor="#FFFFFF";
    this.button.style.height="98%";
    this.button.style.width="90%";
    this.button.style.position="absolute";
    this.button.style.left = "5%";
    this.button.style.top = "1%";
    this.self.appendChild(this.button);
}