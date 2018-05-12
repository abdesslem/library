import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Livre e2e test', () => {

    let navBarPage: NavBarPage;
    let livreDialogPage: LivreDialogPage;
    let livreComponentsPage: LivreComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Livres', () => {
        navBarPage.goToEntity('livre-my-suffix');
        livreComponentsPage = new LivreComponentsPage();
        expect(livreComponentsPage.getTitle())
            .toMatch(/Livres/);

    });

    it('should load create Livre dialog', () => {
        livreComponentsPage.clickOnCreateButton();
        livreDialogPage = new LivreDialogPage();
        expect(livreDialogPage.getModalTitle())
            .toMatch(/Create or edit a Livre/);
        livreDialogPage.close();
    });

    it('should create and save Livres', () => {
        livreComponentsPage.clickOnCreateButton();
        livreDialogPage.setNomlivreInput('nomlivre');
        expect(livreDialogPage.getNomlivreInput()).toMatch('nomlivre');
        livreDialogPage.setAuteurInput('auteur');
        expect(livreDialogPage.getAuteurInput()).toMatch('auteur');
        livreDialogPage.setEditionInput('edition');
        expect(livreDialogPage.getEditionInput()).toMatch('edition');
        livreDialogPage.setDateeditionInput('2000-12-31');
        expect(livreDialogPage.getDateeditionInput()).toMatch('2000-12-31');
        livreDialogPage.setNbpagesInput('5');
        expect(livreDialogPage.getNbpagesInput()).toMatch('5');
        livreDialogPage.categorieSelectLastOption();
        livreDialogPage.save();
        expect(livreDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LivreComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-livre-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class LivreDialogPage {
    modalTitle = element(by.css('h4#myLivreLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomlivreInput = element(by.css('input#field_nomlivre'));
    auteurInput = element(by.css('input#field_auteur'));
    editionInput = element(by.css('input#field_edition'));
    dateeditionInput = element(by.css('input#field_dateedition'));
    nbpagesInput = element(by.css('input#field_nbpages'));
    categorieSelect = element(by.css('select#field_categorie'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNomlivreInput = function(nomlivre) {
        this.nomlivreInput.sendKeys(nomlivre);
    };

    getNomlivreInput = function() {
        return this.nomlivreInput.getAttribute('value');
    };

    setAuteurInput = function(auteur) {
        this.auteurInput.sendKeys(auteur);
    };

    getAuteurInput = function() {
        return this.auteurInput.getAttribute('value');
    };

    setEditionInput = function(edition) {
        this.editionInput.sendKeys(edition);
    };

    getEditionInput = function() {
        return this.editionInput.getAttribute('value');
    };

    setDateeditionInput = function(dateedition) {
        this.dateeditionInput.sendKeys(dateedition);
    };

    getDateeditionInput = function() {
        return this.dateeditionInput.getAttribute('value');
    };

    setNbpagesInput = function(nbpages) {
        this.nbpagesInput.sendKeys(nbpages);
    };

    getNbpagesInput = function() {
        return this.nbpagesInput.getAttribute('value');
    };

    categorieSelectLastOption = function() {
        this.categorieSelect.all(by.tagName('option')).last().click();
    };

    categorieSelectOption = function(option) {
        this.categorieSelect.sendKeys(option);
    };

    getCategorieSelect = function() {
        return this.categorieSelect;
    };

    getCategorieSelectedOption = function() {
        return this.categorieSelect.element(by.css('option:checked')).getText();
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
