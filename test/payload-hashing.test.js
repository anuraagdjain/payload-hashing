const {payloadHashing} = require('../src')

describe('payloadHashing',() => {

    it('should return a string',() => {
        const result = payloadHashing({s:1});
        expect(result).toEqual(expect.any(String))
    });

    it('should always return the same string',() => {
        const input1 = {
            x: [1,2,3],
            y: true
        };

        const input2 = {
            x: [3,1,2],
            y: true
        };

        const result1 = payloadHashing(input1);
        const result2 = payloadHashing(input2);

        expect(result1).toEqual(result2)

    })

    it('handles nested json structure',() => {
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
                        last_active: new Date('2021-01-01T01:00:00Z')
                    }]
                }
            },
        };

        const result = payloadHashing(input1);

        expect(result).toEqual('ROQwdtY5lRuazWU3G552mimZNQY=')

    })
})