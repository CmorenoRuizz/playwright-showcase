import { test, expect } from '@playwright/test';

// ESTE TEST NO SIGUE POM, es un ejemplo básico
// 'describe' agrupa tests relacionados. Es bueno para la organización.
test.describe('Pruebas de Login para SauceDemo', () => {

  // Este es nuestro primer caso de prueba
  test('El usuario puede iniciar sesión con credenciales válidas', async ({ page }) => {
    
    // 1. Navegar a la página de login
    await page.goto('https://www.saucedemo.com/');

    // 2. Rellenar el campo de usuario
    // Usamos el selector de [data-test] que es una buena práctica
    await page.locator('[data-test="username"]').fill('standard_user');

    // 3. Rellenar el campo de contraseña
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 4. Hacer clic en el botón de login
    await page.locator('[data-test="login-button"]').click();

    // 5. Verificar que hemos iniciado sesión correctamente
    // La URL debería cambiar a la página del inventario
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
    // También verificamos que el título de la página es el correcto
    await expect(page.locator('.title')).toHaveText('Products');
  });

});