function Images() {
  this.images = [];

  this.contains = function (title) {
    for (let image of this.images) {
      if (image.title === title) {
        return true;
      }
    }
    return false;
  };

  this.add = function (title, artist, date) {
    this.images.push({ title, artist, date });
  };

  this.show = function () {
    for (let image of this.images) {
      console.log(`->${image.title} (${image.artist}, ${image.date})`);
    }
  };

  this.clear = function () {
    this.images = [];
  };

  this.edit = function (title, artist, date) {
    let found = false;
    for (let image of this.images) {
      if (image.title === title) {
        found = true;
        image.artist = artist;
        image.date = date;
        break;
      }
    }
    if (!found) {
      console.log("Couldn't edit specified image. (Couldn't be found)");
    }
  };

  this.delete = function (title) {
    let i = 0;
    let deleted = false;
    for (let image of this.images) {
      if (image.title === title) {
        this.images.splice(i, 1);
        deleted = true;
      }
      i++;
    }
    if (!deleted) {
      console.log("Couldn't delete specified image. (Couldn't be found)");
    }
  };
}

let images = new Images();

console.log("---------Add result---------");
images.add("Mona Lisa", "Leonardo da Vinci", 1503);
images.add("The Last Supper", "Leonardo da Vinci", 1495);
images.add("The Starry Night", "Vincent van Gogh", 1889);
images.show();
console.log("------End of result------");

console.log("\n");

console.log("---------Edit result---------");
images.edit("Mona Lisa", "Leonardo da Vinci", 1504);
images.show();
console.log("------End of result------");

console.log("\n");

console.log("---------Delete result---------");
images.delete("The Last Supper");
images.show();
console.log("------End of result------");

console.log("\n");

console.log("---------Clear result---------");
images.clear();
images.show();
console.log("------End of result------");
