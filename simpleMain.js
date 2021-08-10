const FB = require('fb');
const imgur = require('imgur-node-api');
const setupFB = {
    setup: function() {
        console.clear();
        // Put your token
        const accessToken = '';
        const imgurId = '7a8a9233756ad43';

        // Setup data
        FB.extend({
            appId: '356906319231665',
            appSecret: '3d1f904895e92e5c9da717d7daf5a935'
        });
        
        FB.setAccessToken(accessToken);
        imgur.setClientID(imgurId);
        
        // User
        FB.api('me', {
            fields: 'name,id'
        }, res => this.resCallback(res, function () {
                console.log('\r');
                console.log('><'.repeat(24))
                console.log('Account: ' + res.name + ' | ' + res.id);
                console.log('><'.repeat(24))
            })
        );
    },
    resCallback: function(res, callback) {
        var sendError = !res ? 'error occurred' : res.error;
        if (!res || res.error) return console.log(sendError);
        callback();
    }
}
module.exports = setupFB;