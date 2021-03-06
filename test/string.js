'use strict';

// const sinon = require('sinon');
const expect = require('chai').expect;
const config = require('../test.config.js');

describe('String Module', () => {

    const { stripTags, prepad0, escapeHtml, unescapeHtml } = require(`../${config.sourceFolder}/string`);
    // const { stripTags, prepad0, escapeHtml, unescapeHtml } = require('@coolgk/string');
    // before(() => {});
    // beforeEach(() => {});

    describe('stripTags', () => {
        it('should remove html tags', () => {
            expect(stripTags('<h1>test</h1><script>alert(1)</script>')).to.equal('test alert(1)');
        });

        it('should return empty string for falsy input', () => {
            expect(stripTags()).to.equal('');
        });
    });

    describe('escapeHtml', () => {
        it('should escape html tags', () => {
            expect(
                escapeHtml('<h1>test</h1><script>alert(1)</script>')
            ).to.equal('&lt;h1&gt;test&lt;/h1&gt;&lt;script&gt;alert(1)&lt;/script&gt;');
        });

        it('should return empty string for falsy input', () => {
            expect(escapeHtml()).to.equal('');
        });
    });

    describe('unescapeHtml', () => {
        it('should unescape html tags', () => {
            expect(
                unescapeHtml('&lt;h1&gt;test&lt;/h1&gt;&lt;script&gt;alert(1)&lt;/script&gt;')
            ).to.equal('<h1>test</h1><script>alert(1)</script>');
        });

        it('should return empty string for falsy input', () => {
            expect(unescapeHtml()).to.equal('');
        });
    });

    describe('prepad0', () => {
        it('add 0 before a number to a specified length', () => {
            expect(prepad0(7)).to.equal('07');
            expect(prepad0(7, 2)).to.equal('07');
            expect(prepad0(70, 3)).to.equal('070');
            expect(prepad0(70, 4)).to.equal('0070');
            expect(prepad0(1, 4)).to.equal('0001');
            expect(prepad0(1000, 2)).to.equal('1000');
        });
    });

});
