const { expect } = require('@playwright/test')

 exports.Home = class Home {

    constructor(page) {
        this.page = page;
        this.btnLMH = page.getByRole('button', { name: 'Let me hack!' });
        this.btnBook = page.getByRole('button', { name: 'Book this room' }).first();

        this.Foot = page.getByText('restful-booker-platform v1.7.');
        
        this.ErrorAll = page.getByText('must not be nullmust not be');
        this.Error1 = page.getByText('must not be null').first();
        this.Error2 = page.getByText('must not be null').nth(1);
        
        this.SucessSubmit = page.getByRole('heading', { name: 'Thanks for getting in touch' });
    }

    async navigateToBook(){
        await expect(this.Foot).toBeVisible()
        await this.btnLMH.click()
        await this.btnBook.click()
    }

    async navigateToContactUs(){
        await expect(this.Foot).toBeVisible()
        await this.btnLMH.click()
    }

    async assertBookError() {
        await expect(this.ErrorAll).toBeVisible()
        await expect(this.Error1).toBeVisible()
        await expect(this.Error2).toBeVisible()
    }

    async assertSucessFormContact() {
        await expect(this.SucessSubmit).toBeVisible()
    }
 }
