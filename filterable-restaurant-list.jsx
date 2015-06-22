// Pagination

var React = require('react');

var LocationFilterItem = React.createClass({
    handleClick: function (e) {
        e.preventDefault();

        var macroId = this.refs.locationFilter.getDOMNode().dataset.id;

        this.props.onLocationSelection(macroId);
    },

    render: function () {
        return (
            <li>
                <a href='#' data-id={this.props.macro.id} onClick={this.handleClick} ref='locationFilter'>{this.props.macro.name}</a>
            </li>
        );
    }
});

var LocationFilterList = React.createClass({
    render: function () {
        var onLocationSelection = this.props.onLocationSelection;

        var filters = this.props.macros.map(function (macro) {
            return <LocationFilterItem macro={macro} key={macro.id} onLocationSelection={onLocationSelection} />
        });

        return (
            <div>
                <h3>{this.props.location.metro.name} areas</h3>
                <ul>
                    {filters}
                </ul>
            </div>
        );
    }
});

var RestaurantListHeader = React.createClass({
    handleClick: function (e) {
        e.preventDefault();

        this.props.onLocationSelection();
    },

    render: function () {
        var locationName = this.props.location.metro.name;
        var seeAll = undefined;

        if (this.props.location.macro) {
            locationName = locationName + ' - ' + this.props.location.macro.name;

            seeAll = <a href='#' onClick={this.handleClick}>See all x</a>
        }

        return (
            <div>
                <h4>
                    <span>{this.props.restaurants.length} Restaurants in</span>
                    <span>{locationName}</span>
                    {seeAll}
                </h4>
            </div>
        );
    }
});

var RestaurantListItem = React.createClass({
    render: function () {
        return (
            <div>
                {this.props.restaurant.name}
            </div>
        );
    }
});

var RestaurantListResults = React.createClass({
    render: function () {
        var className = this.props.loaded ? undefined : 'spinner';

        var results = this.props.restaurants.map(function (restaurant) {
            return <RestaurantListItem restaurant={restaurant} key={restaurant.id} />
        });

        return (
            <div className={className}>
                {results}
            </div>
        );
    }
});

var FilterableRestaurantList = React.createClass({
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