require('node-jsx').install({ extension: '.jsx'} );

var _ = require('underscore');
var i18n = require('./i18n');

var React = require('react');
var FilterableRestaurantList = React.createFactory(require('./filterable-restaurant-list.jsx'))

var express = require('express');
var app = express();
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use('/locales', express.static('locales'));

var data = {
    location: {
        metro: {
            id: 3311,
            name: 'Dublin'
        }
    },
    restaurants: [
        {
            id: 1,
            macroId: 123,
            name: 'Restaurant 1'
        },
        {
            id: 2,
            macroId: 345,
            name: 'Restaurant 2'
        }
    ],
    macros: [
        {
            id: 123,
            name: 'City Centre'
        },
        {
            id: 345,
            name: 'Temple Bar'
        }
    ]
};

app.get('/', function (req, res) {
  data.lng = req.query.lng || 'en';

  i18n.setLng(data.lng);

  var html = React.renderToString(FilterableRestaurantList({ 
    initialRestaurants: data.restaurants,
    initialLocation: data.location,
    macros: data.macros
  }));

  res.render('index', { html: html, data: JSON.stringify(data) });
});

app.get('/api', function (req, res) {
    var restaurants = _.filter(data.restaurants, function (restaurant) {
        if (!req.query.macroid) {
            return true;
        }

        return restaurant.macroId == req.query.macroid;
    });

    var macro = _.find(data.macros, function (macro) {
        if (!req.query.macroid) {
            return undefined;
        }

        return macro.id == req.query.macroid;
    });

    res.json({
        location: {
            metro: data.location.metro,
            macro: macro
        },
        restaurants: restaurants
    });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});