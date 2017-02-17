
import random

def q_learn(game, alpha, gamma, iterations, select_action):
    Q = {} # map from state-action-pairs to value estimates
    N = {} # map from state-action-pairs to count
    for i in range(iterations):
        game.restart()
        state = game.get_state()
        while not game.is_over():
            act = select_action(state, game.get_actions(state), Q, N)
            if (state, act) not in N:
                N[(state, act)] = 0
            N[(state, act)] += 1

            next_state, reward = game.do(act)
            if (state, act) not in Q:
                Q[(state, act)] = 0
            Q[(state, act)] = (1-alpha) * Q[(state, act)] + alpha * (reward + gamma * max_q(game, Q, next_state))
            state = next_state
    return Q


def max_q(game, Q, state):
    rtn = 0
    for act in game.get_actions(state):
        if ((state, act) in Q) and (Q[(state, act)] > rtn):
            rtn = Q[(state, act)]
    return rtn

def epsilon_select(state, actions, Q, N):
    epsilon = 0.1
    if random.random() < epsilon:
        # choose move at random
        return random.choice(actions)
    else:
        # choose best move
        best_act = None
        best_val = -1e300
        for act in actions:
            val = 0
            if (state, act) in Q:
                val = Q[(state, act)]
            if val > best_val:
                best_val = val
                best_act = act
        return best_act


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

    def get_actions(self, state):
        if state == 0:
            return ["left"]
        elif state == 1:
            return ["left", "right"]
        elif state == 2:
            return ["exit"]
        else:
            return []

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

print q_learn(game, 0.1, 0.9, 1000, epsilon_select)
