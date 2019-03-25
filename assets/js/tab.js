
(function (win, doc) {
	
	function TabSwitch(options){
		var self = this;
		self.opts = self.getConfig(options);
		
		// 获取相应的dom节点
		self.tab_list = doc.getElementsByClassName('tab-title')[0].getElementsByClassName('item');
		self.tabCont_wrap = doc.getElementsByClassName('tab-cont_wrap')[0];
		self.tab_cont = self.tabCont_wrap.getElementsByClassName('item');
		
		self.index = 0;
		
	}
	TabSwitch.prototype = {
		inital: function () {
			var self = this;
			self.setDate();
			self.tabInital();
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
		setDate: function () {
			var tab = getComputedStyle(this.tab_cont[0]),
				tab_w = parseInt(tab.width),
				tab_h = parseInt(tab.height),
				tab_len = this.tab_cont.length;

				this.index = this.opts.curIndex;
			
			switch (this.opts.changeMethod) {
				case 'horizontal':
					this.tabCont_wrap.style.width = tab_len * tab_w + 'px';
					this.setCss(this.tab_cont, 'float: left')
					break;
				case 'vertical':
					this.tabCont_wrap.style.height = tab_len * tab_h + 'px';
					break;
				case 'default':
				case 'opacity':
				default :
					this.setCss(this.tab_cont, 'display: none');
				break;
					
			}
		},
		setCss: function (elem, value) {
			for (var i = 0, len = elem.length; i < len; i++) {
				elem[i].style = value;
			}
		},
		tabInital: function () {
			
		}
	}
	window.tab = function (options) {
		options = options || {};
		new TabSwitch(options).inital();
	}
	
})(window, document)