import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Administrateur e2e test', () => {

    let navBarPage: NavBarPage;
    let administrateurDialogPage: AdministrateurDialogPage;
    let administrateurComponentsPage: AdministrateurComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Administrateurs', () => {
        navBarPage.goToEntity('administrateur-my-suffix');
        administrateurComponentsPage = new AdministrateurComponentsPage();
        expect(administrateurComponentsPage.getTitle())
            .toMatch(/Administrateurs/);

    });

    it('should load create Administrateur dialog', () => {
        administrateurComponentsPage.clickOnCreateButton();
        administrateurDialogPage = new AdministrateurDialogPage();
        expect(administrateurDialogPage.getModalTitle())
            .toMatch(/Create or edit a Administrateur/);
        administrateurDialogPage.close();
    });

    it('should create and save Administrateurs', () => {
        administrateurComponentsPage.clickOnCreateButton();
        administrateurDialogPage.setLoginInput('login');
        expect(administrateurDialogPage.getLoginInput()).toMatch('login');
        administrateurDialogPage.setMdpInput('mdp');
        expect(administrateurDialogPage.getMdpInput()).toMatch('mdp');
        administrateurDialogPage.setFirstnameInput('firstname');
        expect(administrateurDialogPage.getFirstnameInput()).toMatch('firstname');
        administrateurDialogPage.setLastnameInput('lastname');
        expect(administrateurDialogPage.getLastnameInput()).toMatch('lastname');
        administrateurDialogPage.setEmailInput('email');
        expect(administrateurDialogPage.getEmailInput()).toMatch('email');
        administrateurDialogPage.setAdresseInput('adresse');
        expect(administrateurDialogPage.getAdresseInput()).toMatch('adresse');
        administrateurDialogPage.save();
        expect(administrateurDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AdministrateurComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-administrateur-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class AdministrateurDialogPage {
    modalTitle = element(by.css('h4#myAdministrateurLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    loginInput = element(by.css('input#field_login'));
    mdpInput = element(by.css('input#field_mdp'));
    firstnameInput = element(by.css('input#field_firstname'));
    lastnameInput = element(by.css('input#field_lastname'));
    emailInput = element(by.css('input#field_email'));
    adresseInput = element(by.css('input#field_adresse'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setLoginInput = function(login) {
        this.loginInput.sendKeys(login);
    };

    getLoginInput = function() {
        return this.loginInput.getAttribute('value');
    };

    setMdpInput = function(mdp) {
        this.mdpInput.sendKeys(mdp);
    };

    getMdpInput = function() {
        return this.mdpInput.getAttribute('value');
    };

    setFirstnameInput = function(firstname) {
        this.firstnameInput.sendKeys(firstname);
    };

    getFirstnameInput = function() {
        return this.firstnameInput.getAttribute('value');
    };

    setLastnameInput = function(lastname) {
        this.lastnameInput.sendKeys(lastname);
    };

    getLastnameInput = function() {
        return this.lastnameInput.getAttribute('value');
    };

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    };

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    };

    setAdresseInput = function(adresse) {
        this.adresseInput.sendKeys(adresse);
    };

    getAdresseInput = function() {
        return this.adresseInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
