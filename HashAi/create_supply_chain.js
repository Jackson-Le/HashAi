/**
 * This function creates the houses and the distributors. From here we grab each item from the
 * global's json file to create the different types of locations to create the demand and supply
 * for our agents in our model.
 */
const behavior = (state, context) => {
  const {center_ll, distributors,
      port_stock_1_capacity, manufacturers,
      port_stock_1_alarm_level } = context.globals();

  function ll_to_pos(ll) {
    pos_x = 10.0 * (ll[0] - center_ll[0])
    pos_y = 10.0 * (ll[1] - center_ll[1])

    return [pos_x, pos_y]
  }

  let agents = [];

  // Create client cities
  for (home in distributors) {

    agents.push({
      "agent_name": home,
      "lng_lat": distributors[home],
      "position": ll_to_pos(distributors[home]),
      "order_from_type": "manufacturer",
      "behaviors": [
        "demand.js",
        "choose_order_from.js",
        "order.js",
        "receive.js"
      ],
      "height": 2,
      "color": "yellow"
    })
  }

  // Create manufacturers
  for (store in manufacturers) {
    agents.push({
    "agent_name": store,
    "type": "manufacturer",
    "lng_lat": manufacturers[store],
    "position": ll_to_pos(manufacturers[store]),
    "color": "blue",
    "behaviors": ["counter", "deliver.js", "restock.js"],
    "capacity": port_stock_1_capacity,
    "stock": port_stock_1_capacity,
    "counter": 1,
    "mean_stock": port_stock_1_capacity,
    "rent_cost": 0,
    "alarm_level": port_stock_1_alarm_level,
    "restock_wait": 0,
    "color": "red"
  })
  }

  // Create agents to record activities in simulation
  agents.push({
    "agent_name": "accountant",
    "behaviors": ["counter", "accounting.js"],
    "total_delivery_cost": 0,
    "total_delivered": 0,
    "total_expenses": 0,
    "capital_costs": 0,
    "mean_stock": 0,
    "cost_per_ton": 0,
    "counter": 0,
    "total_trucks": 0,
    "total_steps": 0,
    "speed_cars": 0,
    "total_cars": 0
  })

   agents.push({
    "agent_name": "accountant1",
    "behaviors": ["counter", "accounting.js"],
    "total_delivery_cost": 0,
    "total_delivered": 0,
    "total_expenses": 0,
    "capital_costs": 0,
    "mean_stock": 0,
    "cost_per_ton": 0,
    "counter": 0,
    "total_trucks": 0,
    "total_steps": 0,
    "speed_cars": 0
  })

  // Create the afformentioned agents
  let messages = state.get("messages");
  agents.forEach(a => messages.push({
    "to": "hash",
    "type": "create_agent",
    "data": a
  }))
  state.set("messages", messages);
}
