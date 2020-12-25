/**
 * @作者：autor
 * @时间：2017-03-17 14:19
 **/
var ztreeModal = function(o){
	this.opt = {
		dropDom:null,//必选，下拉的容器jq查询对象
		/*triggerDom:null,//必选，触发下拉事件的jq查询对象*/
		direction:'down',//方向 down/up
		fun:function(){
		}
	};
	$.extend(this,this.opt,o);
	this.init();
};
$.extend(ztreeModal.prototype,{
	init:function(){

		var obj = this,
		    direction = '';
		if(obj.direction == 'up'){
			direction = 'dropup';
		}else{
			direction = 'dropdown';
		}
		
		this.parentElm=obj.dropDom.parent();
		this.ztreeId = obj.dropDom.attr('data-ztreeId'),
	    //  temp = '<div class="form-init-drop '+direction+'">'+
		//           '<div class="input-group">'+
		//               '<input name="peopleAddress" type="text" class="form-control" id="input_'+this.ztreeId+'" >'+
		//               '<span  class="input-group-addon checkBtn" data-id="'+this.ztreeId+'">点我选择</span>'+
		//           '</div>'+
		//           '<div class="init-dropdown-menu" data-stopPropagation="true">'+
		//           	 '<div id="'+this.ztreeId+'" class="ztree" ></div>'+
		//           '</div>'+
		// 		'</div>';
			temp = //'<div class="form-init-drop '+direction+'">'+		           
				'<div class="init-dropdown-menu '+direction+'" data-stopPropagation="true">'+
					'<div id="'+this.ztreeId+'" class="ztree" ></div>'+
				'</div>';
			//'</div>';
			this.parentElm.append(temp);
		/*if(typeof callback === 'function' ){
			obj.fun = callback;
		}*/
		this.bindEvent();
	},
	bindEvent:function(){
		var obj = this;
		$('body').on('click',function(e){
			 
			var $dropMenu=obj.parentElm.find('.init-dropdown-menu');
			if(!$(e.target).hasClass('form-control') && !$dropMenu.is(":hidden")){
				$dropMenu.hide();
			}
		})
		$("body").on('click','[data-stopPropagation]',function (e) {
        	e.stopPropagation();
		});
		obj.dropDom.click(function(e){ 
			//var parent = $(this).parents('.form-init-drop');			 
			if($(this).parent().find('.init-dropdown-menu').is(":hidden")){
				obj.fun(obj.ztreeId);
			}
			$(this).parent().find('.init-dropdown-menu').show()
			//$(this).find('.init-dropdown-menu').slideToggle(100);
		});
		// obj.dropDom.on('click','.checkBtn',function(e){
		// 	e.stopPropagation();
		// 	var parent = $(this).parents('.form-init-drop');
		// 	if(parent.find('.init-dropdown-menu').is(":hidden")){
		// 		console.log(obj.ztreeId)
		// 		obj.fun(obj.ztreeId);
		// 	}
		// 	parent.find('.init-dropdown-menu').slideToggle(100);
		// })
	},
	hideZtree:function(value){
		$(this.parentElm).find('.init-dropdown-menu').slideToggle(100);
		$(this.dropDom).val(value);
	}
});


