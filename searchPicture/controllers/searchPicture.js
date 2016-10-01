var multer = require('multer');

function SearchPictureController() {
    var result = [
        {
            sku: "100272636",
            name: "Wallaby Mama Bag-in-Bag Tote",
            url: "http://m.charmingcharlie.com/h5/catalog?path=%2Fwallaby-mama-bag-in-bag-dark-blue.html%23color%3Ddark-blue",
            price: "39.00",
            image_url: "http://media.charmingcharlie.com/media/catalog/product/cache/1/small_image/245x306/db978388cfd007780066eaab38556cef/1/0/100272636_2.jpg"
        }, {
            sku: "100540215",
            name: "Wallaby Tassel Bag-in-Bag",
            url: "http://m.charmingcharlie.com/h5/catalog?path=%2Fwallaby-tassel-bag-in-bag-light-pink-gold.html%23color%3Dlight-pink",
            price: "35.00",
            image_url: "http://media.charmingcharlie.com/media/catalog/product/cache/1/small_image/245x306/db978388cfd007780066eaab38556cef/1/0/100540215_2.jpg"
        },
        {
            sku: "100170349",
            name: "Wallaby Joey Bag-in-Bag",
            url: "http://m.charmingcharlie.com/h5/catalog?path=%2Fwallaby-joey-bag-in-bag-3.html%23color%3Dblack%2Fgold",
            price: "39.00",
            image_url: "http://media.charmingcharlie.com/media/catalog/product/cache/1/small_image/245x306/db978388cfd007780066eaab38556cef/1/0/100170349_1.jpg"
        },
        {
            sku: "100612071",
            name: "Boho Tassel Bag-in-Bag",
            url: "http://m.charmingcharlie.com/h5/catalog?path=%2Fboho-tassel-bag-in-bag.html%23color%3Ddark-yellow",
            price: "39.00",
            image_url: "http://media.charmingcharlie.com/media/catalog/product/cache/1/small_image/245x306/db978388cfd007780066eaab38556cef/1/0/100612071_1.jpg"
        },
        {
            sku: "100229953",
            name: "Wallaby Tote Bag-in-Bag",
            url: "http://m.charmingcharlie.com/h5/catalog?path=%2Fwallaby-tote-bag-in-bag-2.html%23color%3Dblack",
            price: "39.00",
            image_url: "http://media.charmingcharlie.com/media/catalog/product/cache/1/small_image/245x306/db978388cfd007780066eaab38556cef/1/0/100229953_1.jpg"
        }
    ];

    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
    var upload = multer({ //multer settings
        storage: storage
    }).single('file');

    function sendPicture(req, res) {
        upload(req, res, function(err){
            if(err){
                return res.status('412').send({err: err});
            }
            res.send(result);
        });
    }

    this.sendPicture = sendPicture;
}

module.exports = new SearchPictureController();

//var form = new multiparty.Form();
//form.parse(req, function (err, fields, files) {
//    if (err) {
//        logger.error(err, 'picture form.parse');
//        return _sendErrorMessage(err, res);
//    }
//
//    var file = _.first(_.get(files, 'file'));
//    console.log(file);
//    //var filePath = _.get(file, 'path');
//
//
//    //searchPicture.sendPicture(file, function (err, response) {
//    //    if (err) {
//    //        logger.error(err, 'send picture');
//    //        return _sendErrorMessage(err, res);
//    //    }
//    //    res.send(response);
//    //});
//});