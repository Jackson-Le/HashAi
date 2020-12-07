Households, located in the city of Berkeley, CA, periodically have needs for delivery (demand based on a recent census). The stores in the city can answer these needs - and hire a fleet of car drivers to perform the deliveries.

Using a modified supply chain model, we can evaluate the time (and distance) it takes a user to ride between two given places in the city of Berkeley, while being (theoretically) able to add new agents and behaviors (jaywalking, accidents…) that will more realistically mimic traffic simulation, thus giving a more precise estimation.

---

Here is how this simulation works:
- First, we create the model, i.e. households, stores, via the file `create_supply_chain.js`.
- Then, we model the demand of a household, using a Poisson distribution (`demand.js`) - that will be assigned to the nearest store (`choose_order_from.js`). More details on how orders are handled are in the file `orders.js`.
- This demand will lead to the creation, in the simulation, of an agent (a truck), that will carry out the delivery (`deliver.js`). It will initialize some variables, such as the distance the truck has to ride, its initial position, color… *Note: the behavior of the truck is dictated by `truck.js`, and everytime a truck is created / deleted (--> see `remove_self.js`), a message is sent to an agent named 'accountant', whose role is to gather data on the simulation.*
- Trucks navigate along real roads by using the Mapbox message handler (enabled in `globals.json`) and making Navigation API calls (see `truck.js`).
- Once the order is received by the household (`receive.js`), the truck agent will be deleted.

*Note: the files 'truck_return.js', 'restock.js', and 'experiments.js' are not currently used.*

Data and plots:
- Coordinate data for the model is contained in the `globals.json` file.
- The graphs in the 'Plots' tab are made by sending messages to an agent called accountant (see `accounting.js` for more details), that will then extract the data contained in the messages for plotting.
- The graphs are generated thanks to the `analysis.js` file.

---

To extend this to a different city, we need to go into the globals.json file to edit the values in globals.json, as all the values that are refrenced that can change are all listed there. This to more easily scale our work to fit other models of citites.

1. "mean_orders_per_day" -- corresponds to the average household size of a city
2. "distributors" -- homes modelled as distributors as this is where people leave from
3. "manufacturers" -- stores that manufacture the goods that are in demand by the people
4. "messageHandlers" -- external APIs that we refrence for the routing -- for us mapbox
5. "port_stock_1_capacity" -- capacity of the ports (not touched in our case)
6. "port_1_rent" -- cost of rent of ports
7. "storage_cost_per_ton" -- cost to store tons of materials inside of ports
8. "interest_rate" -- interest rates of the total capital used to maintain chain
9. "port_stock_1_alarm_level" -- restock proportion
10. "port_stock_replenishment_time" -- how much frames it takes to get new shipments
11. "long_trip_truck_capacity" -- how much each truck can carry in capacity
12. "long_trip_cost" -- cost of trucks being sent out (flat rate)
13. "min_orders_per_day" -- minimum orders per day
14. "max_orders_per_day" -- max orders that can be made per day
15. "min_quantity" -- minimum quantity of an order
16. "max_quantity" -- maximum quantity of an order
17. "mean_quantity" -- mean order value
---

NEEDS for plots:
- Plot the demand as it occurs, so we can compare it to the number of cars
- Plot the time it takes to each car to go from A to B

---

How to run simulation:
  1. Create a Hash.Ai account
  2. Go to this link: https://core.hash.ai/@jacksonle/demandtest_end/main
  3. Click file
  4. Click Fork Project
  5. Name new forked simulation
  6. Click Start Simulation (right side running man icon)
  7. Go to the "Geospatial" tab on the top right to view the simulation on a map.
  7. Go to the "Plots" tab on the top right to view the real time simulated demand and delivery as well as delivery metrics.
  
  Note: Edit parameters listed above in `globals.json` to manipulate the simulation and test / visualize your new ideas!
  
  Note: To move to a new city, run Yelp web scraping script and replace coordinates in `globals.json`

---

How to interpret results:

Geospatial view show us the acutal traffic conditions made by the deliveries that are occuring inside of the city. The blue colored dots are the cars that are interacting with the yellow homes and the red stores.

Plots show the number of active cars at a frame, along with the average number of fixed sized distance steps a car needs to take to complete its delievery. We also have included the total number of simulated steps along with the demand and ordering of each item in the plots.

To modify the graphs, you can go to the analysis.json file to create a new plot section to visualize any other variable that is being tracked by the accountants via message intercepts.

---

This simulation utilizes HASH's in-built geospatial viewer and ability to retrieve directions from Mapbox. You can read more about these features in the docs:
- [Geospatial View](https://docs.hash.ai/core/views#geospatial)
- [Retrieving data mid-simulation from a 3rd party API](https://docs.hash.ai/core/agent-messages/built-in-message-handlers#navigation-with-mapbox)
