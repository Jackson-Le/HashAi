// Setting order quantity needs to happen first
/**
 * To properly assign the order values we first get the absolute distances between places
 * and choose the closest store to deliver the products from.
 */
const behavior = (state, context) => {
  // Find agents who's type matches order_from_type
  const suppliers = context.neighbors()
      .filter(n => n.type === state.get("order_from_type"))

  // report an order
  const order = state.get("order_quantity");
  if (order === 0) { return; }

  function distance(ll) {
    const dx = ll[0] - state.get("lng_lat")[0];
    const dy = ll[1] - state.get("lng_lat")[1];

    return Math.sqrt(dx**2 + dy**2)
  }

  const sorted_suppliers = suppliers.sort((a, b) =>
      distance(a["lng_lat"]) - distance(b["lng_lat"]));


  // Choose the best one
  state.set("order_from", sorted_suppliers[0].agent_id);
};
