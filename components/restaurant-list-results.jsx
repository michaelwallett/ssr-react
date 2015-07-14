var React = require('react');
var ReactIntl = require('react-intl');
var FormattedMessage = ReactIntl.FormattedMessage;
var IntlMixin = ReactIntl.IntlMixin;
var RestaurantListItem = require('./restaurant-list-item');

module.exports = React.createClass({
    mixins: [IntlMixin],

    render: function () {
        var className = this.props.loaded ? undefined : 'spinner';

        var results = this.props.restaurants.map(function (restaurant) {
            return (<RestaurantListItem restaurant={restaurant} key={restaurant.id} />);
        });

        return (
            <div className={className}>
                {results}
            </div>
        );
    }
});
