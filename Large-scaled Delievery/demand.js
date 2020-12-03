/**
 * Create demand at each household by assigning them a number pulled from the poisson, which
 * closely resembles that of the berkeley distribution of the household average family count
 * pulled from the c
 */
const behavior = (state, context) => {
  const { min_quantity, mean_quantity } = context.globals();

  function triangular(minimum, lambda) {
    // Creates the demand of said location -- In this case we are pulling from a possion distribution
    // to simulate the distribution of households that we pulled from the berkeley Census data
    // from 2015.
    const demand = hash_stdlib.stats.poisson.sample(lambda);

    if (demand > minimum) {
      return demand
    }
  }
  // Chance to create a delievery from a location, if falls below .01, we will create the order
  // After doing some research on google, we found the estimate of 1% of the orders coming in
  // from each location is relatively close to the demand in real life.
  if (Math.random() < 0.01) {
    // place an order
    state.set("order_quantity", triangular(min_quantity, mean_quantity));
    state.addMessage("accountant", "demand_", triangular(min_quantity, mean_quantity) );
  } else {
    // no order is made
    state.set("order_quantity", 0);
    state.addMessage("accountant", "demand_", 0);
  }
};
