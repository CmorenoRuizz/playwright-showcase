import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage"; // Importamos nuestra clase

test.describe("Pruebas de Login para SauceDemo", () => {
  // Test login usuario correcto
  test("El usuario puede iniciar sesión con credenciales válidas", async ({
    page,
  }) => {
    // Creamos una instancia de nuestra LoginPage
    const loginPage = new LoginPage(page);

    // Usamos los métodos que hemos creado
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");

    // Las verificaciones se quedan en el test
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".title")).toHaveText("Products");
  });

  // Test login para usuario bloqueado
  test("El usuario no puede iniciar sesión con credenciales inválidas", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("locked_out_user", "secret_sauce"); // Usuario bloqueado

    // Verificamos que aparece el mensaje de error correcto
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  //Test login usuario y ve la página de forma incorrecta
  test('El usuario "problem_user" ve imágenes de producto incorrectas', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("problem_user", "secret_sauce");

    // Verificamos que hemos entrado a la página de inventario
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    const primeraImagenProducto = page.locator('.inventory_item').first().locator('img');

    //await page.pause(); 

    // Usamos 'toHaveAttribute' para comprobar la fuente (source) de la imagen.
    await expect(primeraImagenProducto).toHaveAttribute(
      "src",
      /sl-404/
    );
  });
});
