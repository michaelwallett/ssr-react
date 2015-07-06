(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var React = window.React;
var i18n = require('./i18n');

i18n.setLng(window.data.lng, function () {
  var FilterableRestaurantList = React.createFactory(require('./filterable-restaurant-list.jsx'));

  var props = { 
      initialRestaurants: window.data.restaurants,
      initialLocation: window.data.location,
      macros: window.data.macros
  }

  React.render(FilterableRestaurantList(props), document.getElementById('content'));
});

},{"./filterable-restaurant-list.jsx":2,"./i18n":3}],2:[function(require,module,exports){
var React = window.React;
var i18n = require('./i18n');

var LocationFilterItem = React.createClass({displayName: "LocationFilterItem",
    handleClick: function (e) {
        e.preventDefault();

        var macroId = this.refs.locationFilter.getDOMNode().dataset.id;

        this.props.onLocationSelection(macroId);
    },

    render: function () {
        return (
            React.createElement("li", null, 
                React.createElement("a", {href: "#", "data-id": this.props.macro.id, onClick: this.handleClick, ref: "locationFilter"}, this.props.macro.name)
            )
        );
    }
});

var LocationFilterList = React.createClass({displayName: "LocationFilterList",
    render: function () {
        var onLocationSelection = this.props.onLocationSelection;

        var filters = this.props.macros.map(function (macro) {
            return React.createElement(LocationFilterItem, {macro: macro, key: macro.id, onLocationSelection: onLocationSelection})
        });

        return (
            React.createElement("div", null, 
                React.createElement("h3", null, this.props.location.metro.name, " areas"), 
                React.createElement("ul", null, 
                    filters
                )
            )
        );
    }
});

var RestaurantListHeader = React.createClass({displayName: "RestaurantListHeader",
    handleClick: function (e) {
        e.preventDefault();

        this.props.onLocationSelection();
    },

    render: function () {
        var locationName = this.props.location.metro.name;
        var seeAll = undefined;

        if (this.props.location.macro) {
            locationName = locationName + ' - ' + this.props.location.macro.name;

            seeAll = React.createElement("a", {href: "#", onClick: this.handleClick}, i18n.t('see-all'))
        }

        var restaurantCount = i18n.t('restaurant-count', { count: this.props.restaurants.length });

        return (
            React.createElement("div", null, 
                React.createElement("h4", null, 
                    React.createElement("span", null, restaurantCount), 
                    React.createElement("span", null, locationName), 
                    seeAll
                )
            )
        );
    }
});

var RestaurantListItem = React.createClass({displayName: "RestaurantListItem",
    render: function () {
        return (
            React.createElement("div", null, 
                this.props.restaurant.name
            )
        );
    }
});

var RestaurantListResults = React.createClass({displayName: "RestaurantListResults",
    render: function () {
        var className = this.props.loaded ? undefined : 'spinner';

        var results = this.props.restaurants.map(function (restaurant) {
            return React.createElement(RestaurantListItem, {restaurant: restaurant, key: restaurant.id})
        });

        return (
            React.createElement("div", {className: className}, 
                results
            )
        );
    }
});

var FilterableRestaurantList = React.createClass({displayName: "FilterableRestaurantList",
  getInitialState: function () {
    return {
        restaurants: this.props.initialRestaurants,
        location: this.props.initialLocation,
        loaded: true
    };
  },

  componentDidMount: function () {
    window.addEventListener('popstate', this.handlePopState);
  },

  handlePopState: function (e) {
    var macroId = e.state ? e.state.macroId : undefined;

    this.refreshState(macroId);
  },

  handleLocationSelection: function (macroId) {
    this.refreshState(macroId);
    this.updateHistory(macroId);
  },

  refreshState: function (macroId) {
    this.setState({
        loaded: false
    });

    $.ajax({
        url: '/api' + (macroId ? '?macroid=' + macroId : ''),
        context: this
    }).done(function(data) {
        this.setState({
            restaurants: data.restaurants,
            location: data.location,
            loaded: true
        });
    });
  },

  updateHistory: function (macroId) {
    if (!window.history) {
        return;
    }

    var url = '/' + (macroId ? '?macroid=' + macroId : '');

    window.history.pushState({ macroId: macroId }, null, url);
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(LocationFilterList, {location: this.state.location, macros: this.props.macros, onLocationSelection: this.handleLocationSelection}), 
        React.createElement(RestaurantListHeader, {restaurants: this.state.restaurants, location: this.state.location, onLocationSelection: this.handleLocationSelection}), 
        React.createElement(RestaurantListResults, {restaurants: this.state.restaurants, loaded: this.state.loaded})
      )
    );
  }
});

module.exports = FilterableRestaurantList;

},{"./i18n":3}],3:[function(require,module,exports){
var i18n = window.i18n;

i18n.init({
  ns: {
    defaultNs: 'translation',
    namespaces: ['translation']
  },
  fallbackLng: false,
  load: 'unspecific',
  useCookie: false
});

module.exports = i18n;

},{}]},{},[1]);
