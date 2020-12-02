### ANALYSIS (1/2)
from random import *
keys = {}

def behavior(state, context):

  # CONTEXT/STATE
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

  # Get closest signal
  signals = list(filter(lambda n: "signal.py" in n["behaviors"], neighbors))
  for signal in signals:
    if movement == "up" and signal["position"][1] == -1:
      state.set("signal_id", signal["agent_id"])
    if movement == "right" and signal["position"][0] == -1:
      state.set("signal_id", signal["agent_id"])
    if movement == "right" and signal["position"][0]!= -1:
      state.set("signal_id",signal["agent_id"])
  # Get current status of current signal
  signal = list(filter(lambda n: n["agent_id"] == state.get("signal_id"), neighbors))
  #signal = sign(position,movement,neighbors)
  #if len(signal):
  #state.set("signal_id",signal["agent_id"])
  if len(signal): #and (position[0] <= -1 or position[1] <= -1):
    signal = signal[0]
    signal_color = signal["color"]
    dx = signal["position"][0] - position[0]
    dy = signal["position"][1] - position[1]
    if signal_color == "red" and ((dx < 1 and dy == 0) or (dx == 0 and dy < 1)):
      acceleration = [-0.1, 0] if movement == "right" else [0, -0.1]
    elif signal_color == "green" and acceleration == [0,0]:
      acceleration = [0,0.1] if movement == "up" else [0.1,0]



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
  #Remove agent if car reaches end of the road - SEE LINE 54 for a replacement
  """HOW TO ACCESS GLOBAL VAR??"""
  if updated_position[0] > 35 or updated_position[1] > 26:
    state.add_message("HASH", "remove_agent")

  return state






''' Functions '''

def carsFrontLine(pos,mov,neighb):  # Check if there are cars in front of current agent
  carsFrontLine = []
  if mov == "right":
    carsFrontLine = list(filter(lambda n: n["position"][0] > pos[0] and n["position"][1]==pos[1] and "car.py" in n["behaviors"], neighb))
  elif mov == "up":
    carsFrontLine = list(filter(lambda n: n["position"][1] > pos[1] and n["position"][0] == pos[0]and "car.py" in n["behaviors"], neighb))
  return carsFrontLine

def carsFront(pos,mov,neighb):
  carsFront = []
  if mov == "right":
    carsFront = list(filter(lambda n: n["position"][0] > pos[0] and "car.py" in n["behaviors"], neighb))
  elif mov == "up":
    carsFront = list(filter(lambda n: n["position"][1] > pos[1] and "car.py" in n["behaviors"], neighb))
  return carsFront

def acceler(mov,carsF):
  acceleration = [0, 0]
  if len(carsF) > 0:
    acceleration = [-0.05, 0] if mov == "right" else [0, -0.05]
  else:
    acceleration = [0.005, 0] if mov == "right" else [0, 0.005]
  return acceleration

def newPos(pos,vel,acc):
  vel[0]=max(vel[0]+acc[0],0)
  vel[1]=max(vel[1]+acc[1],0)
  pos[0]+=vel[0]
  pos[1]+=vel[1]
  return pos,vel

def turn(mov,pos,vel,acc):
  if mov == "right": 
    mov="up"
  else: 
    mov = "right"
  position,velocity = newPos(pos,[vel[1],vel[0]],[acc[1],acc[0]])
  return mov,position,velocity


''' Tests '''

#def sign(pos,mov,neighb):
#  if mov=="right":
#    signals = list(filter(lambda n: "signal.py" in n["behaviors"] and pos[0]<n["position"][0], neighb))
#  else:
#    signals = list(filter(lambda n: "signal.py" in n["behaviors"] and pos[1]<n["position"][1], neighb))
#  dist=[(pos[0]-n["position"][0])**2+(pos[1]-n["position"][1])**2 for n in signals]
#  if len(signals):
#    signal = signals[dist.index(min(dist))]
#  else: 
#    signal=list(filter(lambda n: "signal.py" in n["behaviors"], neighb))
#  return signal

#  if len(cars_in_front) > len(cars_in_front_line):
#    if acceleration!=[0,0]:
#      if movement=="right":
#        position[1]+=0.1
#      else:
#        position[0]+=0.1

