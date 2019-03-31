require('jsdom-global')();

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var assert = require('assert');
var expect = require('chai').expect; // 引入Chai
var tab = require('../assets/js/tab.js');


  describe('Is tab  property', function() {
 
  	beforeEach(function() { 
			    return JSDOM.fromFile('index.html','text/html') 
			    .then((dom) => { 
			     checkboxes = dom.window.document.querySelectorAll('#title'); 
			     
			    }); 
		}); 
  
    it('tab hasOwnProperty', function() {	
    	const tabA =  tab();
    	const tabB = tab({})
    	expect(tabA).to.have.property('opts');
    	expect(tabA).to.have.property('index');
    	expect(tabA.opts).to.have.property('curIndex');
    	expect(tabA.opts).to.have.property('mouse');
    	expect(tabA.opts).to.have.property('changeMethod');
    	expect(tabA.opts).to.have.property('autoPlay');
    	expect(tabB).to.have.property('opts');
    	
    });
  });

	