keys = {}

def behavior(state, context):
  agents = {}

  agents["roads"] = []

  for x in range(-5, 36): # we will create roads within a square of size 40x30
    if x%10 == 9: # every 10 units of distance, we create a signal
      agents["roads"].append({
        "position": [x, 0],
        "height": 0,
        "color": "red",
        "counter": 0,
        "change_color": False,
        "intersection": 1 if x==-1 else 2, # give a number to intersection to potentially create different behaviors to the signal
        "endRoad":0,
        "behaviors": ["road.py", "signal.py"]
        
      })

    elif x==35: # add a "blue" square at the end of the road, that represents the place where the cars should disappear.
      behaviors = ["road.py"]
      agents["roads"].append({
        "position": [x, 0],
        "height": 0,
        "color": "blue", # Note: following an update in the hash.ai engine, these blocks do not appear anymore.
        "endRoad":1,
        "behaviors": behaviors
      })

    elif x%10==0: # every 10 units of distance, we will replicate the same process of creating roads for perpendicular roads.
      for y in range(-5, 26):
          if y == -1:
            agents["roads"].append({
              "position": [x, y],
              "height": 0,
              "color": "green",
              "counter": 0,
              "change_color": False,
              "intersection": 1 if x==-1 else 2,
              "endRoad":0,
              "behaviors": ["road.py", "signal.py"]
            })
          elif y == 15:
            behaviors = ["road.py"]
            agents["roads"].append({
              "position": [x, y],
              "height": 0,
              "color": "blue",
              "endRoad":1,
              "behaviors": behaviors
            })
          elif y != 0:
            if y == -5:
              behaviors = ["road.py", "generate_cars.py"] # at the beginning of the roads, cars are generated. 
              agents["roads"].append({
                "position": [x, y],
                "height": 0,
                "color": "black",
                "endRoad":0,
                "behaviors": behaviors
              })
    else:
      if x==-5:
        behaviors = ["road.py", "generate_cars.py"] # at the beginning of the first road (following the x-axis) cars are generated.
        agents["roads"].append({
          "position": [x, 0],
          "height": 0,
          "color": "black",
          "endRoad":0,
          "behaviors": behaviors
        })
      
  
  
  
  state.set("agents", agents);

  return state
