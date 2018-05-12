import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Fournisseur e2e test', () => {

    let navBarPage: NavBarPage;
    let fournisseurDialogPage: FournisseurDialogPage;
    let fournisseurComponentsPage: FournisseurComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Fournisseurs', () => {
        navBarPage.goToEntity('fournisseur-my-suffix');
        fournisseurComponentsPage = new FournisseurComponentsPage();
        expect(fournisseurComponentsPage.getTitle())
            .toMatch(/Fournisseurs/);

    });

    it('should load create Fournisseur dialog', () => {
        fournisseurComponentsPage.clickOnCreateButton();
        fournisseurDialogPage = new FournisseurDialogPage();
        expect(fournisseurDialogPage.getModalTitle())
            .toMatch(/Create or edit a Fournisseur/);
        fournisseurDialogPage.close();
    });

    it('should create and save Fournisseurs', () => {
        fournisseurComponentsPage.clickOnCreateButton();
        fournisseurDialogPage.setNomfournisseurInput('nomfournisseur');
        expect(fournisseurDialogPage.getNomfournisseurInput()).toMatch('nomfournisseur');
        fournisseurDialogPage.setAdressefournisseurInput('adressefournisseur');
        expect(fournisseurDialogPage.getAdressefournisseurInput()).toMatch('adressefournisseur');
        fournisseurDialogPage.save();
        expect(fournisseurDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FournisseurComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-fournisseur-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class FournisseurDialogPage {
    modalTitle = element(by.css('h4#myFournisseurLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomfournisseurInput = element(by.css('input#field_nomfournisseur'));
    adressefournisseurInput = element(by.css('input#field_adressefournisseur'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNomfournisseurInput = function(nomfournisseur) {
        this.nomfournisseurInput.sendKeys(nomfournisseur);
    };

    getNomfournisseurInput = function() {
        return this.nomfournisseurInput.getAttribute('value');
    };

    setAdressefournisseurInput = function(adressefournisseur) {
        this.adressefournisseurInput.sendKeys(adressefournisseur);
    };

    getAdressefournisseurInput = function() {
        return this.adressefournisseurInput.getAttribute('value');
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
