var MyApp = angular.module('Wedge', ['ng', 'ngResource', 'ui.bootstrap']);

MyApp.factory('flickrPhotos', function ($resource) {
    return $resource('http://api.flickr.com/services/feeds/photos_public.gne', { format: 'json', jsoncallback: 'JSON_CALLBACK' }, { 'load': { 'method': 'JSONP' } });
});

MyApp.factory('instagram', ['$http',
    function($http) {
        var base = "https://api.instagram.com/v1";
        // get your own client id http://instagram.com/developer/
        var clientId = 'ca16c8a77172476289b1e85fc8ca6f50';
        return {
            'get': function(count, hashtag) {
                var request = '/tags/' + hashtag + '/media/recent';
                var url = base + request;
                var config = {
                    'params': {
                        'client_id': clientId,
                        'count': count,
                        'callback': 'JSON_CALLBACK'
                    }
                };
                return $http.jsonp(url, config);
            }
        };
    }
]);

MyApp.controller('WedgeCtrl', function ($scope, flickrPhotos,instagram) {
    $scope.tag = "kittens";
   

    $scope.layout = 'grid';
    
    $scope.setLayout = function(layout){
        $scope.layout = layout;
    };
    
    $scope.isLayout = function(layout){
        return $scope.layout == layout;
    };

    $scope.pics = [];

    

   $scope.loadPhotos = function(){
        $scope.photos = flickrPhotos.load({ tags: $scope.tag });
        instagram.get(100, $scope.tag).success(function(response) {
            $scope.pics = response.data;
        });
    }
    $scope.keyPressed = function(keyEvent) {
         if (keyEvent.which === 13)
             $scope.loadPhotos();
    }
    $scope.loadPhotos();
});
   