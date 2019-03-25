
(function (win, doc) {
	
	function TabSwitch(options){
		var self = this;
		self.opts = self.getConfig(options);
		
		// 获取相应的dom节点
		self.tab_list = doc.getElementsByClassName('tab-title')[0].getElementsByClassName('item');
		self.tabCont_wrap = doc.getElementsByClassName('tab-cont')[0];
		self.tab_cont = self.tabCont_wrap.getElementsByClassName('item');
		
		self.index = 0;
		
	}
	TabSwitch.prototype = {
		inital: function () {
			var self = this;
			this.setDate();
		},
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
			
			this.index = this.opts.curIndex;
			
			switch (this.opts.changeMethod) {
				case 'horizontal':
				
				
			}
		}
	}
	window.tab = function (options) {
		options = options || {};
		new TabSwitch(options).inital();
	}
	
})(window, document)