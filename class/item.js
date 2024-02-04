class Item {
  constructor(name, description, value = 0) {
    this.name = name;
    this.description = description;
    this.value = value;
  }

  inspect() {
    console.log(`You see a ${this.name}. ${this.description}`);
  }
}

module.exports = {
  Item,
};
