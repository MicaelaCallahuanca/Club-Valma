// Deterministic mock data for the Club Valma CRM prototype.
// Seeded PRNG so the dataset (and therefore every KPI/chart derived from it)
// is stable across reloads and screenshots — no backend yet, this is the
// single source of truth every view reads from.

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20070101); // Club Valma founding year, for a stable seed

function pick(arr) {
  return arr[Math.floor(rand() * arr.length)];
}

function pickWeighted(entries) {
  const total = entries.reduce((sum, [, w]) => sum + w, 0);
  let r = rand() * total;
  for (const [value, w] of entries) {
    if (r < w) return value;
    r -= w;
  }
  return entries[entries.length - 1][0];
}

function randInt(min, max) {
  return Math.floor(rand() * (max - min + 1)) + min;
}

// Local (not UTC) YYYY-MM-DD — keeps the stored string matching the calendar
// date this generator intended, regardless of the machine's timezone. See
// src/lib/date.js for why toISOString() is the wrong tool for this.
function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// ---------------------------------------------------------------------------
// Name pools

const NOMBRES = [
  "María", "Carmen", "Ana", "Laura", "Isabel", "Lucía", "Marta", "Sara",
  "Elena", "Cristina", "Paula", "Sofía", "Alba", "Nuria", "Rocío", "Beatriz",
  "Antonio", "José", "Manuel", "Francisco", "David", "Javier", "Daniel",
  "Carlos", "Miguel", "Rafael", "Pablo", "Álvaro", "Sergio", "Adrián",
  "Diego", "Jorge", "Iván", "Rubén", "Óscar",
];

const APELLIDOS = [
  "García", "González", "Rodríguez", "Fernández", "López", "Martínez",
  "Sánchez", "Pérez", "Gómez", "Martín", "Jiménez", "Ruiz", "Hernández",
  "Díaz", "Moreno", "Álvarez", "Romero", "Alonso", "Gutiérrez", "Navarro",
  "Torres", "Domínguez", "Vázquez", "Ramos", "Serrano", "Blanco", "Suárez",
  "Molina", "Ortega", "Delgado",
];

function randomPersonName() {
  return `${pick(NOMBRES)} ${pick(APELLIDOS)} ${pick(APELLIDOS)}`;
}

// ---------------------------------------------------------------------------
// Affiliated companies (fixed roster — reused by Socios, Empresas, Pipeline)

export const EMPRESAS = [
  { id: "emp-1", nombre: "Distribuciones Ibérica S.L.", sector: "Logística", fechaAfiliacion: "2019-03-12", contacto: "Rosa Aguilar" },
  { id: "emp-2", nombre: "Talleres Hermanos Ruiz", sector: "Automoción", fechaAfiliacion: "2020-06-01", contacto: "Manuel Ruiz" },
  { id: "emp-3", nombre: "Consultoría Delta", sector: "Servicios profesionales", fechaAfiliacion: "2018-11-20", contacto: "Elena Campos" },
  { id: "emp-4", nombre: "Panadería La Espiga", sector: "Alimentación", fechaAfiliacion: "2021-02-15", contacto: "Josefa Ríos" },
  { id: "emp-5", nombre: "Construcciones Vallmar", sector: "Construcción", fechaAfiliacion: "2017-09-08", contacto: "Ignacio Ferrer" },
  { id: "emp-6", nombre: "Óptica Buenavista", sector: "Salud", fechaAfiliacion: "2022-01-10", contacto: "Marta Sanz" },
  { id: "emp-7", nombre: "TecnoSoft Levante", sector: "Tecnología", fechaAfiliacion: "2020-10-03", contacto: "Pau Esteve" },
  { id: "emp-8", nombre: "Hostelería Costa Azul", sector: "Hostelería", fechaAfiliacion: "2019-07-22", contacto: "Lucía Reyes" },
  { id: "emp-9", nombre: "Ferretería Central", sector: "Retail", fechaAfiliacion: "2021-05-30", contacto: "Antonio Nieto" },
  { id: "emp-10", nombre: "Grupo Editorial Almara", sector: "Servicios profesionales", fechaAfiliacion: "2018-04-17", contacto: "Sonia Prieto" },
  { id: "emp-11", nombre: "Clínica Dental Rovira", sector: "Salud", fechaAfiliacion: "2022-08-04", contacto: "Dr. Jordi Rovira" },
  { id: "emp-12", nombre: "Transportes Meridiano", sector: "Logística", fechaAfiliacion: "2017-12-11", contacto: "Fernando Casas" },
  { id: "emp-13", nombre: "Agropecuaria San Isidro", sector: "Alimentación", fechaAfiliacion: "2023-03-27", contacto: "Teresa Molina" },
  { id: "emp-14", nombre: "Estudio Arquitectura Nexo", sector: "Servicios profesionales", fechaAfiliacion: "2021-11-09", contacto: "Raúl Iglesias" },
  { id: "emp-15", nombre: "Peluquerías Nova", sector: "Retail", fechaAfiliacion: "2023-06-14", contacto: "Cristina Belda" },
  { id: "emp-16", nombre: "Instalaciones Eléctricas Bravo", sector: "Construcción", fechaAfiliacion: "2020-02-19", contacto: "Diego Bravo" },
];

// ---------------------------------------------------------------------------
// Offers catalog (fixed — the categories the site actually negotiates)

// ingresoMes = ingreso estimado que la oferta genera para el club este mes
// (comisión/fee de intermediación, dato ficticio). Una oferta "pausada" no
// genera ingreso mientras está pausada.
export const OFERTAS = [
  { id: "of-1", categoria: "Seguros", titulo: "Seguro de salud", proveedor: "Aseguradora Meridian", condicion: "Desde 34,90€/mes, sin carencias", descuento: "-30% socios", vigencia: "activa", fechaInicio: "2023-01-01", ingresoMes: 4200 },
  { id: "of-2", categoria: "Seguros", titulo: "Seguro de hogar", proveedor: "Aseguradora Meridian", condicion: "Desde 12,50€/mes", descuento: "-25% socios", vigencia: "activa", fechaInicio: "2023-01-01", ingresoMes: 1850 },
  { id: "of-3", categoria: "Seguros", titulo: "Seguro de auto", proveedor: "Cobertura Total Seguros", condicion: "Desde 28,00€/mes", descuento: "-20% socios", vigencia: "activa", fechaInicio: "2022-06-01", ingresoMes: 2600 },
  { id: "of-4", categoria: "Energía", titulo: "Tarifa de luz", proveedor: "Energía Renovable Ibérica", condicion: "0,098€/kWh, sin permanencia", descuento: "-34% vs. tarifa estándar", vigencia: "activa", fechaInicio: "2024-01-15", ingresoMes: 5100 },
  { id: "of-5", categoria: "Energía", titulo: "Tarifa de gas natural", proveedor: "Energía Renovable Ibérica", condicion: "0,052€/kWh", descuento: "-18% vs. tarifa estándar", vigencia: "activa", fechaInicio: "2024-01-15", ingresoMes: 1700 },
  { id: "of-6", categoria: "Telefonía", titulo: "Móvil 20GB", proveedor: "Conecta Telecom", condicion: "9,90€/mes, llamadas ilimitadas", descuento: "-33% socios", vigencia: "activa", fechaInicio: "2023-09-01", ingresoMes: 3300 },
  { id: "of-7", categoria: "Telefonía", titulo: "Fibra 600MB + móvil", proveedor: "Conecta Telecom", condicion: "34,90€/mes", descuento: "-22% socios", vigencia: "activa", fechaInicio: "2023-09-01", ingresoMes: 2400 },
  { id: "of-8", categoria: "Tecnología", titulo: "Portátiles y periféricos", proveedor: "TechStore Pro", condicion: "Hasta -15% en catálogo", descuento: "-15% socios", vigencia: "activa", fechaInicio: "2022-11-01", ingresoMes: 1950 },
  { id: "of-9", categoria: "Tecnología", titulo: "Ciberseguridad para pymes", proveedor: "TechStore Pro", condicion: "Antivirus + backup gestionado", descuento: "-20% socios", vigencia: "activa", fechaInicio: "2023-04-01", ingresoMes: 1200 },
  { id: "of-10", categoria: "Seguros", titulo: "Seguro de vida", proveedor: "Cobertura Total Seguros", condicion: "Desde 8,90€/mes", descuento: "-15% socios", vigencia: "pausada", fechaInicio: "2021-05-01", ingresoMes: 0 },
  { id: "of-11", categoria: "Energía", titulo: "Mantenimiento de caldera", proveedor: "Energía Renovable Ibérica", condicion: "Revisión anual incluida", descuento: "-10% socios", vigencia: "activa", fechaInicio: "2024-02-01", ingresoMes: 650 },
  { id: "of-12", categoria: "Telefonía", titulo: "Línea empresa multidispositivo", proveedor: "Conecta Telecom", condicion: "Desde 3 líneas, gestión centralizada", descuento: "-28% socios empresa", vigencia: "activa", fechaInicio: "2023-09-01", ingresoMes: 2100 },
];

const CATEGORIAS = ["Seguros", "Energía", "Telefonía", "Tecnología"];

// ---------------------------------------------------------------------------
// Socios (~800 records)

const TOTAL_SOCIOS = 812;
// Local constructor (not the "2026-07-18" string form) so every getter used
// on HOY below (getMonth, getDate, ...) reflects the intended calendar date
// regardless of the machine's timezone — see src/lib/date.js.
const HOY = new Date(2026, 6, 18);

function randomFechaAlta() {
  // Skew toward the last 18 months so "altas del mes" trends look like real
  // organic growth rather than a flat uniform distribution.
  const monthsBack = pickWeighted([
    [0, 14], [1, 12], [2, 11], [3, 10], [4, 9], [5, 9],
    [6, 7], [9, 6], [12, 5], [18, 4], [24, 3], [36, 2], [48, 1],
  ]);
  const d = new Date(HOY);
  d.setMonth(d.getMonth() - monthsBack);
  // Cap the day so a member never ends up with a fecha de alta in the future
  // (relevant only for the current month, where "today" is a real ceiling).
  const maxDay = monthsBack === 0 ? HOY.getDate() : 28;
  d.setDate(randInt(1, maxDay));
  return d;
}

// Interaction log — fixed text pools per channel, sampled per socio. Purely
// illustrative (no free text authoring in this prototype).
const TEXTOS_INTERACCION = {
  Llamada: [
    "Confirmó interés en el seguro de salud",
    "Consultó por la tarifa de luz negociada",
    "Solicitó información de portabilidad móvil",
    "Confirmó datos bancarios para la domiciliación",
    "Pidió aplazar el cobro de la cuota este mes",
    "Preguntó por el estado de su última solicitud",
  ],
  Email: [
    "Envío de bienvenida y guía de ofertas del club",
    "Recordatorio de renovación de seguro enviado",
    "Envío de factura pendiente de pago",
    "Confirmación de alta en la tarifa de luz",
    "Encuesta de satisfacción enviada",
  ],
  Nota: [
    "Prefiere que le contactemos por WhatsApp",
    "Posible baja — evaluar acción de retención",
    "Muy satisfecho con el seguro de auto contratado",
    "Pendiente de revisar cambio de tarifa telefónica",
    "Recomendó el club a un compañero de trabajo",
  ],
};

const CUOTAS = [4.9, 6.9, 9.9, 12.9];

function randomFechaEntre(desde, hasta) {
  const span = Math.max(hasta.getTime() - desde.getTime(), 0);
  const d = new Date(desde.getTime() + rand() * span);
  return d > hasta ? hasta : d;
}

function buildInteracciones(fechaAltaDate) {
  const n = randInt(2, 3);
  return Array.from({ length: n }, () => {
    const tipo = pick(["Llamada", "Email", "Nota"]);
    const fecha = randomFechaEntre(fechaAltaDate, HOY);
    return {
      tipo,
      fecha: formatDate(fecha),
      texto: pick(TEXTOS_INTERACCION[tipo]),
    };
  }).sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
}

function buildPago(estadoSocio) {
  const cuota = pick(CUOTAS);
  if (estadoSocio === "baja") {
    return { estado: "baja", proximoCobro: null, cuota };
  }
  const estado = pickWeighted([["al_dia", 0.78], ["pendiente", 0.13], ["vencido", 0.09]]);
  const proximoCobroDate =
    estado === "vencido"
      ? new Date(HOY.getTime() - randInt(3, 25) * 86400000)
      : new Date(HOY.getTime() + randInt(1, 28) * 86400000);
  return { estado, proximoCobro: formatDate(proximoCobroDate), cuota };
}

export const SOCIOS = Array.from({ length: TOTAL_SOCIOS }, (_, i) => {
  const tipo = pickWeighted([["Particular", 0.62], ["Empresa", 0.38]]);
  const empresa = tipo === "Empresa" ? pick(EMPRESAS) : null;
  const estado = pickWeighted([["activo", 0.79], ["pendiente", 0.09], ["baja", 0.12]]);
  const fechaAltaDate = randomFechaAlta();

  // Members who churned ("baja") left sometime after joining, biasing the
  // dataset toward realistic tenure rather than instant churn.
  const nombre = randomPersonName();
  const numOfertas = estado === "pendiente" ? 0 : randInt(0, 5);
  const ofertasCanjeadas = Array.from({ length: numOfertas }, () => {
    const oferta = pick(OFERTAS);
    const canjeDate = new Date(fechaAltaDate);
    canjeDate.setDate(canjeDate.getDate() + randInt(5, 500));
    return {
      ofertaId: oferta.id,
      fecha: formatDate(canjeDate > HOY ? HOY : canjeDate),
    };
  }).sort((a, b) => (a.fecha < b.fecha ? 1 : -1));

  // Simple, hardcoded-style follow-up flag: a small slice of otherwise-active
  // members who haven't engaged in a while. No real "last seen" tracking in
  // this prototype — just enough of a signal for the alert badge to be real.
  const inactivoLargo = estado === "activo" && rand() < 0.06;

  return {
    id: `soc-${i + 1}`,
    nombre,
    tipo,
    empresaAfiliada: empresa ? empresa.nombre : null,
    empresaId: empresa ? empresa.id : null,
    estado,
    fechaAlta: formatDate(fechaAltaDate),
    email: `${nombre.split(" ")[0].toLowerCase()}.${nombre.split(" ")[1].toLowerCase()}${i}@ejemplo.com`,
    telefono: `6${randInt(10000000, 99999999)}`,
    ofertasCanjeadas,
    interacciones: buildInteracciones(fechaAltaDate),
    pago: buildPago(estado),
    inactivoLargo,
  };
});

// ---------------------------------------------------------------------------
// Pipeline comercial (leads not yet won — separate from SOCIOS)

const AGENTES = ["Rosa Aguilar", "Fernando Casas", "Elena Campos", "Marta Sanz"];

const NOMBRES_LEAD_EMPRESA = [
  "Reformas Aurora", "Clínica Veterinaria Pinar", "Gestoría Montalbán",
  "Cafetería Roble", "Autoescuela Vía Rápida", "Imprenta Girasol",
  "Farmacia Sant Jordi", "Academia Idiomas Plural", "Frutas y Verduras Oliver",
  "Carpintería Norte", "Agencia Inmobiliaria Clave", "Estética Bellamar",
  "Grupo Logístico Andén 5", "Fisioterapia Activa", "Bufete Casals & Roig",
  "Supermercado Rincón", "Taller Mecánico Rueda", "Correduría Segurex",
];

// Shuffle so each lead company name is used at most once — the same pyme
// can't plausibly be a fresh Lead and an already-won Socio activo at once.
const empresaLeadPool = [...NOMBRES_LEAD_EMPRESA];
for (let i = empresaLeadPool.length - 1; i > 0; i--) {
  const j = Math.floor(rand() * (i + 1));
  [empresaLeadPool[i], empresaLeadPool[j]] = [empresaLeadPool[j], empresaLeadPool[i]];
}
let empresaLeadIndex = 0;

export const PIPELINE = Array.from({ length: 22 }, (_, i) => {
  const esEmpresa = empresaLeadIndex < empresaLeadPool.length && rand() < 0.6;
  const etapa = pickWeighted([["Lead", 0.45], ["Contactado", 0.35], ["Socio activo", 0.2]]);
  const d = new Date(HOY);
  d.setDate(d.getDate() - randInt(1, 120));
  return {
    id: `lead-${i + 1}`,
    nombre: esEmpresa ? empresaLeadPool[empresaLeadIndex++] : randomPersonName(),
    tipo: esEmpresa ? "Empresa" : "Particular",
    sector: esEmpresa ? pick(["Retail", "Hostelería", "Salud", "Servicios profesionales", "Construcción", "Logística"]) : "—",
    etapa,
    fechaContacto: formatDate(d),
    agente: pick(AGENTES),
    // Días que lleva el lead sin avanzar de etapa (dato simulado para la
    // alerta de seguimiento — no se deriva de fechaContacto a propósito).
    // Sesgado hacia valores bajos: en un pipeline sano la mayoría de leads
    // se mueve con normalidad y solo una minoría se queda estancada, que es
    // justo lo que la alerta debe señalar en vez de marcar casi todo.
    diasEnEtapa: pickWeighted([
      [1, 10], [2, 10], [3, 9], [4, 8], [5, 7], [6, 6], [7, 5],
      [9, 4], [11, 3], [14, 3], [17, 2], [20, 2],
    ]),
  };
});

// ---------------------------------------------------------------------------
// "Today" for the prototype's fictional clock — exported so the CRUD forms
// (src/context/DataContext.jsx) can default new records to the same "now"
// every other generated date in this file is anchored to. All the derived
// query functions (getDashboardStats, getAltasPorMes, ...) moved to
// src/data/selectors.js since they now run against live React state instead
// of these static arrays — see that file.
export const HOY_ISO = formatDate(HOY);

export { CATEGORIAS };
