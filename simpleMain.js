const FB = require('fb');
const imgur = require('imgur-node-api');
const setupFB = {
    setup: function() {
        console.clear();
        const accessToken = 'EAAAAZAw4FxQIBAHLyOAq3WPAPLCtlUHkkioyhx6NCyrR4H7yaKapZBaxgu3zW49Y5KBnJI4V1PwYdUgZCv2utzPZBxiEb3cSj2h3gJj0midHCCaV54n4Csng5sumf2rj7M8Y8KnBMBZACyp3cZAuBkXjwYB7ftrx0w4hpiTg8MKVvUCJqrxrQm';
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