const assert = require("assert");
const safeObject = require("../lib");
const should = require("should");

describe("test safeObject", function() {
    const objs = { a: { b: "c", d: { x: [1], foo: "" } } };
    const safe = safeObject(objs);

    it("getter paths of string", function() {
        assert.equal(safe.getter("a"), objs.a);
    });

    it("getter paths of array", function() {
        assert.equal(safe.getter(["a", "b"]), "c");
        assert.equal(safe.getter(["a", "d", "x", 0]), 1);
    });

    it("getter paths of undefined", function() {
        assert.equal(safe.getter(), "");
        assert.equal(safe.getter(["a", "b", "d", "foo", "x"]), "");
        assert.equal(safe.getter(["a", "b", "d", "foo", "x"], "a"), "a");
    });

    it("setter", function() {
        safe.setter(["a", "b", "x", 0], 123).should.be.eql({
            a: { b: { x: [123] }, d: { x: [1], foo: "" } }
        });
    });

    it("getter paths and setter default value", function() {
        assert.equal(safe.getter("", "def"), "");
        assert.equal(safe.getter(["a", "b"], "def"), "c");
        assert.equal(safe.getter(["a", "b"], "def"), "c");
        assert.equal(safe.getter(["a", "b", "c", "x"], "def"), "def");
    });

    it("setter paths of falsy", function() {
        safe.setter(undefined, 123).should.be.eql({
            a: { b: { x: [123] }, d: { x: [1], foo: "" } }
        });
    });
});
