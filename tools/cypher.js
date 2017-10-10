var crypto = require('crypto')
var key = 'waoQytH3'
cipher = crypto.createCipher('aes-256-cbc', key)
decipher = crypto.createDecipher('aes-256-cbc', key);

tool = {
	encrypt: function (password){

		cipher.update(password, 'utf8', 'base64');
		return cipher.final('base64')
	},
	decrypt: function (encryptedPassword){
		decipher.update(encryptedPassword, 'base64', 'utf8');
		return decipher.final('utf8')
	}
}

module.exports = tool 