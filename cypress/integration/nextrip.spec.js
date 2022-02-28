describe('nextrip app', () => {
  beforeEach(() => {    
    cy.visit('http://localhost:3000');
    
    // spying, dynamic stubbing, request modification, etc.
  });
  it('displays the routes dropdown on load', () => {
    cy.get('h1').contains('Next Trip');
    // Should have the routes select element
    cy.get('#routes').select(0).contains("Select Route");
  });

  it('displays directions dropdown when a route is selected', () => {
    cy.get('#routes').select(1);
    cy.get('#directions').select(0).contains("Select Direction");
  });

  it('displays stops dropdown when a direction is selected', () => {
    cy.get('#routes').select(1);
    cy.get('#directions').select(1);
    cy.get('#stops').select(0).contains("Select Stop");
  });

  it('hides directions and stops dropdown when default route is selected', () => {
    cy.get('#routes').select(0);
    cy.get('#directions').should('not.exist');
    cy.get('#stops').should('not.exist');
  });

  it('loads the departures table', () => {
    
    cy.get('#routes').select(1).as("route");
    cy.get('#directions').select(1).as("direction");        
    cy.intercept(`https://svc.metrotransit.org/nextripv2/**`,{fixture: 'validstopdetails.json'});    
    cy.get('#stops').select(1);
    cy.get('th').contains("ROUTE");
    cy.get('th').contains("DESTINATION");
    cy.get('th').contains("DEPARTS");
    cy.get('h2').contains("Mock Stop");
    cy.get('h3').contains("11111");
    cy.get('table').find('tr').should('have.length', 10)
  });

  it("displays empty departure table", () => {
    cy.get('#routes').select(1).as("route");
    cy.get('#directions').select(1).as("direction");        
    cy.intercept(`https://svc.metrotransit.org/nextripv2/**`,{fixture: 'emptydepartures.json'});    
    cy.get('#stops').select(1);
    cy.get('th').contains("ROUTE");
    cy.get('th').contains("DESTINATION");
    cy.get('th').contains("DEPARTS");
    cy.get('h2').contains("Empty Stop");
    cy.get('h3').contains("0");
    cy.get('tr').contains("No departures at this time!");
  });
})
