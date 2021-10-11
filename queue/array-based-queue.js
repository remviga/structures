/** */
class Queue {
  _elements = [];

  constructor(value) {
    if (typeof value !== "undefined")
      this._elements = Array.isArray(value) ? value : [value];
  }

  enqueue(value) {
    if (typeof value === "undefined")
      throw new Error("Insertable value isn't presented");

    this._elements.push(value);
  }

  dequeue() {
    if (!this._elements.length) return null;

    const [first, ...queue] = this._elements;

    this._elements = queue || [];

    return first;
  }

  isEmpty() {
    return !Boolean(this._elements.length);
  }
}

/** */
const QueueFunc = (value) => {
  let _elements = [];

  if (typeof value !== "undefined")
    _elements = Array.isArray(value) ? value : [value];

  return {
    enqueue: (value) => {
      if (typeof value === "undefined")
        throw new Error("Insertable value isn't presented");

      _elements.push(value);
    },
    dequeue: () => {
      if (!_elements.length) return null;

      const [first, ...queue] = _elements;

      _elements = queue || [];

      return first;
    },
  };
};
