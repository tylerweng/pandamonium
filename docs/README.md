## Pandamonium

### Background

Pandamonium is a game in which the objective is to get the panda onto
the ground. By clicking on a tile, all connected tiles of the same color
get destroyed if there are 3 or more contiguous present. The player
loses if they run out of moves.

### Functionality & MVP  

Users will be able to:

- [ ] Select a tile to destroy
- [ ] Mute/unmute audio and adjust volume

In addition, this project will include:

- [ ] An instructions modal
- [ ] A production Readme

### Wireframes

This app will consist of a single screen with game board, game controls,
and nav links to the Github and my LinkedIn.

![wireframe](docs/wireframe.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic
- `p5.js` with `HTML5 Canvas` for DOM manipulation and rendering
- `anime.js` for destruction effects

I will create three primary scripts involved in this project:

`sketch.js`: Render the appropriate elements to the DOM

`board.js`: Handle game state logic

`tile.js`: Handle tile selection and destruction

### Implementation Timeline

**Day 1**: Setup all get familiar with all necessary libraries. Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `p5.js`.  

Goals:

- Learn enough `p5.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `p5.js` Library. First,
build out the `Tile` object to connect to the `Board` object.  Then, create
and render the board.

Goals:

- Complete the `tile.js` module
- Render a tile onto the board.

**Day 3**: Implement game state logic and initialization of board with
randomly generated tile positions.

Goals:

- Build out `Board` object
- Render all tiles onto board as appropriate
- Handle new tile placement logic
- Handle victory logic
- Handle defeat logic

**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.

Goals:

- Refine UI/UX
- Styling
- Background music with controls

### Bonus features

- [ ] Allow multiple levels with game getting progressively more difficult
