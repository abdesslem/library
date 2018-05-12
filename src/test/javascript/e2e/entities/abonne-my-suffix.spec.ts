import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Abonne e2e test', () => {

    let navBarPage: NavBarPage;
    let abonneDialogPage: AbonneDialogPage;
    let abonneComponentsPage: AbonneComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Abonnes', () => {
        navBarPage.goToEntity('abonne-my-suffix');
        abonneComponentsPage = new AbonneComponentsPage();
        expect(abonneComponentsPage.getTitle())
            .toMatch(/Abonnes/);

    });

    it('should load create Abonne dialog', () => {
        abonneComponentsPage.clickOnCreateButton();
        abonneDialogPage = new AbonneDialogPage();
        expect(abonneDialogPage.getModalTitle())
            .toMatch(/Create or edit a Abonne/);
        abonneDialogPage.close();
    });

    it('should create and save Abonnes', () => {
        abonneComponentsPage.clickOnCreateButton();
        abonneDialogPage.setNcinInput('5');
        expect(abonneDialogPage.getNcinInput()).toMatch('5');
        abonneDialogPage.setNomInput('nom');
        expect(abonneDialogPage.getNomInput()).toMatch('nom');
        abonneDialogPage.setPrenomInput('prenom');
        expect(abonneDialogPage.getPrenomInput()).toMatch('prenom');
        abonneDialogPage.setDatenaissanceInput('2000-12-31');
        expect(abonneDialogPage.getDatenaissanceInput()).toMatch('2000-12-31');
        abonneDialogPage.save();
        expect(abonneDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AbonneComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-abonne-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class AbonneDialogPage {
    modalTitle = element(by.css('h4#myAbonneLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    ncinInput = element(by.css('input#field_ncin'));
    nomInput = element(by.css('input#field_nom'));
    prenomInput = element(by.css('input#field_prenom'));
    datenaissanceInput = element(by.css('input#field_datenaissance'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNcinInput = function(ncin) {
        this.ncinInput.sendKeys(ncin);
    };

    getNcinInput = function() {
        return this.ncinInput.getAttribute('value');
    };

    setNomInput = function(nom) {
        this.nomInput.sendKeys(nom);
    };

    getNomInput = function() {
        return this.nomInput.getAttribute('value');
    };

    setPrenomInput = function(prenom) {
        this.prenomInput.sendKeys(prenom);
    };

    getPrenomInput = function() {
        return this.prenomInput.getAttribute('value');
    };

    setDatenaissanceInput = function(datenaissance) {
        this.datenaissanceInput.sendKeys(datenaissance);
    };

    getDatenaissanceInput = function() {
        return this.datenaissanceInput.getAttribute('value');
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
