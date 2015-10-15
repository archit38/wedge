var MyApp = angular.module('Wedge', ['ng', 'ngResource']);

MyApp.factory('flickrPhotos', function ($resource) {
    return $resource('http://api.flickr.com/services/feeds/photos_public.gne', { format: 'json', jsoncallback: 'JSON_CALLBACK' }, { 'load': { 'method': 'JSONP' } });
});



MyApp.controller('WedgeCtrl', function ($scope, flickrPhotos) {
    $scope.tag = "Nature";
    $scope.loadPhotos = function(){
        $scope.photos = flickrPhotos.load({ tags: $scope.tag });
    }
    $scope.loadPhotos();
});
   