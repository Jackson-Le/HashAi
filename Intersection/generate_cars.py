import random

keys = {}

def behavior(state, context):
  properties = context.globals()
  neighbors = context.neighbors()

  position = state.get("position")

  state.set("search_radius", 10)

  max_cars = properties["max_cars"]

  # Collect current number of cars in the environment
  current_cars = list(filter(lambda n: "car.py" in n["behaviors"], neighbors)) # Check among the neighbors which one are cars
  car_num = len(current_cars)

  # Iterate through current cars and check if a car is at this position
  # (Cars are only generated if the road agent is clear of other cars)
  car_at_position = False
  for car in current_cars:
    dx = abs(car["position"][0] - position[0])
    dy = abs(car["position"][1] - position[1])

    if (dx < 1 and dy == 0) or (dx == 0 and dy < 1): # Check if a car is on the same lane + at a distance inferior to 1. If yes, both cars are considered to be at the same position.
      car_at_position = True
      break

  # 50% chance of creating a new car if there are less than 10 cars currently in 
  # the environment and no car is at the current position
  if random.random() < 0.5 and car_num < max_cars and not car_at_position:
    velocity = [random.random(), 0] if position[1] == 0 else [0, random.random()]
    movement = "right" if (position[1] == 0 or position[1] == 10 or position[1]==20) else "up"

    new_agent = {
      "position": position,
      "rgb": [random.randint(0, 255), random.randint(0, 255), random.randint(0,255)],
      "velocity": [0,0],
      "signal_id": "",
      "num": 1,
      "obj": {
        "name": "string"
      },
      "movement": movement,
      "behaviors": ["car.py"]
    }
    state.add_message("HASH", "create_agent", new_agent)

  return state
