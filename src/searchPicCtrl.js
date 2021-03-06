angular.module('searchPicture', ['ngFileUpload'])
.controller('searchPicCtrl',['$scope', '$q', '$window', 'Upload',
    function($scope, $q, $window, Upload) {
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

            var _URL = $window.URL || $window.webkitURL;
            var img = new Image();
            img.src = _URL.createObjectURL(files[0]);
            img.onload = function () {
                console.log(img.width + " " + img.height);

                 if (img.width > 512 || img.height > 512) {
                     if (img.width < img.height) {
                         options.width = 512;
                         options.height = options.width * img.height / img.width;
                     } else {
                         options.height = 512;
                         options.width = options.height * img.width / img.height;
                     }
                 } else {
                     options.width = img.width;
                     options.height = img.height;
                 }

                console.log(options.width + " " + options.height);

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
                        var tags = [];
                        Object.keys(res.tags).forEach(function(tag) {
                            if (tag != 'all') {
                                tags.push(tag);
                            }
                        });
                        $scope.tags = ['all'].concat(tags.sort());
                        $scope.products = (res.tags.all).map(function(key) {
                            return $scope.productsData[key];
                        });
                    }
                });
            };
        };

        $scope.sortByTag = function (tag) {
            $scope.products = $scope.tagsData[tag].map(function(key) {
                return $scope.productsData[key];
            });
        };

        $scope.save = function (file, options) {
            var deferred = $q.defer();
            //options.resizeIf;//to-do do not resize if already less than 512
            Upload.resize(file, options.width, options.height, options.quality, options.type, null, options.centerCrop).then(function (resizedFile) {
                $scope.file = resizedFile;
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