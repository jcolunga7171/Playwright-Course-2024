const { test, expect } = require('@playwright/test');
const {Home} = require('./pages/home')
const {Login} = require('./pages/login')
import dotenv from 'dotenv'
dotenv.config()

test.describe('Automation Exercise', () =>{
    //hooks
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.BASE_URL);
    })

    test('Reserva de Habitacion', async ({page})=>{
        const home = new Home(page)
        await test.step('Navigate To Book Page', async () =>{
            await home.navigateToBook()
        })

        await test.step('Fill Data',async () =>{
            const login = new Login(page)
            await login.fillNameAndEmail('Jesus Alonso', 'Colunga Villatoro',process.env.EMAIL_TEST, process.env.PHONE_TEST)
        })

        await expect(page.getByText('must not be nullmust not be')).toBeVisible();
    })

    test('Formulario de contacto', async ({page})=>{
        const home = new Home(page)
        await test.step('Navigate To Contact Form', async () =>{
            await home.navigateToContactUs()
        })
        
        await test.step('Fill Form Data',async () =>{
            const login = new Login(page)
            await login.fillContactForm(process.env.NAME_TEST,process.env.EMAIL_TEST, process.env.PHONE_TEST,'Subject test form contact', 'Description test message jesus test')
        })

        await expect(page.getByRole('heading', { name: 'Thanks for getting in touch' })).toBeVisible();
    })
})