超級射屁股大戰 v0.1 Node

已知問題:

1 . 遊戲區域大小規畫

2 . 遊戲大廳UI規畫

3 . 遊戲房間UI規畫

4 . 登入&註冊失敗未給予提示

5 . 註冊成功提示太醜 

6 . 同帳號可以重複登入

7 . 遊戲區資料庫未有移除功能
 
遊戲系統:

解析度:整體 [1280 * 720](先搞這個) [1280 * 960] [1400 * 1050] [1440 * 900]   ，  遊戲顯示區域 900 * 500

1 . 遊戲方式:

開房可以選擇任務、地圖，將玩家分為AB兩方。

之後再進行選擇兵種、道具、武器、起始位置，敵方玩家不會知道我方的資訊。

遊戲開始後，回合行動順序為玩家123。

AB雙方移動完為一回合，場上會有戰爭迷霧，玩家有可視範圍、友軍會共享視野。

2 . 遊戲勝利條件:任務成功\敵方全員死亡

	任務種類:解救人質、裝炸藥等等
	
3 . 行動點數(AP):

所有的指令(移動、攻擊、道具、技能、占領)都會消耗AP。

每回合會進行補充而未使用完的AP也會保留，但是會有最大限制

有設定資源點可以增加每回補充AP

4 . 兵種:

每個兵種會有擅長的技能，但是都會有相對的道具取代。

技能所消耗的AP會比道具少，但是CD相同


遊戲設定

1 . 地形:

	平原、水、森林、山、建築物

2 . 兵種:

	通訊兵
	
	    技能:偵察機、轟炸機 	    被動:建立支援點
		
	工程師
	
		技能:拆炸彈、偵測安裝地雷   被動:占領AP減半 
		
	狙擊手
	
		技能:探測 被動:架槍 
		
	醫護兵
	
		技能: 補血 被動:補血加成
		
	野戰兵
	
		技能: 森林中隱形 被動:森林中移動AP減少
		
	水鬼
	
		技能:水中隱形 被動:水中移動AP減少
		
	裝甲兵
	
		技能:疊護甲 被動:護甲加成
		
3 . 道具

	參考以上

 
 
更新紀錄:

    v0.1:
    
        1 . 使用node.js重製後台
        
        2 . 完成 登入，註冊，新增角色，遊戲大廳，新增房間(設定畫面)