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
    	expect(tabA.opts).to.have.property('tabList');
    	expect(tabA.opts).to.have.property('curIndex');
    	expect(tabA.opts).to.have.property('mouse');
    	expect(tabA.opts).to.have.property('changeMethod');
    	expect(tabA.opts).to.have.property('autoPlay');
    	expect(tabA).to.have.property('tab_list');
    	expect(tabA).to.have.property('tab_cont');
    	expect(tabA).to.have.property('tab_title');
    	expect(tabA).to.have.property('tabCont_wrap');
    	expect(tabA).to.have.property('index');
    	expect(tabB).to.have.property('opts');
    	
    });
  });

	describe('defaultConfig', function () {
		it('modify config', function () {
			const tabA = tab({
					tabList: 3,
					curIndex: 2,
					mouse: 'hover',
					changeMethod: 'horizontal',
					autoPlay: true
			});
			const tabB = tab({
					tabList: 4,
					curIndex: 4,
					mouse: 'click',
					changeMethod: 'vertical',
					autoPlay: false
			});
			expect(tabA.opts.tabList).to.equal(3);
			expect(tabA.opts.curIndex).to.equal(2);
			expect(tabA.opts.mouse).to.equal('hover');
			expect(tabA.opts.changeMethod).to.equal('horizontal');
			expect(tabA.opts.autoPlay).to.equal(true);
			expect(tabB.opts.tabList).to.equal(4);
			expect(tabB.opts.curIndex).to.equal(4);
			expect(tabB.opts.mouse).to.equal('click');
			expect(tabB.opts.changeMethod).to.equal('vertical');
			expect(tabB.opts.autoPlay).to.equal(false);
		});
	});
describe('Test function', function () {
		it('test function', function () {
			const tabA = tab();
			expect(tabA.changeTab(4)).to.equal(tabA);
			expect(tabA.setNodes(4).tab_list).to.lengthOf(4);
			expect(tabA.setTabContent()).to.equal(tabA);
			expect(tabA.setTxtContent()).to.equal(tabA);
		});
	});
