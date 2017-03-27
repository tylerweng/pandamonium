## Pandamonium

### Background

Pandamonium is a game in which the objective is to get the panda onto
the ground. By clicking on a tile, all connected tiles of the same color
get destroyed. The player loses if the panda is stacked to the top of
the game board (similar to Tetris).

### Functionality & MVP  

Users will be able to:

- [ ] Start and reset the game state
- [ ] Select a tile to destroy

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production Readme

### Wireframes

This app will consist of a single screen with game board, game controls,
and nav links to the Github, my LinkedIn, and the About modal.

![wireframes](images/js_wireframe.jpeg)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic
- `p5.js` with `HTML5 Canvas` for DOM manipulation and rendering
- Webpack to bundle and serve up the various scripts

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: Handle game state logic and rendering the appropriate elements
to the DOM

`tile.js`: Handle tile selection and destruction

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and learning `three.js`. Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `p5.js`.  

Goals:

- Get a green bundle with `webpack`
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
