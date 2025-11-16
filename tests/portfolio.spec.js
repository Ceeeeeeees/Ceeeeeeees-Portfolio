// Tests E2E para el portfolio de César Saucedo
const { test, expect } = require('@playwright/test');

test.describe('Portfolio - Navegación y Estructura', () => {
  test('debe cargar la página principal', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/César Saucedo/);
  });

  test('debe tener todas las secciones principales', async ({ page }) => {
    await page.goto('/');

    // Verificar que todas las secciones existan
    await expect(page.locator('#SobreMi')).toBeVisible();
    await expect(page.locator('#TechStack')).toBeVisible();
    await expect(page.locator('#Educacion')).toBeVisible();
    await expect(page.locator('#Experiencia')).toBeVisible();
    await expect(page.locator('#Intereses')).toBeVisible();
    await expect(page.locator('#Proyectos')).toBeVisible();
    await expect(page.locator('#Certificaciones')).toBeVisible();
    await expect(page.locator('#Contacto')).toBeVisible();
  });

  test('la navegación debe funcionar correctamente', async ({ page }) => {
    await page.goto('/');

    // Click en cada link del navbar
    await page.click('a[href="#TechStack"]');
    await expect(page.locator('#TechStack')).toBeInViewport();

    await page.click('a[href="#Proyectos"]');
    await expect(page.locator('#Proyectos')).toBeInViewport();

    await page.click('a[href="#Contacto"]');
    await expect(page.locator('#Contacto')).toBeInViewport();
  });
});

test.describe('Portfolio - Funcionalidades', () => {
  test('el toggle de tema debe funcionar', async ({ page }) => {
    await page.goto('/');

    const toggleBtn = page.locator('#lightDarkToggle');
    await toggleBtn.click();

    // Verificar que el body tenga la clase light-mode
    await expect(page.locator('body')).toHaveClass(/light-mode/);

    // Volver a modo oscuro
    await toggleBtn.click();
    await expect(page.locator('body')).not.toHaveClass(/light-mode/);
  });

  test('el botón CV debe mostrar el modal', async ({ page }) => {
    await page.goto('/');

    await page.click('#downloadCV');

    // Verificar que aparece el modal "En Construcción"
    await expect(page.locator('.cv-notification')).toBeVisible();
    await expect(page.locator('.cv-notification-title')).toContainText('En Construcción');
  });

  test('el tour del portfolio debe iniciarse', async ({ page }) => {
    await page.goto('/');

    // Click en el botón del tour
    await page.click('.tour-button');

    // Verificar que aparece el overlay y tooltip
    await expect(page.locator('.tour-overlay')).toBeVisible();
    await expect(page.locator('.tour-tooltip')).toBeVisible();
  });
});

test.describe('Portfolio - Formulario de Contacto', () => {
  test('debe validar campos vacíos', async ({ page }) => {
    await page.goto('/#Contacto');

    // Intentar enviar el formulario vacío
    await page.click('.btn-submit');

    // Verificar que aparecen mensajes de error
    await expect(page.locator('#nombre-error')).toBeVisible();
    await expect(page.locator('#email-error')).toBeVisible();
  });

  test('debe validar formato de email', async ({ page }) => {
    await page.goto('/#Contacto');

    // Llenar nombre
    await page.fill('#nombre', 'Juan Pérez');

    // Email inválido
    await page.fill('#email', 'email-invalido');
    await page.click('#mensaje'); // blur

    // Verificar mensaje de error
    await expect(page.locator('#email-error')).toContainText('email no es válido');
  });

  test('debe actualizar el contador de caracteres', async ({ page }) => {
    await page.goto('/#Contacto');

    const mensaje = 'Este es un mensaje de prueba';
    await page.fill('#mensaje', mensaje);

    // Verificar que el contador se actualiza
    await expect(page.locator('#char-count')).toHaveText(String(mensaje.length));
  });

  test('debe validar mensaje mínimo 20 caracteres', async ({ page }) => {
    await page.goto('/#Contacto');

    await page.fill('#mensaje', 'Muy corto');
    await page.click('#nombre'); // blur

    await expect(page.locator('#mensaje-error')).toContainText('al menos 20 caracteres');
  });
});

test.describe('Portfolio - Responsividad', () => {
  test('debe ser responsive en móvil', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Verificar que el menú hamburguesa esté visible
    await expect(page.locator('.navbar-toggler')).toBeVisible();

    // Abrir menú
    await page.click('.navbar-toggler');

    // Verificar que el menú se despliega
    await expect(page.locator('.navbar-collapse')).toBeVisible();
  });

  test('las imágenes deben cargar correctamente', async ({ page }) => {
    await page.goto('/');

    const techIcons = page.locator('.tech-item img');
    const count = await techIcons.count();

    // Verificar que hay íconos tecnológicos
    expect(count).toBeGreaterThan(10);
  });
});

test.describe('Portfolio - SEO y Accesibilidad', () => {
  test('debe tener meta tags correctos', async ({ page }) => {
    await page.goto('/');

    // Verificar meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /César Saucedo/);

    // Verificar canonical
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /ceeeeeeees.github.io/);
  });

  test('debe tener estructura de headings apropiada', async ({ page }) => {
    await page.goto('/');

    // Debe haber un h1
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    // Debe haber varios h2
    const h2s = page.locator('h2');
    const h2Count = await h2s.count();
    expect(h2Count).toBeGreaterThan(5);
  });

  test('los enlaces deben tener aria-labels', async ({ page }) => {
    await page.goto('/');

    const socialLinks = page.locator('.social-link');
    const count = await socialLinks.count();

    for (let i = 0; i < count; i++) {
      await expect(socialLinks.nth(i)).toHaveAttribute('aria-label', /.+/);
    }
  });
});

test.describe('Portfolio - PWA', () => {
  test('debe tener manifest.json', async ({ page }) => {
    await page.goto('/');

    const manifest = page.locator('link[rel="manifest"]');
    await expect(manifest).toHaveAttribute('href', /manifest.json/);
  });

  test('debe registrar el service worker', async ({ page, context }) => {
    await page.goto('/');

    // Esperar a que se registre el service worker
    await page.waitForTimeout(2000);

    const swRegistered = await page.evaluate(() => {
      return navigator.serviceWorker.controller !== null ||
             navigator.serviceWorker.getRegistrations().then(regs => regs.length > 0);
    });

    expect(swRegistered).toBeTruthy();
  });
});
