angular.module('searchPicture', ['ngFileUpload'])
.controller('searchPicCtrl',['$scope', '$q', 'Upload',
    function($scope, $q, Upload) {
        $scope.name = 'Take Picture';
        $scope.products = [];
        $scope.tags = [];
        $scope.tagsData = {};
        $scope.productsData = {};
        $scope.showHeader1 = true;

        $scope.showSearch = function () {
            $scope.showHeader1 = !$scope.showHeader1;
        }

        $scope.sendPic = function (files) {
            var options = {
                width: 512,
                height: 512,
                quality: '.8',
                type: 'image/jpeg',
                centerCrop: false
            };
            $scope.file = files[0];
            $scope.save(files[0], options).then(function (res) {
                $scope.showHeader1 = false;

                if (typeof(res.products) === 'object') {
                    $scope.productsData = res.products;
                    $scope.products = Object.keys(res.products).map(function(key) {
                        return res.products[key];
                    });
                } else {
                    $scope.products = res;
                }

                if (res.tags && Object.keys(res.tags).length > 0) {
                    $scope.tagsData = res.tags;
                    $scope.tags = Object.keys(res.tags);
                    $scope.products = (res.tags.default).map(function(key) {
                        return $scope.productsData[key];
                    });
                }
            });
        };

        $scope.sortByTag = function (tag) {
            $scope.products = ($scope.tagsData[tag]).map(function(key) {
                return $scope.productsData[key];
            });
        };

        $scope.save = function (file, options) {
            var deferred = $q.defer();
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
    }
]);