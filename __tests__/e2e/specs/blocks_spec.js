describe('Blocks', () => {
  beforeEach(() => {
    cy.visit('/blocks/1')
  })

  it('should show 25 rows in the table', () => {
    cy.get('table.vgt-table tbody tr').should('have.length', 25)
  })
})
