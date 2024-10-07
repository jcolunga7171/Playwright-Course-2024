const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
import Ajv from 'ajv';

//SCHEMAS
const schemaRegisterUser = require('./schemas/registerUser.json')

test.describe('API With Data', async()=>{
    const ajv = new Ajv();
    const IdPet = faker.number.int({ min: 11000, max: 12000 })
    //const IdPet = 7111
    //const NamePet = faker.internet.userName()
    //const NamePet = faker.person.firstName()
    const NamePet = faker.animal.dog()
    test('1 - Create New Pet', async ({ request }) =>{
        console.log(`API TEST 1 creating pet with ID: ${IdPet}`)
        const response = await request.post('https://petstore.swagger.io/v2/pet',{
            data:{
                    "id": IdPet,
                    "category": {
                      "id": 0,
                      "name": "string"
                    },
                    "name": NamePet,
                    "photoUrls": [
                      "string"
                    ],
                    "tags": [
                      {
                        "id": 0,
                        "name": "string"
                      }
                    ],
                    "status": "available"   
            }
        })
        test.step('Verify the response status code is 200', async () => {
            expect(response.status()).toBe(200)
        })
        const responseBody =  await response.json()
        //console.log(responseBody)

        test.step('Verify the response body contains the expected data', async () => {

            const valid = ajv.validate(require('./schemas/registerUser.json'), responseBody);
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            expect(valid).toBe(true);
            console.log('TEST 1',responseBody)

        })
    })

    test('2 - Get Pet', async ({request})=>{
        console.log(`API TEST 2 looking for pet with ID: ${IdPet}`)
        const response = await request.get(`https://petstore.swagger.io/v2/pet/${IdPet}`);


        test.step('Verify the response status code is 200', async () => {
            expect(response.status()).toBe(200)
        })
        const responseBody = await response.json()

        test.step('Verify the response body contains the expected data', async () => {

            const valid = ajv.validate(require('./schemas/registerUser.json'), responseBody);
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            expect(valid).toBe(true);
            console.log('TEST 2',responseBody)
        })
    })
})