

(function (win, doc) {

	function TabSwitch(options){
		var self = this;
		self.opts = self.getConfig(options);
		
		// 设置变量存储dom节点
		self.tab_list = [];	 // 储存节点集合
		
		self.tab_cont = [];	 // 储存节点集合
		this.tab_title = null;
		self.tabCont_wrap = null;
		
	
		self.index = 0;
	}
	TabSwitch.prototype = {
		inital: function () {
			var self = this;
			
			self.setTab(self.opts.tabList);	
			self.setData();
			self.tabInital();	
			self._on(self.opts.mouse);
			self.setTabCont();
			self.setTxtContent();
			if (self.opts.autoPlay) {
				this.autoPlay();
			}
			
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
						clearTimeout(timer);
					},100);
					
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
			if (type === 'click') {
				
				EventUtil.addHandler(this.tab_title, 'click', function (event) {
					var event = win.event || event,
						target = event.target || event.srcElement;
						if (target.nodeName === 'A') {
							self.changeTab(target.index);
						}
				});
					return this;
			} else if (type === 'hover') {
				EventUtil.addHandler(this.tab_title, 'mouseover', function (event) {
					var event = win.event || event;
					target = event.target || event.srcElement;
					if (target.nodeName === 'A') {
						self.changeTab(target.index);
					}
				});
					return this;
			} else {
				EventUtil.addHandler(this.tab_title, 'click', function (event) {
					var event = win.event || event,
						target = event.target || event.srcElement;
						if (target.nodeName === 'A') {
							self.changeTab(target.index);
						}
				});
					return this;
			}
		},
		setTab: function (num) {
			var i = 0,
				cache = doc.createDocumentFragment(),
				tab	= doc.createElement('div'),
				tabTitle = doc.createElement('div'),
				tab_cont = doc.createElement('div'),
				tabCont_wrap = doc.createElement('ul'),
				tabItem = null;
				
			addClass(tab, 'tab');
			addClass(tabTitle, 'tab-title');
			addClass(tab_cont, 'tab-cont');
			addClass(tabCont_wrap, 'tab-cont_wrap');
			tab.appendChild(tabTitle);
			tab.appendChild(tab_cont);
			tab_cont.appendChild(tabCont_wrap);
			for (; i < num; i++) {
					tabItem = doc.createElement('a'),
					tabContent = doc.createElement('li');
				addClass(tabItem, 'item')
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
		},
		/**
		 * 设置tab的内容
		 * @param {Array} opts  
		 */
		setTabCont: function (opts) {
			
			defaultTabContent = [
				'Tab1',
				'Tab2',
				'Tab3',
				'Tab4',
				'Tab5',
				'Tab6'
			],
			this.setCont(this.tab_list, defaultTabContent, opts);
				return this;
		},
		setTxtContent: function (opts) {
			
			defaultTxtContent = [
				'Cont1',
				'Cont2',
				'Cont3',
				'Cont4',
				'Cont5',
				'Cont6'
			],
			this.setCont(this.tab_cont, defaultTxtContent, opts );
				return this;
		},
		 setCont: function (elems, Config, opts) {
		 	var len = elems.length,
			arrLen = Config.length;
			for (var item in opts) {
					Config[item] = opts[item];
			}
			if (arrLen  >= len ) {
				for (var i = 0; i < len; i++ ) {
					elems[i].innerHTML = Config[i];
				}
			} else {
				for (; arrLen < len;) {
					Config.push('Tab' + ++arrLen);
				}
				for (var j = 0; j < len; j++) {
					elems[j].innerHTML = Config[j];
				}
			}
				
		},
		autoPlay: function () {
			
			var	index = this.opts.curIndex - 1,
				self = this,
				len = this.tab_list.length;
				setInterval(function () {
					index =	index >= (len - 1) ? 0 : ++index;
					self.changeTab(index);
				}, 1000);
			
			
		}
	}
	
	/**
	 * addClass 添加class
	 * @param {Object} elem
	 * @param {Object} cName
	 */
	function addClass(elem, cName) {
		var i = 0,
			len = elem.length || 0;
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
function animate(elem, target, duration) {
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
		
	}, 30);
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
	var flagFide = true;
	var speed = speed || 40,
		opacity = opacity || 100,
		step = 0,
		timer = null;
		len = elem.length || 0;
	if (len > 1) {
		len = elem.length;
		for (var i = 0; i < len; i ++) {
			fideIn(elem[i], speed, opacity);
		}
	} else {
			elem.timer = null;
			if (flagFide) {
					elem.timer = setInterval(function () {
					step += speed;
					flagFide = false;
					setOpacity(elem, step);
					if (step >= opacity ) {
						setOpacity(elem, opacity);
						clearInterval(elem.timer);
						elem.timer = null;
						css(elem,{display: 'block'});
						flagFide = true;
					}	
				}, 30);
			}
		
	}
}
/**
 * fideOut 实现淡出效果
 * @param {Object} elem
 * @param {Number} speed  变化的速度,默认2
 * @param {Number} opacity  要到达的透明度,默认0
 */
function fideOut(elem, speed,opacity) {
	var flagFide = true;
	var speed = speed || 40,
		opacity = opacity || 0,
		step = 100,
		tiemr = null,
		len = elem.length || 0;
		if (len > 1) {
			var len = elem.length;
			for (var i = 0; i < len; i++) {
				fideOut(elem[i], speed, opacity);
			}
		} else {
			elem.timer = null;
			if (flagFide) {
				elem.timer = setInterval(function () {
					step -= speed;
					flagFide = false;
					setOpacity(elem, step);
					if (step <= opacity) {
						setOpacity(elem, opacity);
						clearInterval(elem.timer);
						elem.timer = null;
						css(elem,{display: 'none'});
						flagFide = true;
					}
				}, 20);
			}
		}
		
}

  win.tab = function (options) {
		options = options || {};
		return new TabSwitch(options).inital();
	};

module.exports = win.tab;
})(window, document);



