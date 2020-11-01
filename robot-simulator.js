//
// This is only a SKELETON file for the 'Robot Simulator' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class InvalidInputError extends Error {
  constructor() {
    super();
  }
}

export class Robot {
    
  directions = ['east', 'west', 'north', 'south'];

  state = {
    orient: undefined,
    coordinates: undefined,
    instructions: undefined
  };

  orient(currentDirection) {
    if (!this.directions.includes(currentDirection)) {
      throw new InvalidInputError();
    }
    this.state.orient = currentDirection;
  }

  get bearing() {
    return this.state.orient;
  }

  get coordinates() {
    return this.state.coordinates;
  }

  turnRight = () => {
    switch (this.state.orient) {
      case 'east':
        this.state.orient = 'south';
            break;
      case 'west':
        this.state.orient = 'north';
            break;
      case 'north':
        this.state.orient = 'east';
            break;
      case 'south':
        this.state.orient = 'west';
    }
    return this;
  }

  turnLeft = () => {
    switch (this.state.orient) {
      case 'east':
        this.state.orient = 'north';
        break;
      case 'west':
        this.state.orient = 'south';
        break;
      case 'north':
        this.state.orient = 'west';
        break;
      case 'south':
        this.state.orient = 'east';
    }
    return this;
  }

  at(x,y) {
    this.state.coordinates = [x, y];
  }

  advance = () => {
    switch (this.state.orient) {
      case 'east':
        this.state.coordinates[0] += 1;
        break;
      case 'west':
        this.state.coordinates[0] -= 1;
        break;
      case 'north':
        this.state.coordinates[1] += 1;
        break;
      case 'south':
        this.state.coordinates[1] -= 1;
    }
    return this;
  }

  static instructions(code) {
    const codes = {
      'L':'turnLeft',
      'R':'turnRight',
      'A':'advance'
    };
    return [...code].map(letter => codes[letter]);
  }

  place(location) {
    const {x,y, direction} = location;
    this.orient(direction);
    this.at(x,y);
    return this;
  }

  evaluate(code) {
    const codes={
      'L':this.turnLeft,
      'R':this.turnRight,
      'A':this.advance
    };
    return [...code].forEach(order => codes[order]());
  }
}
