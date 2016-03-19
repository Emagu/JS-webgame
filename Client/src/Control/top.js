//上方工具列
function TopControl(){
    this.self = document.createElement("div");
    
    this.self.style.width = "100%";
    this.self.style.height = "20%";
    this.self.style.backgroundColor = "#AAAAAA";
    this.self.style.position = "absolute";
    this.self.style.left="0px";
    this.self.style.top = "0px";
    
    this.ZoomButton1 = document.createElement("div");
	this.ZoomButton1.appendChild(document.createTextNode("300%"));
	this.ZoomButton1.style.position = "absolute";
	this.ZoomButton1.style.backgroundColor = "#FFFFFF";
	this.ZoomButton1.style.width = "3%";
	this.ZoomButton1.style.height = "15%";
	this.ZoomButton1.style.left = "74%";
    this.ZoomButton1.style.top = "70%";
    this.ZoomButton1.style.cursor = "pointer";
    this.self.appendChild(this.ZoomButton1);
    
    this.ZoomButton2 = document.createElement("div");
	this.ZoomButton2.appendChild(document.createTextNode("200%"));
	this.ZoomButton2.style.position = "absolute";
	this.ZoomButton2.style.backgroundColor = "#FFFFFF";
	this.ZoomButton2.style.width = "3%";
	this.ZoomButton2.style.height = "15%";
	this.ZoomButton2.style.left = "78%";
    this.ZoomButton2.style.top = "70%";
    this.ZoomButton2.style.cursor = "pointer";
    this.self.appendChild(this.ZoomButton2);
    
    this.ZoomButton3 = document.createElement("div");
	this.ZoomButton3.appendChild(document.createTextNode("100%"));
	this.ZoomButton3.style.position = "absolute";
	this.ZoomButton3.style.backgroundColor = "#FFFFFF";
	this.ZoomButton3.style.width = "3%";
	this.ZoomButton3.style.height = "15%";
	this.ZoomButton3.style.left = "82%";
    this.ZoomButton3.style.top = "70%";
    this.ZoomButton3.style.cursor = "pointer";
    this.self.appendChild(this.ZoomButton3);

}
