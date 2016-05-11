// localStorage.setItem('todo','[{"title":"aa","done":false}]')
// getData();

// 从 localStorage 中获取数据
function getData(){
	// var data=localStorage.getItem('todo'); 获取todo
	var data=JSON.parse(localStorage.getItem('todo'))
	// 获取到todo，把字符串转换成对象
	return data||[];
	// 获取数据，有数据返回数据，没有返回空的数组；
}

// 把数据 保存到 localStorage

function saveData(data){
	//var data=JSON.stringify(data)
	//把对象转换成字符串
	localStorage.setItem('todo',JSON.stringify(data));

	// 转化之后直接存进localStorage去
}

// 获取文本和提交按钮；
var text=document.querySelector('.nav-list input[type=text]');
// console.log(text)

var createBtn=document.querySelector('.nav-list input[type=button]');
//console.log(createBtn)

// 提交按钮点击事件

createBtn.onclick=function(){
	if(text.value==""){
		alert('请输入代办事情');
		return;
	}
	//获取数据
	var data=getData();
	data.push({title:text.value,done:false});
	// 提交之后清空value值
	text.value="";
	//保存、重绘
	saveData(data);
	reWrite()
}

// 获取正在进行和未完成
var nowlist=document.querySelector('.now .list');

var comlist=document.querySelector('.com .list');
//console.log(nowlist)
var nownum=document.querySelector('.now .num');
var comnum=document.querySelector('.com .num');
// 重绘 把数据返回到页面

reWrite()
	function reWrite(){
		// 定义两个空的字符串 已完成和未完成 把两个num的初始值都设为0
		var nStr="";
		var cStr="";
		var nNum=0;
		var cNum=0;

		//获取数据
		var data=getData();
		//ECMA5  forEach

		data.forEach(function(o,i){
			//console.log(o.done)
			if(o.done==false){
				nStr+='<li id='+i+'><input type="checkbox" onclick="changeState('+i+',true)"><div class="cont" contenteditable=true onblur="changeText('+i+',this.innerHTML)">'+o.title+'</div><input type="button" value="del" class="del" onclick=delData('+i+')></li>'
				nNum++;
			}else{
				cStr+='<li id='+i+'><input type="checkbox" checked onclick="changeState('+i+',false)"><div class="cont" contenteditable=false>'+o.title+'</div><input type="button" value="del" class="del" onclick=delData('+i+')></li>'
				cNum++;
			}
		})

		nowlist.innerHTML=nStr;
		comlist.innerHTML=cStr;
		nownum.innerHTML=nNum;
		comnum.innerHTML=cNum;
	}

	//修改数据状态  需要id和当前状态
	function changeState(id,state){
		//获取数据 现在数据的状态为数组
		var data=getData();
		// 修改数据 保存数据 重置数据
		data[id].done=state;
		saveData(data);
		reWrite();
	}

	// 删除数据 需要id
	function delData(id){
		//获取数据
		var data=getData();
		data.splice(id,1);
		// 截取并删除一个
		// 保存 重绘
		saveData(data);
		reWrite();
	}

	//获取文本内容  需要id和内容
	function changeText(id,text){
		//获取数据
		var data=getData();
		//判断没有修改就返回;
		if(data[id].title==text){
			return;
		}
		data[id].title=text;
		saveData(data);
		reWrite();
	}

	// 清空所有的数据;

var delBtn=document.querySelector('.delAll');
	//console.log(delBtn)
	delBtn.onclick=function(){
		localStorage.clear();
		reWrite()
	}

	

