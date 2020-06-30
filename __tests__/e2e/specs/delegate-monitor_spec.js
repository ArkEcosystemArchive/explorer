describe("Delegate Monitor", () => {
  describe("Active Delegates", () => {
    beforeEach(() => {
      cy.visit("/delegate-monitor");
    });

    it("should display delegate details", () => {
      cy.get(".MonitorHeader > div").as("divs").should("have.length", 3);

      cy.get("@divs").eq(0).should("contain.text", "Delegates");
      cy.get("@divs").eq(1).should("contain.text", "Total forged");
      cy.get("@divs")
        .eq(2)
        .invoke("text")
        .should(($text) => {
          expect($text).to.include("Last block");
          expect($text).to.include("Forged");
          expect($text).to.include("Delegate");
        });
    });

    it("should fetch the delegates automatically", () => {
      cy.get(".vgt-table.bordered", { timeout: 20000 }).should("be.visible");

      cy.get("div").contains("In queue for forging").siblings().first().as("count");

      cy.get("@count").then(($count) => {
        const count = $count.text();

        cy.get("@count", { timeout: 20000 }).should(($count2) => {
          expect($count2.text()).not.to.eq(count);
        });
      });
    });

    it("should fetch the latest block automatically", () => {
      cy.get(".MonitorHeader div").contains("Last block").siblings().first().find("a").as("link");

      cy.get("@link").then(($link) => {
        const id = $link.text();

        cy.get("@link", { timeout: 20000 }).should(($link2) => {
          expect($link2.text()).not.to.eq(id);
        });
      });
    });

    it("should be possible to click on the last block", () => {
      cy.get("h1")
        .contains("Delegate Monitor")
        .should("exist")
        .then(($heading) => {
          const heading = $heading.text();

          cy.get(".MonitorHeader div").contains("Last block").siblings().first().find("a").first().click();

          cy.get("h1").should(($heading2) => {
            expect($heading2.text()).not.to.eq(heading);
          });

          cy.url().should("include", "block/");
        });
    });

    it("should be possible to click on the delegate that forged the last block", () => {
      cy.get("h1")
        .contains("Delegate Monitor")
        .should("exist")
        .then(($heading) => {
          const heading = $heading.text();

          cy.get(".MonitorHeader div.min-w-0").contains("Delegate").siblings().first().find("a").click();

          cy.get("h1").should(($heading2) => {
            expect($heading2.text()).not.to.eq(heading);
          });

          cy.url().should("include", "wallets/");
        });
    });

    it("should show forging stats for active delegates", () => {
      cy.get(".ForgingStats").should("be.visible");

      cy.get(".ForgingStats > div").as("fields").should("have.length", 4);

      cy.get("@fields").eq(0).should("contain.text", "Forged block recently");
      cy.get("@fields").eq(1).should("contain.text", "Missed round");
      cy.get("@fields").eq(2).should("contain.text", "Not forging");
      cy.get("@fields").eq(3).should("contain.text", "In queue for forging");
    });

    it("should be possible to sort the active delegates", () => {
      cy.get("th", { timeout: 20000 }).eq(1).as("name").should("exist");
      cy.get("@name").should("contain.text", "Username");

      cy.get("@name").should("not.have.class", "sorting-asc");
      cy.get("@name").should("not.have.class", "sorting-desc");

      cy.get("@name").click();
      cy.get("@name").should("have.class", "sorting-asc");

      cy.get("@name").click();
      cy.get("@name").should("have.class", "sorting-desc");
    });

    it("should be possible to click on an active delegates name", () => {
      cy.get("h1")
        .contains("Delegate Monitor")
        .should("exist")
        .then(($heading) => {
          const heading = $heading.text();

          cy.get("tbody tr", { timeout: 20000 })
            .first()
            .within(() => {
              cy.get("a").first().click();
            });

          cy.get("h1").should(($heading2) => {
            expect($heading2.text()).not.to.eq(heading);
          });

          cy.url().should("include", "wallets/");
        });
    });

    it("should be possible to switch to standby delegates", () => {
      cy.get(".inactive-tab").contains("Standby").click();
      cy.get(".active-tab").should("include.text", "Standby");
      cy.get(".inactive-tab").should("include.text", "Active");
    });

    it("should be possible to click the 'show more' button for active delegates", () => {
      cy.get("h1").contains("Delegate Monitor").should("exist");

      cy.url().should("include", "/delegate-monitor");
      cy.get("button.button-lg").click();
      cy.url().should("include", "delegates/");
    });
  });

  describe("Standby Delegates", () => {
    beforeEach(() => {
      cy.visit("/delegate-monitor");
      cy.get(".inactive-tab").contains("Standby").click();
    });

    it("should not show forging stats for standby delegates", () => {
      cy.get(".ForgingStats").should("not.be.visible");
    });

    it("should be possible to sort the standby delegates", () => {
      cy.get("th", { timeout: 20000 }).eq(1).as("name").should("exist");
      cy.get("@name").should("contain.text", "Username");

      cy.get("@name").should("not.have.class", "sorting-asc");
      cy.get("@name").should("not.have.class", "sorting-desc");

      cy.get("@name").click();
      cy.get("@name").should("have.class", "sorting-asc");

      cy.get("@name").click();
      cy.get("@name").should("have.class", "sorting-desc");
    });

    it("should be possible to click on the standby delegates name", () => {
      cy.get("h1")
        .contains("Delegate Monitor")
        .should("exist")
        .then(($heading) => {
          const heading = $heading.text();

          cy.get("tbody tr", { timeout: 20000 })
            .first()
            .within(() => {
              cy.get("a").first().click();
            });

          cy.get("h1").should(($heading2) => {
            expect($heading2.text()).not.to.eq(heading);
          });

          cy.url().should("include", "wallets/");
        });
    });
  });
});
