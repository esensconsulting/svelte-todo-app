class AppPage {
  getContainer() {
    return cy.get('.list-todo');
  }

  getLogo() {
    return this.getContainer().find('.list-todo__logo > img');
  }

  getCard() {
    return this.getContainer().find('.list-todo__card');
  }

  getCardTitle() {
    return this.getCard().find('.mdc-typography--headline3');
  }

  getCardList() {
    return this.getCard().find('.list-todo__list');
  }

  getAddButton() {
    return this.getCard().find('button.list-todo__btn.list-todo__btn--add');
  }

  getDialog() {
    return cy.get('.mdc-dialog.mdc-dialog--open');
  }
}

export default AppPage;
