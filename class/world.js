const { Room } = require('./room');
const { Item } = require('./item');
const { Food } = require('./food');

class World {
  constructor() {
    this.rooms = {};
  }

  loadWorld(worldData) {
    const roomList = worldData.rooms;
    const itemList = worldData.items;

    // Instantiate new room objects
    for (let i = 0; i < roomList.length; i++) {
      const roomData = roomList[i];
      const newRoom = new Room(roomData.name, roomData.description);
      this.rooms[roomData.id] = newRoom;
    }

    // Connect rooms by ID
    for (let i = 0; i < roomList.length; i++) {
      const roomID = roomList[i].id;
      const roomConnections = roomList[i].exits;

      for (const direction in roomConnections) {
        const connectedRoomID = roomConnections[direction];
        const roomToConnect = this.rooms[connectedRoomID];
        this.rooms[roomID].connectRooms(direction, roomToConnect);
      }
    }

    // Instantiate items
    for (let i = 0; i < itemList.length; i++) {
      const itemData = itemList[i];
      let newItem;

      if (itemData.isFood) {
        newItem = new Food(itemData.name, itemData.description, itemData.nutrition);
      } else {
        newItem = new Item(itemData.name, itemData.description);
      }

      const itemRoom = this.rooms[itemData.room];
      itemRoom.items.push(newItem);
    }
  }
}

module.exports = {
  World,
};
