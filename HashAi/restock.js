/**
 * restocks locations if they run out of stock. Currently not an issue as the stocks
 * have been placed high enough that the simulation can freely drag from any locaiton
 * without fear of running out of stock.
 */
const behavior = (state, context) => {
  let stock = state.get("stock");
  const capacity = state.get("capacity");
  const alarm_stock = capacity * state.get("alarm_level");

  state.modify("restock_wait", r => r === 0 ? 0 : r - 1)

  if (state.get("restock_wait") === 0) {
    if (stock < alarm_stock) {
      if (state.get("order_from") !== null) {
        state.set("order_quantity", capacity - stock)
        state.set("restock_wait", 7)
      } else {
        state.set("stock", capacity)
      }
    }
  }

  const deliveries = context.messages().filter(m => m.type === "delivery")
  if (deliveries.length) {
    for (delivery of deliveries) {
      stock += delivery.data.quantity;
    }
    state.set("stock", stock)
  }

  // Track average level of stock
  const mean_stock_diff = (state.get("stock") - state.get("mean_stock")) / state.get("counter");
  state.modify("mean_stock", val => val + mean_stock_diff);

  state.addMessage("accountant", "mean_stock", {
    "value": state.get("mean_stock")
  })

  state.set("height", 10 * stock / capacity);
};
