/**
 * @作者：autor
 * @时间：2017-03-17 14:19
 **/
var treeModal = function(o){
	this.opt = {
		dropDom:null,//必选，下拉的容器jq查询对象
		direction:'down',//方向 down/up
		fun:function(){
		}
	};
	$.extend(this,this.opt,o);
	this.init();
};
$.extend(treeModal.prototype,{
	init:function(){
		var obj = this,
		    direction = '';
		if(obj.direction == 'up'){
			direction = 'dropup';
		}else{
			direction = 'dropdown';
		}
		this.treeId = obj.dropDom.attr('data-zreeId'),
	     temp = '<div class="form-tree-drop '+direction+'">'+
		          '<div class="init-dropdown-menu" data-stopPropagation="true">'+
		          	 '<div id="'+this.treeId+'" class="formtree" ></div>'+
		          '</div>'+
				'</div>';
		obj.dropDom.parent().append(temp);
		/*if(typeof callback === 'function' ){
			obj.fun = callback;
		}*/
		this.bindEvent();
	},
	bindEvent:function(){
		var obj = this;
		$('body').on('click',function(){
			var $dropMenu=obj.dropDom.find('.init-dropdown-menu');
			if(!$dropMenu.is(":hidden")){
				$dropMenu.hide();
			}
		})
		$("body").on('click','[data-stopPropagation]',function (e) {
        	e.stopPropagation();
    	});
		obj.dropDom.on('click','.checkBtn',function(e){
			e.stopPropagation();
			var parent = $(this).parents('.form-init-drop');
			if(parent.find('.init-dropdown-menu').is(":hidden")){
				obj.fun(obj.ztreeId);
			}
			parent.find('.init-dropdown-menu').slideToggle(100);
		})
	},
	hideZtree:function(value){
		this.dropDom.find('.init-dropdown-menu').slideToggle(100);
		$('#input_'+this.ztreeId).val(value);
	}
});


