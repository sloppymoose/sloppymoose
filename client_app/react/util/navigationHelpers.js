// Returns TRUE if the current route matches the route handler component's
// `routeName` class property
export function isTabVisible(routeHandler) {
  return routeHandler.props.currentRoute == routeHandler.constructor.routeName;
}
