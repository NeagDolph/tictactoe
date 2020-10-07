from __future__ import absolute_import, division, print_function, unicode_literals

# TensorFlow and tf.keras
from tensorflow import keras
import numpy as np
import random


print("[INFO] loading pre-trained network...")
model = keras.models.load_model("saved_model.model")

model.compile(optimizer='Nadam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

prediction = np.argmax(model.predict(np.array([[0, 0, 0, 0, 0, 0, 0, 0, 0]])))

print("PRED", prediction)

import random
try:
    raw_input()
except NameError:
    raw_input = input

# This idea is shamelessly stolen from!
# https://codereview.stackexchange.com/questions/108738/python-tic-tac-toe-game
WIN_COMBINATIONS = [(1, 2, 3),
                    (4, 5, 6),
                    (7, 8, 9),
                    (1, 4, 7),
                    (2, 5, 8),
                    (3, 6, 9),
                    (1, 5, 9),
                    (3, 5, 7)]

def display_board(board):
    print('''   |   |  
 {} | {} | {}
   |   |
-----------
   |   |
 {} | {} | {} 
   |   |
-----------
   |   |
 {} | {} | {}
   |   |'''.format(*board[1:10]))

def player_input():
    marker = ' '
    while not (marker == 'X' or marker == 'O'):
        marker = raw_input('Player 1, Choose O or X to play!').upper()
    if marker == 'X':
        return {'Player 1': 'X', 'Player 2': 'O'}
    else:
        return {'Player 2': 'X', 'Player 1': 'O'}

def win_check (board):
    return any(board[a] != ' ' and board[a] == board[b] == board[c] for a, b, c in WIN_COMBINATIONS)

def choose_first(players):
    random_player = 'Player {}'.format(1)
    return random_player, players[random_player]

def full_check (board):
    return all(b != ' ' for b in board)

def player_choice(board, name, player_marker):
    while True:
        # try:
            print("BOAFD", board)
            adjboard = [x if x != ' ' else 0 for x in board[1:]]
            adjboard = [x if x != 'X' else 0.5 for x in adjboard]
            adjboard = [x if x != 'O' else 1.0 for x in adjboard]

            print("ADJBOAFD", adjboard)


            if player_marker == "O":
                return np.argmax(model.predict(np.array([adjboard]))) + 1
            else:
                position = int(raw_input('Choose number input 1-9'))
                if position in range(1, 9) and board[position] == ' ':
                    return position
        # except ValueError:
            # pass

def replay():
    return raw_input('Do you want to play again? Enter Yes or No: ').lower().startswith('y')

def ttt():
    board = [' ' for _ in range(10)]
    players = player_input()
    name, player_marker = choose_first(players)
    print('{} with marker {} will go first.'.format(name, player_marker))
    while True:
        position = player_choice(board, name, player_marker)
        board[position] = player_marker
        display_board(board)
        if win_check(board):
            print('Congratulations {}! You have won the game!'.format(name))
            break

        if full_check(board):
            print('Congratulations {} and {}! You have a tie!'.format(players.keys()))
            break

        name = 'Player 1' if name == 'Player 2' else 'Player 2'
        player_marker = players[name]
        print(name, player_marker)

if __name__ == '__main__':
    print('Welcome to Tic Tac Toe Game!')
    while True:
        ttt()
        if not replay():
            break