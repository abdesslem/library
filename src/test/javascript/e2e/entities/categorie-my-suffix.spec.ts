import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Categorie e2e test', () => {

    let navBarPage: NavBarPage;
    let categorieDialogPage: CategorieDialogPage;
    let categorieComponentsPage: CategorieComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Categories', () => {
        navBarPage.goToEntity('categorie-my-suffix');
        categorieComponentsPage = new CategorieComponentsPage();
        expect(categorieComponentsPage.getTitle())
            .toMatch(/Categories/);

    });

    it('should load create Categorie dialog', () => {
        categorieComponentsPage.clickOnCreateButton();
        categorieDialogPage = new CategorieDialogPage();
        expect(categorieDialogPage.getModalTitle())
            .toMatch(/Create or edit a Categorie/);
        categorieDialogPage.close();
    });

    it('should create and save Categories', () => {
        categorieComponentsPage.clickOnCreateButton();
        categorieDialogPage.setNomcategorieInput('nomcategorie');
        expect(categorieDialogPage.getNomcategorieInput()).toMatch('nomcategorie');
        categorieDialogPage.setDescriptionInput('description');
        expect(categorieDialogPage.getDescriptionInput()).toMatch('description');
        categorieDialogPage.save();
        expect(categorieDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CategorieComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-categorie-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CategorieDialogPage {
    modalTitle = element(by.css('h4#myCategorieLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomcategorieInput = element(by.css('input#field_nomcategorie'));
    descriptionInput = element(by.css('input#field_description'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNomcategorieInput = function(nomcategorie) {
        this.nomcategorieInput.sendKeys(nomcategorie);
    };

    getNomcategorieInput = function() {
        return this.nomcategorieInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
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
