const { Item } = require('./item');

class Player {
  constructor(name, startingRoom) {
    this.name = name;
    this.currentRoom = startingRoom;
    this.items = [];
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    if (nextRoom) {
      this.currentRoom = nextRoom;
      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    const itemToTake = this.currentRoom.getItemByName(itemName);

    if (itemToTake) {
      this.items.push(itemToTake);
      this.currentRoom.items = this.currentRoom.items.filter(item => item !== itemToTake);
      console.log(`${this.name} picked up ${itemToTake.name}.`);
    } else {
      console.log(`${this.name} cannot find ${itemName} in the room.`);
    }
  }

  dropItem(itemName) {
    const itemToDrop = this.getItemByName(itemName);

    if (itemToDrop) {
      this.currentRoom.items.push(itemToDrop);
      this.items = this.items.filter(item => item !== itemToDrop);
      console.log(`${this.name} dropped ${itemToDrop.name}.`);
    } else {
      console.log(`${this.name} is not carrying ${itemName}.`);
    }
  }

  getItemByName(name) {
    return this.items.find(item => item.name.toLowerCase() === name.toLowerCase());
  }

  eatItem(itemName) {
    const foodItem = this.getItemByName(itemName);

    if (foodItem) {
      console.log(`${this.name} enjoyed eating ${foodItem.name}.`);
      this.items = this.items.filter(item => item !== foodItem);
    } else {
      console.log(`${this.name} does not have ${itemName} to eat.`);
    }
  }
}

module.exports = {
  Player,
};
