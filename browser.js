var React = require('react');
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