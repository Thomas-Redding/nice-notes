
import random

def td_learn(game, policy, alpha, gamma, iterations):
    V = {} # map from states to value estimates
    V[game.get_state()] = 0
    for i in range(iterations):
        game.restart()
        state = game.get_state()
        while not game.is_over():
            act = policy[state]
            next_state, reward = game.do(act)
            if next_state not in V:
                V[next_state] = 0
            V[state] = (1-alpha) * V[state] + alpha * (reward + gamma * V[next_state])
            state = next_state
    return V

"""
Imagine the world consisting of states 0, 1, and 2. 
Your actions are:
    - In 0, you must move right.
    - In 1, you can move left or right.
    - In 2, you exit.
The possible states you can end up in are as follows:
    - (0, right) --> {0: 20%, 1: 80%}
    - (1, left) --> {0: 70%, 1: 30%}
    - (1, right) --> {1: 15%, 2: 85%}
    - (2, exit) --> done
And the rewards are
    - R(s, left, s') = -1
    - R(s, right, s') = 1
    - R(s, exit, s') = 3
"""

class Game:
    def __init__(self):
        self.start_state = 1
        self.restart()

    def restart(self):
        self.current_state = self.start_state

    def get_state(self):
        return self.current_state

    def is_over(self):
        return self.current_state == "done"

    def do(self, act):
        if self.current_state == 0:
            if random.random() < 0.8:
                self.current_state = 1
            return (self.current_state, 1)
        elif self.current_state == 1:
            if act == "left":
                if random.random() < 0.7:
                    self.current_state = 0
                return (self.current_state, -1)
            else:
                if random.random() < 0.85:
                    self.current_state = 2
                return (self.current_state, 1)
        else:
            self.current_state = "done"
            return (self.current_state, 3)

game = Game()
policy = {
    0: "right",
    1: "right",
    2: "exit"
}


print td_learn(game, policy, 0.1, 0.9, 10000)
