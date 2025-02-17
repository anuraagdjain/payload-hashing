const payloadHashingImpl = require("../src/payload-hashing-impl");

describe('payloadHashingImpl',( ) => {

    it('should handle array of object and return a string',()=>{
        const input1 = {
            metadata:{
                notification:[{
                    account_expired: true,
                    last_active: new Date('2021-01-01T01:00:00Z').toISOString()
                },
                {
                    account_expired: false,
                    last_active: new Date('2021-02-01T01:00:00Z').toISOString()
                }]
            }
        };
        const result = payloadHashingImpl(input1);
        expect(result).toEqual('metadata.notification[0].account_expired:true,metadata.notification[0].last_active:2021-01-01T01:00:00.000Z,metadata.notification[1].account_expired:false,metadata.notification[1].last_active:2021-02-01T01:00:00.000Z');
    });

    it('should handle multiple keys at root level and return a string',() => {
        const input1 = {
            y: true,
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
        expect(result).toEqual('x.location.latitude:0,x.location.longitude:0,x.location.zipcode:0,x.metadata.notification[0].account_expired:true,x.metadata.notification[0].last_active:2021-01-01T01:00:00.000Z,x.name:javascript,y:true');
    })

        it.skip('should handle date correctly',() => {
        const input1 = {
            y: true,
            x: new Date('2021-01-01T01:00:00Z')
        };
        const result = payloadHashingImpl(input1);
        /**
         * FIX ME
         *  Expected: "x:2021-01-01T01:00:00.000Z,y:true"
            Received: ",y:true"
         */
        expect(result).toEqual('x:2021-01-01T01:00:00.000Z,y:true');
    })

    it.skip('should handle mixed array correctly',() => {
        const input1 = {
            y: true,
            x: [
                {name: 'javascript'},
                false,
                1,
                {c: 2}
            ]
        };
        const result = payloadHashingImpl(input1);
        /**
         * FIX ME
         *  Expected: "x[0].name:javascript,x[0]:1,x[0].c:2,y:true"
            Received: "x[0].name:javascript,,,x[3].c:2,y:true"
         */
        console.log(result);
        expect(result).toEqual('x[0].name:javascript,x[0]:1,x[0].c:2,y:true');
    })

});