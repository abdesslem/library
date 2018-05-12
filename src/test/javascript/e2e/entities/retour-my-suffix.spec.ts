import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Retour e2e test', () => {

    let navBarPage: NavBarPage;
    let retourDialogPage: RetourDialogPage;
    let retourComponentsPage: RetourComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Retours', () => {
        navBarPage.goToEntity('retour-my-suffix');
        retourComponentsPage = new RetourComponentsPage();
        expect(retourComponentsPage.getTitle())
            .toMatch(/Retours/);

    });

    it('should load create Retour dialog', () => {
        retourComponentsPage.clickOnCreateButton();
        retourDialogPage = new RetourDialogPage();
        expect(retourDialogPage.getModalTitle())
            .toMatch(/Create or edit a Retour/);
        retourDialogPage.close();
    });

    it('should create and save Retours', () => {
        retourComponentsPage.clickOnCreateButton();
        retourDialogPage.setDateretourInput('2000-12-31');
        expect(retourDialogPage.getDateretourInput()).toMatch('2000-12-31');
        retourDialogPage.livreSelectLastOption();
        retourDialogPage.abonneSelectLastOption();
        retourDialogPage.save();
        expect(retourDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RetourComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-retour-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class RetourDialogPage {
    modalTitle = element(by.css('h4#myRetourLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    dateretourInput = element(by.css('input#field_dateretour'));
    livreSelect = element(by.css('select#field_livre'));
    abonneSelect = element(by.css('select#field_abonne'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setDateretourInput = function(dateretour) {
        this.dateretourInput.sendKeys(dateretour);
    };

    getDateretourInput = function() {
        return this.dateretourInput.getAttribute('value');
    };

    livreSelectLastOption = function() {
        this.livreSelect.all(by.tagName('option')).last().click();
    };

    livreSelectOption = function(option) {
        this.livreSelect.sendKeys(option);
    };

    getLivreSelect = function() {
        return this.livreSelect;
    };

    getLivreSelectedOption = function() {
        return this.livreSelect.element(by.css('option:checked')).getText();
    };

    abonneSelectLastOption = function() {
        this.abonneSelect.all(by.tagName('option')).last().click();
    };

    abonneSelectOption = function(option) {
        this.abonneSelect.sendKeys(option);
    };

    getAbonneSelect = function() {
        return this.abonneSelect;
    };

    getAbonneSelectedOption = function() {
        return this.abonneSelect.element(by.css('option:checked')).getText();
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
