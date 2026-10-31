describe('Automation Exercise - Casos de Teste Finais', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Test Case 1: Register User', () => {
    cy.get('a[href="/login"]').click();
    const timestamp = Date.now();
    const email = `user_${timestamp}@test.com`;

    cy.get('input[data-qa="signup-name"]').type('Test User');
    cy.get('input[data-qa="signup-email"]').type(email);
    cy.get('button[data-qa="signup-button"]').click();

    cy.get('b').should('contain', 'Enter Account Information');
    cy.get('#id_gender1').click();
    cy.get('#password').type('Password123');
    cy.get('#days').select('10');
    cy.get('#months').select('5');
    cy.get('#years').select('1990');
    cy.get('#newsletter').click();
    cy.get('#optin').click();

    cy.get('#first_name').type('Test');
    cy.get('#last_name').type('User');
    cy.get('#company').type('QA Corp');
    cy.get('#address1').type('Street Test, 123');
    cy.get('#country').select('United States');
    cy.get('#state').type('California');
    cy.get('#city').type('Los Angeles');
    cy.get('#zipcode').type('90001');
    cy.get('#mobile_number').type('11999999999');
    cy.get('button[data-qa="create-account"]').click();

    cy.get('h2[data-qa="account-created"]').should('be.visible');
    cy.get('a[data-qa="continue-button"]').click();
    cy.get('i.fa-user').parent().should('contain', 'Test User');
    cy.get('a[href="/delete_account"]').click();
  });

  it('Test Case 2: Login User with correct email and password', () => {
    cy.get('a[href="/login"]').click();
    cy.get('input[data-qa="login-email"]').type('automation_valid@test.com');
    cy.get('input[data-qa="login-password"]').type('Password123');
    cy.get('button[data-qa="login-button"]').click();
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    cy.get('a[href="/login"]').click();
    cy.get('input[data-qa="login-email"]').type('wrong_user@test.com');
    cy.get('input[data-qa="login-password"]').type('wrongpassword');
    cy.get('button[data-qa="login-button"]').click();
    cy.get('.login-form form p').should('be.visible');
  });

  it('Test Case 4: Logout User', () => {
    cy.get('a[href="/login"]').click();
    cy.get('input[data-qa="login-email"]').type('automation_valid@test.com');
    cy.get('input[data-qa="login-password"]').type('Password123');
    cy.get('button[data-qa="login-button"]').click();
    cy.get('a[href="/logout"]').click();
    cy.url().should('include', '/login');
  });

  it('Test Case 5: Register User with existing email', () => {
    cy.get('a[href="/login"]').click();
    cy.get('input[data-qa="signup-name"]').type('Existing User');
    cy.get('input[data-qa="signup-email"]').type('automation_valid@test.com');
    cy.get('button[data-qa="signup-button"]').click();
    cy.get('.signup-form form p').should('contain', 'Email Address already exist!');
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    cy.get('.product-image-wrapper').should('have.length.greaterThan', 0);
    cy.get('.choose > .nav > li > a').first().click();
    cy.get('.product-information h2').should('be.visible');
  });

  it('Test Case 9: Search Product', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    cy.get('#search_product').type('Tshirt');
    cy.get('#submit_search').click();
    cy.get('.features_items').should('contain', 'Searched Products');
  });

  it('Test Case 10: Verify Subscription in home page', () => {
    cy.scrollTo('bottom');
    cy.get('#suscribe_email').type('subscriber_qa@test.com');
    cy.get('#subscribe').click();
    cy.get('#success-subscribe').should('be.visible');
  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    cy.get('a[href="/login"]').click();
    const timestamp = Date.now();
    cy.get('input[data-qa="signup-name"]').type('Checkout User');
    cy.get('input[data-qa="signup-email"]').type(`checkout_${timestamp}@test.com`);
    cy.get('button[data-qa="signup-button"]').click();

    cy.get('#id_gender1').click();
    cy.get('#password').type('Password123');
    cy.get('#first_name').type('Checkout');
    cy.get('#last_name').type('User');
    cy.get('#address1').type('Test St');
    cy.get('#country').select('United States');
    cy.get('#state').type('Texas');
    cy.get('#city').type('Dallas');
    cy.get('#zipcode').type('75001');
    cy.get('#mobile_number').type('11999999999');
    cy.get('button[data-qa="create-account"]').click();
    cy.get('a[data-qa="continue-button"]').click();

    cy.get('a[href="/products"]').click();
    cy.get('.productinfo .add-to-cart').first().click();
    cy.get('.modal-confirm a[href="/view_cart"]').click();

    cy.get('.check_out').click();
    cy.get('textarea[name="message"]').type('Automated test order');
    cy.get('a[href="/payment"]').click();

    cy.get('input[data-qa="name-on-card"]').type('Checkout User');
    cy.get('input[data-qa="card-number"]').type('4111111111111111');
    cy.get('input[data-qa="cvc"]').type('123');
    cy.get('input[data-qa="expiry-month"]').type('12');
    cy.get('input[data-qa="expiry-year"]').type('2028');
    cy.get('button[data-qa="pay-button"]').click();

    cy.get('h2[data-qa="order-placed"]').should('be.visible');
    cy.get('a[href="/delete_account"]').click();
  });

  it('Test Case 16: Place Order: Login before Checkout', () => {
    cy.get('a[href="/products"]').click();
    cy.get('.productinfo .add-to-cart').first().click();
    cy.get('.modal-confirm a[href="/view_cart"]').click();

    cy.get('.check_out').click();
    cy.get('.modal-body a[href="/login"]').click();

    cy.get('input[data-qa="login-email"]').type('automation_valid@test.com');
    cy.get('input[data-qa="login-password"]').type('Password123');
    cy.get('button[data-qa="login-button"]').click();

    cy.get('a[href="/view_cart"]').click();
    cy.get('.check_out').click();
    cy.get('a[href="/payment"]').click();

    cy.get('input[data-qa="name-on-card"]').type('Valid User');
    cy.get('input[data-qa="card-number"]').type('4111111111111111');
    cy.get('input[data-qa="cvc"]').type('123');
    cy.get('input[data-qa="expiry-month"]').type('12');
    cy.get('input[data-qa="expiry-year"]').type('2028');
    cy.get('button[data-qa="pay-button"]').click();

    cy.get('h2[data-qa="order-placed"]').should('be.visible');
  });

});