<div align="center">
  This toggle tab
  
[![Build Status](https://travis-ci.org/YcodeMan/tab.svg?branch=master)](https://travis-ci.org/YcodeMan/tab)
[![Coverage Status](https://coveralls.io/repos/github/YcodeMan/tab/badge.png)](https://coveralls.io/github/YcodeMan/tab)
</div>



### demo
[demo](https://ycodeman.github.io/tab/)
### Started
We need to import CSS and js
``` html
<link type="text/css" href="assets/css/tab.css"rel="stylesheet" />
<script src="assets/js/tab.js" type="text/javascript" ></script>
```
Now, we can create a tab. We add a script to our page:
``` javascript
  tab({
                tabList: 5,
                curIndex: 3,
                changeMethod: 'vertical',
                mouse: 'click',
                autoPlay: false
            });
```
Default configuration param
``` javascript
  var defaultConfig = {
				tabList: 5,
				curIndex: 1,
				mouse: 'click',
				changeMethod: 'default',
				autoPlay: false
			}
```
* tabList
The number tab
* curIndex
Show the current tab
* mouse
mouse : click / hover
click or mouseover handler
* changeMethod
changeMethod: default/vertical/horizontal/opacity
The way to switch content
* autoPlay
autoPlay : false/true
Is swicth by auto 	
			