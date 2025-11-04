describe('Album Catalog - Interactions', () => {
    beforeEach(() => {
    cy.visit('https://zochova.sk/');
  });

  it('should have the adress beniak@zochova.sk', () => {
    cy.get('[id=hamburger]').click();
    cy.contains('a', 'Kontakt').click();
    cy.get("body").should('contain.text', 'beniak@zochova.sk');
  });

  it('should find url with skolsky psycholog', () => {
    cy.get('[id=hamburger]').click();
    cy.contains("Naša škola").click();
    cy.contains("Školský psychológ").click();
    cy.url().should("include", "/skolsky-psycholog");
  });


});