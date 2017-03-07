
import random

def value_iteration(states_set, actions_func, transition_func, reward_func, gamma, iterations):
    V = {} # map from states to value estimates
    for state in states_set:
        V[state] = 0
    for i in range(iterations):
        new_V = {}
        for state in states_set:
            best_action_value = -1e300
            actions = actions_func(state)
            if len(actions) == 0:
                new_V[state] = 0
                continue
            for act in actions:
                exp_value_of_act = 0
                transitions = transition_func(state, act)
                for trans in transitions:
                    new_state, prob = trans
                    r = reward_func(state, act, new_state)
                    exp_value_of_act += prob * (r + gamma * V[new_state])
                if exp_value_of_act > best_action_value:
                    best_action_value = exp_value_of_act
            new_V[state] = best_action_value
        V = new_V
    return V

states_set = [0, 1, 2, "done"]
def actions_func(state):
    if state == 0:
        return ["right"]
    elif state == 1:
        return ["left", "right"]
    elif state == 2:
        return ["exit"]
    else:
        return []

def transition_func(state, action):
    if state == 0:
        return [(0, 0.2), (1, 0.8)]
    elif state == 1:
        if action == "left":
            return [(0, 0.7), (1, 0.3)]
        else:
            return [(1, 0.15), (2, 0.85)]
    elif state == 2:
        return [("done", 1)]
    else:
        return []

def reward_func(state, action, new_state):
    if action == "left":
        return -1
    elif action == "right":
        return 1
    else:
        return 3


print value_iteration(states_set, actions_func, transition_func, reward_func, 0.9, 100)
