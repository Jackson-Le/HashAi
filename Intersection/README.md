This simulation is an extension of the project "Intersection" available here: 'https://hash.ai/@hash/traffic-intersection'. 

The idea is to simulate the behavior of cars that appear at the intersection of roads (see `create_roads.py` for the creation of roads, `generate_cars.py` for the generation of cars). At each intersection, they face a signal (`signal.py`), red or green, that prevent/allow them to cross. 

They then have the possibility to turn at the intersection (see `car.py` to understand the cars behavior). 

*At any time of the simulation, cars ride on roads (`road.py` is empty, but could be use to give certain behaviors to roads.)*

See the project at: https://core.hash.ai/@mlm5/intersection-data-x/main

---

Here is how this simulation works:
- First, we create the model, i.e. roads, intersections and signals using the files `create_roads.py`.
- Then, we assign specific behaviors to some part of the road - some blocks will be traffic lights or car generators (`generate_cars.py`, `signal.py`, and `road.py`, the latter is not used however). 
- Eventually, the cars generated will ride until they reach the limits of the board, and their behavior is dictated by the file `car.py`. They will stop whenever the traffic light in front of them is red or when a car in front of them is too close. They may also turn at some intersections.

---

How to run simulation:
  1. Create a Hash.Ai account
  2. Go to this link: https://core.hash.ai/@mlm5/intersection-data-x/main
  3. Click file
  4. Click Fork Project
  5. Name new forked simulation
  6. Click Start Simulation (right side running man icon)
  7. Go to the "3D Viewer" tab on the top right to view the simulation on a map.
  
Note: Edit parameters listed above in globals.json to manipulate the simulation and test / visualize your new ideas!

---

To edit parameters, change them in `globals.json`. The following is a list of parameters that can be changed:
  1. "search_radius": This is the radius surrounding each agent within which we will make observations. 
  2. "max_cars": Maximum number of cars on the board.
  3. "max_x": Maximum distance in the x direction.
  4. "max_y": Maximum distance in the y direction.

---

How to interpret the simulation:

3DViewer on right hand side show us the car to car interaction for street to street simulation.
