# This file defines the behavior of traffic lights signals.
# It will update their color once some requirements are met.

keys = {}

def behavior(state, context):
  # Instantiate variables from the state and context.
  messages = context.messages()
  neighbors = context.neighbors()
  position = state.get("position")
  state.set("search_radius", 4) # --> this is the radius surrounding each signal within which we will observe the number of cars 

  # Check if other signals need to change colors.
  change_color = list(filter(lambda m: m["type"] == "change_color", messages)) # Check if a message has been sent, requesting a change of color.
  if (len(change_color) or state.get("change_color") == True) and state.get("color")!="blue": 
    # --> changes color between red and green (does not affect "blue" agents that represent the end of a road.)
    color = "red" if state.get("color") == "green" else "green"
    state.set("color", color)
    state.set("counter", 0)
    state.set("change_color", False)

  # Check how many cars are waiting for the light to change.
  cars_waiting = 0
  if position[0] == 0: 
    cars_waiting = len(list(filter(lambda n: n["position"][0] == 0 and n["position"][1] < 0 and "car.py" in n["behaviors"], neighbors)))
  else:
    cars_waiting = len(list(filter(lambda n: n["position"][1] == 0 and n["position"][0] < 0 and "car.py" in n["behaviors"], neighbors)))

  # Signal color only changes when 50 steps have passed and 4 or more cars are
  # waiting and the current color of the signal is red OR after 75 steps. 
  if (state.get("counter") > 50 and cars_waiting >= 4 and state.get("color") == "red" and state.get("intersection")==1) or (state.get("counter") > 75):
    # Send message if ready to change
    other_signals = list(filter(lambda n: "signal.py" in n["behaviors"], neighbors))
    state.set("change_color", True)

    for signal in other_signals: #changes all other signals
      state.add_message(signal["agent_id"], "change_color")

  state.set("counter", state.get("counter") + 1)
  return state
