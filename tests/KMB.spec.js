
const { test, expect } = require('@playwright/test');



  test('KMB test', async ({ page }) => {

    await page.goto('/'); 

    //odsouhlasení cookies
    const cookiesButton = page.getByTestId('cookie-bar-accept-all');
    if (await cookiesButton.isVisible()) {
      await cookiesButton.click();
      await page.waitForTimeout(3000);
    }

    //ověření cookies
    const cookies = await page.context().cookies();
    const cookie = cookies.find(c => c.name === 'CMSCookieLevelValue' && c.domain.includes('kb.cz'));
    expect(cookie?.value).toBe('preferential%7Canalytical%7Cmarketing');
    //console.log('Cookie value:', cookie.value); //moje ověření hodnoty cookie

    await page.getByTestId('language-desktop-Česky').click(); //přepnutí do čj
    
    //přechod na podnikatelé a firmy, ověření nezobrazení cookies
    await page.getByTestId('segment-desktop-5b13e6f2-bc20-41fa-a6d5-a36a68422762').click();
    expect(await page.getByTestId('cookie-bar-accept-all').isVisible()).toBeFalsy();


    //přechod na produkty a interakce s formulářem
    await page.waitForTimeout(3000);   //čekáme na načtení
    await page.getByText('Produkty').click();
    await page.getByRole('link', { name: 'Profi účet', exact: true}).click();
    await page.getByRole('link', { name: 'Mám zájem' }).click();
    await page.waitForTimeout(3000);   //čekáme na načtení
    await page.getByTestId('cta-0cdeae99-121e-4271-8aeb-0bf09f16ff54').click();
    await page.getByPlaceholder('Karel Novák').click();
    await page.getByPlaceholder('Karel Novák').fill('Karel Novák');
    await page.getByPlaceholder('777 123 456').click();
    await page.getByPlaceholder('777 123 456').fill('777 123 456');
    await page.getByPlaceholder('karel.novak@email.cz').click();                        //bez vyplněného emailu nelze pokračovat
    await page.getByPlaceholder('karel.novak@email.cz').fill('karel.novak@email.cz');
    await page.locator('[data-test="confirmBtn"]').click();
    await page.getByPlaceholder('Zadejte adresu').click();
    await page.getByPlaceholder('Zadejte adresu').fill('Kladno');
    await page.getByRole('option', { name: 'Kladno 1' }).click();
  
    //ověření zobrazení 
      
    await expect(page.getByTestId('tab-list')).toBeVisible();
    await expect(page.getByTestId('tab-map')).toBeVisible();
  
    //načíst dalsí a ověřit počet 
  
    await page.getByText('Načíst další').click();
    await page.waitForSelector('.resultContainer');
    const buttons = await page.$$('.resultContainer .branchOption');
    expect(buttons.length).toBe(10);

    
  // const buttonCount = buttons.length;
  // console.log(`Počet tlačítek: ${buttonCount}`);

    
  //  if (buttonCount === 10) {
  //  console.log('Element obsahuje přesně 10 položek.');
  //  } else {
  //  console.log('Element neobsahuje přesně 10 položek.');
  //   }

  });


