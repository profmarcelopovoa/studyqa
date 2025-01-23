import assert from 'assert'

class RegisterForm {
  elements = {
    title: () => cy.get('#title'),
    titleFeedback: () => cy.get('#titleFeedback'),
    url: () => cy.get('#imageUrl'),
    urlFeedback: () => cy.get('#urlFeedback'),
    submit: () => cy.get('#btnSubmit')
  }

  typeTitle(title) {
    if(!title) return;
    this.elements.title().type(title)
  }
  typeUrl(url) {
    if(!url) return;
    this.elements.url().type(url)
  }
  clickSubmit() {
    this.elements.submit().click()
  }
}
const registerForm = new RegisterForm()
const colors = {
  invalid: 'rgb(220, 53, 69)',
  valid: 'rgb(40, 167, 69)'
}

describe('Image Registration', () => {
  describe('Submitting an image with invalid inputs', () => {
    after(() => {
      cy.clearAllLocalStorage()
    })
    const input = {
      title: "",
      url: ""
    }
    it('Given I am on the image registration page', () => {
      cy.visit('/')
    })
    it(`When I enter "${input.title}" in the title field`, () => {
      registerForm.typeTitle(input.title)
    })
    it(`Then I enter "${input.url}" in the URL field`, () => {
      registerForm.typeUrl(input.url)
    })
    it(`Then I click the submit button`, () => {
      registerForm.clickSubmit()
    })
    it(`Then I should see "Please type a title for the image" message above the title field`, () => {
      // registerForm.elements.titleFeedback().should(element => {
      //  debugger
      // })
      registerForm.elements.titleFeedback().should('contains.text', 'Please type a title for the image')
    })
    it(`And I should see "Please type a valid URL" message above the imageUrl field`, () => {
      registerForm.elements.urlFeedback().should('contains.text', 'Please type a valid URL')
    })
    it(`And I should see an exclamation icon in the title and URL fields`, () => {
      registerForm.elements.title().should(([element]) => {
        const style = window.getComputedStyle(element)
        const border = style.getPropertyValue('border-right-color')
        assert.strictEqual(border, colors.invalid)
      })
      //registerForm.elements.url().should('have.class', 'invalid')
    })
  })
})