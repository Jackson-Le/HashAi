/**
 * This code deals with the plotting of the values that we are recording from each of the
 * truck's delievery costs. Each message is intercepted by the reporter agent and is stored
 * within its own agent object. This allows us to create the plots from the given data.
 */
const behavior = (state, context) => {
    const { local_distributor, port_1_rent, storage_cost_per_ton,
        port_2_rent, wv_rent, interest_rate, steps_per_day } = context.globals();
    // track the delivery cost
    let total_delivery_cost = state.get("total_delivery_cost");
    // track the delieveries made
    let total_delivered = state.get("total_delivered");
    // track the total trucks in the simulation
    let total_trucks = state.get("total_trucks");
    // trackt the speed of cars to get to their destination
    let speed_cars = state.get("speed_cars");
    // total animation steps to get to the end of their delievery
    let total_steps = state.get("total_steps")

    let total_demand = state.get("total_demand");

    let total_cars = state.get("total_cars");

    // Intercept messages that have delivery tags
    const delivery_costs = context.messages()
        .filter(m => m.type === "delivery_cost")
        .reduce((acc, msg) => msg.data.cost + acc, 0);

    // Intercept messages that have tons delievered tags
    const tons_delivered = context.messages()
        .filter(m => m.type === "tons_delivered")
        .reduce((acc, msg) => msg.data.tons + acc, 0);

    // Intercept messages that have mean stock tags
    const mean_stock = context.messages()
        .filter(m => m.type === "mean_stock")
        .reduce((acc, msg) => msg.data.value + acc, 0);

    // Intercept tags that have num of trucks tags
    const num_trucks = context.messages()
        .filter(m => m.type === "num_trucks")
        .reduce((acc, msg) => msg.data.val + acc, 0);

    // Intercept tags taht have num steps
    const new_steps = context.messages()
        .filter(m => m.type === "num_steps")
        .reduce((acc, msg) => msg.data + acc, 0);

    total_steps += new_steps

    const product_demand = context.messages()
        .filter(m => m.type === "demand_")
        .reduce((acc, msg) => msg.data + acc, 0);


    const delivered = context.messages()
        .filter(m => m.type === "delviered")
        .reduce((acc, msg) => msg.data.val + acc, 0);


    // Speed at which the cars are moving
    speed_cars = total_steps/total_cars

    // Update states with new information
    total_delivery_cost += delivery_costs;
    total_trucks += num_trucks;
    total_demand += product_demand;
    total_delivered += delivered;
    if (num_trucks > 0) {
        total_cars += num_trucks;
    }

    // Update final parameters for end of frame
    const years = Math.ceil(state.get("counter") * steps_per_day / 365.0);
    state.set("total_trucks", total_trucks);
    state.set("speed_cars", speed_cars);
    state.set("num_trucks", num_trucks);
    state.set("mean_stock", mean_stock);
    state.set("total_delivery_cost", total_delivery_cost);
    state.set("total_delivered", total_delivered);
    state.set("cost_per_ton", total_delivery_cost / total_delivered);
    state.set("total_demand",total_demand);
    state.set("total_steps",total_steps);
    state.set("total_cars", total_cars);
}
