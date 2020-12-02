/**
 * Main truck functionality. Creates pathing and creating a constant speed of the paths
 * fror each truck.
 *
 * Similar to truck_return.js
 */
const behavior = (state, context) => {
  const center_ll = context.globals().center_ll;

  let lng_lat = state.get("lng_lat");
  // This is just a list of all turns ect in the location
  let route_org = state.get("route");
  const destination = state.get("destination");

  // Grab the messages in the current state
  let messages = state.get("messages");

  // Get the haversine distance between points
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

  // Function to create path routing with constant speed
  // This is interpolation of the routes to ensure that they are going in a
  // constant rate
  function constant_speed_route(lst, speed) {
    if (typeof(lst) == 'string') {
      return lst
    } else{
      var new_lst = [lst[0]];
      var curPos; // current position in the list
      var interPos; // current position in the list to create more steps between 0 and numInterpol
      var numInterpol; // required number of new points to maintain constant speed
      var dx;
      var dy;
      for (curPos = 0; curPos < lst.length - 1; curPos++) {
        if (haversineDistance(lst[curPos], lst[curPos+1], true) < speed) {
            new_lst.push(lst[curPos+1])
          } else {
          numInterpol = speed/haversineDistance(lst[curPos], lst[curPos+1], true);
          dy = numInterpol * (lst[curPos][0] - lst[curPos+1][0])
          dx = numInterpol * (lst[curPos][1] - lst[curPos+1][1])
          for (interPos = 1; interPos < numInterpol + 1; interPos++) {
            new_lst.push([lst[curPos][0] + (dy * interPos), lst[curPos][1] + (dx * interPos)])
          }
          new_lst.push(lst[curPos+1])
        }
        }
        return new_lst
    }
  }

  // Create a new path with constant distance travelled
  var route = constant_speed_route(route_org, .001);

  function ll_to_pos(ll) {
    const pos_x = 10.0 * (ll[0] - center_ll[0])
    const pos_y = 10.0 * (ll[1] - center_ll[1])

    return [pos_x, pos_y]
  }

  // GIS navigation
  // Receive route
  const route_messages = context.messages().filter(m => m.type === "mapbox_response");
  if (route_messages.length > 0) {
    state.set("route", route_messages[0].data.routes[0].geometry.coordinates);
    state.set("requested_route", false);
  }

  // Request route
  // MAPBOX API rate limits the usage -- see document in github repository about how the
  // rate limiting works on the Hash.Ai ecosystem
  if (route.length === 0 && !state.get("requested_route")) {
    state.addMessage("mapbox", "mapbox_request", {
      "transportation_method": "driving",
      "request_route": `${lng_lat[0]},${lng_lat[1]};${destination[0]},${destination[1]}`
    })
    state.set("requested_route", true)
  }

  // Deliver and return
  // Deliver and disappear when you reach the destination
  if (state.get("route_step") === route.length) {
    state.set("behaviors", ["truck_return.js"]);
    state.modify("route_step", s => s - 1)
    state.addMessage(state.get("destination_name"), "delivery", {
      "quantity": state.get("stock")
    })
  }
  else {
    // Move
    if (route.length > 0) {
      lng_lat = route[state.get("route_step")];
      state.modify("route_step", s => s + 1)
    }
  }
  state.set("lng_lat", lng_lat)
  state.set("position", ll_to_pos(lng_lat))
};
