const assert = require("assert");
const { describe, it } = require("mocha");
const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

describe('Testing Login', async function () {
  it('Testing de input de user', async function () {
       let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('http://localhost:3000/login');

            await driver.findElement({ id: 'User' }).sendKeys('Samuel');
            await driver.findElement({ className: 'button-submit' }).click();

            // Espera a que aparezca el elemento con la clase 'swal2-title'
            await driver.wait(until.elementLocated({ className: 'swal2-title' }));

            const rellenarCampos = await driver.findElement({ id: 'swal2-title' }).getText();

            driver
        .takeScreenshot()
        .then((image) => fs.writeFile("usuario.png", image, "base64", (err) => {}));
        

            assert.equal(rellenarCampos, 'El mensaje que esperas', 'Test exitoso');

        } catch (error) {
            console.log(error);
        }  finally {
          driver.quit();
      }
    })
    
    it('Testing de input de password', async function () {
      let driver = await new Builder().forBrowser('chrome').build();
      try {
          await driver.get('http://localhost:3000/login');

          await driver.findElement({ id: 'User' }).sendKeys('user');
          await driver.findElement({ id: 'Contrasena' }).sendKeys('user');
          await driver.findElement({ className: 'button-submit' }).click();

          // Espera a que aparezca el elemento con la clase 'swal2-title'
          await driver.wait(until.elementLocated({ className: 'swal2-title' }));

          const incorrecto = await driver.findElement({ id: 'swal2-title' }).getText();
          console.log(incorrecto)

          driver
        .takeScreenshot()
        .then((image) => fs.writeFile("contraseña.png", image, "base64", (err) => {}));
        

          assert.equal(incorrecto, 'Password y/o User incorrect', 'Test exitoso');

      } catch (error) {
          console.log('Este es el error:',error);
      }  finally {
        driver.quit();
    }
  })

  
  it('Testing de input de inicio', async function () {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/login');

        await driver.findElement({ id: 'User' }).sendKeys('pruebaItla');
        await driver.findElement({ id: 'Contrasena' }).sendKeys('itla123456');
        await driver.findElement({ className: 'button-submit' }).click();

        // Espera a que aparezca el elemento con la clase 'swal2-title'
        await driver.wait(until.elementLocated({ className: 'swal2-title' }));

        const incorrecto = await driver.findElement({ id: 'swal2-title' }).getText();
        console.log(incorrecto)

        driver
        .takeScreenshot()
        .then((image) => fs.writeFile("inicio.png", image, "base64", (err) => {}));

        assert.equal(incorrecto, 'Inicio de sesión', 'Test exitoso');


    } catch (error) {
        console.log('Este es el error:',error);
    } finally {
        driver.quit();
    }
})
});
