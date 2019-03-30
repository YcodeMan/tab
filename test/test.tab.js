require('jsdom-global')();
var assert = require('assert');
var expect = require('chai').expect; // 引入Chai
var test = require('../assets/js/tab.js');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      expect([1,2,3].indexOf(4)).to.equal(-1); // Chai expect 形式断言语句
    });
  });
});

