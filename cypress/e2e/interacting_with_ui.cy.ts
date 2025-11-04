describe('Album Catalog - Interactions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('looks for songs when searching via search bar', () => {
    cy.get('[data-cy="album-card"]').as('allAlbums');
    cy.get('@allAlbums').then(($all) => {
    const total = $all.length;
    cy.get('[data-cy="search-input"]').clear().type('a', { delay: 0 });
    cy.get('[data-cy="album-card"]').its('length').should('be.lte', total);
    });
  });

    it('navigates to the first album detail', () => {
    cy.get('[data-cy="album-detail-link"]').first().scrollIntoView().click();
    cy.location('pathname').should('match', /\/album\/\d+$/);
    cy.get('[data-cy="album-detail-title"]').should('be.visible');
    });

  it('navigates to home page after clicking on Spotify logo', () => {
    cy.get('[data-cy="title"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

    it('navigates to the author page when clicking on author name', () => {
    cy.get('[data-cy="album-author"]').first().scrollIntoView().click();
    cy.location('pathname').should('include', '/author/');
    cy.get('[data-cy="author-name"]').should('be.visible');
    });

  it('footer is visible on every page', () => {
    cy.get('footer').should('be.visible');
  });

  
    it('can go back to homepage from album detail', () => {
    cy.get('[data-cy="album-detail-link"]').first().scrollIntoView().click();
    cy.get('[data-cy="album-detail-title"]').should('be.visible');
    cy.get('[data-cy="back-home"]').click();
    cy.location('pathname').should('eq', '/');
    cy.get('[data-cy="title"]').should('contain.text', 'Spotify');
    });
});
