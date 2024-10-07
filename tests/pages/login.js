const { expect } = require('@playwright/test')

exports.Login = class Login {
    constructor(page){
        this.page = page
        this.txtBoxFName = page.getByPlaceholder('Firstname')
        this.txtBoxLName = page.getByPlaceholder('Lastname')
        this.txtBoxEmail = page.locator('input[name="email"]')
        this.txtBoxPhone = page.locator('input[name="phone"]')
        this.btnBook = page.getByRole('button', { name: 'Book' }).first()

        this.txtBoxNameF = page.getByTestId('ContactName')
        this.txtBoxEmailF = page.getByTestId('ContactEmail')
        this.txtBoxPhoneF = page.getByTestId('ContactPhone')
        this.txtBoxSubjectF = page.getByTestId('ContactSubject')
        this.txtBoxDescriptionF = page.getByTestId('ContactDescription')
        this.btnSubmitF= page.getByRole('button', { name: 'Submit' })
    }

    async fillNameAndEmail(Firstname, Lastname, email, phone){
        await this.txtBoxFName.fill(Firstname)
        await this.txtBoxLName.fill(Lastname)
        await this.txtBoxEmail.fill(email)
        await this.txtBoxPhone.fill(phone)
        await this.btnBook.click()
    }

    async fillContactForm(Name, email, phone, Subject, Description){
        await this.txtBoxNameF.fill(Name)
        await this.txtBoxEmailF.fill(email)
        await this.txtBoxPhoneF.fill(phone)
        await this.txtBoxSubjectF.fill(Subject)
        await this.txtBoxDescriptionF.fill(Description)
        await this.btnSubmitF.click()
    }
}