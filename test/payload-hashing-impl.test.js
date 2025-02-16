const payloadHashingImpl = require("../src/payload-hashing-impl");

describe.skip('payloadHashingImpl',( ) => {

    it('should return a string',()=>{
        const input1 = {
            x: {
                name: 'javascript',
                location:{
                    latitude: '0',
                    longitude: '0',
                    zipcode: '0'
                },
                metadata:{
                    notification:[{
                        account_expired: true,
                        last_active: new Date('2021-01-01T01:00:00Z').toISOString()
                    }]
                }
            },
        };
        const result = payloadHashingImpl(input1);
    });

});