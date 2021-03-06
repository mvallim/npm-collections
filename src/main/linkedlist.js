var BaseCollection = require('./commons/basecollection');
var LinkedListIterator = require('./linkedlistiterator');
var LinkedListNode = require('./linkedlistnode');
var ValueType = require('./commons/valuetype');

/**
 * @classdesc LinkedList
 *
 * @requires LinkedListIterator
 * @requires LinkedListNode
 * @constructor
 * @augments BaseCollection
 */
var LinkedList = function LinkedList() {
  BaseCollection.call(this, {
    _size: 0,
  });
};

LinkedList.prototype = Object.create(BaseCollection.prototype, {

  constructor: LinkedList,

  /**
   * @private
   */
  _head: {
    value: undefined,
    enumerable: false,
    configurable: false,
    writable: true,
  },

  /**
   * @private
   */
  _tail: {
    value: undefined,
    enumerable: false,
    configurable: false,
    writable: true,
  },

  iterator: {
    value: function() {
      return new LinkedListIterator(this);
    },
    enumerable: false,
    configurable: false,
    writable: false,
  },

  forEach: {
    value: function(callback) {
      var iterator = this.iterator();

      while (iterator.hasNext()) {
        var index = iterator.nextIndex();
        var node = iterator.next();
        if (typeof (callback) === ValueType.FUNCTION) {
          callback(index, node, this);
        }
      }
    },
    enumerable: false,
    configurable: false,
    writable: false,
  },

  /**
   *
   * @method
   * @memberof LinkedList.prototype
   * @return {LinkedListNode}
   */
  first: {
    value: function() {
      return this._head;
    },
    enumerable: false,
    configurable: false,
    writable: false,
  },

  /**
   *
   * @method
   * @memberof LinkedList.prototype
   * @return {LinkedListNode}
   */
  last: {
    value: function() {
      return this._tail;
    },
    enumerable: false,
    configurable: false,
    writable: false,
  },

  /**
   *
   * @method
   * @memberof LinkedList.prototype
   * @param {Value} value
   */
  add: {
    value: function(value) {
      var node = new LinkedListNode(value);

      if (this._head == undefined) {
        this._head = node;
        this._tail = node;
      } else {
        this._tail.next = node;
        node.prev = this._tail;
        this._tail = node;
      }

      this._size++;
    },
    enumerable: false,
    configurable: false,
    writable: false,
  },

  /**
   *
   * @method
   * @memberof LinkedList.prototype
   * @param {Number} index
   * @param {Value} value
   */
  addAt: {
    value: function(index, value) {
      var node = new LinkedListNode(value);

      if (index < 0 || index > this._size) {
        throw 'IndexOutOfBoundsException';
      } else if (index == 0) {
        node.next = this._head;
        this._head.prev = node;
        this._head = node;
      } else if (index == this._size - 1) {
        node.prev = this._tail;
        this._tail.next = node;
        this._tail = node;
      } else {
        var current = this._head;

        var i = index;

        while (i > 0) {
          current = current.next;
          i--;
        }

        var prev = current.prev;
        prev.next = node;
        node.prev = prev;
        node.next = current;
        current.prev = node;
      }

      this._size++;
    },
    enumerable: false,
    configurable: false,
    writable: false,
  },

  /**
   *
   * @method
   * @memberof LinkedList.prototype
   * @param {Value} value
   */
  remove: {
    value: function(value) {
      var current = this._head;

      while (current != undefined) {
        if (current.value == value) {
          var prev = current.prev;
          var next = current.next;

          if (prev != undefined) {
            prev.next = current.next;
          }

          next.prev = current.prev;

          this._size--;

          break;
        }
        current = current.next;
      }
    },
    enumerable: false,
    configurable: false,
    writable: false,
  },

  /**
   *
   * @method
   * @memberof LinkedList.prototype
   * @param {Number} index
   */
  removeAt: {
    value: function(index) {
      if (index < 0 || index >= this._size) {
        throw 'IndexOutOfBoundsException';
      } else if (index == 0) {
        this._head = this._head.next;

        if (this._head != undefined) {
          this._head.prev = undefined;
        }
      } else if (index == this._size - 1) {
        this._tail = this._tail.prev;
        this._tail.next = undefined;
      } else {
        var current = this._head;

        var i = index;

        while (i > 0) {
          current = current.next;
          i--;
        }

        var prev = current.prev;
        var next = current.next;

        prev.next = current.next;
        next.prev = current.prev;
      }

      this._size--;
    },
    enumerable: false,
    configurable: false,
    writable: false,
  },

  /**
   *
   * @method
   * @memberof LinkedList.prototype
   * @param {Number} index
   * @return {LinkedListNode}
   */
  get: {
    value: function(index) {
      if (index < 0 || index >= this._size) {
        throw 'IndexOutOfBoundsException';
      } else if (index == 0) {
        return this._head;
      } else if (index == this._size - 1) {
        return this._tail;
      } else {
        var current = this._head;

        var i = index;

        while (i > 0) {
          current = current.next;
          i--;
        }

        return current;
      }
    },
    enumerable: false,
    configurable: false,
    writable: false,
  },

  /**
   *
   * @method
   * @memberof LinkedList.prototype
   * @param {Number} index
   * @param {Value} value
   */
  set: {
    value: function(index, value) {
      if (index < 0 || index >= this._size) {
        throw 'IndexOutOfBoundsException';
      } else if (index == 0) {
        this._head.value = value;
      } else if (index == this._size - 1) {
        this._tail.value = value;
      } else {
        var current = this._head;

        var i = index;

        while (i > 0) {
          current = current.next;
          i--;
        }

        current.value = value;
      }
    },
    enumerable: false,
    configurable: false,
    writable: false,
  },

  /**
   * @inheritdoc
   * @memberof LinkedList.prototype
   */
  length: {
    get: function() {
      return this._size;
    },
    configurable: false,
  },

  /**
   * @inheritdoc
   * @memberof LinkedList.prototype
   */
  empty: {
    get: function() {
      return this._size == 0;
    },
    configurable: false,
  },

  /**
   * @inheritdoc
   * @method
   * @memberof LinkedList.prototype
   */
  clear: {
    value: function() {
      this._head = undefined;
      this._tail = undefined;
      this._size = 0;
    },
    configurable: false,
  },
});

module.exports = LinkedList;
