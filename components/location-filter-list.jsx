var React = require('react');
var ReactIntl = require('react-intl');
var FormattedMessage = ReactIntl.FormattedMessage;
var IntlMixin = ReactIntl.IntlMixin;
var LocationFilterItem = require('./location-filter-item');

module.exports = React.createClass({
    mixins: [IntlMixin],

    render: function () {
        var onLocationSelection = this.props.onLocationSelection;

        var filters = this.props.macros.map(function (macro) {
            return (<LocationFilterItem macro={macro} key={macro.id} onLocationSelection={onLocationSelection} />);
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
