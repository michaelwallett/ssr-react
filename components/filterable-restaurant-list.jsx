var React = require('react');
var ReactIntl = require('react-intl');
var $ = require('jquery');
var FormattedMessage = ReactIntl.FormattedMessage;
var IntlMixin = ReactIntl.IntlMixin;
var LocationFilterList = require('./location-filter-list');
var RestaurantListHeader = require('./restaurant-list-header');
var RestaurantListResults = require('./restaurant-list-results');

var FilterableRestaurantList = React.createClass({
  mixins: [IntlMixin],

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
      <div>
        <LocationFilterList location={this.state.location} macros={this.props.macros} onLocationSelection={this.handleLocationSelection} />
        <RestaurantListHeader restaurants={this.state.restaurants} location={this.state.location} onLocationSelection={this.handleLocationSelection} />
        <RestaurantListResults restaurants={this.state.restaurants} loaded={this.state.loaded} />
      </div>
    );
  }
});

module.exports = FilterableRestaurantList;
