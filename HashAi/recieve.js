/**
 * Message handler for orders being sent out
 */
const behavior = (state, context) => {
  // Sends a message to the accountant about how much items were ordered
  const delivered = context.messages()
      .filter(m => m.type === "demand_")
      .reduce((acc, msg) => msg.data.quantity + acc, 0);

  // Tell the accountant agent how much was delivered
  state.addMessage("accountant", "delivered", delivered)

};
