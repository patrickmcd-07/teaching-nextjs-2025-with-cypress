describe('Album Catalog - Basic Checks', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('opens the homepage', () => {
    cy.get('[data-cy="title"]').should('be.visible').and('contain.text', 'Spotify');
  });

  it('displays the site title in the header', () => {
    cy.get('[data-cy="header"]').should('be.visible').and('contain.text', 'Spotify');
  });

  it('shows at least one album card', () => {
    cy.get('[data-cy="album-card"]').should('be.visible').and('have.length.at.least', 1);
  });

  it('album card has a title and release date', () => {
    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-title"]').should('be.visible');
      cy.get('[data-cy="album-release-date"]').should('be.visible');
    });
  });

  it('has a visible search input on the top', () => {
    cy.get('[data-cy="search-input"]').should('exist').and('be.visible');
  });

  it('filters albums when typing into search input', () => {
  cy.get('[data-cy="album-card"]').then(($all) => {
    const total = $all.length;
    cy.get('[data-cy="search-input"]').clear().type('a', { delay: 0 });
    cy.get('[data-cy="album-card"]').its('length').should('be.lte', total);
  });
});


  it('navigates to album detail page when clicking Detail', () => {
    cy.get('[data-cy="album-detail-link"]').first().click();
    cy.url().should('match', /\/album\/\d+$/);
  });
});
