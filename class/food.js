const { Item } = require('./item');

class Edible extends Item {
  constructor(name, description, value = 0, nutrition = 0) {
    super(name, description, value);
    this.nutrition = nutrition;
  }

  eat() {
    console.log(`You have consumed ${this.name}. It was delicious!`);
  }
}

module.exports = {
  Edible,
};
