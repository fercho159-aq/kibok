/* =========================================================
   CATÁLOGO DE PRODUCTOS
   ---------------------------------------------------------
   Para poner precios: cambia  precio: null  por  precio: 1250
   (solo el número, sin "$" ni comas).
   precioAnterior: opcional, para mostrar descuento tachado.
   ========================================================= */
window.CATEGORIAS = [
  { id: "humidores",   nombre: "Humidores",   descripcion: "En cada puro se vive un momento. Cajas y estuches que conservan tu tabaco en su punto." },
  { id: "cortadoras",  nombre: "Cortadoras",  descripcion: "Elegancia y precisión para disfrutar tu pasión con estilo." },
  { id: "encendedores",nombre: "Encendedores",descripcion: "Diseños únicos, flama estable, para cada momento especial." },
  { id: "ponchadores", nombre: "Ponchadores", descripcion: "Un corte perfecto que eleva cada fumada." }
];

window.PRODUCTOS = [
  /* ---------------------- HUMIDORES ---------------------- */
  {
    id: "ch-0415",
    nombre: "Humidor Grande Tipo Caoba",
    modelo: "CH-0415",
    categoria: "humidores",
    precio: null,
    precioAnterior: null,
    destacado: true,
    resumen: "Humidor de gran capacidad para 50 tabacos, acabado tipo caoba con higrómetro frontal.",
    descripcion: "Humidor de mesa con acabado laqueado tipo caoba y emblema en dorado. Interior forrado en cedro español, charolas divisorias y humidificador incluido. Higrómetro analógico integrado al frente para vigilar la humedad de un vistazo.",
    specs: { "Capacidad": "50 tabacos", "Interior": "Cedro español", "Incluye": "Humidificador e higrómetro", "Acabado": "Laca tipo caoba" },
    imagenes: ["ch-0415-1", "ch-0415-2"]
  },
  {
    id: "ch-0451",
    nombre: "Humidor Grande con Cristal",
    modelo: "CH-0451",
    categoria: "humidores",
    precio: null,
    destacado: false,
    resumen: "Humidor para 50 tabacos con tapa de cristal y frente con vitrinas.",
    descripcion: "Humidor de exhibición con tapa de cristal templado y vitrinas laterales que dejan ver la colección sin abrirlo. Interior de cedro español con charolas y humidificador incluido.",
    specs: { "Capacidad": "50 tabacos", "Interior": "Cedro español", "Detalle": "Tapa y vitrinas de cristal", "Incluye": "Humidificador e higrómetro" },
    imagenes: ["ch-0451"]
  },
  {
    id: "ch-0433",
    nombre: "Humidor Grande con Marquetería",
    modelo: "CH-0433",
    categoria: "humidores",
    precio: null,
    destacado: true,
    resumen: "Humidor de madera con marquetería fina y emblema en dorado.",
    descripcion: "Pieza de colección: chapa de raíz con marquetería y filetes contrastantes hechos a mano. Interior de cedro español, separadores móviles, higrómetro y humidificador incluidos.",
    specs: { "Capacidad": "50 tabacos aprox.", "Interior": "Cedro español", "Exterior": "Marquetería en madera", "Incluye": "Humidificador e higrómetro" },
    imagenes: ["ch-0433-1", "ch-0433-2"]
  },
  {
    id: "wlh-0064",
    nombre: "Mini Humidor Tipo Portafolio",
    modelo: "WLH-0064",
    categoria: "humidores",
    precio: null,
    destacado: true,
    resumen: "Humidor de viaje en piel negra, formato portafolio con cierre de solapa.",
    descripcion: "Humidor de viaje forrado en piel negra con logotipo grabado y cinta de sujeción. Se abre como portafolio y deja los puros a la vista sobre base de cedro; incluye humidificador y espacio para accesorios.",
    specs: { "Formato": "Portafolio de viaje", "Exterior": "Piel negra", "Interior": "Cedro español", "Incluye": "Humidificador" },
    colores: ["Negro"],
    imagenes: ["wlh-0064-1", "wlh-0064-2"]
  },
  {
    id: "wlh-0053",
    nombre: "Mini Humidor Piel Negro",
    modelo: "WLH-0053",
    categoria: "humidores",
    precio: null,
    destacado: false,
    resumen: "Estuche humidor de viaje en piel negra con cierre de cremallera.",
    descripcion: "Estuche compacto forrado en piel negra con costura contrastante y emblema grabado. Interior de cedro con charolas y compartimento para accesorios; ideal para llevar el ritual a cualquier parte.",
    specs: { "Formato": "Estuche de viaje", "Exterior": "Piel negra", "Interior": "Cedro español", "Cierre": "Cremallera perimetral" },
    colores: ["Negro"],
    imagenes: ["wlh-0053-2", "wlh-0053-1"]
  },
  {
    id: "wlh-0285",
    nombre: "Mini Humidor Piel Grabada",
    modelo: "WLH-0285",
    categoria: "humidores",
    precio: null,
    destacado: false,
    resumen: "Estuche humidor en piel grabada tipo cocodrilo con emblema en dorado.",
    descripcion: "Estuche de viaje en piel grabada tipo cocodrilo color vino, con emblema metálico en la tapa. Interior de cedro con charolas y correas de sujeción para varios puros.",
    specs: { "Formato": "Estuche de viaje", "Exterior": "Piel grabada", "Interior": "Cedro español", "Cierre": "Cremallera perimetral" },
    colores: ["Vino"],
    imagenes: ["wlh-0285-2", "wlh-0285-1"]
  },

  /* ---------------------- CORTADORAS --------------------- */
  {
    id: "jt-644-th",
    nombre: "Cortador JT-644 TH",
    modelo: "JT-644 TH",
    categoria: "cortadoras",
    precio: null,
    destacado: true,
    linea: "Línea de cortadores de platino",
    resumen: "Cortador de doble hoja con cuerpo negro y estructura en acero, grabado Kibok a k'uuts.",
    descripcion: "Cortador de doble hoja con apertura lateral y estructura en acero pulido sobre cuerpo negro. Corte limpio y parejo, con la marca grabada en el frente.",
    specs: { "Tipo": "Doble hoja (guillotina)", "Material": "Acero inoxidable", "Línea": "Platino" },
    imagenes: ["jt-644-th"]
  },
  {
    id: "jt-152",
    nombre: "Cortador BaSick JT-152",
    modelo: "JT-152",
    categoria: "cortadoras",
    precio: null,
    destacado: false,
    resumen: "Cortador clásico de doble hoja en acero satinado.",
    descripcion: "El clásico de siempre: doble hoja en acero inoxidable con acabado satinado, cuerpo ovalado y anillas amplias. Sencillo, resistente y de corte preciso.",
    specs: { "Tipo": "Doble hoja (guillotina)", "Material": "Acero inoxidable", "Acabado": "Satinado" },
    imagenes: ["jt-152"]
  },
  {
    id: "jt-485-h",
    nombre: "Cortador JT-485 H",
    modelo: "JT-485 H",
    categoria: "cortadoras",
    precio: null,
    destacado: false,
    linea: "Línea de cortadores de platino",
    resumen: "Cortador estilizado de perfil delgado con logotipo en rojo.",
    descripcion: "Perfil delgado y alargado que cabe en cualquier bolsillo. Doble hoja de acero, cuerpo en gris grafito y logotipo Kibok a k'uuts en rojo.",
    specs: { "Tipo": "Doble hoja (guillotina)", "Material": "Acero inoxidable", "Línea": "Platino" },
    imagenes: ["jt-485-h"]
  },
  {
    id: "jt-351-ska",
    nombre: "Cortador 351 SKA",
    modelo: "351 SKA",
    categoria: "cortadoras",
    precio: null,
    destacado: true,
    linea: "Línea de cortadores de platino",
    resumen: "Cortador de doble hoja con cuerpo texturizado y detalle en verde limón.",
    descripcion: "Cuerpo con textura tipo piedra y filo de contraste en verde limón. Doble hoja de acero con tope interno que garantiza un corte recto en cada uso.",
    specs: { "Tipo": "Doble hoja (guillotina)", "Material": "Acero inoxidable", "Línea": "Platino" },
    imagenes: ["jt-351-ska"]
  },
  {
    id: "jt-269",
    nombre: "Cortador JT-269 Navaja Cerámica",
    modelo: "JT-269",
    categoria: "cortadoras",
    precio: null,
    destacado: false,
    resumen: "Cortador con navaja de cerámica blanca sobre cuerpo negro.",
    descripcion: "Navaja de cerámica blanca que no se oxida y conserva el filo mucho más tiempo que el acero. Cuerpo negro mate de tacto suave y anillas ergonómicas.",
    specs: { "Tipo": "Doble hoja (guillotina)", "Navaja": "Cerámica", "Colores": "Blanca y negra" },
    colores: ["Blanco", "Negro"],
    imagenes: ["jt-269"]
  },
  {
    id: "jt-260",
    nombre: "Cortador JT-260 con Posa Puro",
    modelo: "JT-260",
    categoria: "cortadoras",
    precio: null,
    destacado: false,
    resumen: "Cortador de doble hoja con posa puro integrado.",
    descripcion: "Doble hoja de acero con navaja cerámica y posa puro integrado en el cuerpo: corta y deja descansar el puro sin buscar dónde ponerlo.",
    specs: { "Tipo": "Doble hoja (guillotina)", "Extra": "Posa puro integrado", "Material": "Acero inoxidable" },
    imagenes: ["jt-260"]
  },
  {
    id: "jt-351-x",
    nombre: "Cortador JT-351 X",
    modelo: "JT-351 X",
    categoria: "cortadoras",
    precio: null,
    destacado: false,
    linea: "Línea de cortadores de platino",
    resumen: "Cortador compacto de doble hoja en gris grafito.",
    descripcion: "Versión compacta de la línea platino: cuerpo en gris grafito, navaja cerámica y anillas de agarre amplio. Ligero y discreto para llevar a diario.",
    specs: { "Tipo": "Doble hoja (guillotina)", "Material": "Acero inoxidable", "Línea": "Platino" },
    imagenes: ["jt-351-x"]
  },
  {
    id: "jt-398",
    nombre: "Cortador JT-398 Dorado",
    modelo: "JT-398",
    categoria: "cortadoras",
    precio: null,
    destacado: true,
    linea: "Línea de cortadores de platino",
    resumen: "Cortador clásico con acabado dorado espejo.",
    descripcion: "Acabado dorado espejo sobre cuerpo ovalado clásico, con navaja cerámica blanca. La pieza más vestida de la línea: regalo seguro.",
    specs: { "Tipo": "Doble hoja (guillotina)", "Acabado": "Dorado espejo", "Navaja": "Cerámica" },
    colores: ["Oro"],
    imagenes: ["jt-398"]
  },
  {
    id: "jt-699",
    nombre: "Cortador JT-699",
    modelo: "JT-699",
    categoria: "cortadoras",
    precio: null,
    destacado: false,
    resumen: "Cortador ovalado de una sola mano con logotipo Kibok a k'uuts.",
    descripcion: "Formato ovalado que se acciona con una sola mano. Cuerpo negro con textura suave, navaja cerámica y logotipo de la casa impreso al frente.",
    specs: { "Tipo": "Guillotina de una mano", "Navaja": "Cerámica", "Cuerpo": "Negro mate" },
    imagenes: ["jt-699"]
  },

  /* -------------------- ENCENDEDORES --------------------- */
  {
    id: "trc-003",
    nombre: "Encendedor Tres Flamas TRC 003",
    modelo: "TRC 003",
    categoria: "encendedores",
    precio: null,
    destacado: true,
    resumen: "Antorcha de tres flamas, recargable, con depósito visible.",
    descripcion: "Tres flamas de gas butano a prueba de viento para un encendido rápido y parejo. Depósito visible para controlar la carga, ajuste de intensidad y recarga por la base.",
    specs: { "Flamas": "3", "Combustible": "Gas butano (recargable)", "Extra": "Depósito visible y ajuste de flama" },
    colores: ["Oro", "Negro", "Plata"],
    imagenes: ["trc-003-oro", "trc-003-negro", "trc-003-plata"]
  },
  {
    id: "trc-001",
    nombre: "Encendedor Una Flama TRC 001",
    modelo: "TRC 001",
    categoria: "encendedores",
    precio: null,
    destacado: true,
    resumen: "Encendedor tipo pluma de una flama, delgado y recargable.",
    descripcion: "Formato pluma, delgado y discreto, con una flama de gas butano resistente al viento. Ideal para llevar en el bolsillo o junto al humidor.",
    specs: { "Flamas": "1", "Combustible": "Gas butano (recargable)", "Formato": "Tipo pluma" },
    colores: ["Oro", "Negro", "Azul"],
    imagenes: ["trc-001-oro", "trc-001-negro", "trc-001-azul"]
  },

  /* --------------------- PONCHADORES --------------------- */
  {
    id: "jt-709",
    nombre: "Ponchador JT-709 con Palillos",
    modelo: "JT-709",
    categoria: "ponchadores",
    precio: null,
    destacado: true,
    resumen: "Ponchador de bolsillo con llavero y palillos para la fumada final.",
    descripcion: "Cuerpo de aluminio anodizado con textura antideslizante y argolla para llavero. Broca circular de acero para ponchar sin desarmar la capa, con palillos integrados para aprovechar la fumada final.",
    specs: { "Tipo": "Ponchador de broca", "Material": "Aluminio anodizado", "Extra": "Palillos integrados y argolla" },
    imagenes: ["jt-709"]
  },
  {
    id: "jt-708",
    nombre: "Ponchador JT-708",
    modelo: "JT-708",
    categoria: "ponchadores",
    precio: null,
    destacado: false,
    resumen: "Ponchador de bolsillo con argolla, acabado negro mate.",
    descripcion: "Ponchador compacto de aluminio negro mate con broca de acero inoxidable y tapa de rosca que protege el filo. Se cuelga del llavero y siempre lo traes contigo.",
    specs: { "Tipo": "Ponchador de broca", "Material": "Aluminio anodizado", "Extra": "Tapa de rosca y argolla" },
    imagenes: ["jt-708-1", "jt-708-2", "jt-708-3"]
  }
];
