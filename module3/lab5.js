class Point {
  type = "point";

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  type = "line";

  constructor(pointsObjArray) {
    this.points = [];
    for (let point of pointsObjArray) {
      try {
        this.points.push(new Point(...point));
      } catch (Error) {
        throw new Error("There was an issue adding point to line");
      }
    }
  }
}

class Figure {
  constructor(startingElements = []) {
    this.elements = {
      points: [],
      lines: [],
    };
    for (let element of startingElements) {
      if (element.type === "line") {
        elements.lines.push(element);
      } else if (element.type === "point") {
        elements.points.push(element);
      } else {
        console.log("Invalid point skipping...");
      }
    }
  }

  toJSON() {
    return JSON.stringify(this.elements);
  }

  addPoint(x, y) {
    this.elements.points.push(new Point(x, y));
  }

  addLine(points) {
    this.elements.lines.push(new Line(points));
  }

  fromJSON(json, add) {
    if (add) {
      let parsedJSON = JSON.parse(json);
      let tempPoints = parsedJSON.points;
      let tempLines = parsedJSON.lines;
      this.elements.points.splice(
        this.elements.points.length - 1,
        0,
        ...tempPoints,
      );
      this.elements.lines.splice(
        this.elements.lines.length - 1,
        0,
        ...tempLines,
      );
    } else {
      this.elements = JSON.parse(json);
    }
  }

  deleteAll() {
    this.elements.points = [];
    this.elements.lines = [];
  }

  removeDuplicates() {
    if (this.elements.lines) {
      let tempLines = new Set(this.elements.lines);
      this.elements.lines = Array.from(tempLines.values());
    }
    if (this.elements.points) {
      let tempPoints = new Set(this.elements.points);
      this.elements.points = Array.from(tempPoints.values());
    }
  }
}

let f = new Figure();
f.addPoint(10, 20);
f.addPoint(10, 10);
f.addLine([
  [10, 20],
  [30, 40],
  [50, 60],
]);
let json = f.toJSON();
console.log(json);
f.fromJSON(json, true);
console.log(f.elements.points.length);
console.log(f.elements.lines.length);
f.fromJSON(
  '{"points":[{"type":"point","x":10,"y":20},{"type":"point","x":10,"y":30},{"type":"point","x":10,"y":-30},{"type":"point","x":10,"y":20},{"type":"point","x":20,"y":20},{"type":"point","x":30,"y":20},{"type":"point","x":130,"y":20},{"type":"point","x":30,"y":20},{"type":"point","x":0,"y":20},{"type":"point","x":0,"y":-20},{"type":"point","x":0,"y":20}],"lines":[{"type":"line","points":[{"x":0,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":30,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":30,"y":0},{"x":10,"y":-10},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":0,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]}]}',
);
console.log(f.elements.points.length);
console.log(f.elements.lines.length);
