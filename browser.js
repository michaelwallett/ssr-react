var React = require('react');
var FilterableRestaurantList = React.createFactory(require('./filterable-restaurant-list.jsx'));

var props = { 
    initialRestaurants: window.data.restaurants,
    initialLocation: window.data.location,
    macros: window.data.macros
}

React.render(FilterableRestaurantList(props), document.getElementById('content'));