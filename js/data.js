/**
 * Directorio Médico — Kiosco táctil Clínica Cruz Jiminián
 * Datos locales (HTML + CSS + JS vanilla, sin backend).
 *
 * Cómo agregar un médico nuevo:
 *   1. Abrir la especialidad (o crear una nueva clave).
 *   2. Copiar/pegar un objeto en "doctores" y completar sus datos.
 *
 * Cada doctor puede incluir (todos son opcionales salvo el nombre):
 *   nombre       (requerido)
 *   foto         ruta de la fotografía en /assets/doctors/ (si falta, se usa el placeholder)
 *   bio          breve reseña profesional (una o dos frases)
 *   experiencia  descripción profesional adicional
 *   consultorio  ubicación en la clínica
 *   telefono     extensión / contacto
 *   lunes..sabado  horario de cada día ("" = no consulta ese día)
 *
 * Valores especiales permitidos en los horarios: "Por cita", "8AM–12PM (cita)",
 * "c/15 días". Se muestran tal cual.
 */
const APP_CONFIG = {
  clinicName: "Clínica Cruz Jiminián",
  tagline: "Directorio Médico",
  idleTimeoutMs: 50000,
  specialtiesPerPage: 12,
  doctorsPerPage: 6
};

// Grupos de filtro para la pantalla principal (chips).
// Cada clave de especialidad aparece exactamente en un grupo.
const GRUPOS = [
  {
    key: "cirugia",
    nombre: "Cirugía",
    keys: ["cirugia-cardiovascular", "cirugia-general", "cirugia-vascular",
      "cirugia-coloproctologica", "cirugia-toracica", "cirugia-hepatobiliar",
      "cirugia-de-mano", "neurocirugia"]
  },
  {
    key: "pediatria",
    nombre: "Pediatría",
    keys: ["anestesiologia-pediatrica", "cardiologia-pediatrica", "cirugia-pediatrica",
      "endocrinologia-pediatrica", "gastroenterologia-pediatrica", "infectologia-pediatrica",
      "nefrologia-pediatrica", "neumologia-pediatrica", "neurocirugia-pediatrica",
      "neurologia-pediatrica", "urologia-pediatrica", "pediatria"]
  },
  {
    key: "ginecologia",
    nombre: "Ginecología",
    keys: ["ginecologia", "ginecologia-materno-fetal", "ginecologia-reproduccion-asistida",
      "ginecologia-endocrinologica", "ginecologia-oncologica"]
  },
  {
    key: "medicina",
    nombre: "Medicina",
    keys: ["medicina-general", "medicina-familiar", "cardiologia", "endocrinologia",
      "gastroenterologia", "nefrologia", "neumologia", "neurologia",
      "hematologia", "infectologia"]
  },
  {
    key: "metabolismo",
    nombre: "Metabolismo y nutrición",
    keys: ["geriatria", "diabetologia", "nutricion"]
  },
  {
    key: "salud-mental",
    nombre: "Salud mental",
    keys: ["psicologia", "psiquiatria"]
  },
  {
    key: "otras",
    nombre: "Otras especialidades",
    keys: ["alergologia", "anestesiologia", "dermatologia", "odontologia",
      "oftalmologia", "ortopedia", "otorrinolaringologia", "rehabilitacion",
      "reumatologia", "urologia"]
  }
];

const ESPECIALIDADES = {
  "alergologia": {
    nombre: "Alergología",
    desc: "Diagnóstico y tratamiento de alergias e intolerancias.",
    doctores: [
      { nombre: "Dr. Jin Woo", consultorio: "Unidad Integral #11", telefono: "Ext. 605-606",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "anestesiologia": {
    nombre: "Anestesiología",
    desc: "Especialistas en anestesia y manejo del dolor.",
    doctores: [
      { nombre: "Dr. Máximo Martínez", consultorio: "Edif. FFTP #308", telefono: "Ext. 610-611",
        lunes: "8AM–1PM", martes: "8AM–1PM", miercoles: "8AM–12PM", jueves: "8AM–3PM", viernes: "8AM–3PM", sabado: "" },
      { nombre: "Dra. Medina Cancún", consultorio: "Unidad Integral #3", telefono: "Ext. 605-606",
        lunes: "8AM–4PM", martes: "", miercoles: "2PM–4PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Maytex Calderón", consultorio: "Unidad Integral #11", telefono: "Ext. 605-606",
        lunes: "8AM–12PM", martes: "", miercoles: "8AM–12PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "anestesiologia-pediatrica": {
    nombre: "Anestesiología Pediátrica",
    desc: "Anestesia especializada para pacientes pediátricos.",
    doctores: [
      { nombre: "Dr. Carmona", consultorio: "Edif. FFTP #604", telefono: "Ext. 617-630",
        lunes: "8AM–1PM", martes: "8AM–1PM", miercoles: "8AM–1PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "cardiologia": {
    nombre: "Cardiología",
    desc: "Diagnóstico y tratamiento de enfermedades del corazón y sistema cardiovascular.",
    doctores: [
      { nombre: "Dr. Franklin Brito", consultorio: "Metabolismo #3", telefono: "Ext. 605-606",
        lunes: "", martes: "3PM–6PM", miercoles: "", jueves: "3PM–6PM", viernes: "", sabado: "" },
      { nombre: "Dra. Cristina Rodríguez", consultorio: "Edif. Principal #9", telefono: "",
        lunes: "9AM–5PM", martes: "", miercoles: "9AM–5PM", jueves: "", viernes: "9AM–2PM", sabado: "" },
      { nombre: "Dra. Lourdes Carvajal", consultorio: "Edif. Principal #210", telefono: "Ext. 606-607-629",
        lunes: "8AM–5PM", martes: "8AM–5PM", miercoles: "8AM–5PM", jueves: "8AM–5PM", viernes: "8AM–5PM", sabado: "" },
      { nombre: "Dra. María Medina", consultorio: "Unidad Integral #5", telefono: "Ext. 605-606",
        lunes: "9AM–3PM", martes: "9AM–5PM", miercoles: "4PM–6PM", jueves: "2PM–6PM", viernes: "8AM–1PM", sabado: "" },
      { nombre: "Dr. Braulio Mateo", consultorio: "Edif. FFTP #502", telefono: "Ext. 614-615",
        lunes: "8AM–6PM", martes: "2PM–6PM", miercoles: "8AM–6PM", jueves: "2PM–6PM", viernes: "8AM–6PM", sabado: "" },
      { nombre: "Dra. Michelle Lagrange", consultorio: "Unidad Integral #10", telefono: "Ext. 605-606",
        lunes: "", martes: "1PM–4PM", miercoles: "", jueves: "1PM–4PM", viernes: "", sabado: "" }
    ]
  },
  "cardiologia-pediatrica": {
    nombre: "Cardiología Pediátrica",
    desc: "Atención cardiológica especializada para niños y adolescentes.",
    doctores: [
      { nombre: "Dra. Yotaimy López", consultorio: "Unidad de ECO", telefono: "",
        lunes: "", martes: "2PM–6PM", miercoles: "", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Saby Rodríguez", consultorio: "Unidad de ECO", telefono: "",
        lunes: "", martes: "2PM–6PM", miercoles: "2PM–6PM", jueves: "2PM–6PM", viernes: "", sabado: "" },
      { nombre: "Dr. Kelvin Espinal", consultorio: "Unidad de ECO", telefono: "",
        lunes: "", martes: "", miercoles: "", jueves: "2PM–6PM", viernes: "", sabado: "" }
    ]
  },
  "cirugia-cardiovascular": {
    nombre: "Cirugía Cardiovascular",
    desc: "Intervenciones quirúrgicas del corazón y vasos sanguíneos.",
    doctores: [
      { nombre: "Dr. Macranchof Polanco", consultorio: "Edif. Principal #27", telefono: "",
        lunes: "9AM–1PM", martes: "9AM–1PM", miercoles: "10AM–1PM", jueves: "10AM–1PM", viernes: "", sabado: "" },
      { nombre: "Dra. Glenny Reyes", consultorio: "Edif. FFTP #407", telefono: "",
        lunes: "", martes: "2PM–4PM", miercoles: "", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. Miguel Matos", consultorio: "Unidad Integral #10", telefono: "Ext. 605-606",
        lunes: "", martes: "", miercoles: "2PM–5PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "cirugia-general": {
    nombre: "Cirugía General",
    desc: "Procedimientos quirúrgicos del abdomen y órganos principales.",
    doctores: [
      { nombre: "Dr. Bolivar Alcántara", consultorio: "Freddy Beras #1", telefono: "",
        lunes: "8AM–2PM", martes: "8AM–2PM", miercoles: "8AM–2PM", jueves: "8AM–2PM", viernes: "8AM–2PM", sabado: "" },
      { nombre: "Dr. Samuel Danier", consultorio: "Edif. Principal #10", telefono: "",
        lunes: "8AM–5PM", martes: "8AM–5PM", miercoles: "8AM–5PM", jueves: "8AM–5PM", viernes: "8AM–5PM", sabado: "" },
      { nombre: "Dr. William Suazo", consultorio: "Edif. FFTP #202", telefono: "Ext. 608-609-631",
        lunes: "3PM–6PM", martes: "3PM–6PM", miercoles: "3PM–6PM", jueves: "3PM–6PM", viernes: "3PM–6PM", sabado: "" },
      { nombre: "Dra. Maira De Jesús", consultorio: "Edif. FFTP #309", telefono: "Ext. 610-611",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Yojanny Familia", consultorio: "Edif. FFTP #401", telefono: "",
        lunes: "7AM–12PM", martes: "7AM–12PM", miercoles: "7AM–12PM", jueves: "7AM–12PM", viernes: "7AM–12PM", sabado: "" },
      { nombre: "Dra. Maribel Gutiérrez", consultorio: "Edif. FFTP #506", telefono: "Ext. 614-615",
        lunes: "4PM–6PM", martes: "8AM–5PM", miercoles: "", jueves: "10AM–12PM", viernes: "", sabado: "" },
      { nombre: "Dra. Deisy Guzmán", consultorio: "Edif. Principal #607", telefono: "",
        lunes: "8AM–4PM", martes: "", miercoles: "8AM–4PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. Francis Javier", consultorio: "Unidad Integral #10", telefono: "Ext. 605-606",
        lunes: "8AM–5PM", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "cirugia-vascular": {
    nombre: "Cirugía Vascular",
    desc: "Tratamiento de enfermedades de arterias, venas y vasos linfáticos.",
    doctores: [
      { nombre: "Dr. Lenin Roa", consultorio: "Freddy Beras #12", telefono: "",
        lunes: "10AM–2PM", martes: "12PM–4PM", miercoles: "12PM–4PM", jueves: "", viernes: "7AM–12PM", sabado: "" },
      { nombre: "Dr. Sihh Cheng", consultorio: "Freddy Beras #12", telefono: "",
        lunes: "9AM–12PM", martes: "", miercoles: "9AM–12PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. William Matías", consultorio: "Unidad Integral #10", telefono: "Ext. 605-606",
        lunes: "", martes: "11AM–3PM", miercoles: "", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "cirugia-pediatrica": {
    nombre: "Cirugía Pediátrica",
    desc: "Intervenciones quirúrgicas en niños y neonatos.",
    doctores: [
      { foto: "https://d3jn2paweyt2kr.cloudfront.net/website/specialties/cirugia-pediatrica/pedro-santana.png", nombre: "Dr. Pedro Santana", consultorio: "Freddy Beras #19", telefono: "",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "8AM–12PM", sabado: "" },
      { nombre: "Dr. Leivin Ramírez", consultorio: "Edif. FFTP #209", telefono: "Ext. 608-609-631",
        lunes: "12PM–4PM", martes: "", miercoles: "12PM–4PM", jueves: "", viernes: "8AM–12PM", sabado: "" },
      { nombre: "Dr. Oscar Sánchez", consultorio: "Edif. FFTP #604", telefono: "Ext. 617-630",
        lunes: "8AM–1PM", martes: "8AM–1PM", miercoles: "", jueves: "8AM–1PM", viernes: "", sabado: "" }
    ]
  },
  "cirugia-coloproctologica": {
    nombre: "Cirugía Coloproctológica",
    desc: "Tratamiento quirúrgico del colon, recto y ano.",
    doctores: [
      { nombre: "Dra. Alba Rosario", consultorio: "Freddy Beras #22", telefono: "",
        lunes: "", martes: "2PM–4PM", miercoles: "2PM–4PM", jueves: "2PM–4PM", viernes: "", sabado: "" }
    ]
  },
  "cirugia-toracica": {
    nombre: "Cirugía Torácica",
    desc: "Cirugía del tórax, pulmones y estructuras intratorácicas.",
    doctores: [
      { nombre: "Dra. Irma Toribio", consultorio: "Edif. Principal #16", telefono: "",
        lunes: "9AM–12PM", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. Yankel Montero", consultorio: "Edif. FFTP #607", telefono: "Ext. 617-630",
        lunes: "3PM–5PM", martes: "3PM–5PM", miercoles: "3PM–5PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "cirugia-hepatobiliar": {
    nombre: "Cirugía Hepatobiliar",
    desc: "Cirugía del hígado, vías biliares y páncreas.",
    doctores: [
      { nombre: "Dr. Peña Suriel", consultorio: "Freddy Beras #4", telefono: "",
        lunes: "", martes: "11AM–2PM", miercoles: "10AM–2PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "cirugia-de-mano": {
    nombre: "Cirugía de Mano",
    desc: "Cirugía especializada en la mano y muñeca.",
    doctores: [
      { nombre: "Dra. Karina Núñez", consultorio: "Edif. FFTP #603", telefono: "Ext. 617-630",
        lunes: "8AM–12PM", martes: "", miercoles: "8AM–12PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "dermatologia": {
    nombre: "Dermatología",
    desc: "Diagnóstico y tratamiento de enfermedades de la piel, cabello y uñas.",
    doctores: [
      { nombre: "Dr. Cornelio Ureña", consultorio: "Unidad Integral #7", telefono: "Ext. 605-606",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "", sabado: "" },
      { nombre: "Dra. Dalva Hernández", consultorio: "Unidad Integral #7", telefono: "Ext. 605-606",
        lunes: "", martes: "3PM–5PM", miercoles: "", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Jatna Vidal", consultorio: "Unidad Integral #7", telefono: "Ext. 605-606",
        lunes: "", martes: "", miercoles: "2PM–5PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Michelle Polonio", consultorio: "Unidad Integral #7", telefono: "Ext. 605-606",
        lunes: "", martes: "", miercoles: "", jueves: "2PM–5PM", viernes: "", sabado: "" }
    ]
  },
  "diabetologia": {
    nombre: "Diabetología",
    desc: "Manejo y tratamiento integral de la diabetes.",
    doctores: [
      { nombre: "Dra. Encarnación", consultorio: "Freddy Beras #11", telefono: "",
        lunes: "8AM–2PM", martes: "8AM–2PM", miercoles: "8AM–2PM", jueves: "8AM–2PM", viernes: "11AM–2PM", sabado: "" },
      { nombre: "Dra. Massiel O. Mancebo", consultorio: "Unidad Integral #4", telefono: "Ext. 605-606",
        lunes: "3PM–6PM", martes: "3PM–6PM", miercoles: "4PM–6PM", jueves: "3PM–6PM", viernes: "", sabado: "" },
      { nombre: "Dra. Rocío Gómez", consultorio: "Edif. FFTP #201", telefono: "Ext. 608-609-631",
        lunes: "1PM–5PM", martes: "", miercoles: "", jueves: "", viernes: "8AM–12PM", sabado: "" }
    ]
  },
  "endocrinologia": {
    nombre: "Endocrinología",
    desc: "Tratamiento de enfermedades hormonales y metabólicas.",
    doctores: [
      { nombre: "Dra. Rosa Calderón", consultorio: "Unidad Integral #4", telefono: "Ext. 605-606",
        lunes: "9AM–12PM", martes: "9AM–12PM", miercoles: "9AM–12PM", jueves: "9AM–12PM", viernes: "9AM–12PM", sabado: "" },
      { nombre: "Dra. Elizabeth Ortiz", consultorio: "Unidad Integral #8", telefono: "Ext. 605-606",
        lunes: "9AM–3PM", martes: "", miercoles: "2PM–4PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "endocrinologia-pediatrica": {
    nombre: "Endocrinología Pediátrica",
    desc: "Atención de enfermedades hormonales en niños.",
    doctores: [
      { nombre: "Dra. Mercedes Ramos", consultorio: "Edif. FFTP #606", telefono: "Ext. 617-630",
        lunes: "", martes: "2PM–6PM", miercoles: "", jueves: "2PM–6PM", viernes: "", sabado: "" }
    ]
  },
  "gastroenterologia": {
    nombre: "Gastroenterología",
    desc: "Diagnóstico y tratamiento del sistema digestivo.",
    doctores: [
      { nombre: "Dr. Kyoko Mukai", consultorio: "Freddy Beras #4", telefono: "",
        lunes: "9AM–2PM", martes: "9AM–2PM", miercoles: "9AM–2PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Johanel Wanderlinder", consultorio: "Unidad Integral #3", telefono: "Ext. 605-606",
        lunes: "8AM–1PM", martes: "", miercoles: "8AM–1PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. Roberto del Orbe", consultorio: "Edif. FFTP #204", telefono: "Ext. 608-609-631",
        lunes: "8AM–10AM", martes: "10AM–12PM", miercoles: "10AM–12PM", jueves: "8AM–10AM", viernes: "10AM–12PM", sabado: "12:30PM–3PM" },
      { nombre: "Dra. Yuberkis Colome", consultorio: "Edif. FFTP #309", telefono: "Ext. 610-611",
        lunes: "2PM–5PM", martes: "", miercoles: "2PM–5PM", jueves: "2PM–5PM", viernes: "", sabado: "" },
      { nombre: "Dr. Walfan Marte", consultorio: "Edif. FFTP #402", telefono: "",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–4PM", jueves: "8AM–12PM", viernes: "", sabado: "" },
      { nombre: "Dra. Sugeidy Gómez", consultorio: "Unidad Integral #6", telefono: "Ext. 605-606",
        lunes: "10AM–5PM", martes: "2PM–5PM", miercoles: "10AM–5PM", jueves: "2PM–5PM", viernes: "2PM–5PM", sabado: "" },
      { nombre: "Dra. Cruz Coste", consultorio: "Freddy Beras #7", telefono: "",
        lunes: "8AM–4PM", martes: "8AM–4PM", miercoles: "8AM–4PM", jueves: "8AM–4PM", viernes: "8AM–4PM", sabado: "8AM–12PM" }
    ]
  },
  "gastroenterologia-pediatrica": {
    nombre: "Gastroenterología Pediátrica",
    desc: "Atención del sistema digestivo en niños y adolescentes.",
    doctores: [
      { nombre: "Dr. Pavel Graciano", consultorio: "Freddy Beras #10", telefono: "",
        lunes: "8AM–11AM", martes: "", miercoles: "2PM–4PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "geriatria": {
    nombre: "Geriatría",
    desc: "Atención médica integral para adultos mayores.",
    doctores: [
      { nombre: "Dra. Rosmery Rodríguez", consultorio: "Edif. FFTP #606", telefono: "Ext. 617-630",
        lunes: "9AM–12PM", martes: "", miercoles: "9AM–12PM", jueves: "9AM–12PM", viernes: "", sabado: "" }
    ]
  },
  "ginecologia": {
    nombre: "Ginecología",
    desc: "Atención integral de la salud femenina.",
    doctores: [
      { nombre: "Dra. Ingrid Rodríguez", consultorio: "Freddy Beras #16", telefono: "",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "", sabado: "" },
      { nombre: "Dr. Mauricio Jiménez", consultorio: "Freddy Beras #17", telefono: "",
        lunes: "8AM–2PM", martes: "8AM–2PM", miercoles: "8AM–2PM", jueves: "8AM–2PM", viernes: "", sabado: "" },
      { nombre: "Dra. Angela Díaz", consultorio: "Freddy Beras #17", telefono: "",
        lunes: "3PM–6PM", martes: "3PM–6PM", miercoles: "3PM–6PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. Víctor Rosario", consultorio: "Freddy Beras #18", telefono: "",
        lunes: "9AM–3PM", martes: "9AM–3PM", miercoles: "9AM–3PM", jueves: "9AM–3PM", viernes: "9AM–3PM", sabado: "" },
      { nombre: "Dra. María Peña", consultorio: "Edif. Principal #19", telefono: "",
        lunes: "7AM–12PM", martes: "7AM–12PM", miercoles: "7AM–12PM", jueves: "7AM–12PM", viernes: "c/15 días", sabado: "" },
      { nombre: "Dra. Rita Terrero", consultorio: "Edif. Principal #27", telefono: "",
        lunes: "1PM–5PM", martes: "1PM–5PM", miercoles: "1PM–5PM", jueves: "1PM–5PM", viernes: "1PM–5PM", sabado: "" },
      { nombre: "Dr. Olger Cott", consultorio: "Unidad Integral #8", telefono: "Ext. 605-606",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "", sabado: "" },
      { nombre: "Dr. Manuel Segura", consultorio: "Edif. FFTP #209", telefono: "Ext. 608-609-631",
        lunes: "1PM–5PM", martes: "1PM–5PM", miercoles: "1PM–5PM", jueves: "8AM–12PM", viernes: "", sabado: "" },
      { nombre: "Dr. Hector Trinidad", consultorio: "Edif. FFTP #304", telefono: "Ext. 610-611",
        lunes: "9AM–12PM", martes: "9AM–12PM", miercoles: "9AM–12PM", jueves: "9AM–12PM", viernes: "9AM–12PM", sabado: "" },
      { nombre: "Dra. Rosángel García", consultorio: "Edif. FFTP #304", telefono: "Ext. 610-611",
        lunes: "2PM–6PM", martes: "2PM–6PM", miercoles: "2PM–6PM", jueves: "2PM–6PM", viernes: "2PM–6PM", sabado: "" },
      { nombre: "Dra. Melina Moreta Matos", consultorio: "Edif. FFTP #505/506/507", telefono: "Ext. 614-615",
        lunes: "8AM–1PM", martes: "8AM–1PM", miercoles: "8AM–1PM", jueves: "8AM–1PM", viernes: "", sabado: "" },
      { nombre: "Dr. Gustavo De los Santos", consultorio: "Edif. FFTP #505", telefono: "Ext. 614-615",
        lunes: "9AM–1PM", martes: "9AM–1PM", miercoles: "9AM–1PM", jueves: "9AM–1PM", viernes: "", sabado: "" },
      { nombre: "Dra. Milagros Ulloa", consultorio: "Edif. FFTP #506 / Freddy Beras #21", telefono: "",
        lunes: "2PM–5PM", martes: "", miercoles: "9AM–5PM", jueves: "", viernes: "2PM–5PM", sabado: "" }
    ]
  },
  "ginecologia-materno-fetal": {
    nombre: "Ginecología Materno Fetal",
    desc: "Seguimiento de embarazos de alto riesgo.",
    doctores: [
      { nombre: "Dra. Yuleiki Fernández", consultorio: "Unidad de Sonografía", telefono: "",
        lunes: "9AM–12PM", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "ginecologia-reproduccion-asistida": {
    nombre: "Ginecología – Reproducción Asistida",
    desc: "Tratamientos de fertilidad y reproducción asistida.",
    doctores: [
      { nombre: "Dra. Charlotte Pilier", consultorio: "Unidad Integral #8", telefono: "Ext. 605-606",
        lunes: "3PM–6PM", martes: "8AM–6PM", miercoles: "3PM–6PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "ginecologia-endocrinologica": {
    nombre: "Ginecología Endocrinológica",
    desc: "Trastornos hormonales en la salud femenina.",
    doctores: [
      { nombre: "Dra. María Deaza", consultorio: "Edif. Principal #9", telefono: "",
        lunes: "2PM–6PM", martes: "2PM–6PM", miercoles: "2PM–6PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Adriana Mateo", consultorio: "Freddy Beras #15", telefono: "",
        lunes: "9AM–12PM", martes: "9AM–12PM", miercoles: "10AM–1PM", jueves: "2PM–5PM", viernes: "", sabado: "" }
    ]
  },
  "ginecologia-oncologica": {
    nombre: "Ginecología Oncológica",
    desc: "Diagnóstico y tratamiento de cánceres ginecológicos.",
    doctores: [
      { nombre: "Dr. Luis Ramírez", consultorio: "Edif. FFTP #302", telefono: "Ext. 610-611",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "8AM–12PM", sabado: "" },
      { nombre: "Dra. Carmen Roa", consultorio: "Edif. FFTP #302", telefono: "Ext. 610-611",
        lunes: "1PM–6PM", martes: "", miercoles: "1PM–6PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "hematologia": {
    nombre: "Hematología",
    desc: "Diagnóstico y tratamiento de enfermedades de la sangre.",
    doctores: [
      { nombre: "Dra. Del Carmen Revi", consultorio: "Unidad Integral #10", telefono: "Ext. 605-606",
        lunes: "", martes: "3PM–6PM", miercoles: "8AM–11AM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Fátima Bhatti", consultorio: "Unidad Integral #6", telefono: "Ext. 605-606",
        lunes: "9AM–12PM", martes: "2PM–6PM", miercoles: "2PM–5PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "infectologia": {
    nombre: "Infectología",
    desc: "Diagnóstico y tratamiento de enfermedades infecciosas.",
    doctores: [
      { nombre: "Dra. María del Pilar", consultorio: "Freddy Beras #12", telefono: "",
        lunes: "3PM–5PM", martes: "", miercoles: "9AM–12PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Martha Cruz", consultorio: "Edif. FFTP #206", telefono: "Ext. 608-609-631",
        lunes: "8AM–12PM", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "infectologia-pediatrica": {
    nombre: "Infectología Pediátrica",
    desc: "Enfermedades infecciosas en niños.",
    doctores: [
      { nombre: "Dra. Wendy Vásquez", consultorio: "Freddy Beras #10", telefono: "",
        lunes: "8AM–12PM (cita)", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "medicina-familiar": {
    nombre: "Medicina Familiar",
    desc: "Atención médica integral a toda la familia.",
    doctores: [
      { nombre: "Dra. Pamela Féliz", consultorio: "Metabolismo #10", telefono: "Ext. 605-606",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "medicina-general": {
    nombre: "Medicina General",
    desc: "Atención primaria y medicina preventiva.",
    doctores: [
      { nombre: "Dr. Cruz Jiminián", consultorio: "Edif. Principal Piso 1", telefono: "",
        lunes: "8AM–4PM", martes: "8AM–4PM", miercoles: "8AM–4PM", jueves: "8AM–4PM", viernes: "8AM–4PM", sabado: "8AM–12PM" },
      { nombre: "Dr. Nereida de León", consultorio: "Edif. Principal Piso 1", telefono: "",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "8AM–12PM", sabado: "" },
      { nombre: "Dra. Viviana Reyes", consultorio: "Edif. Principal Piso 1", telefono: "",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "8AM–12PM", sabado: "" },
      { nombre: "Dra. Elizabeth Mena", consultorio: "Edif. FFTP #504", telefono: "Ext. 614-615",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "8AM–12PM", sabado: "" },
      { nombre: "Dr. Mariano Montero", consultorio: "Edif. Principal Piso 1", telefono: "",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "8AM–12PM", sabado: "" },
      { nombre: "Dra. Maribel Fernández", consultorio: "Edif. Principal Piso 1", telefono: "",
        lunes: "2PM–4PM", martes: "2PM–4PM", miercoles: "2PM–4PM", jueves: "2PM–4PM", viernes: "2PM–4PM", sabado: "" },
      { nombre: "Dr. Franklin Cruz", consultorio: "Edif. Principal Piso 1", telefono: "",
        lunes: "2PM–4PM", martes: "2PM–4PM", miercoles: "2PM–4PM", jueves: "2PM–4PM", viernes: "2PM–4PM", sabado: "" },
      { nombre: "Dra. Rosmery Núñez", consultorio: "Freddy Beras #20", telefono: "",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "8AM–12PM", sabado: "" },
      { nombre: "Dra. Dacelis Aquino", consultorio: "Edif. Principal Piso 1", telefono: "",
        lunes: "8AM–4PM", martes: "8AM–4PM", miercoles: "8AM–4PM", jueves: "8AM–4PM", viernes: "8AM–4PM", sabado: "" },
      { nombre: "Dr. Cabrera", consultorio: "Edif. Principal #18", telefono: "",
        lunes: "2PM–4PM", martes: "2PM–4PM", miercoles: "2PM–4PM", jueves: "2PM–4PM", viernes: "2PM–4PM", sabado: "" },
      { nombre: "Dra. Antonia Florentino", consultorio: "Edif. Principal #18", telefono: "",
        lunes: "8AM–12PM", martes: "8AM–2PM", miercoles: "8AM–12PM", jueves: "8AM–2PM", viernes: "8AM–2PM", sabado: "" }
    ]
  },
  "nefrologia": {
    nombre: "Nefrología",
    desc: "Diagnóstico y tratamiento de enfermedades renales.",
    doctores: [
      { nombre: "Dr. Rafael Robles", consultorio: "Freddy Beras #14", telefono: "",
        lunes: "9AM–1PM", martes: "9AM–1PM", miercoles: "9AM–1PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Emely Silverio", consultorio: "Freddy Beras #14", telefono: "",
        lunes: "2PM–5PM", martes: "2PM–5PM", miercoles: "10AM–1PM", jueves: "2PM–5PM", viernes: "", sabado: "" },
      { nombre: "Dra. Adelaida Martínez", consultorio: "Edif. Principal #16", telefono: "",
        lunes: "2PM–5PM", martes: "2PM–5PM", miercoles: "2PM–5PM", jueves: "2PM–5PM", viernes: "2PM–5PM", sabado: "" },
      { nombre: "Dr. Diogenes Ledesma", consultorio: "Edif. FFTP #409", telefono: "",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "", sabado: "" }
    ]
  },
  "nefrologia-pediatrica": {
    nombre: "Nefrología Pediátrica",
    desc: "Enfermedades renales en niños.",
    doctores: [
      { nombre: "Dra. Celia González", consultorio: "Freddy Beras #10", telefono: "",
        lunes: "3PM–5PM", martes: "", miercoles: "", jueves: "9AM–12PM", viernes: "", sabado: "" }
    ]
  },
  "neumologia": {
    nombre: "Neumología",
    desc: "Diagnóstico y tratamiento de enfermedades respiratorias.",
    doctores: [
      { nombre: "Dra. Anabell Rojas", consultorio: "Unidad Integral #12", telefono: "Ext. 605-606",
        lunes: "3PM–6PM", martes: "9AM–12PM", miercoles: "9AM–12PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. Franklyn Barrera", consultorio: "Edif. Principal #16", telefono: "",
        lunes: "8AM–12PM", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. Miguel Martínez", consultorio: "Edif. FFTP #303", telefono: "Ext. 610-611",
        lunes: "2PM–5PM", martes: "2PM–5PM", miercoles: "2PM–5PM", jueves: "2PM–5PM", viernes: "2PM–5PM", sabado: "" },
      { nombre: "Dra. Altagracia Méndez", consultorio: "Edif. FFTP #305", telefono: "Ext. 610-611",
        lunes: "9AM–1PM", martes: "9AM–1PM", miercoles: "9AM–1PM", jueves: "9AM–1PM", viernes: "9AM–1PM", sabado: "" }
    ]
  },
  "neumologia-pediatrica": {
    nombre: "Neumología Pediátrica",
    desc: "Enfermedades respiratorias en niños.",
    doctores: [
      { nombre: "Dra. Glenis José", consultorio: "Edif. FFTP #605", telefono: "Ext. 617-630",
        lunes: "8AM–1PM", martes: "8AM–1PM", miercoles: "", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Matos", consultorio: "Edif. FFTP #201", telefono: "Ext. 608-609-631",
        lunes: "", martes: "2:40PM–6PM", miercoles: "", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "neurocirugia": {
    nombre: "Neurocirugía",
    desc: "Cirugía del sistema nervioso central y periférico.",
    doctores: [
      { nombre: "Dra. Nujerling Vargas", consultorio: "Edif. FFTP #205", telefono: "Ext. 608-609-631",
        lunes: "8AM–12PM", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Carmen Damazo", consultorio: "Edif. FFTP #205", telefono: "Ext. 608-609-631",
        lunes: "8AM–10AM", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. William Cueto", consultorio: "Edif. FFTP #205", telefono: "Ext. 608-609-631",
        lunes: "2PM–4PM", martes: "", miercoles: "2PM–4PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. José Luis Novas", consultorio: "Edif. FFTP #205", telefono: "Ext. 608-609-631",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. Jose Isidro Ruiz", consultorio: "Edif. FFTP #503", telefono: "Ext. 614-615",
        lunes: "9AM–4PM", martes: "9AM–11AM", miercoles: "9AM–4PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "neurocirugia-pediatrica": {
    nombre: "Neurocirugía Pediátrica",
    desc: "Cirugía del sistema nervioso en niños.",
    doctores: [
      { nombre: "Dra. Zorinel Adames", consultorio: "Edif. FFTP #205", telefono: "Ext. 608-609-631",
        lunes: "10AM–12PM", martes: "2PM–4PM", miercoles: "", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "neurologia": {
    nombre: "Neurología",
    desc: "Diagnóstico y tratamiento de enfermedades del sistema nervioso.",
    doctores: [
      { nombre: "Dr.Enoch De los Ríos", consultorio: "Unidad Integral #8", telefono: "Ext. 605-606",
        lunes: "2PM–6PM", martes: "", miercoles: "2PM–6PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Ralussen Jiménez", consultorio: "Edif. FFTP #404", telefono: "",
        lunes: "9AM–12PM", martes: "1PM–4PM", miercoles: "9AM–12PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Abigail Jean", consultorio: "Unidad Integral #3", telefono: "Ext. 605-606",
        lunes: "1PM–6PM", martes: "1PM–6PM", miercoles: "1PM–6PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "neurologia-pediatrica": {
    nombre: "Neurología Pediátrica",
    desc: "Enfermedades neurológicas en niños y adolescentes.",
    doctores: [
      { nombre: "Dra. Crismarlin Valerio", consultorio: "Edif. Principal #305", telefono: "",
        lunes: "2PM–5PM", martes: "2PM–5PM", miercoles: "2PM–5PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "nutricion": {
    nombre: "Nutrición",
    desc: "Orientación nutricional y manejo de trastornos alimentarios.",
    doctores: [
      { nombre: "Dr. Ramon Alcequiez", consultorio: "Unidad Integral #2", telefono: "Ext. 605-606",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "8AM–12PM", sabado: "" },
      { nombre: "Dra. Emely Matos", consultorio: "Unidad Integral #2", telefono: "Ext. 605-606",
        lunes: "2PM–5PM", martes: "2PM–5PM", miercoles: "2PM–5PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "odontologia": {
    nombre: "Odontología",
    desc: "Salud bucal, tratamientos dentales y procedimientos estéticos.",
    doctores: [
      { nombre: "Dr. Tomy", consultorio: "Edif. FFTP 6to Piso (Unidad Odontológica)", telefono: "Ext. 617-630",
        lunes: "8AM–5PM", martes: "8AM–5PM", miercoles: "8AM–5PM", jueves: "8AM–5PM", viernes: "8AM–5PM", sabado: "8AM–12PM" },
      { nombre: "Dr. Francisco Ortega", consultorio: "Freddy Beras 1er Piso", telefono: "",
        lunes: "8AM–5PM", martes: "8AM–5PM", miercoles: "8AM–5PM", jueves: "8AM–5PM", viernes: "8AM–5PM", sabado: "8AM–12PM" },
      { nombre: "Dra. Marisol Drullar", consultorio: "Edif. FFTP #306", telefono: "Ext. 610-611",
        lunes: "8AM–4PM", martes: "8AM–4PM", miercoles: "8AM–4PM", jueves: "8AM–4PM", viernes: "8AM–4PM", sabado: "" }
    ]
  },
  "oftalmologia": {
    nombre: "Oftalmología",
    desc: "Diagnóstico y tratamiento de enfermedades de los ojos.",
    doctores: [
      { nombre: "Dra. Alida Sánchez", consultorio: "Unidad Integral #1", telefono: "Ext. 605-606",
        lunes: "8AM–2PM", martes: "8AM–2PM", miercoles: "8AM–2PM", jueves: "8AM–2PM", viernes: "8AM–2PM", sabado: "" }
    ]
  },
  "ortopedia": {
    nombre: "Ortopedia",
    desc: "Diagnóstico y tratamiento del sistema músculo-esquelético.",
    doctores: [
      { nombre: "Dr. Benjamín Estévez", consultorio: "Edif. Principal #22", telefono: "",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "8AM–12PM", sabado: "" },
      { nombre: "Dr. Yeffry Torres", consultorio: "Edif. Principal #22", telefono: "",
        lunes: "4PM–6PM", martes: "4PM–6PM", miercoles: "2PM–6PM", jueves: "2PM–6PM", viernes: "2PM–6PM", sabado: "" },
      { nombre: "Dr. Jefferson Gonzalez", consultorio: "Edif. Principal #26", telefono: "",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "", sabado: "" },
      { nombre: "Dr. Gerson Cuevas", consultorio: "Edif. Principal #26", telefono: "",
        lunes: "2PM–5PM", martes: "9AM–5PM", miercoles: "2PM–5PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. Stalin Echavarría", consultorio: "Edif. FFTP #201", telefono: "Ext. 608-609",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "2PM–5PM", viernes: "", sabado: "" },
      { nombre: "Dr. Gregoris Méndez", consultorio: "Edif. FFTP #504", telefono: "Ext. 614-615",
        lunes: "1PM–5PM", martes: "", miercoles: "9AM–12PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. Israel de la Cruz", consultorio: "Edif. FFTP #207", telefono: "Ext. 608-609",
        lunes: "8AM–1PM", martes: "8AM–1PM", miercoles: "8AM–1PM", jueves: "8AM–1PM", viernes: "", sabado: "" },
      { nombre: "Dr. Yankel Montero", consultorio: "Edif. FFTP #407", telefono: "",
        lunes: "8AM–1PM", martes: "8AM–1PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "8AM–12PM", sabado: "" },
      { nombre: "Dr. Figuereo Donato", consultorio: "Edif. FFTP #208", telefono: "Ext. 608-609-631",
        lunes: "9AM–2PM", martes: "", miercoles: "9AM–2PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. José Gabriel González", consultorio: "Edif. FFTP #409", telefono: "",
        lunes: "Por cita", martes: "Por cita", miercoles: "Por cita", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. Emerson Rodríguez Molina", consultorio: "Edif. FFTP #201", telefono: "Ext. 608-609-631",
        lunes: "2PM–6PM", martes: "2PM–6PM", miercoles: "", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. Fernando Pujols", consultorio: "Edif. Principal #1", telefono: "",
        lunes: "2PM–5PM", martes: "2PM–5PM", miercoles: "8AM–4PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. José Alberto Vargas", consultorio: "Edif. FFTP #604", telefono: "Ext. 617-630",
        lunes: "9AM–12PM", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "otorrinolaringologia": {
    nombre: "Otorrinolaringología",
    desc: "Enfermedades de oído, nariz y garganta.",
    doctores: [
      { nombre: "Dr. Orlando Morato", consultorio: "Freddy Beras #3", telefono: "Ext. 602-603",
        lunes: "9AM–3PM", martes: "9AM–3PM", miercoles: "9AM–3PM", jueves: "9AM–3PM", viernes: "9AM–3PM", sabado: "" },
      { nombre: "Dra. Esther Valdera", consultorio: "Freddy Beras #21", telefono: "Ext. 601-603",
        lunes: "9AM–2PM", martes: "9AM–2PM", miercoles: "", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Brenda Díaz", consultorio: "Freddy Beras #21", telefono: "Ext. 602-603",
        lunes: "9AM–12PM", martes: "9AM–12PM", miercoles: "", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Laura Garris", consultorio: "Unidad Integral #11", telefono: "Ext. 605-606",
        lunes: "8AM–11AM", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. Jose Barreto", consultorio: "Edif. FFTP #602", telefono: "Ext. 617-630",
        lunes: "9AM–5PM", martes: "9AM–5PM", miercoles: "9AM–5PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "pediatria": {
    nombre: "Pediatría",
    desc: "Atención médica integral a niños y adolescentes.",
    doctores: [
      { nombre: "Dr. Pelagio Cruz", consultorio: "Freddy Beras #2", telefono: "",
        lunes: "8AM–6PM", martes: "8AM–6PM", miercoles: "8AM–6PM", jueves: "8AM–6PM", viernes: "8AM–6PM", sabado: "8AM–12PM" },
      { nombre: "Dra. Jennifer Castillo", consultorio: "Freddy Beras #9", telefono: "",
        lunes: "11AM–6PM", martes: "11AM–6PM", miercoles: "11AM–6PM", jueves: "11AM–6PM", viernes: "11AM–6PM", sabado: "" },
      { nombre: "Dra. Montes de Oca", consultorio: "Edif. Principal #210", telefono: "Ext. 606-607-629",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "8AM–12PM", viernes: "8AM–12PM", sabado: "" },
      { nombre: "Dra. Molly Espinosa", consultorio: "Edif. Principal #410", telefono: "",
        lunes: "8AM–2PM", martes: "8AM–2PM", miercoles: "8AM–2PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Fany Martínez", consultorio: "Edif. FFTP #604", telefono: "Ext. 617-630",
        lunes: "2PM–6PM", martes: "2PM–6PM", miercoles: "2PM–6PM", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "psicologia": {
    nombre: "Psicología",
    desc: "Evaluación y tratamiento de trastornos emocionales y conductuales.",
    doctores: [
      { nombre: "Lic. Anyely Camacho", consultorio: "Freddy Beras #20", telefono: "",
        lunes: "2PM–6PM", martes: "2PM–6PM", miercoles: "2PM–6PM", jueves: "2PM–6PM", viernes: "2PM–6PM", sabado: "" },
      { nombre: "Lic. Iris Marte Rodríguez", consultorio: "Freddy Beras #21", telefono: "",
        lunes: "1PM–5PM", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" },
      { nombre: "Lic. Widalys Arvelo", consultorio: "Edif. FFTP #310", telefono: "Ext. 610-611",
        lunes: "4PM–6PM", martes: "4PM–6PM", miercoles: "4PM–6PM", jueves: "4PM–6PM", viernes: "", sabado: "" },
      { nombre: "Lic. María Yesenia Reynoso", consultorio: "Edif. Principal #18", telefono: "",
        lunes: "2PM–5PM", martes: "8AM–12PM", miercoles: "", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "psiquiatria": {
    nombre: "Psiquiatría",
    desc: "Diagnóstico y tratamiento de enfermedades mentales.",
    doctores: [
      { nombre: "Dra. Alma Brito", consultorio: "Edif. FFTP #403", telefono: "",
        lunes: "12PM–4PM", martes: "", miercoles: "12PM–4PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Cristina Cruz", consultorio: "Edif. FFTP #403", telefono: "",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "8AM–12PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Katia Perdomo", consultorio: "Edif. FFTP #403", telefono: "",
        lunes: "12PM–4PM", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "rehabilitacion": {
    nombre: "Rehabilitación",
    desc: "Centro de fisioterapia y rehabilitación física.",
    doctores: [
      { nombre: "Centro Dra. Rosa Lockuard", consultorio: "Edif. FFTP 5to Piso", telefono: "Ext. 614-615",
        lunes: "8AM–4PM", martes: "8AM–4PM", miercoles: "8AM–4PM", jueves: "8AM–4PM", viernes: "8AM–4PM", sabado: "8AM–12PM" }
    ]
  },
  "reumatologia": {
    nombre: "Reumatología",
    desc: "Enfermedades autoinmunes y del tejido conectivo.",
    doctores: [
      { nombre: "Dra. Rorayma Jiménez", consultorio: "Edif. FFTP #406", telefono: "",
        lunes: "9AM–2PM", martes: "9AM–12PM", miercoles: "", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "urologia": {
    nombre: "Urología",
    desc: "Enfermedades del sistema urinario y aparato reproductor masculino.",
    doctores: [
      { nombre: "Dr. José Paulino", consultorio: "Edif. Principal #17", telefono: "",
        lunes: "8AM–3PM", martes: "8AM–12PM", miercoles: "8AM–3PM", jueves: "8AM–3PM", viernes: "", sabado: "" },
      { nombre: "Dr. Nahum Toribio", consultorio: "Edif. Principal #23", telefono: "",
        lunes: "7AM–12PM", martes: "7AM–12PM", miercoles: "7AM–12PM", jueves: "7AM–12PM", viernes: "", sabado: "" },
      { nombre: "Dr. Luis Alejandro", consultorio: "Metabolismo #11", telefono: "Ext. 605-606",
        lunes: "3PM–6PM", martes: "3PM–6PM", miercoles: "12PM–3PM", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. Raymundo Cruz", consultorio: "Edif. FFTP #203", telefono: "Ext. 608-609-631",
        lunes: "9AM–1PM", martes: "9AM–1PM", miercoles: "", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dr. Juan Cabrera", consultorio: "Edif. FFTP #303", telefono: "Ext. 610-611",
        lunes: "10AM–2PM", martes: "", miercoles: "10AM–2PM", jueves: "8AM–2PM", viernes: "", sabado: "" },
      { nombre: "Dr. De los Santos", consultorio: "Edif. FFTP #303", telefono: "Ext. 610-611",
        lunes: "9AM–1PM", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" },
      { nombre: "Dra. Anly Leyba", consultorio: "Edif. FFTP #507", telefono: "Ext. 614-615",
        lunes: "8AM–12PM", martes: "8AM–12PM", miercoles: "", jueves: "", viernes: "", sabado: "" }
    ]
  },
  "urologia-pediatrica": {
    nombre: "Urología Pediátrica",
    desc: "Enfermedades urológicas en niños.",
    doctores: [
      { nombre: "Dra. Glennys Frías", consultorio: "Freddy Beras #22", telefono: "Ext. 602-603",
        lunes: "9AM–12PM", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" }
    ]
  }
};