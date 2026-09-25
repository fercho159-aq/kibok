# Kibok a k'uuts — Tienda en línea

Sitio de e-commerce estático (HTML + CSS + JavaScript, sin frameworks ni build).
Se abre con doble clic o se sube tal cual a cualquier hosting.

---

## 1. Cómo poner los precios

Abre **`js/products.js`**. Cada producto tiene una línea así:

```js
precio: null,
```

Cámbiala por el número, sin `$` ni comas:

```js
precio: 1250,
```

Si quieres mostrar un precio tachado (oferta), agrega también:

```js
precio: 1250,
precioAnterior: 1690,
```

Guarda el archivo y recarga la página. No hay que tocar nada más.
Mientras un producto tenga `precio: null` el sitio muestra **“Precio a consultar”**
y el pedido sale como cotización.

## 2. Datos de contacto

Abre **`js/config.js`** y cambia:

| Campo | Qué es |
|---|---|
| `whatsapp` | Número al que llegan los pedidos. Formato internacional **sin `+` ni espacios** (México: `52` + 10 dígitos, ej. `5219991234567`). |
| `email` | Correo de contacto del pie de página. |
| `instagram`, `facebook` | Enlaces de redes. |
| `ciudad` | Ciudad que aparece en el pie. |
| `mostrarPrecios` | `true` muestra precios; `false` fuerza “Precio a consultar” en todo el sitio. |
| `envioGratisDesde` | Monto para el aviso de envío gratis (`null` lo desactiva). |

> **Importante:** el número de WhatsApp viene con un valor de ejemplo
> (`5219999999999`). Cámbialo antes de publicar.

## 3. Cómo funciona el pedido

1. El cliente agrega piezas al pedido (se guardan en su navegador).
2. En **Tu pedido** pulsa *Enviar pedido por WhatsApp*.
3. Se abre WhatsApp con el pedido ya escrito: piezas, cantidades, colores y total.
4. Ustedes confirman existencias, envío y forma de pago por ese mismo chat.

No hay pasarela de pago ni servidor: nada que mantener y cero comisiones.
Si más adelante quieren cobrar en línea (Mercado Pago, Stripe, PayPal),
el carrito ya está listo para conectarlo.

## 4. Estructura

```
index.html          Inicio (portada, categorías, destacados)
tienda.html         Catálogo con filtros, búsqueda y orden
producto.html       Ficha de producto  (producto.html?id=trc-003)
carrito.html        Pedido y envío por WhatsApp
css/styles.css      Todo el diseño
js/config.js        ← contacto y ajustes
js/products.js      ← catálogo y precios
js/app.js           Lógica (carrito, filtros, galería)
img/productos/      Fotos, 1200 px y 600 px (-sm) en WebP
img/marca/          Logo, emblema, portada, fondo
```

## 5. Agregar un producto nuevo

1. Guarda la foto en `img/productos/` como `.webp` (cuadrada, fondo blanco).
   Súbela en dos tamaños: `nombre.webp` (1200 px) y `nombre-sm.webp` (600 px).
2. Copia un bloque de `js/products.js` y ajusta `id`, `nombre`, `modelo`,
   `categoria`, `precio`, textos e `imagenes: ["nombre"]`.

El `id` es el que aparece en la dirección del producto, así que usa minúsculas y guiones.

## 6. Publicar

Cualquier hosting estático funciona:

- **Netlify / Vercel / Cloudflare Pages:** arrastra la carpeta a su panel.
- **Hosting propio (cPanel, hosting mexicano):** sube la carpeta por FTP a `public_html`.
- **GitHub Pages:** sube el repositorio y activa Pages.

Para verlo en tu computadora antes de publicar:

```bash
node ".claude/server.js"
```

y abre `http://localhost:4173`.

## 7. Detalles que conviene revisar

- **Aviso de edad 18+:** aparece la primera visita y se recuerda en el navegador.
  Se puede quitar borrando el bloque `<div class="edad" ...>` de los cuatro HTML.
- **Fotos y modelos:** las fotos se tomaron del catálogo PDF y se asignaron a cada
  modelo siguiendo la maquetación original. Vale la pena que confirmen la pareja
  foto–modelo en las cortadoras **JT-260** y **JT-269** (ambas son negras con navaja
  de cerámica) y en los ponchadores **JT-708** y **JT-709**.
- **Textos:** las descripciones largas se redactaron a partir del catálogo. Ajusten
  medidas, materiales y capacidades reales en `specs` antes de publicar.
- **Colores del TRC 001:** el catálogo menciona azul, oro y negro; la única foto del
  azul viene con fondo oscuro porque así estaba en el PDF. Si tienen la foto recortada
  en blanco, reemplacen `img/productos/trc-001-azul.webp`.
