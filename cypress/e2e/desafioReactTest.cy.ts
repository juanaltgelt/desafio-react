describe('desafio react tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });
  it('renders the default elements on the screen', () => {
    cy.get('[data-testid="tab-home"]').should(
      'have.attr',
      'aria-selected',
      'true'
    );
    cy.get('[data-testid="tab-example"]').should(
      'have.attr',
      'aria-selected',
      'false'
    );

    cy.get('[data-testid="edit-mode-switch"]').should('exist');
    cy.get('[data-testid="edit-mode-switch"]').should('not.be.checked');
    cy.contains('Modo Vista').should('exist');

    cy.get('[data-testid="tree-title"]')
      .should('exist')
      .should('have.text', 'Árbol');

    cy.get('[data-testid="tree-node-Raíz"]')
      .should('exist')
      .within(() => {
        cy.contains('Raíz').should('be.visible');
        cy.get('.MuiChip-root').should('have.text', '1');
      });
  });

  it('navigates correctly when switching tabs', () => {
    cy.get('[data-testid="tab-example"]').click();
    cy.url().should('include', '/example');

    cy.get('[data-testid="tab-example"]').should(
      'have.attr',
      'aria-selected',
      'true'
    );
    cy.get('[data-testid="tab-home"]').should(
      'have.attr',
      'aria-selected',
      'false'
    );

    cy.get('[data-testid="tab-home"]').click();
    cy.url().should('include', '/');

    cy.get('[data-testid="tab-example"]').should(
      'have.attr',
      'aria-selected',
      'false'
    );
    cy.get('[data-testid="tab-home"]').should(
      'have.attr',
      'aria-selected',
      'true'
    );
  });

  it('toggles the Switch and updates the label text correctly', () => {
    cy.get('[data-testid="edit-mode-switch"]').should('not.be.checked');

    cy.get('[data-testid="edit-mode-switch"]').click();
    cy.get('[data-testid="edit-mode-switch"] input').should('be.checked');
    cy.contains('Modo Edición').should('exist');

    cy.get('[data-testid="edit-mode-switch"]').click();
    cy.get('[data-testid="edit-mode-switch"]').should('not.be.checked');
    cy.contains('Modo Vista').should('exist');
  });

  it('should add a new TreeNode correctly', () => {
    cy.get('[data-testid="edit-mode-switch"]').click();
    cy.contains('Modo Edición').should('exist');

    cy.get('[data-testid="add-button-Raíz"]').click();
    cy.get('[data-testid="new-node-input-Raíz"]').type('Nuevo Nodo');

    cy.get('[data-testid="save-button-Raíz"]').click();
    cy.get('[data-testid="tree-node-Nuevo Nodo"]').should('exist');
  });
});
