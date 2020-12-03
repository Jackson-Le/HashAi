# This function creates the roads and intersections on the 3DViewer. 
## The intersections are spaced out every 10 units (both vertically and horizontally).
## The x axis ranges from -5 to 35, and the y axis ranges from -5 to 25, creating a 40x30 square.
### On the latest hash.ai version, road blocks are not visible anymore - this code only gave visual indications
### except for the signals that give instructions to the cars, as well as some endpoints from which cars are generated.

keys = {}

def behavior(state, context):
  agents = {}

  agents["roads"] = []

  for x in range(-5, 36): # we will create roads within a square of size 40x30 - starting with the x-axis.
    if x%10 == 9: # every 10 units of distance, we create a signal.
      agents["roads"].append({
        "position": [x, 0], # we will space them out starting with y position = 0 and x changing by ten.
        "height": 0,
        "color": "red", # currently all the traffic lights are red. 
        "counter": 0,
        "change_color": False,
        "intersection": 1 if x==-1 else 2, # give a number to intersection to potentially create different behaviors to the signal.
        "endRoad":0,
        "behaviors": ["road.py", "signal.py"] # adding how the agent should behave. 
        
      })

    elif x==35: # add a "blue" square at the end of the road, that represents the place where the cars should disappear. Edge of simulation. 
      behaviors = ["road.py"]
      agents["roads"].append({
        "position": [x, 0],
        "height": 0,
        "color": "blue", # Note: following an update in the hash.ai engine, these blocks do not appear anymore.
        "endRoad":1,
        "behaviors": behaviors # see line 27.
      })

    elif x%10==0: # every 10 units of distance, we will replicate the same process of creating roads for perpendicular roads.
      for y in range(-5, 26):
          if y == -1:
            agents["roads"].append({
              "position": [x, y],
              "height": 0,
              "color": "green", # currently all the traffic lights are green. 
              "counter": 0,
              "change_color": False,
              "intersection": 1 if x==-1 else 2,
              "endRoad":0,
              "behaviors": ["road.py", "signal.py"]
            })
          elif y == 25: # road's end on the y-axis. 
            behaviors = ["road.py"]
            agents["roads"].append({
              "position": [x, y],
              "height": 0,
              "color": "blue", # add a visual indication of the road's end. 
              "endRoad":1, 
              "behaviors": behaviors
            })
          elif y != 0:
            if y == -5: # road's beginning on the y-axis, will serve as a starting point for cars. 
              behaviors = ["road.py", "generate_cars.py"] # at the beginning of the roads, cars are generated. 
              agents["roads"].append({
                "position": [x, y],
                "height": 0,
                "color": "black", # default color for roads. 
                "endRoad":0,
                "behaviors": behaviors
              })
    else:
      if x==-5: # road's beginning on the x-axis, will serve as a starting point for cars. 
        behaviors = ["road.py", "generate_cars.py"] # at the beginning of the first road (following the x-axis) cars are generated.
        agents["roads"].append({
          "position": [x, 0],
          "height": 0,
          "color": "black", # default color for roads. 
          "endRoad":0,
          "behaviors": behaviors
        })
  
  state.set("agents", agents);

  return state
