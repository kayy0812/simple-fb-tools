const FB = require('fb');
const imgur = require('imgur-node-api')
const prompt = require('prompt-sync')();
const main = require('./simpleMain');
main.setup();
var params = {
    fields: 'name,id,picture,about,age_range,birthday,education,email,first_name,gender,install_type,installed,interested_in,is_guest_user,languages,last_name,middle_name,name_format,short_name,sports'
};
var user = prompt('User ID (default = me): ');
var border = '#';
border = border.repeat(58);
FB.api(!user ? 'me' : user, 'get', params, res => main.resCallback(res, function () {
        console.log(`\r\n@${res['first_name']}\'s I N F O R M A T I O N `)
        console.log(border);
        for (var item in res) {
            if (res[item] instanceof Object) continue;
            var whiteString = ' ';
            var stringItem = item.charAt(0).toUpperCase() + item.slice(1).replace(/_/g, ' ');
            var textData = '# → '+ stringItem + ' = ' + res[item];
            var stringText = textData + whiteString.repeat((border.length - textData.length) - 1) + '#';
            console.log(stringText);
        }
        imgur.upload(res['picture'].data.url, function(err, image) {
            console.log('\r\n' + res['first_name'] + '\'s avatar: ' + image.data.link)
        })
        console.log(border);
    })
);