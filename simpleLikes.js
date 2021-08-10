const FB = require('fb');
const prompt = require('prompt-sync')();
const main = require('./simpleMain');
main.setup();
var params = {
    fields: 'name,id'
};
var user = prompt('User ID (default = me): ');
var limit = prompt('Limit posts (default = 10): ');
var firstDelay = false;
var delayTime = 1 * 1000;
var lastTime = 0;
FB.api((!user ? 'me' : user) + `/feed?limit=${limit ? limit : 10}`, 'get', params,
    res => main.resCallback(res, function () {
        console.log('\r\n * Thich ' + (!limit ? '10' : limit) +' bai moi nhat cua <' + (!user ? 'me' : user) + '>');
        for (const item of res.data) {
            firstDelay = true;
            lastTime += delayTime;
            setTimeout(function() {
                var idFeed = item['id'].split('_')[1];
                FB.api(idFeed + '/likes', 'post', {
                        fields: 'id'
                    },
                    like => main.resCallback(like, function () {
                        console.log('\r\n*-* Checked: ' + like['id'] + ' (' + (item.name ? item.name : 'ID Author') + ')');
                        // console.log(item)
                    })
                )
            }, lastTime);
        }
    })
);