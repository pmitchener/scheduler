const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants");

describe("Appointments", () => {
  beforeEach(() =>{
    cy.request("GET", "http://localhost:8001/api/debug/reset");
    
    cy.visit("/"); 
    
    cy.contains("[data-testid=day]", "Monday").click();
  });
  xit("should book an interview", () => { 
    cy.get("[alt=Add]").first().click();
    
    cy.get("[data-testid=student-name-input]").type("Devon Jones");
    
    cy.get("[alt='Sylvia Palmer']").click();
    
    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Devon Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");    
  });

  xit( "should edit an interview", () => {  

    cy.get("[alt=Edit]").first().click({force: true});
    cy.get("[alt='Tori Malcolm']").click();
    cy.get("[data-testid=student-name-input]").clear().type("James Miller");
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "James Miller");
    cy.contains(".appointment__card--show", "Tori Malcolm");      
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]").first().click({force: true});
    cy.contains("Confirm").click();
    cy.contains("Deleting").should("be.visible");
    cy.contains("Deleting").not("be.visible");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});