
(function (win, doc) {
	
	function TabSwitch(options){
		var self = this;
		self.opts = self.getConfig(options);
		
		// 获取相应的dom节点
		self.tab_title = doc.getElementsByClassName('tab-title')[0],
		self.tab_list = self.tab_title.getElementsByClassName('item');
		self.tabCont_wrap = doc.getElementsByClassName('tab-cont_wrap')[0];
		self.tab_cont = self.tabCont_wrap.getElementsByClassName('item');
		
		self.index = 0;
		
	}
	TabSwitch.prototype = {
		inital: function () {
			var self = this;
			self.setData();
			self.tabInital();
			
			
			if (this.opts.mouse === 'click') {
				setIndex(this.tab_list);
				EventUtil.addHandler(this.tab_title, 'click', function (event) {
					var event = window.event || event,
						target = event.target || e.srcElement;
						if (target.nodeName === 'A') {
							self.changeTab(target.index);
						}
						
					
				})
				
			}
		},
		/**
		 * getConfig 设置配置信息
		 * @param {Object} config
		 */
		getConfig: function (config) {
			var defaultConfig = {
				curIndex: 1,
				mouse: 'click',
				changeMethod: 'default',
				autoPlay: false
			}
			for (var i in config) {
				if (config.hasOwnProperty(i)) {
					defaultConfig[i] = config[i]   // 用户配置信息
				}
				
			}
			return defaultConfig;
		},
		setData: function () {
			var tab = getComputedStyle(this.tab_cont[0]),
				tab_w = parseInt(tab.width),
				tab_h = parseInt(tab.height),
				tab_len = this.tab_cont.length;

				this.index = this.opts.curIndex;
			
			switch (this.opts.changeMethod) {
				case 'horizontal':
					setCss(this.tabCont_wrap, 'width', tab_len * tab_w + 'px')
					setCss(this.tab_cont, 'float', 'left')
					break;
				case 'vertical':
					setCss(this.tabCont_wrap, 'hiegth', tab_len * tab_h + 'px')
					break;
				case 'default':
				case 'opacity':
				default :
					setCss(this.tab_cont, 'display', 'none');
				break;
					
			}
		},
		tabInital: function () {
			var index = this.index - 1;
			
			removeClass(this.tab_list, 'item-cur');
			addClass(this.tab_list[index], 'item-cur');
			
			switch (this.opts.changeMethod) {
				case 'horizontal':
					var w = -index * parseInt(getComputedStyle(this.tab_cont[0]).width) + 'px';
						setCss(this.tabCont_wrap, 'left', w);
					break;
				case 'vertical':
					var h = -index * parseInt(getComputedStyle(this.tab_cont[0]).height) + 'px';
						setCss(this.tabCont_wrap, 'top', h);
					break;
				case 'opacity':
				case 'default':
				default :
					setCss(this.tab_cont[index], 'display', 'block');
					break;
			}
		},
		changeTab: function (index) {
			removeClass(this.tab_list, 'item-cur');
			addClass(this.tab_list[index], 'item-cur');
			
			switch (this.opts.changeMethod) {
				case 'horizontal':
					
					setCss(this.tabCont_wrap, 'left',  -index
									* parseInt(getComputedStyle(this.tab_cont[0]).width) + 'px');
			
					break;
				case 'default':
				default :
					setCss(this.tab_cont, 'display', 'none');
					setCss(this.tab_cont[index], 'display', 'block');
					break;
			}
		}
	}
	window.tab = function (options) {
		options = options || {};
		new TabSwitch(options).inital();
	}
	/**
	 * addClass 添加class
	 * @param {Object} elem
	 * @param {Object} cName
	 */
	function addClass(elem, cName) {
		var i = 0,
			len = elem.length;
		if (len > 1) {
			for (; i < len; i++) {
				elem[i].className += " " + cName; 
			}
		} else {
			elem.className += " " + cName;
		}
		
	}
	/**
	 * removeClass 移出class
	 * @param {Object} elem
	 * @param {Object} cName
	 */
	function removeClass(elem, cName) {
		var i = 0,
			len = elem.length;
		if (len > 1) {
			for (; i < len; i++) {
				elem[i].className = elem[i].className.replace(
									new RegExp("(\\s|^)" + cName + "(\\s|$)" ), " "
							);
			}
		} else {
			elem.className =  elem.className.replace(
									new RegExp("(\\s|^)" + cName + "(\\s|$)" ), " "
							);
		}
	}
	/**
	 * setCss 设置css样式
	 * @param {Object} elem
	 * @param {Object} attr
	 * @param {Object} value
	 */
	function setCss(elem, attr, value) {
		var i = 0,
			len = elem.length;
		if (len > 1) {
			for (; i < len; i++) {
				elem[i].style[attr] = value;
			}
		} else {
			elem.style[attr] = value;
		}
	}
	/**
	 * 设置元素组的index
	 * @param {Object} elems
	 */
	function setIndex(elems) {
		var i = 0;
			len = elems.length;
			if (len > 1) {
				for (; i < len; i++) {
					elems[i].index = i;
				}
			}
		
	}
	 var EventUtil = {
	 	addHandler: function (elem, type, handler) {
	 		if (elem.addEventListener) {
	 			elem.addEventListener(type, handler, false);
	 		} else if (elem.attachEvent) {
	 			elem.attachEvent('on' + type, handler);
	 		} else {
	 			elem['on' + type] = handler;
	 		}
	 		
	 	}
	 };
	
})(window, document)