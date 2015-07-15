var React = require('react');
var ReactIntl = require('react-intl');
var FormattedMessage = ReactIntl.FormattedMessage;
var IntlMixin = ReactIntl.IntlMixin;

module.exports = React.createClass({
    mixins: [IntlMixin],

    handleClick: function (macroId, e) {
        e.preventDefault();
        this.props.onLocationSelection(macroId);
    },

    render: function () {
        return (
            <li>
                <a href='#' onClick={(e) => this.handleClick(this.props.macro.id, e)}>{this.props.macro.name}</a>
            </li>
        );
    }
});
