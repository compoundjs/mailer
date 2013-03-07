exports.routes = function (map) {
    map.get('/order', 'orders#index', {as: 'order'});
};
