function Hall_RoomList(){
    this.self = document.createElement("div");
    this.self.style.width = "80%";
    this.self.style.height = "100%";
    this.self.style.backgroundColor = "#AAAAAA";
    this.self.style.position = "absolute";
    this.self.style.left = "20%";
    this.self.style.top = "0px";
    
    var title = document.createElement("H1");
    title.style.width = "100%";
    title.style.height = "10%";
    title.style.textAlign = "center";
    title.style.position = "absolute";
    title.style.left = "0px";
    title.style.top = "0px";
	title.appendChild(document.createTextNode("房間列表"));
	this.self.appendChild(title);
	
	this.RoomList = document.createElement("div");
	this.RoomList.style.width = "100%";
	this.RoomList.style.height = "90%";
	this.RoomList.style.textAlign = "center";
    this.RoomList.style.position = "absolute";
    this.RoomList.style.left = "0px";
    this.RoomList.style.top = "10%";
    this.RoomList.style.backgroundColor = "#AAAA00";
    this.self.appendChild(this.RoomList);
}

