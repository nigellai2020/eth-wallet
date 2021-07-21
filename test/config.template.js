const kms = {
    region: '',
    accessKeyId: '',
    secretAccessKey: ''
}
const infuraId = '';
const accountPrivateKey = '';

module.exports = {        
    wallet: {
        chainName: 'kovan',
        provider: `https://kovan.infura.io/v3/${infuraId}`,
        account: {
            privateKey: accountPrivateKey,
            kms: kms,
        }
    }
};