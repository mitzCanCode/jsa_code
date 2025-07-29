function Image(title, artist, date) {
  this.title = title;
  this.artist = artist;
  this.date = date;
}

function getImage(title, artist, date) {
  return {
    title: title,
    artist: artist,
    date: date,
  };
}

let images1 = [
  new Image("Mona Lisa", "Leonardo da Vinci", 1503),
  new Image("The Last Supper", "Leonardo da Vinci", 1495),
  new Image("Starry Night", "Vincent van Gogh", 1889),
  new Image("The Scream", "Edvard Munch", 1893),
  new Image("Guernica", "Pablo Picasso", 1937),
  new Image("The Kiss", "Gustav Klimt", 1907),
  new Image("Girl With a Pearl Earring", "Johannes Vermeer", 1665),
  new Image("The Birth of Venus", "Sandro Botticelli", 1485),
  new Image("Las Meninas", "Diego Velázquez", 1656),
  new Image("The Creation of Adam", "Michelangelo", 1512),
];

let images2 = [];

for (let image of images1) {
  images2.push(getImage(image.title, image.artist, image.date));
}

for (let image of images2) {
  console.log(`${image.title}, ${image.artist}, ${image.date}`);
}
