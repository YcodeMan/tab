
(function (win, doc) {
	
	function TabSwitch(options){
		
		this.opts = this.getConfig(options);
		
		// 设置变量存储dom节点
		this.tab = null;   // 存储最外层节点
		this.tab_list = [];	 // 储存节点集合
		this.tabParent = null; // 存储内容的最外节点
		this.tab_cont = [];	 // 储存节点集合
		this.tab_title = null;
		this.tabCont_wrap = null;
		
		
		this.index = 0;
	}
	TabSwitch.prototype = {
		inital: function () {
			var self = this;
			
			self.setNodes(self.opts.tabList);	
			self.setData();
			self.tabInital();	
			self._on(self.opts.mouse);
			self.setTabContent();
			self.setTxtContent();
			self.setWidth();
				return this;
		},
		/**
		 * getConfig 设置配置信息
		 * @param {Object} config
		 */
		getConfig: function (config) {
			var defaultConfig = {
				tabList: 5,
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
			
			var	tab_w = parseInt(css(this.tab_cont[0], 'width')),
				tab_h = parseInt(css(this.tab_cont[0], 'height')),
				tab_len = this.tab_cont.length;

				this.index = this.opts.curIndex;
			
			switch (this.opts.changeMethod) {
				case 'horizontal':
					css(this.tabCont_wrap, {width: tab_len * tab_w + 'px'});
					css(this.tab_cont, {float: 'left'});
					break;
				case 'vertical':
					css(this.tabCont_wrap, {hiegth: tab_len * tab_h + 'px'});
					break;
				case 'default':
				case 'opacity':
				default :
					css(this.tab_cont, {display: 'none'});
				break;
					
			}
		},
		tabInital: function () {
			var index = this.index - 1;
			
			removeClass(this.tab_list, 'item-cur');
			addClass(this.tab_list[index], 'item-cur');
			
			switch (this.opts.changeMethod) {
				case 'horizontal':
					var w = -index * parseInt(css(this.tab_cont[0], 'width')) + 'px';
						css(this.tabCont_wrap, {left: w});
					break;
				case 'vertical':
					var h = -index * parseInt(css(this.tab_cont[0], 'height')) + 'px';
						css(this.tabCont_wrap, {top: h});
					break;
				case 'opacity':
				case 'default':
				default :
					css(this.tab_cont[index], {display: 'block'});
					break;
			}
		},
		changeTab: function (index) {
			var self = this;
			removeClass(this.tab_list, 'item-cur');
			addClass(this.tab_list[index], 'item-cur');
			
			switch (this.opts.changeMethod) {
				case 'horizontal':
					var w = parseInt(css(this.tab_cont[0],'width'));
					animate(this.tabCont_wrap, {left: -index * w + 'px'}, 300);
					break;
				case 'vertical':
					var h = parseInt(css(this.tab_cont[0], 'height'));
					animate(this.tabCont_wrap, {top: -index * h + 'px'}, 300);
					break;
				case 'opacity':
				// 先执行淡出后执行淡入
					fideOut(this.tab_cont);
					timer =	setTimeout(function () {
						fideIn(self.tab_cont[index]);
					},200);
					
					break;
				case 'default':
				default :
					css(this.tab_cont, {display: 'none'});
					css(this.tab_cont[index], {display: 'block'});
					break;
			}
			return this;
		},
		_on: function (type) {
			var self = this;
			setIndex(this.tab_list);
			
			if (type === 'click' || type !== 'hover' ) {
				EventUtil.addHandler(this.tab_title, 'click', function (event) {
					var event = win.event || event,
						target = event.target || event.srcElement;
						if (target.nodeName === 'A') {
							self.changeTab(target.index);
						}
				});
				
			} else if (type === 'hover') {
				EventUtil.addHandler(this.tab_title, 'mouseover', function (event) {
					var event = win.event || event,
						target = event.target || event.srcElement;
					if (target.nodeName === 'A') {
						self.changeTab(target.index);
					}
				});
			}
		},
		setNodes: function (num) {
			
			this.tab_list = [];
			this.tab_cont = [];
			var i = 0,
				cache = doc.createDocumentFragment(),
				tab	= doc.createElement('div'),
				tabTitle = doc.createElement('div'),
				tab_cont = doc.createElement('div'),
				tabCont_wrap = doc.createElement('ul'),
				tabItem = null;
				
			addClass(tab, 'tab');
			this.tab = tab;
			addClass(tabTitle, 'tab-title');
			addClass(tab_cont, 'tab-cont');
			this.tabParent = tab_cont;
			addClass(tabCont_wrap, 'tab-cont_wrap');
			tab.appendChild(tabTitle);
			tab.appendChild(tab_cont);
			tab_cont.appendChild(tabCont_wrap);
			for (; i < num; i++) {
				tabItem = doc.createElement('a');
				tabItem.href = 'javascript:';
				tabContent = doc.createElement('li');
				addClass(tabItem, 'item');
				if (i == 0) {
					addClass(tabItem, 'item-cur');
				}
				
				addClass(tabContent, 'item');
				tabTitle.appendChild(tabItem);
				tabCont_wrap.appendChild(tabContent);
				
				// 存储节点集合
				this.tab_list.push(tabItem);
				this.tab_cont.push(tabContent);
			}
			this.tab_title = tabTitle
			this.tabCont_wrap = tabCont_wrap;
			cache.appendChild(tab);
			doc.body.appendChild(cache);
			return this;
		},
		setTabContent: function (opts) {			
			var	config = [
					'Tab1',
					'Tab2',
					'Tab3',
					'Tab4',
					'Tab5',
					'Tab6'
				];
			this.setCont(this.tab_list, config, opts);
			return this;
		},
		setTxtContent: function (opts) {
			var config = [
					'Cont1',
					'Cont2',
					'Cont3',
					'Cont4',
					'Cont5',
					'Cont6',
				];
			this.setCont(this.tab_cont, config, opts);
			return this;
		},
		setCont: function (elems, config, opts) {
			var elems = elems,
				elemLen = elems.length;
			
			var arrLen = config.length;
			if (opts) {
				var optsLen = opts.length;
				for (var i = 0; i < optsLen; i++) {
					config[i] = opts[i];
				}
			}
			
			if (elemLen > 0) {
				if (elemLen > arrLen) {
					var diffLen = elemLen - arrLen; 
					for (var j = 0; j < diffLen; j++) {
						elems == this.tab_cont 
						? config.push('Cont' + (config.length + 1))
						: config.push('Tab' + (config.length + 1));
					}
				}
				for (var m = 0; m < elemLen; m++) {
						elems[m].innerHTML = config[m];
					}
			}
			
		},
		setWidth: function () {
			var w = parseInt(css(this.tab_list[0], 'width')) * (this.tab_list.length) + 'px';
			css(this.tab,{width: w });
			css(this.tabParent,{width: w });
			css(this.tab_cont,{width: w });
			return this;
		}
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
									new RegExp("(\\s|^)" + cName + "(\\s|$)" ), ""
							);
			}
		} else {
			elem.className =  elem.className.replace(
									new RegExp("(\\s|^)" + cName + "(\\s|$)" ), ""
							);
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
			} else {
				elems.index = 0;
			}
		
	}
	 var EventUtil = {
	 	addHandler: function (elem, type, handler, useCapture) {
	 		if (elem.addEventListener) {
	 			useCapture = typeof useCapture === 'boolean' ? useCapture : false;
	 			elem.addEventListener(type, handler, useCapture);
	 		} else if (elem.attachEvent) {
	 			elem.attachEvent('on' + type, handler);
	 		} else {
	 			elem['on' + type] = handler;
	 		}
	 		
	 	}
	 };
/**
 * css 设置样式或者获得样式
 * @param {Object} elems
 * @param {Object | String} attr  如果attr为object则设置样式，为String则获得属性值
 * @param {String} 属性值
 */
function css(elems, attr, value) {
	var item ,	
		len = elems.length || 0;
	if (len > 1) {
		for (var i = 0; i < len; i++) {
			css(elems[i], attr);
		}
		
	} else {
		if (isObject(attr)) {
			for (item in attr) {
				elems.style[item] = attr[item];
				
			}
		} else if (typeof attr === 'string' && !value) {
			return  win.getComputedStyle 
					? getComputedStyle(elems,null)[attr] 
					:  elems.currentStyle[attr];
			
		} else if (typeof attr === 'string' && typeof value === 'string'){
			elems.style[attr] = value;
		}
	}
}
	
	
//t是走过的时间、d是总时间、c是总路程(灵活的有可能是opacity的变化的值)、b是元素的初始位置
function linear(t, b, c, d) {
    return c / d * t + b;
}
/**
 * animate 动画运动
 * @param {Object} elem
 * @param {Object} target
 * @param {Number} duration
 * @param {Function} callback
 */
function animate(elem, target, duration, callback) {
    var change = {},
    	begin = {},
    	key = null,
    	time = 0,
    	timer = null
    	item = null;
    for (key in target) {
        begin[key] = parseInt(css(elem, key));
        change[key] = parseInt(target[key]) - begin[key];
    }
	
	timer = setInterval(function () {
		time += 10;
		if (time >= duration) {
			clearInterval(timer);
			timer = null;
			css(elem, target);
			
			typeof callback === 'function' ? callback() : null;
        	return;
		}
		for (item in target) {
			var current = linear(time, begin[key], change[key], duration);
			css(elem, item, current + 'px');
		}
		
	}, 20);
}
function isObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}

function setOpacity(elem,num) {
	elem.style.opacity !== undefined ? elem.style.opacity = num / 100 
						: elem.style.filter = 'alpha(opacity=' + num + ')';
}

/**
 * findeIn 实现淡入效果
 * @param {Object} elem
 * @param {Number} speed  变化的速度,默认2
 * @param {Number} opacity  要到达的透明度,默认100
 */
function fideIn(elem, speed, opacity) {
	var flagFide = true,
		speed = typeof  speed  === 'number' ? speed : 30,
		opacity = typeof opacity === 'number' ? opacity : 100,
		step = 0,
		len = elem.length || 0;
		elem.timer = null;
	if (len > 1) {
		len = elem.length;
		for (var i = 0; i < len; i ++) {
			fideIn(elem[i], speed, opacity);
		}
	} else {
				clearInterval(elem.timer);
				
					elem.timer = setInterval(function () {
					if (flagFide) {
						if (step != opacity) {	
							step += speed;
							setOpacity(elem, step);
						}
						
						if (step >= opacity ) {
							
							setOpacity(elem, opacity);
							clearInterval(elem.timer);
							
							// 先让所有元素不显示,后显示单前元素
							css(elem.parentNode.children, {display: 'none'});
							css(elem,{display: 'block'});
							flagFide = false;
						}
					}
				}, 30);
	}
}
/**
 * fideOut 实现淡出效果
 * @param {Object} elem
 * @param {Number} speed  变化的速度,默认2
 * @param {Number} opacity  要到达的透明度,默认0
 */
function fideOut(elem, speed,opacity) {
	var flagFide = true,
		speed = typeof speed === 'number' ? speed : 30,
		opacity = typeof opacity === 'number' ? opacity : 0,
		step = 100,
		len = elem.length || 0;
		elem.timer = null;
		if (len > 1) {
			var len = elem.length;
			for (var i = 0; i < len; i++) {
				fideOut(elem[i], speed, opacity);
			}
		} else {
				clearInterval(elem.timer);
				elem.timer = setInterval(function () {
					if (flagFide) {
						if (step != opacity) {	
							step -= speed;
							setOpacity(elem, step);
						}
						if (step <= opacity) {
							setOpacity(elem, opacity);
							clearInterval(elem.timer);
							css(elem,{display: 'none'});
							flagFide = false;
						}
					}	
				}, 30);
		}
}

  win.tab = function (options) {
		options = options || {};
		return new TabSwitch(options).inital();
	};

module.exports = win.tab;
})(window, document);


