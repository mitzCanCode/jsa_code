function Painting(name, painter, year) {
  this.name = name;
  this.painter = painter;
  this.year = year;
}

let paintings = [
  new Painting("Mona Lisa", "Leonardo da Vinci", 1503),
  new Painting("The Last Supper", "Leonardo da Vinci", 1495),
  new Painting("Starry Night", "Vincent van Gogh", 1889),
  new Painting("The Scream", "Edvard Munch", 1893),
  new Painting("Guernica", "Pablo Picasso", 1937),
  new Painting("The Kiss", "Gustav Klimt", 1907),
  new Painting("Girl With a Pearl Earring", "Johannes Vermeer", 1665),
  new Painting("The Birth of Venus", "Sandro Botticelli", 1485),
  new Painting("Las Meninas", "Diego Velázquez", 1656),
  new Painting("The Creation of Adam", "Michelangelo", 1512),
];

for (let painting of paintings) {
  console.log(`${painting.name}, ${painting.painter}, ${painting.year}`);
}
