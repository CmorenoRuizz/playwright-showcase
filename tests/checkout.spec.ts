import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';

test.describe('Pruebas del Flujo de Checkout para error_user', () => {

    test('El campo "Last Name" no se puede rellenar', async ({ page }) => {
        // PREPARACIÓN: Necesitamos loguearnos y llegar a la página de checkout
        const loginPage = new LoginPage(page);
        const checkoutPage = new CheckoutStepOnePage(page);

        await loginPage.goto();
        await loginPage.login('error_user', 'secret_sauce');

        // Vamos directamente a la página para simplificar el test.
        await checkoutPage.goToPage();

        await expect(checkoutPage.firstNameInput).toBeEditable();
        await expect(checkoutPage.postalCodeInput).toBeEditable();


        await checkoutPage.lastNameInput.fill('MiApellido');

        await expect(checkoutPage.lastNameInput).toHaveValue('');
    });

    test('El botón "Finish" del checkout no funciona', async ({ page }) => {
        
        const loginPage = new LoginPage(page);
        const checkoutOverviewPage = new CheckoutStepTwoPage(page);

        await loginPage.goto();
        await loginPage.login('error_user', 'secret_sauce');

        // Vamos directamente a la página para simplificar
        await checkoutOverviewPage.goToPage();

        // ACCIÓN Y VERIFICACIÓN
        const currentUrl = page.url(); // Guardamos la URL actual

        // 1. Hacemos clic en el botón que sabemos que está roto
        await checkoutOverviewPage.finishButton.click();

        // 2. LA ASERCIÓN CLAVE: Verificamos que la URL NO ha cambiado.
        // Es decir, seguimos en la misma página.
        await expect(page).toHaveURL(currentUrl);
    });

});