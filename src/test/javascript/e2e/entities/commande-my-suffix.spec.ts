import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Commande e2e test', () => {

    let navBarPage: NavBarPage;
    let commandeDialogPage: CommandeDialogPage;
    let commandeComponentsPage: CommandeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Commandes', () => {
        navBarPage.goToEntity('commande-my-suffix');
        commandeComponentsPage = new CommandeComponentsPage();
        expect(commandeComponentsPage.getTitle())
            .toMatch(/Commandes/);

    });

    it('should load create Commande dialog', () => {
        commandeComponentsPage.clickOnCreateButton();
        commandeDialogPage = new CommandeDialogPage();
        expect(commandeDialogPage.getModalTitle())
            .toMatch(/Create or edit a Commande/);
        commandeDialogPage.close();
    });

    it('should create and save Commandes', () => {
        commandeComponentsPage.clickOnCreateButton();
        commandeDialogPage.setQtecommandeInput('5');
        expect(commandeDialogPage.getQtecommandeInput()).toMatch('5');
        commandeDialogPage.setDatecommandeInput('2000-12-31');
        expect(commandeDialogPage.getDatecommandeInput()).toMatch('2000-12-31');
        commandeDialogPage.setMontantInput('5');
        expect(commandeDialogPage.getMontantInput()).toMatch('5');
        commandeDialogPage.administrateurSelectLastOption();
        // commandeDialogPage.livreSelectLastOption();
        commandeDialogPage.fournisseurSelectLastOption();
        commandeDialogPage.save();
        expect(commandeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CommandeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-commande-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CommandeDialogPage {
    modalTitle = element(by.css('h4#myCommandeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    qtecommandeInput = element(by.css('input#field_qtecommande'));
    datecommandeInput = element(by.css('input#field_datecommande'));
    montantInput = element(by.css('input#field_montant'));
    administrateurSelect = element(by.css('select#field_administrateur'));
    livreSelect = element(by.css('select#field_livre'));
    fournisseurSelect = element(by.css('select#field_fournisseur'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setQtecommandeInput = function(qtecommande) {
        this.qtecommandeInput.sendKeys(qtecommande);
    };

    getQtecommandeInput = function() {
        return this.qtecommandeInput.getAttribute('value');
    };

    setDatecommandeInput = function(datecommande) {
        this.datecommandeInput.sendKeys(datecommande);
    };

    getDatecommandeInput = function() {
        return this.datecommandeInput.getAttribute('value');
    };

    setMontantInput = function(montant) {
        this.montantInput.sendKeys(montant);
    };

    getMontantInput = function() {
        return this.montantInput.getAttribute('value');
    };

    administrateurSelectLastOption = function() {
        this.administrateurSelect.all(by.tagName('option')).last().click();
    };

    administrateurSelectOption = function(option) {
        this.administrateurSelect.sendKeys(option);
    };

    getAdministrateurSelect = function() {
        return this.administrateurSelect;
    };

    getAdministrateurSelectedOption = function() {
        return this.administrateurSelect.element(by.css('option:checked')).getText();
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

    fournisseurSelectLastOption = function() {
        this.fournisseurSelect.all(by.tagName('option')).last().click();
    };

    fournisseurSelectOption = function(option) {
        this.fournisseurSelect.sendKeys(option);
    };

    getFournisseurSelect = function() {
        return this.fournisseurSelect;
    };

    getFournisseurSelectedOption = function() {
        return this.fournisseurSelect.element(by.css('option:checked')).getText();
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
