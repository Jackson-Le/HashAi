/**
 * Create the order requests for each truck. Handles also the cost and updates whenever
 * a truck is sent out to the accounting agents.
 */
const behavior = (state, context) => {
  const { long_trip_cost, long_trip_truck_capacity,
      distributors } = context.globals();

  // get order messages
  const orders = context.messages().filter(m => m.type === "order");

  // Get the haversine distance between two locations
  // This is used to keep a constant travel distance.
  function haversineDistance(coords1, coords2, isMiles) {
    function toRad(x) {
      return x * Math.PI / 180;
    }

    var lon1 = coords1[0];
    var lat1 = coords1[1];

    var lon2 = coords2[0];
    var lat2 = coords2[1];

    var Radius_earth = 6371; // km

    var deltalat = lat2 - lat1;
    var dLat = toRad(deltalat);
    var deltalong = lon2 - lon1;
    var dLon = toRad(deltalong)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var radians_travelled = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = Radius_earth * radians_travelled;

    if(isMiles) distance /= 1.60934;

    return distance;
  }
  // Gets the number of items left from the stocking location
  let stock = state.get("stock");
  // Sees if there are any messages that are needed to be intercepted
  let messages = state.get("messages");

  let delivery_cost = 0;
  // For each delievery, we check if the quantity can be supplied, and then records the number of
  // trucks that are currently out to get an idea of the cost of sending out vehicles.
  for (order of orders) {
    if (order.data.quantity < stock) {

      // reduce stock
      stock -= order.data.quantity;

      // const truck_speed = 60 mph convert to position convert to time per tick
      const truck_capacity = long_trip_truck_capacity;

      const num_trucks = Math.ceil(order.data.quantity / truck_capacity);


      // While loop here to appropriately stock trucks
      // create trucks
      [...Array(num_trucks)].forEach(_ => messages.push({
        "to": "hash",
        "type": "create_agent",
        "data": {
          "position": state.get("position"),
          "lng_lat": state.get("lng_lat"),
          "destination_name": order.data.name,
          "destination": distributors[order.data.name],
          "color": "purple",
          "behaviors": ["truck.js"],
          "stock": truck_capacity,
          "height": 1,
          "route": "",
          "route_step": 1,
          "requested_route": false
        }
      }))
      var curr = state.get("position")
      var last = state.get("lng_lat")

      // incur a cost
      // base cost of a truck
      // Calculates the cost of the travel + the cost of sending out a truck
      const truck_cost =  long_trip_cost + haversineDistance(curr, last, true)
      //console.log(num_trucks)

      // Everytime a truck is created it pushes a value to be added in accountants
      messages.push({
        "to": "accountant",
        "type": "num_trucks",
        "data": { "val": 1 }
      })

      // Everytime a truck is created it pushes a value to be added in accountants
      messages.push({
        "to": "accountant",
        "type": "delviered",
        "data": { "val": order.data.quantity }
      })


      // Record the cost of sending said truck out.
      delivery_cost += truck_cost * num_trucks;
    }
  }
  // Which accountant recieves the information to graph in the
  messages.push({
    "to": "accountant",
    "type": "delivery_cost",
    "data": { "cost": delivery_cost }
  })

  state.set("stock", stock)
  state.set("messages", messages)
};
