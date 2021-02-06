/// <reference types="Cypress" />
import AppPage from '../../support/app.page';
import moment from 'moment';

describe('app page test suite', () => {
  let fixtures;
  const app = new AppPage();

  before(async () => {
    fixtures = await cy.fixture('example');
    cy.visit(`${Cypress.env('url')}`);
  });

  context('1080p resolution', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
    });

    it('default list should be displayed', () => {
      app.getCard().should('be.visible');
      app.getLogo().should('be.visible').should('have.attr', 'alt', 'ESENS Consulting');
      app.getCardTitle().should('be.visible').should('contain', 'Todo list');
      app.getCardList().should('be.visible');
      app.getCardList().find('.list-todo__list-item').should('have.length', 5).eq(0).as('item');
      cy.get('@item').find('input[type="checkbox"]').should('not.be.checked');
      cy.get('@item').find('.list-todo__list-item-actions').as('actions').should('be.visible');
      cy.get('@actions').find('.list-todo__btn').should('have.length', 3);
      cy.get('@actions').find('.list-todo__btn--show').should('be.visible').should('contain', 'remove_red_eye');
      cy.get('@actions').find('.list-todo__btn--edit').should('be.visible').should('contain', 'edit');
      cy.get('@actions').find('.list-todo__btn--delete').should('be.visible').should('contain', 'delete');
      app
        .getAddButton()
        .should('be.visible')
        .should('have.attr', 'title', 'Add a TODO')
        .find('i.material-icons')
        .should('contain', 'add');
    });

    it('todo item crud', () => {
      // clean existing items
      app
        .getCardList()
        .find('.list-todo__list-item')
        .should('have.length', 5)
        .each((element) => {
          element.find('.list-todo__btn--delete').trigger('click');
        });
      app.getCardList().find('.list-todo__list-item').should('have.length', 0);

      // create
      app.getAddButton().click();
      app.getDialog().as('dialogAdd');
      cy.get('@dialogAdd').should('exist').should('be.visible');
      cy.get('@dialogAdd').find('#dialog-title').should('be.visible').should('contain', 'Add a TODO');
      cy.get('@dialogAdd').find('#dialog-content').should('be.visible').as('dialogAddContent');

      cy.get('@dialogAddContent').find('#label').should('be.visible').as('labelField');
      cy.get('@labelField').find('input[type="text"]').as('labelInput').should('have.value', '');
      cy.get('@labelField')
        .next()
        .find('.mdc-text-field-helper-text')
        .as('labelHelper')
        .should('be.visible')
        .should('have.attr', 'role', 'alert')
        .should('contain', 'Label is required');

      cy.get('@dialogAddContent').find('#date').should('be.visible').as('dateField');
      cy.get('@dateField').find('input[type="date"]').as('dateInput').should('have.value', '');
      cy.get('@dateField')
        .next()
        .find('.mdc-text-field-helper-text')
        .as('dateHelper')
        .should('be.visible')
        .should('have.attr', 'role', 'alert')
        .should('contain', 'Date is required');

      cy.get('@dialogAddContent').find('#tag').should('be.visible').as('tagField');
      cy.get('@tagField').find('input[type="text"]').as('tagInput').should('have.value', '');
      cy.get('@tagField')
        .next()
        .find('.mdc-text-field-helper-text')
        .as('tagHelper')
        .should('be.visible')
        .should('have.attr', 'role', 'alert')
        .should('contain', 'Tag is required');

      cy.get('@dialogAdd').find('footer.mdc-dialog__actions').should('be.visible').as('dialogAddActions');
      cy.get('@dialogAddActions').find('button.mdc-button.mdc-dialog__button').should('have.length', 2);
      cy.get('@dialogAddActions').contains('Add').should('be.visible').as('dialogAddButtonAdd').should('be.disabled');
      cy.get('@dialogAddActions')
        .contains('Cancel')
        .should('be.visible')
        .as('dialogAddButtonCancel')
        .should('not.be.disabled');

      cy.get('@dialogAddButtonCancel').click();
      app.getDialog().should('not.exist');

      app.getAddButton().click();
      cy.get('@dialogAdd').should('exist').should('be.visible');

      cy.get('@labelInput').type(fixtures.items[0].label).should('have.value', fixtures.items[0].label);
      cy.get('@labelHelper').should('not.have.attr', 'role');

      cy.get('@dateInput').type(fixtures.items[0].date).should('have.value', fixtures.items[0].date);
      cy.get('@dateHelper').should('not.have.attr', 'role');

      cy.get('@tagInput').type(fixtures.items[0].tag).should('have.value', fixtures.items[0].tag);
      cy.get('@tagHelper').should('not.have.attr', 'role');

      cy.get('@dialogAddButtonAdd').should('not.be.disabled').click();
      app.getDialog().should('not.exist');
      app.getCardList().find('.list-todo__list-item').should('have.length', 1).eq(0).as('item');

      cy.get('@item').find('input[type="checkbox"]').should('not.be.checked');
      cy.get('@item').find('.list-todo__list-item-label').as('itemLabel').should('be.visible');
      cy.get('@itemLabel')
        .find('.mdc-list-item__primary-text')
        .should('be.visible')
        .should('contain', fixtures.items[0].label);
      cy.get('@itemLabel')
        .find('.mdc-list-item__secondary-text')
        .should('be.visible')
        .should('contain', moment(fixtures.items[0].date).format('MMMM Do, yyyy'));

      cy.get('@item').find('input[type="checkbox"]').check().should('be.checked');
      cy.get('@itemLabel').should('have.class', 'list-todo__list-item-label--checked');
      cy.get('@item').find('input[type="checkbox"]').uncheck().should('not.be.checked');

      cy.get('@item').find('.list-todo__list-item-actions').as('actions');
      cy.get('@actions').should('be.visible');
      cy.get('@actions').find('.list-todo__btn').should('have.length', 3);
      cy.get('@actions')
        .find('.list-todo__btn--show')
        .as('itemShowButton')
        .should('be.visible')
        .should('contain', 'remove_red_eye');
      cy.get('@actions')
        .find('.list-todo__btn--edit')
        .as('itemEditButton')
        .should('be.visible')
        .should('contain', 'edit');
      cy.get('@actions')
        .find('.list-todo__btn--delete')
        .as('itemDeleteButton')
        .should('be.visible')
        .should('contain', 'delete');

      // read
      cy.get('@itemShowButton').click();
      app.getDialog().as('dialogShow');
      cy.get('@dialogShow')
        .find('#dialog-title')
        .should('be.visible')
        .should('contain', fixtures.items[0].label.toUpperCase());
      cy.get('@dialogShow').find('#dialog-content').should('be.visible').as('dialogShowContent');

      cy.get('@dialogShowContent').find('ul > li strong').as('dialogShowRow').should('have.length', 2);
      cy.get('@dialogShowRow').eq(0).as('tagRow').should('contain', 'Tag');
      cy.get('@tagRow').next().find('.mdc-chip__text').should('contain', fixtures.items[0].tag.toLowerCase());

      cy.get('@dialogShowRow').eq(1).as('dateRow').should('contain', 'Date');
      cy.get('@dateRow').next().should('contain', moment(fixtures.items[0].date).format('MMMM Do, yyyy'));

      cy.get('@dialogShow').find('footer.mdc-dialog__actions').should('be.visible').as('dialogShowActions');
      cy.get('@dialogShowActions').find('button.mdc-button.mdc-dialog__button').should('have.length', 1);
      cy.get('@dialogShowActions').contains('Ok').should('be.visible').click();
      app.getDialog().should('not.exist');

      // update
      cy.get('@itemEditButton').click();
      app.getDialog().as('dialogEdit');
      cy.get('@dialogEdit').should('exist').should('be.visible');
      cy.get('@dialogEdit').find('#dialog-title').should('be.visible').should('contain', 'Edit a TODO');
      cy.get('@dialogEdit').find('#dialog-content').should('be.visible').as('dialogEditContent');

      cy.get('@dialogEditContent').find('#label').should('be.visible').as('labelField');
      cy.get('@labelField').find('input[type="text"]').as('labelInput').should('have.value', fixtures.items[0].label);
      cy.get('@labelField')
        .next()
        .find('.mdc-text-field-helper-text')
        .as('labelHelper')
        .should('contain', 'Label is required');

      cy.get('@dialogEditContent').find('#date').should('be.visible').as('dateField');
      cy.get('@dateField').find('input[type="date"]').as('dateInput').should('have.value', fixtures.items[0].date);
      cy.get('@dateField')
        .next()
        .find('.mdc-text-field-helper-text')
        .as('dateHelper')
        .should('contain', 'Date is required');

      cy.get('@dialogEditContent').find('#tag').should('be.visible').as('tagField');
      cy.get('@tagField').find('input[type="text"]').as('tagInput').should('have.value', fixtures.items[0].tag);
      cy.get('@tagField')
        .next()
        .find('.mdc-text-field-helper-text')
        .as('tagHelper')
        .should('contain', 'Tag is required');

      cy.get('@dialogEdit').find('footer.mdc-dialog__actions').should('be.visible').as('dialogEditActions');
      cy.get('@dialogEditActions').find('button.mdc-button.mdc-dialog__button').should('have.length', 2);
      cy.get('@dialogEditActions')
        .contains('Edit')
        .should('be.visible')
        .as('dialogEditButtonEdit')
        .should('be.enabled');
      cy.get('@dialogEditActions')
        .contains('Cancel')
        .should('be.visible')
        .as('dialogEditButtonCancel')
        .should('be.enabled');

      cy.get('@dialogEditButtonCancel').click();
      app.getDialog().should('not.exist');

      cy.get('@itemEditButton').click();
      cy.get('@dialogEdit').should('exist').should('be.visible');

      cy.get('@labelInput').clear().should('have.value', '');
      cy.get('@labelHelper').should('have.attr', 'role', 'alert');

      cy.get('@dateInput').clear().should('have.value', '');
      cy.get('@dateHelper').should('have.attr', 'role', 'alert');

      cy.get('@tagInput').clear().should('have.value', '');
      cy.get('@tagHelper').should('have.attr', 'role', 'alert');

      cy.get('@dialogEditButtonEdit').should('be.disabled');

      cy.get('@labelInput').type(fixtures.items[1].label).should('have.value', fixtures.items[1].label);
      cy.get('@labelHelper').should('not.have.attr', 'role');

      cy.get('@dateInput').type(fixtures.items[1].date).should('have.value', fixtures.items[1].date);
      cy.get('@dateHelper').should('not.have.attr', 'role');

      cy.get('@tagInput').type(fixtures.items[1].tag).should('have.value', fixtures.items[1].tag);
      cy.get('@tagHelper').should('not.have.attr', 'role');

      cy.get('@dialogEditButtonEdit').should('not.be.disabled').click();
      app.getDialog().should('not.exist');
      app.getCardList().find('.list-todo__list-item').should('have.length', 1).eq(0).as('item');

      cy.get('@item').find('input[type="checkbox"]').should('not.be.checked');
      cy.get('@item').find('.list-todo__list-item-label').as('itemLabel').should('be.visible');
      cy.get('@itemLabel')
        .find('.mdc-list-item__primary-text')
        .should('be.visible')
        .should('contain', fixtures.items[1].label);
      cy.get('@itemLabel')
        .find('.mdc-list-item__secondary-text')
        .should('be.visible')
        .should('contain', moment(fixtures.items[1].date).format('MMMM Do, yyyy'));

      // delete
      cy.get('@itemDeleteButton').click();
      app.getCardList().find('.list-todo__list-item').should('have.length', 0);
    });
  });

  const sizes = ['ipad-2', [800, 480]];
  sizes.forEach((size) => {
    it(`should display menu item on ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }

      app.getCard().should('be.visible');
      app.getLogo().should('be.visible').should('have.attr', 'alt', 'ESENS Consulting');
      app.getCardTitle().should('be.visible').should('contain', 'Todo list');
      app.getCardList().should('be.visible');
      app.getCardList().find('.list-todo__list-item').should('have.length', 5).eq(0).as('item');
      cy.get('@item').find('input[type="checkbox"]').should('not.be.checked');
      cy.get('@item').find('.list-todo__list-item-actions').as('actions');
      cy.get('@actions').should('be.visible');
      cy.get('@actions').find('.list-todo__btn').should('have.length', 1);
      cy.get('@actions')
        .find('.list-todo__btn--menu')
        .as('itemMenuButton')
        .should('be.visible')
        .should('contain', 'more_vert');
      cy.get('@itemMenuButton').click().next().find('.list-todo__menu').as('actions').should('be.visible');
      cy.get('@actions').find('li[role="menuitem"]').as('menuItems').should('have.length', 3);
      cy.get('@menuItems').eq(0).should('be.visible').should('contain', 'Show more');
      cy.get('@menuItems').eq(1).should('be.visible').should('contain', 'Edit');
      cy.get('@menuItems').eq(2).should('be.visible').should('contain', 'Delete');
      app
        .getAddButton()
        .should('be.visible')
        .should('have.attr', 'title', 'Add a TODO')
        .find('i.material-icons')
        .should('contain', 'add');
    });
  });
});
