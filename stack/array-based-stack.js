/** */
class Stack {
  _elements = [];

  constructor(value) {
    if (typeof value !== "undefined")
      this._elements = Array.isArray(value) ? value : [value];
  }

  push(value) {
    if (typeof value === "undefined")
      throw new Error("Insertable value isn't presented");

    this._elements.push(value);
  }

  pop() {
    if (!this._elements.length) return null;

    return this._elements.pop();
  }

  peek() {
    if (!this._elements.length) return null;

    return this._elements[this._elements.length - 1];
  }

  count() {
    return this._elements.length;
  }
}

/** */ 
const StackFunc = (value) => {
  let _elements = [];

  if (typeof value !== "undefined")
    _elements = Array.isArray(value) ? value : [value];

  return {
    push: (value) => {
      if (typeof value === "undefined")
        throw new Error("Insertable value isn't presented");

      _elements.push(value);
    },
    pop: () => {
      if (!_elements.length) return null;

      return _elements.pop();
    },
    peek: () => {
      if (!_elements.length) return null;

      return _elements[_elements.length - 1];
    },
    count: () => _elements.length,
  };
};
