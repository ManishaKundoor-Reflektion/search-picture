var _ = require('lodash'),
    request = require('request'),
    multiparty = require('multiparty'),
    fs = require('fs');

function SearchPictureController() {
    var result = {
        products: {
            "100272636": {
                sku: "100272636",
                name: "Wallaby Mama Bag-in-Bag Tote",
                url: "http://m.charmingcharlie.com/h5/catalog?path=%2Fwallaby-mama-bag-in-bag-dark-blue.html%23color%3Ddark-blue",
                price: "39.00",
                image_url: "http://media.charmingcharlie.com/media/catalog/product/cache/1/small_image/245x306/db978388cfd007780066eaab38556cef/1/0/100272636_2.jpg"
            },
            "100540215": {
                sku: "100540215",
                name: "Wallaby Tassel Bag-in-Bag",
                url: "http://m.charmingcharlie.com/h5/catalog?path=%2Fwallaby-tassel-bag-in-bag-light-pink-gold.html%23color%3Dlight-pink",
                price: "35.00",
                image_url: "http://media.charmingcharlie.com/media/catalog/product/cache/1/small_image/245x306/db978388cfd007780066eaab38556cef/1/0/100540215_2.jpg"
            },
            "100170349": {
                sku: "100170349",
                name: "Wallaby Joey Bag-in-Bag",
                url: "http://m.charmingcharlie.com/h5/catalog?path=%2Fwallaby-joey-bag-in-bag-3.html%23color%3Dblack%2Fgold",
                price: "39.00",
                image_url: "http://media.charmingcharlie.com/media/catalog/product/cache/1/small_image/245x306/db978388cfd007780066eaab38556cef/1/0/100170349_1.jpg"
            },
            "100612071": {
                sku: "100612071",
                name: "Boho Tassel Bag-in-Bag",
                url: "http://m.charmingcharlie.com/h5/catalog?path=%2Fboho-tassel-bag-in-bag.html%23color%3Ddark-yellow",
                price: "39.00",
                image_url: "http://media.charmingcharlie.com/media/catalog/product/cache/1/small_image/245x306/db978388cfd007780066eaab38556cef/1/0/100612071_1.jpg"
            },
            "100229953": {
                sku: "100229953",
                name: "Wallaby Tote Bag-in-Bag",
                url: "http://m.charmingcharlie.com/h5/catalog?path=%2Fwallaby-tote-bag-in-bag-2.html%23color%3Dblack",
                price: "39.00",
                image_url: "http://media.charmingcharlie.com/media/catalog/product/cache/1/small_image/245x306/db978388cfd007780066eaab38556cef/1/0/100229953_1.jpg"
            }
        },
        tags: {
            all: [
                "100272636",
                "100540215",
                "100170349",
                "100612071",
                "100229953"
            ],
            tops : [
                "100540215",
                "100170349",
                "100612071",
                "100272636",
                "100229953"
            ],
            bags : [
                "100170349",
                "100612071",
                "100272636",
                "100540215",
                "100229953"
            ],
            shirts : [
                "100612071",
                "100272636",
                "100170349",
                "100540215",
                "100229953"
            ]
        }
    };

    function sendPicture(req, res) {
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            if (err) {
                return res.status('412').send({err: err});
            }
            var file = _.first(_.get(files, 'file'));
            request.post('http://localhost:8080/api/v1/imgsearch', function (err, resp, body) {
                if (err) {
                    return res.status('412').send({err: err});
                } else if (!body) {
                    console.log('no data from server');
                    return res.send(result);
                } else {
                    res.send(body);
                }
            }).form().append('file', fs.createReadStream(file.path));
        });
        //return res.send(result);
    }

    this.sendPicture = sendPicture;
}

module.exports = new SearchPictureController();

