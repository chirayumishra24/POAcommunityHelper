export class Router {
  constructor() {
    this._routes = {};
    this._currentRoute = null;
    this._onChangeCallbacks = [];

    window.addEventListener('hashchange', () => this._handleChange());
  }

  register(path, handler) {
    this._routes[path] = handler;
  }

  onChange(callback) {
    this._onChangeCallbacks.push(callback);
  }

  getCurrentRoute() {
    return this._currentRoute;
  }

  _getHash() {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    return hash || '1-1';
  }

  _handleChange() {
    const route = this._getHash();
    if (route === this._currentRoute) return;
    this._currentRoute = route;

    for (const cb of this._onChangeCallbacks) {
      cb(route);
    }
  }

  start() {
    // Set default route if none
    if (!window.location.hash || window.location.hash === '#' || window.location.hash === '#/') {
      window.location.hash = '#/1-1';
    } else {
      this._handleChange();
    }
  }

  navigateTo(route) {
    window.location.hash = `#/${route}`;
  }
}
