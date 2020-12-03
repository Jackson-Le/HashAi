from random import *
keys = {}

def behavior(state, context):

  # Initialize data from current state and context
  neighbors = context.neighbors()
  movement = state.get("movement")
  position = state.get("position")
  velocity = state.get("velocity")
  num = state.get("num")
  obj = state.get("obj")
  state.set("search_radius", 1)

  #Neighbors
  cars_in_front_line = carsFrontLine(position,movement,neighbors)
  cars_in_front = carsFront(position,movement,neighbors)
  
  # Acceleration
  acceleration = acceler(movement,cars_in_front_line)

  # Get closest traffic light signal to get instructions for the car. 
  # Possible signals are red or green
  signals = list(filter(lambda n: "signal.py" in n["behaviors"], neighbors))
  for signal in signals:
    if movement == "up" and signal["position"][1] == -1:
      state.set("signal_id", signal["agent_id"])
    if movement == "right" and signal["position"][0] == -1:
      state.set("signal_id", signal["agent_id"])
    if movement == "right" and signal["position"][0]!= -1:
      state.set("signal_id",signal["agent_id"])

  # Get status of the current traffic light signal assigned to the car.
  signal = list(filter(lambda n: n["agent_id"] == state.get("signal_id"), neighbors))
  if len(signal):
    signal = signal[0]
    signal_color = signal["color"]
    dx = signal["position"][0] - position[0]
    dy = signal["position"][1] - position[1]
    # If red --> decelerate, if green --> accelerate
    if signal_color == "red" and ((dx < 1 and dy == 0) or (dx == 0 and dy < 1)):
      acceleration = [-0.1, 0] if movement == "right" else [0, -0.1]
    elif signal_color == "green" and acceleration == [0,0]:
      acceleration = [0,0.1] if movement == "up" else [0.1,0]

  # Updating the movement (right, up) and position of the car
  # Cars can change position only on the "first road" on the x-axis, with a probability 0.1.
  if (((abs(position[1])<0.5 and movement == "up") or (abs(position[0])<0.5 and movement=="right")) and random.random()<0.1):
    if movement=="up":
      updated_movement,updated_position, updated_velocity = turn(movement,[position[0],0],velocity,acceleration)
    else:
      updated_movement,updated_position, updated_velocity = turn(movement,[0,position[1]],velocity,acceleration)
    state.set("movement",updated_movement)  
  else:
    updated_position, updated_velocity = newPos(position,velocity,acceleration)
  state.set("velocity", updated_velocity)
  state.set("position", updated_position)

  #Remove agent if car reaches end of the road
  if updated_position[0] > 35 or updated_position[1] > 26:
    state.add_message("HASH", "remove_agent")
  return state


''' Functions '''

# This function finds the cars in front of the agent that are on the same direction path.
def carsFrontLine(pos,mov,neighb):  
  carsFrontLine = []
  if mov == "right":
    carsFrontLine = list(filter(lambda n: n["position"][0] > pos[0] and n["position"][1]==pos[1] and "car.py" in n["behaviors"], neighb))
  elif mov == "up":
    carsFrontLine = list(filter(lambda n: n["position"][1] > pos[1] and n["position"][0] == pos[0]and "car.py" in n["behaviors"], neighb))
  return carsFrontLine

# This function finds the cars in front of the agent, independently of the direction path. 
def carsFront(pos,mov,neighb):
  carsFront = []
  if mov == "right":
    carsFront = list(filter(lambda n: n["position"][0] > pos[0] and "car.py" in n["behaviors"], neighb))
  elif mov == "up":
    carsFront = list(filter(lambda n: n["position"][1] > pos[1] and "car.py" in n["behaviors"], neighb))
  return carsFront

# Calculate acceleration
def acceler(mov,carsF):
  acceleration = [0, 0]
  if len(carsF) > 0:
    acceleration = [-0.05, 0] if mov == "right" else [0, -0.05]
  else:
    acceleration = [0.005, 0] if mov == "right" else [0, 0.005]
  return acceleration

# Update position 
def newPos(pos,vel,acc):
  vel[0]=max(vel[0]+acc[0],0)
  vel[1]=max(vel[1]+acc[1],0)
  pos[0]+=vel[0]
  pos[1]+=vel[1]
  return pos,vel

# Change the movement (right or up) of the car. 
def turn(mov,pos,vel,acc):
  if mov == "right": 
    mov="up"
  else: 
    mov = "right"
  position,velocity = newPos(pos,[vel[1],vel[0]],[acc[1],acc[0]])
  return mov,position,velocity
