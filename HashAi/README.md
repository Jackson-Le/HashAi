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

NEEDS for plots:
- Plot the demand as it occurs, so we can compare it to the number of cars
- Plot the time it takes to each car to go from A to B

---

This simulation utilizes HASH's in-built geospatial viewer and ability to retrieve directions from Mapbox. You can read more about these features in the docs:
- [Geospatial View](https://docs.hash.ai/core/views#geospatial)
- [Retrieving data mid-simulation from a 3rd party API](https://docs.hash.ai/core/agent-messages/built-in-message-handlers#navigation-with-mapbox)
