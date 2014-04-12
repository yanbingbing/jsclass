/**
 * Class
 *
 * @author github.com/yanbingbing/class.js
 * Thanks to: https://github.com/aralejs/class/blob/master/src/class.js
 */

;(function (window) {
    function Class(properties, parent) {

        properties || (properties = {});

        var proto = createProto(parent ? parent.prototype : properties);

        var constructor = proto.constructor = function () {
            parent && parent.apply(this, arguments);

            if (this.constructor === constructor && this.initialize) {
                this.initialize.apply(this, arguments);
            }
        };

        constructor.prototype = proto;

        constructor.superclass = (parent || Object).prototype;
        parent && implement.call(constructor, properties);

        return Class.classify(constructor);
    }

    function implement(properties) {
        var key, value;

        for (key in properties) {
            value = properties[key];
            this.prototype[key] = value;
        }
    }

    Class.extend = function (properties) {
        return Class(properties, this);
    };
    Class.classify = function (cls) {
        cls.extend = Class.extend;
        cls.implement = implement;
        return cls;
    };

    // Shared empty constructor function to aid in prototype-chain creation.
    function Ctor() {
    }

    // See: http://jsperf.com/object-create-vs-new-ctor
    var createProto = Object.__proto__ ? function (proto) {
        return { __proto__: proto };
    } : function (proto) {
        Ctor.prototype = proto
        return new Ctor();
    };

    if (typeof define === 'function') {
        define(function () { return Class; });
    } else {
        window.Class = Class;
    }

})(window);