var React = require('react');
var ReactIntl = require('react-intl');
var FormattedMessage = ReactIntl.FormattedMessage;
var IntlMixin = ReactIntl.IntlMixin;

module.exports = React.createClass({
    mixins: [IntlMixin],

    render: function () {
        return (
            <div>
                {this.props.restaurant.name}
            </div>
        );
    }
});
