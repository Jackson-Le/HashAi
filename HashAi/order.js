/**
 * Function to handle order calls.
 */
const behavior = (state, context) => {
  // place an order based on order_from and order_quantity
  const order_quantity = state.get("order_quantity");

  if (order_quantity !== 0) {
    state.addMessage(state.get("order_from"), "order", {
      "quantity": order_quantity,
      "name": state.get("agent_name")
    })
    state.set("order_quantity", 0)
  }
};
