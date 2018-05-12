import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Emprunt e2e test', () => {

    let navBarPage: NavBarPage;
    let empruntDialogPage: EmpruntDialogPage;
    let empruntComponentsPage: EmpruntComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Emprunts', () => {
        navBarPage.goToEntity('emprunt-my-suffix');
        empruntComponentsPage = new EmpruntComponentsPage();
        expect(empruntComponentsPage.getTitle())
            .toMatch(/Emprunts/);

    });

    it('should load create Emprunt dialog', () => {
        empruntComponentsPage.clickOnCreateButton();
        empruntDialogPage = new EmpruntDialogPage();
        expect(empruntDialogPage.getModalTitle())
            .toMatch(/Create or edit a Emprunt/);
        empruntDialogPage.close();
    });

    it('should create and save Emprunts', () => {
        empruntComponentsPage.clickOnCreateButton();
        empruntDialogPage.setDateempruntInput('2000-12-31');
        expect(empruntDialogPage.getDateempruntInput()).toMatch('2000-12-31');
        empruntDialogPage.setDateretourlimiteInput('2000-12-31');
        expect(empruntDialogPage.getDateretourlimiteInput()).toMatch('2000-12-31');
        empruntDialogPage.livreSelectLastOption();
        empruntDialogPage.abonneSelectLastOption();
        empruntDialogPage.save();
        expect(empruntDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EmpruntComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-emprunt-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class EmpruntDialogPage {
    modalTitle = element(by.css('h4#myEmpruntLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    dateempruntInput = element(by.css('input#field_dateemprunt'));
    dateretourlimiteInput = element(by.css('input#field_dateretourlimite'));
    livreSelect = element(by.css('select#field_livre'));
    abonneSelect = element(by.css('select#field_abonne'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setDateempruntInput = function(dateemprunt) {
        this.dateempruntInput.sendKeys(dateemprunt);
    };

    getDateempruntInput = function() {
        return this.dateempruntInput.getAttribute('value');
    };

    setDateretourlimiteInput = function(dateretourlimite) {
        this.dateretourlimiteInput.sendKeys(dateretourlimite);
    };

    getDateretourlimiteInput = function() {
        return this.dateretourlimiteInput.getAttribute('value');
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
