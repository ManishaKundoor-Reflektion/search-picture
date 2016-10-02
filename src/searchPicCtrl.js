angular.module('searchPicture', ['ngFileUpload'])
.controller('searchPicCtrl',['$scope', '$q', 'Upload',
    function($scope, $q, Upload) {
        $scope.name = 'Take Picture';
        $scope.products = [];

        $scope.sendPic = function (files) {
            var options = {
                width: 512,
                height: 512,
                quality: '.8',
                type: 'image/jpeg',
                centerCrop: false
            };
            $scope.save(files[0], options).then(function (res) {
                $scope.products = Object.keys(res.products).map(function(key) {
                    return res.products[key];
                });
            });
        };

        $scope.save = function (file, options) {
            var deferred = $q.defer();
            console.log(file);
            //options.resizeIf;//to-do do not resize if already less than 512
            Upload.resize(file, options.width, options.height, options.quality, options.type, null, options.centerCrop).then(function (resizedFile) {
                Upload.upload({
                    url: '/api/searchPicture/save',
                    method: 'POST',
                    data: {
                        file: resizedFile,
                        keyPhrases: ['dress', 'red']
                    }
                }).then(function (res) {
                    deferred.resolve(res.data);
                }, function (err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
}]);