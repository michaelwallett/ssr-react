var React = require('react');
var ReactIntl = require('react-intl');
var FormattedMessage = ReactIntl.FormattedMessage;
var IntlMixin = ReactIntl.IntlMixin;

module.exports = React.createClass({
    mixins: [IntlMixin],

    handleClick: function (e) {
        e.preventDefault();

        this.props.onLocationSelection();
    },

    render: function () {
        var locationName = this.props.location.metro.name;
        var seeAll;

        if (this.props.location.macro) {
            locationName = locationName + ' - ' + this.props.location.macro.name;

            seeAll = (<a href='#' onClick={this.handleClick}>
                <FormattedMessage message={this.getIntlMessage('seeAll')} />
            </a>);
        }

        var restaurantCount = (<FormattedMessage
            message={this.getIntlMessage('restaurantCount')}
            count={this.props.restaurants.length} />);

        return (
            <div>
                <h4>
                    <span>{restaurantCount}</span>
                    <span>{locationName}</span>
                    {seeAll}
                </h4>
            </div>
        );
    }
});
