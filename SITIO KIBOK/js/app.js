/* =========================================================
   KIBOK A K'UUTS — Lógica de la tienda
   Sin dependencias. El carrito vive en localStorage.
   ========================================================= */
(function () {
  "use strict";

  var CFG = window.KIBOK || {};
  var PRODUCTOS = window.PRODUCTOS || [];
  var CATEGORIAS = window.CATEGORIAS || [];
  var ARTICULOS = window.ARTICULOS || [];
  var LLAVE = "kibok.carrito.v1";
  var LLAVE_EDAD = "kibok.edad.v1";

  var COLORES = {
    "oro": "#c9a227", "negro": "#1c1a18", "plata": "#c5c5c5", "azul": "#1e56a0",
    "blanco": "#f0efec", "vino": "#6d2a2a", "gris": "#8b8b8b"
  };

  /* ----------------------- utilidades ----------------------- */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function producto(id) {
    for (var i = 0; i < PRODUCTOS.length; i++) if (PRODUCTOS[i].id === id) return PRODUCTOS[i];
    return null;
  }
  function categoria(id) {
    for (var i = 0; i < CATEGORIAS.length; i++) if (CATEGORIAS[i].id === id) return CATEGORIAS[i];
    return null;
  }
  function img(nombre, chico) {
    return "img/productos/" + nombre + (chico ? "-sm" : "") + ".webp";
  }
  function imgBlog(art) {
    return "img/" + art.imagenDir + "/" + art.imagen + ".webp";
  }
  function articulo(id) {
    for (var i = 0; i < ARTICULOS.length; i++) if (ARTICULOS[i].id === id) return ARTICULOS[i];
    return null;
  }
  function fechaES(f) {
    var meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    var d = new Date(f + "T12:00:00");
    return d.getDate() + " de " + meses[d.getMonth()] + " de " + d.getFullYear();
  }
  function precio(n) {
    if (n == null) return null;
    return (CFG.simbolo || "$") + n.toLocaleString("es-MX", {
      minimumFractionDigits: 2, maximumFractionDigits: 2
    }) + " " + (CFG.moneda || "MXN");
  }
  function precioHTML(p) {
    if (CFG.mostrarPrecios === false || p.precio == null) {
      return '<span class="consultar">Precio a consultar</span>';
    }
    var html = "";
    if (p.precioAnterior) html += '<span class="antes">' + precio(p.precioAnterior) + "</span>";
    return html + precio(p.precio);
  }
  function conPrecio(p) { return CFG.mostrarPrecios !== false && p.precio != null; }

  /* ------------------------- carrito ------------------------ */
  function leer() {
    try { return JSON.parse(localStorage.getItem(LLAVE)) || []; } catch (e) { return []; }
  }
  function guardar(items) {
    try { localStorage.setItem(LLAVE, JSON.stringify(items)); } catch (e) {}
    pintarContador();
    document.dispatchEvent(new CustomEvent("carrito:cambio"));
  }
  function agregar(id, cantidad, color) {
    var items = leer(), llave = id + "|" + (color || ""), encontrado = false;
    for (var i = 0; i < items.length; i++) {
      if (items[i].llave === llave) { items[i].cantidad += cantidad; encontrado = true; break; }
    }
    if (!encontrado) items.push({ llave: llave, id: id, color: color || null, cantidad: cantidad });
    guardar(items);
  }
  function fijarCantidad(llave, cantidad) {
    var items = leer().map(function (it) {
      if (it.llave === llave) it.cantidad = Math.max(1, cantidad);
      return it;
    });
    guardar(items);
  }
  function quitar(llave) {
    guardar(leer().filter(function (it) { return it.llave !== llave; }));
  }
  function totales() {
    var items = leer(), piezas = 0, subtotal = 0, completo = true;
    items.forEach(function (it) {
      var p = producto(it.id); if (!p) return;
      piezas += it.cantidad;
      if (conPrecio(p)) subtotal += p.precio * it.cantidad; else completo = false;
    });
    return { piezas: piezas, subtotal: subtotal, completo: completo };
  }
  function pintarContador() {
    var n = totales().piezas;
    $$("[data-contador]").forEach(function (el) {
      el.textContent = n;
      if (n > 0) el.removeAttribute("hidden"); else el.setAttribute("hidden", "");
    });
  }

  /* -------------------------- toast ------------------------- */
  var tToast;
  function toast(msg) {
    var el = $(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add("visible");
    clearTimeout(tToast);
    tToast = setTimeout(function () { el.classList.remove("visible"); }, 2400);
  }

  /* ---------------------- tarjeta producto ------------------ */
  function tarjeta(p) {
    var principal = img(p.imagenes[0], true);
    var alterna = p.imagenes[1] ? img(p.imagenes[1], true) : null;
    var puntos = (p.colores || []).map(function (c) {
      var hex = COLORES[c.toLowerCase()] || "#ccc";
      return '<span class="punto" style="background:' + hex + '" title="' + esc(c) + '"></span>';
    }).join("");

    return '' +
      '<article class="tarjeta">' +
        (p.destacado ? '<span class="etiqueta etiqueta--oro">Destacado</span>' : '') +
        '<a class="tarjeta__link" href="producto.html?id=' + encodeURIComponent(p.id) + '">' +
          '<span class="sr">' + esc(p.nombre) + '</span></a>' +
        '<div class="tarjeta__img">' +
          '<img class="principal" src="' + principal + '" alt="' + esc(p.nombre) + '" loading="lazy" width="600" height="600">' +
          (alterna ? '<img class="alterna" src="' + alterna + '" alt="" loading="lazy" width="600" height="600">' : '') +
        '</div>' +
        '<div class="tarjeta__cuerpo">' +
          '<span class="tarjeta__modelo">' + esc(p.modelo) + '</span>' +
          '<h3 class="tarjeta__nombre">' + esc(p.nombre) + '</h3>' +
          (puntos ? '<div class="tarjeta__colores">' + puntos + '</div>' : '') +
          '<div class="tarjeta__precio">' + precioHTML(p) + '</div>' +
        '</div>' +
        '<button class="btn tarjeta__add" data-add="' + esc(p.id) + '">Agregar</button>' +
      '</article>';
  }

  function conectarAgregar(raiz) {
    $$("[data-add]", raiz || document).forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.preventDefault();
        var p = producto(b.getAttribute("data-add"));
        if (!p) return;
        agregar(p.id, 1, (p.colores && p.colores[0]) || null);
        toast(p.nombre + " agregado");
      });
    });
  }

  /* ------------------------- inicio ------------------------- */
  function initInicio() {
    var cats = $("[data-categorias]");
    if (cats) {
      var muestra = { humidores: "ch-0415-1", cortadoras: "jt-398", encendedores: "trc-003-oro", ponchadores: "jt-709" };
      cats.innerHTML = CATEGORIAS.map(function (c) {
        var n = PRODUCTOS.filter(function (p) { return p.categoria === c.id; }).length;
        return '<a class="categoria" href="tienda.html?c=' + c.id + '">' +
          '<img src="' + img(muestra[c.id], true) + '" alt="' + esc(c.nombre) + '" loading="lazy">' +
          '<h3>' + esc(c.nombre) + '</h3>' +
          '<span>' + n + ' piezas</span></a>';
      }).join("");
    }
    var dest = $("[data-destacados]");
    if (dest) {
      dest.innerHTML = PRODUCTOS.filter(function (p) { return p.destacado; }).slice(0, 8).map(tarjeta).join("");
      conectarAgregar(dest);
    }
  }

  /* ------------------------- tienda ------------------------- */
  function initTienda() {
    var rejilla = $("[data-rejilla]");
    if (!rejilla) return;
    var params = new URLSearchParams(location.search);
    var estado = {
      categoria: params.get("c") || "todo",
      busqueda: (params.get("q") || "").trim(),
      orden: "relevancia"
    };

    var chips = $("[data-chips]");
    if (chips) {
      chips.innerHTML = ['<button class="chip" data-cat="todo">Todo</button>']
        .concat(CATEGORIAS.map(function (c) {
          return '<button class="chip" data-cat="' + c.id + '">' + esc(c.nombre) + "</button>";
        })).join("");
    }
    var buscador = $("[data-busqueda]");
    if (buscador) buscador.value = estado.busqueda;

    function pintar() {
      var lista = PRODUCTOS.filter(function (p) {
        if (estado.categoria !== "todo" && p.categoria !== estado.categoria) return false;
        if (!estado.busqueda) return true;
        var t = (p.nombre + " " + p.modelo + " " + (p.resumen || "") + " " + (p.colores || []).join(" ")).toLowerCase();
        return t.indexOf(estado.busqueda.toLowerCase()) !== -1;
      });

      if (estado.orden === "precio-asc" || estado.orden === "precio-desc") {
        var dir = estado.orden === "precio-asc" ? 1 : -1;
        lista.sort(function (a, b) {
          var pa = a.precio == null ? Infinity : a.precio, pb = b.precio == null ? Infinity : b.precio;
          return (pa - pb) * dir;
        });
      } else if (estado.orden === "nombre") {
        lista.sort(function (a, b) { return a.nombre.localeCompare(b.nombre, "es"); });
      } else {
        lista.sort(function (a, b) { return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0); });
      }

      rejilla.innerHTML = lista.length
        ? lista.map(tarjeta).join("")
        : '<p class="vacio" style="grid-column:1/-1">Sin resultados para esa búsqueda.</p>';
      conectarAgregar(rejilla);

      var conteo = $("[data-conteo]");
      if (conteo) conteo.textContent = lista.length + (lista.length === 1 ? " pieza" : " piezas");

      $$("[data-cat]").forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-cat") === estado.categoria ? "true" : "false");
      });

      var enc = $("[data-encabezado]");
      if (enc) {
        var c = categoria(estado.categoria);
        $("h1", enc).textContent = c ? c.nombre : "Todas las piezas";
        $("[data-desc]", enc).textContent = c ? c.descripcion : "Accesorios seleccionados para acompañar cada puro: humidores, cortadoras, encendedores y ponchadores.";
      }
    }

    $$("[data-cat]").forEach(function (b) {
      b.addEventListener("click", function () {
        estado.categoria = b.getAttribute("data-cat");
        history.replaceState(null, "", estado.categoria === "todo" ? "tienda.html" : "tienda.html?c=" + estado.categoria);
        pintar();
      });
    });
    if (buscador) {
      buscador.addEventListener("input", function () { estado.busqueda = buscador.value.trim(); pintar(); });
    }
    var orden = $("[data-orden]");
    if (orden) orden.addEventListener("change", function () { estado.orden = orden.value; pintar(); });

    pintar();
  }

  /* ------------------------ producto ------------------------ */
  function initProducto() {
    var raiz = $("[data-producto]");
    if (!raiz) return;
    var id = new URLSearchParams(location.search).get("id");
    var p = producto(id);

    if (!p) {
      raiz.innerHTML = '<div class="vacio"><h2>Pieza no encontrada</h2>' +
        '<p>Puede que el enlace haya cambiado.</p>' +
        '<a class="btn" href="tienda.html">Ver catálogo</a></div>';
      return;
    }

    document.title = p.nombre + " · " + (CFG.marca || "Kibok a k'uuts");
    var cat = categoria(p.categoria);
    var seleccion = { color: (p.colores && p.colores[0]) || null, cantidad: 1, imagen: 0 };

    var specs = Object.keys(p.specs || {}).map(function (k) {
      return "<tr><td>" + esc(k) + "</td><td>" + esc(p.specs[k]) + "</td></tr>";
    }).join("");

    var opcionesColor = (p.colores || []).map(function (c, i) {
      return '<button class="opcion" data-color="' + esc(c) + '" aria-pressed="' + (i === 0) + '">' + esc(c) + "</button>";
    }).join("");

    raiz.innerHTML = '' +
      '<nav class="migas"><a href="index.html">Inicio</a> / <a href="tienda.html?c=' + p.categoria + '">' +
        esc(cat ? cat.nombre : "Catálogo") + '</a> / <span>' + esc(p.modelo) + '</span></nav>' +
      '<div class="detalle">' +
        '<div class="galeria">' +
          '<div class="galeria__principal">' +
            '<img data-principal src="' + img(p.imagenes[0]) + '" alt="' + esc(p.nombre) + '" width="1200" height="1200">' +
          '</div>' +
          (p.imagenes.length > 1 ? '<div class="galeria__miniaturas">' + p.imagenes.map(function (n, i) {
            return '<button class="miniatura" data-mini="' + i + '" aria-pressed="' + (i === 0) + '">' +
              '<img src="' + img(n, true) + '" alt="Vista ' + (i + 1) + '" loading="lazy"></button>';
          }).join("") + "</div>" : "") +
        '</div>' +
        '<div class="ficha">' +
          '<p class="eyebrow">' + esc(cat ? cat.nombre : "") + (p.linea ? " · " + esc(p.linea) : "") + '</p>' +
          '<h1>' + esc(p.nombre) + '</h1>' +
          '<p class="tarjeta__modelo">Modelo ' + esc(p.modelo) + '</p>' +
          '<div class="ficha__precio">' + precioHTML(p) + '</div>' +
          '<p class="ficha__resumen">' + esc(p.resumen) + '</p>' +
          (opcionesColor ? '<div class="opciones"><p class="opciones__titulo">Color</p>' + opcionesColor + "</div>" : "") +
          '<div class="compra">' +
            '<div class="cantidad">' +
              '<button data-menos aria-label="Quitar uno">–</button>' +
              '<input data-cant type="number" min="1" value="1" aria-label="Cantidad">' +
              '<button data-mas aria-label="Agregar uno">+</button>' +
            '</div>' +
            '<button class="btn" data-comprar>Agregar al pedido</button>' +
          '</div>' +
          '<button class="btn btn--linea btn--full" data-wa>Preguntar por WhatsApp</button>' +
          '<div class="acordeon">' +
            '<details open><summary>Descripción</summary><div class="cuerpo">' + esc(p.descripcion) + '</div></details>' +
            (specs ? '<details><summary>Especificaciones</summary><div class="cuerpo">' +
              '<table class="tabla-specs">' + specs + "</table></div></details>" : "") +
            '<details><summary>Envíos y entregas</summary><div class="cuerpo">' +
              'Enviamos a todo México. Los pedidos confirmados antes de las 14:00 h salen el mismo día hábil. ' +
              'También puedes recoger en tienda sin costo.</div></details>' +
          '</div>' +
        '</div>' +
      '</div>';

    var principal = $("[data-principal]", raiz);
    $$("[data-mini]", raiz).forEach(function (b) {
      b.addEventListener("click", function () {
        seleccion.imagen = +b.getAttribute("data-mini");
        principal.src = img(p.imagenes[seleccion.imagen]);
        $$("[data-mini]", raiz).forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
      });
    });
    $$("[data-color]", raiz).forEach(function (b) {
      b.addEventListener("click", function () {
        seleccion.color = b.getAttribute("data-color");
        $$("[data-color]", raiz).forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
        var i = (p.colores || []).indexOf(seleccion.color);
        if (i > -1 && p.imagenes[i]) {
          principal.src = img(p.imagenes[i]);
          $$("[data-mini]", raiz).forEach(function (o) {
            o.setAttribute("aria-pressed", +o.getAttribute("data-mini") === i ? "true" : "false");
          });
        }
      });
    });
    var campo = $("[data-cant]", raiz);
    $("[data-menos]", raiz).addEventListener("click", function () { campo.value = Math.max(1, +campo.value - 1); });
    $("[data-mas]", raiz).addEventListener("click", function () { campo.value = +campo.value + 1; });
    $("[data-comprar]", raiz).addEventListener("click", function () {
      agregar(p.id, Math.max(1, +campo.value || 1), seleccion.color);
      toast("Agregado al pedido");
    });
    $("[data-wa]", raiz).addEventListener("click", function () {
      var t = "Hola, me interesa el " + p.nombre + " (Mod. " + p.modelo + ")" +
        (seleccion.color ? " en color " + seleccion.color : "") + ". ¿Me pueden dar informes?";
      window.open("https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(t), "_blank", "noopener");
    });

    var rel = $("[data-relacionados]");
    if (rel) {
      var otros = PRODUCTOS.filter(function (o) { return o.categoria === p.categoria && o.id !== p.id; }).slice(0, 4);
      if (!otros.length) otros = PRODUCTOS.filter(function (o) { return o.id !== p.id; }).slice(0, 4);
      rel.innerHTML = otros.map(tarjeta).join("");
      conectarAgregar(rel);
    }
  }

  /* ------------------------- carrito ------------------------ */
  function initCarrito() {
    var raiz = $("[data-carrito]");
    if (!raiz) return;

    function pintar() {
      var items = leer();
      if (!items.length) {
        raiz.innerHTML = '<div class="vacio"><h2>Tu pedido está vacío</h2>' +
          '<p>Aún no has agregado ninguna pieza.</p>' +
          '<a class="btn" href="tienda.html">Ver catálogo</a></div>';
        return;
      }
      var t = totales();
      var lineas = items.map(function (it) {
        var p = producto(it.id);
        if (!p) return "";
        var importe = conPrecio(p) ? precio(p.precio * it.cantidad) : "A consultar";
        return '<div class="linea-item">' +
          '<a href="producto.html?id=' + p.id + '"><img src="' + img(p.imagenes[0], true) + '" alt="' + esc(p.nombre) + '"></a>' +
          '<div><a href="producto.html?id=' + p.id + '"><div class="linea-item__nombre">' + esc(p.nombre) + '</div></a>' +
            '<div class="linea-item__meta">Mod. ' + esc(p.modelo) + (it.color ? " · " + esc(it.color) : "") + '</div>' +
            '<div class="cantidad" style="margin-top:10px;width:max-content">' +
              '<button data-menos="' + esc(it.llave) + '">–</button>' +
              '<input data-cant="' + esc(it.llave) + '" type="number" min="1" value="' + it.cantidad + '" aria-label="Cantidad">' +
              '<button data-mas="' + esc(it.llave) + '">+</button>' +
            '</div>' +
            '<button class="linea-item__quitar" data-quitar="' + esc(it.llave) + '">Quitar</button>' +
          '</div>' +
          '<div class="linea-item__precio">' + importe + '</div>' +
        '</div>';
      }).join("");

      var aviso = "";
      if (!t.completo) {
        aviso = '<p class="nota">Algunas piezas todavía no tienen precio publicado. Envía el pedido y te confirmamos la cotización completa por WhatsApp.</p>';
      } else if (CFG.envioGratisDesde && t.subtotal < CFG.envioGratisDesde) {
        aviso = '<p class="nota">Te faltan ' + precio(CFG.envioGratisDesde - t.subtotal) + ' para envío gratis.</p>';
      }

      raiz.innerHTML = '<div class="carrito"><div>' + lineas + '</div>' +
        '<aside class="resumen">' +
          '<h3>Resumen</h3>' +
          '<div class="resumen__fila"><span>Piezas</span><span>' + t.piezas + '</span></div>' +
          '<div class="resumen__fila"><span>Envío</span><span>Se calcula al confirmar</span></div>' +
          '<div class="resumen__total"><span>Total</span><span>' +
            (t.completo ? precio(t.subtotal) : "A cotizar") + '</span></div>' +
          aviso +
          '<button class="btn btn--wa btn--full" style="margin-top:22px" data-enviar>Enviar pedido por WhatsApp</button>' +
          '<a class="btn btn--linea btn--full" style="margin-top:10px" href="tienda.html">Seguir viendo</a>' +
          '<p class="nota">Al enviar se abre WhatsApp con tu pedido escrito. Confirmamos existencias, envío y forma de pago por ese medio.</p>' +
        '</aside></div>';

      $$("[data-quitar]", raiz).forEach(function (b) {
        b.addEventListener("click", function () { quitar(b.getAttribute("data-quitar")); });
      });
      $$("[data-menos]", raiz).forEach(function (b) {
        b.addEventListener("click", function () {
          var k = b.getAttribute("data-menos");
          var v = +$('[data-cant="' + k + '"]', raiz).value;
          fijarCantidad(k, v - 1);
        });
      });
      $$("[data-mas]", raiz).forEach(function (b) {
        b.addEventListener("click", function () {
          var k = b.getAttribute("data-mas");
          var v = +$('[data-cant="' + k + '"]', raiz).value;
          fijarCantidad(k, v + 1);
        });
      });
      $$("[data-cant]", raiz).forEach(function (c) {
        c.addEventListener("change", function () { fijarCantidad(c.getAttribute("data-cant"), +c.value || 1); });
      });
      $("[data-enviar]", raiz).addEventListener("click", enviarWhatsApp);
    }

    document.addEventListener("carrito:cambio", pintar);
    pintar();
  }

  function enviarWhatsApp() {
    var items = leer(), t = totales();
    if (!items.length) return;
    var lineas = items.map(function (it) {
      var p = producto(it.id);
      if (!p) return "";
      return "• " + it.cantidad + " x " + p.nombre + " (Mod. " + p.modelo + ")" +
        (it.color ? " – " + it.color : "") +
        (conPrecio(p) ? " – " + precio(p.precio * it.cantidad) : "");
    }).filter(Boolean).join("\n");

    var texto = "Hola " + (CFG.marca || "") + ", quiero hacer este pedido:\n\n" + lineas +
      "\n\n" + (t.completo ? "Total: " + precio(t.subtotal) : "Total: por cotizar") +
      "\n\n¿Me confirman existencias y envío?";
    window.open("https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
  }

  /* -------------------------- blog -------------------------- */
  function tarjetaBlog(a) {
    return '<article class="blog-card">' +
      '<a href="nota.html?id=' + encodeURIComponent(a.id) + '" class="blog-card__img">' +
        '<img src="' + imgBlog(a) + '" alt="' + esc(a.titulo) + '" loading="lazy">' +
      '</a>' +
      '<div class="blog-card__cuerpo">' +
        '<span class="blog-card__cat">' + esc(a.categoria) + '</span>' +
        '<h3 class="blog-card__titulo"><a href="nota.html?id=' + encodeURIComponent(a.id) + '">' + esc(a.titulo) + '</a></h3>' +
        '<p class="blog-card__resumen">' + esc(a.resumen) + '</p>' +
        '<span class="blog-card__fecha">' + fechaES(a.fecha) + '</span>' +
      '</div>' +
    '</article>';
  }

  function initBlog() {
    var raiz = $("[data-blog]");
    if (!raiz) return;
    raiz.innerHTML = ARTICULOS.map(tarjetaBlog).join("");
  }

  function initNota() {
    var raiz = $("[data-nota]");
    if (!raiz) return;
    var id = new URLSearchParams(location.search).get("id");
    var a = articulo(id);

    if (!a) {
      raiz.innerHTML = '<div class="vacio"><h2>Artículo no encontrado</h2>' +
        '<p>Puede que el enlace haya cambiado.</p>' +
        '<a class="btn" href="blog.html">Ver blog</a></div>';
      return;
    }

    document.title = a.titulo + " · " + (CFG.marca || "Kibok a k'uuts");
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", a.resumen);

    var cuerpo = a.contenido.map(function (b) {
      if (b.tipo === "subtitulo") return "<h2>" + esc(b.texto) + "</h2>";
      return "<p>" + esc(b.texto) + "</p>";
    }).join("");

    raiz.innerHTML = '' +
      '<article class="nota-articulo">' +
        '<nav class="migas"><a href="index.html">Inicio</a> / <a href="blog.html">Blog</a> / <span>' + esc(a.titulo) + '</span></nav>' +
        '<div class="nota-articulo__cabecera">' +
          '<p class="nota-articulo__cat">' + esc(a.categoria) + '</p>' +
          '<h1>' + esc(a.titulo) + '</h1>' +
          '<span class="nota-articulo__fecha">' + fechaES(a.fecha) + '</span>' +
        '</div>' +
        '<div class="nota-articulo__hero"><img src="' + imgBlog(a) + '" alt="' + esc(a.titulo) + '"></div>' +
        '<div class="nota-articulo__cuerpo">' + cuerpo + '</div>' +
        '<div class="nota-articulo__cta">' +
          '<p>¿Listo para armar tu ritual? Conoce nuestras piezas.</p>' +
          '<a class="btn" href="tienda.html">Ver catálogo</a>' +
        '</div>' +
      '</article>';
  }

  function initBlogPreview() {
    var raiz = $("[data-blog-preview]");
    if (!raiz) return;
    raiz.innerHTML = ARTICULOS.slice(0, 3).map(tarjetaBlog).join("");
  }

  /* -------------------- aviso de edad ----------------------- */
  function initEdad() {
    var caja = $("[data-edad]");
    if (!caja) return;
    var ok = false;
    try { ok = localStorage.getItem(LLAVE_EDAD) === "si"; } catch (e) {}
    if (ok) { caja.remove(); return; }
    document.body.style.overflow = "hidden";
    $("[data-edad-si]", caja).addEventListener("click", function () {
      try { localStorage.setItem(LLAVE_EDAD, "si"); } catch (e) {}
      document.body.style.overflow = "";
      caja.remove();
    });
    $("[data-edad-no]", caja).addEventListener("click", function () {
      location.href = "https://www.google.com";
    });
  }

  /* ------------------------- header ------------------------- */
  function initHeader() {
    var btn = $("[data-menu]"), nav = $(".nav");
    if (btn && nav) {
      btn.addEventListener("click", function () {
        nav.classList.toggle("abierto");
        btn.setAttribute("aria-expanded", nav.classList.contains("abierto"));
      });
    }
    $$("[data-wa-general]").forEach(function (a) {
      a.href = "https://wa.me/" + CFG.whatsapp;
    });
    $$("[data-tel]").forEach(function (el) { el.textContent = "+" + CFG.whatsapp; });
    $$("[data-email]").forEach(function (a) { a.href = "mailto:" + CFG.email; a.textContent = CFG.email; });
    $$("[data-anio]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
    pintarContador();
  }

  /* -------------------------- arranque ---------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initEdad();
    initInicio();
    initTienda();
    initProducto();
    initCarrito();
    initBlog();
    initNota();
    initBlogPreview();
  });

  window.Kibok = { agregar: agregar, leer: leer, totales: totales, toast: toast };
})();
