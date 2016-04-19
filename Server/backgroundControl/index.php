<script type="text/javascript">
    function creatRequestObj(){
    	var request = null;
    	try {
    		//IE7,or non-IE browser
    		request = new XMLHttpRequest();
    	} catch (trymicrosoft) {
    		try {
    		//IE browser
    		request = new ActiveXObject("Msxml2.XMLHTTP");
    		} catch (othermicrosoft) {
    			try {
    			//other IE browser
    				request = new ActiveXObject("Microsoft.XMLHTTP");
    			} catch (failed) {
    				//not support
    				request = null;
    			}
    		}
    	}
    	return request;
    }
    var request = null;
    request = creatRequestObj();
    if (request == null){
    	//無法取得XMLHttpRequest物件時發出警告
    	alert("Error creating request object!");
    }
    function check(){
    	var url = "./update.php";
    	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
    	/*global checkSave_res 實作於ajax_res.* */
    	request.onreadystatechange = ajax_res//狀態完成時所要執行的函式
    	request.send(null);//送出
    }
    function ajax_res(){
        /*global request 實作於 ajax.js*/
        if (request.readyState == 4) {//完成狀態有好幾種，4代表資料傳回完成
            var data = request.responseText;//取得傳回的資料存在變數中
    		console.log(data);
    		check();
        }
    }
    check();
</script>