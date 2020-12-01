/**
 * Create demand at each household by assigning them a number pulled from the poisson, which
 * closely resembles that of the berkeley distribution of the household average family count
 * pulled from the c
 */
const behavior = (state, context) => {
  const { min_quantity, mean_quantity } = context.globals();

  function triangular(a, c) {
    // The demand of said location -- In this case we are pulling from a possion distribution
    // to simulate the distribution of households that we pulled from the berkeley Census data
    // from 2015.
    const u = hash_stdlib.stats.poisson.sample(c);

    //console.log(u)

    if (u > a) {
      return u
    }
  }
  // Chance to cancel delievery. If falls below .01, we will cancel the
  if (Math.random() < 0.01) {
    // place an order
    state.set("order_quantity", triangular(min_quantity, mean_quantity));
    state.addMessage("accountant", "demand_", triangular(min_quantity, mean_quantity) );
  } else {
    state.set("order_quantity", 0);
    state.addMessage("accountant", "demand_", 0);
  }
};
