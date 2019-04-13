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
