# CS50x - Tic Tac Toe

## Video Demo:  

https://www.youtube.com/watch?v=jnWGF0sQf5U

## Description:

Source code for my CS50x's final project

The project is a Tic Tac Toe Game, running in the browser. **Built with HTML, CSS and JS**. 

The game allows you to choose between **3 game modes** : 

- **1 player (easy)** : play against an easy AI, that will randomly pick a case
- **1 player (difficult)** : play against a difficult AI. This time, the AI will be using the Minimax algorithm, that won't let you win. This algorithm was integrated in this tic tac toe game, with the help of the tutorial from The Coding Train (links are available below, and in the JS file)
- **2 players** : play against another human player

At the end of each game, the scores for each players are displayed. And the number of games played are also tracked. You'll get options to play again or, change game mode.

**About the Minimax tutorial**:

Tic Tac Toe AI with Minimax Algorithm
The Coding Train / Daniel Shiffman

- https://thecodingtrain.com/CodingChallenges/154-tic-tac-toe-minimax.html
- https://www.youtube.com/watch?v=trKjYdBASyQ
- https://editor.p5js.org/codingtrain/sketches/0zyUhZdJD
- Repos: https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_154_Tic_Tac_Toe_Minimax/P5

**Icons (cross & circle's svg files) from Flaticon**:

Freepik: https://www.freepik.com
Pixel perfect: https://www.flaticon.com/authors/pixel-perfect

## Possible improvements:

- Improve the minimax algorithm, by adding **alpha-beta pruning** : it is useful to recall that the minimax algorithm is using a search tree to work and calculate every possible moves for the AI. Using the alpha-beta pruning algorithm, within the minimax algorithm, permits to reduce the number of nodes, in the search tree, thus making the minimax algorithm, more efficient.
- For the minimax algorithm : **use depth**, for better scoring calculation
- **Adding CSS animations** to make the game looks better
- Improve the JS script to **make it more "ES compliant"** (more arrow functions, for/of loop...)
- **Reduce / Optimize the numbers of functions** in the script to make it lighter

## How to launch the game:

As it is a web game, simply using HTML, CSS and JS, there are no particular things to do: you can just download the source code and run it, on a local server, and you should be able to test the game. Or even just open the index.html file, by double clicking it, on your file explorer.

**Get the code**:

If you don't have the BASH terminal on your system, just download the ZIP file, on the github page of the project

If you have the BASH terminal, then type the following command : 

~~~
git clone https://github.com/dtettarasar/CS50-tic-tac-toe.git
~~~

You can then open the project, by running the project on a local server. 

If you have Visual Studio Code, you can use the **Live Server** extension

Or you can use **Browser Sync**

- link : https://browsersync.io/

Make sure, Node JS is installed on your system, to use Browser sync

Then install Browser Sync: 

~~~
sudo npm install -g browser-sync
~~~

And launch it: in the terminal, go in the directory, where all the source files are, and then type the following command: 

~~~
browser-sync start --server --files *
~~~


Have fun with the game!
This was CS50x!
