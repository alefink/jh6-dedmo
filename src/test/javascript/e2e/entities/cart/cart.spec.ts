/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CartComponentsPage, CartDeleteDialog, CartUpdatePage } from './cart.page-object';

const expect = chai.expect;

describe('Cart e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cartUpdatePage: CartUpdatePage;
  let cartComponentsPage: CartComponentsPage;
  /*let cartDeleteDialog: CartDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Carts', async () => {
    await navBarPage.goToEntity('cart');
    cartComponentsPage = new CartComponentsPage();
    await browser.wait(ec.visibilityOf(cartComponentsPage.title), 5000);
    expect(await cartComponentsPage.getTitle()).to.eq('blogApp.cart.home.title');
  });

  it('should load create Cart page', async () => {
    await cartComponentsPage.clickOnCreateButton();
    cartUpdatePage = new CartUpdatePage();
    expect(await cartUpdatePage.getPageTitle()).to.eq('blogApp.cart.home.createOrEditLabel');
    await cartUpdatePage.cancel();
  });

  /* it('should create and save Carts', async () => {
        const nbButtonsBeforeCreate = await cartComponentsPage.countDeleteButtons();

        await cartComponentsPage.clickOnCreateButton();
        await promise.all([
            cartUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            cartUpdatePage.setCantidadInput('5'),
            cartUpdatePage.setTotalPriceInput('5'),
            cartUpdatePage.productSelectLastOption(),
        ]);
        expect(await cartUpdatePage.getDateCreatedInput()).to.contain('2001-01-01T02:30', 'Expected dateCreated value to be equals to 2000-12-31');
        expect(await cartUpdatePage.getCantidadInput()).to.eq('5', 'Expected cantidad value to be equals to 5');
        expect(await cartUpdatePage.getTotalPriceInput()).to.eq('5', 'Expected totalPrice value to be equals to 5');
        await cartUpdatePage.save();
        expect(await cartUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await cartComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last Cart', async () => {
        const nbButtonsBeforeDelete = await cartComponentsPage.countDeleteButtons();
        await cartComponentsPage.clickOnLastDeleteButton();

        cartDeleteDialog = new CartDeleteDialog();
        expect(await cartDeleteDialog.getDialogTitle())
            .to.eq('blogApp.cart.delete.question');
        await cartDeleteDialog.clickOnConfirmButton();

        expect(await cartComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
