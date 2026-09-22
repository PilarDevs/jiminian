/**
 * FOTOS DE MÉDICOS — Clínica Cruz Jiminián
 * Aquí puedes asignar la fotografía de cada médico pegando un enlace (URL) de imagen.
 *
 * Ejemplo:
 *   "Dr. Pedro Santana": "https://ejemplo.com/foto.jpg"
 *
 * Si el valor está vacío ("") se mostrará el retrato genérico de la clínica.
 * Los nombres deben coincidir EXACTAMENTE con los del directorio.
 */

const DOCTOR_FOTOS = {
  // — Alergología —
  "Dr. Jin Woo": "",
  // — Anestesiología —
  "Dr. Máximo Martínez": "",
  "Dra. Medina Cancún": "",
  "Dra. Maytex Calderón": "",
  // — Anestesiología Pediátrica —
  "Dr. Carmona": "",
  // — Cardiología —
  "Dr. Franklin Brito": "",
  "Dra. Cristina Rodríguez": "",
  "Dra. Lourdes Carvajal": "",
  "Dra. María Medina": "",
  "Dr. Braulio Mateo": "",
  "Dra. Michelle Lagrange": "",
  // — Cardiología Pediátrica —
  "Dra. Yotaimy López": "",
  "Dra. Saby Rodríguez": "",
  "Dr. Kelvin Espinal": "",
  // — Cirugía Cardiovascular —
  "Dr. Macranchof Polanco": "",
  "Dra. Glenny Reyes": "",
  "Dr. Miguel Matos": "",
  // — Cirugía General —
  "Dr. Bolivar Alcántara": "",
  "Dr. Samuel Danier": "",
  "Dr. William Suazo": "",
  "Dra. Maira De Jesús": "",
  "Dra. Yojanny Familia": "",
  "Dra. Maribel Gutiérrez": "",
  "Dra. Deisy Guzmán": "",
  "Dr. Francis Javier": "",
  // — Cirugía Vascular —
  "Dr. Lenin Roa": "",
  "Dr. Sihh Cheng": "",
  "Dr. William Matías": "",
  // — Cirugía Pediátrica —
  "Dr. Pedro Santana": "",
  "Dr. Leivin Ramírez": "",
  "Dr. Oscar Sánchez": "",
  // — Cirugía Coloproctológica —
  "Dra. Alba Rosario": "",
  // — Cirugía Torácica —
  "Dra. Irma Toribio": "",
  "Dr. Yankel Montero": "",
  // — Cirugía Hepatobiliar —
  "Dr. Peña Suriel": "",
  // — Cirugía de Mano —
  "Dra. Karina Núñez": "",
  // — Dermatología —
  "Dr. Cornelio Ureña": "",
  "Dra. Dalva Hernández": "",
  "Dra. Jatna Vidal": "",
  "Dra. Michelle Polonio": "",
  // — Diabetología —
  "Dra. Encarnación": "",
  "Dra. Massiel O. Mancebo": "",
  "Dra. Rocío Gómez": "",
  // — Endocrinología —
  "Dra. Rosa Calderón": "",
  "Dra. Elizabeth Ortiz": "",
  // — Endocrinología Pediátrica —
  "Dra. Mercedes Ramos": "",
  // — Gastroenterología —
  "Dr. Kyoko Mukai": "",
  "Dra. Johanel Wanderlinder": "",
  "Dr. Roberto del Orbe": "",
  "Dra. Yuberkis Colome": "",
  "Dr. Walfan Marte": "",
  "Dra. Sugeidy Gómez": "",
  "Dra. Cruz Coste": "",
  // — Gastroenterología Pediátrica —
  "Dr. Pavel Graciano": "",
  // — Geriatría —
  "Dra. Rosmery Rodríguez": "",
  // — Ginecología —
  "Dra. Ingrid Rodríguez": "",
  "Dr. Mauricio Jiménez": "",
  "Dra. Angela Díaz": "",
  "Dr. Víctor Rosario": "",
  "Dra. María Peña": "",
  "Dra. Rita Terrero": "",
  "Dr. Olger Cott": "",
  "Dr. Manuel Segura": "",
  "Dr. Hector Trinidad": "",
  "Dra. Rosángel García": "",
  "Dra. Melina Moreta Matos": "",
  "Dr. Gustavo De los Santos": "",
  "Dra. Milagros Ulloa": "",
  // — Ginecología Materno Fetal —
  "Dra. Yuleiki Fernández": "",
  // — Ginecología – Reproducción Asistida —
  "Dra. Charlotte Pilier": "",
  // — Ginecología Endocrinológica —
  "Dra. María Deaza": "",
  "Dra. Adriana Mateo": "",
  // — Ginecología Oncológica —
  "Dr. Luis Ramírez": "",
  "Dra. Carmen Roa": "",
  // — Hematología —
  "Dra. Del Carmen Revi": "",
  "Dra. Fátima Bhatti": "",
  // — Infectología —
  "Dra. María del Pilar": "",
  "Dra. Martha Cruz": "",
  // — Infectología Pediátrica —
  "Dra. Wendy Vásquez": "",
  // — Medicina Familiar —
  "Dra. Pamela Féliz": "",
  // — Medicina General —
  "Dr. Cruz Jiminián": "",
  "Dr. Nereida de León": "",
  "Dra. Viviana Reyes": "",
  "Dra. Elizabeth Mena": "",
  "Dr. Mariano Montero": "",
  "Dra. Maribel Fernández": "",
  "Dr. Franklin Cruz": "",
  "Dra. Rosmery Núñez": "",
  "Dra. Dacelis Aquino": "",
  "Dr. Cabrera": "",
  "Dra. Antonia Florentino": "",
  // — Nefrología —
  "Dr. Rafael Robles": "",
  "Dra. Emely Silverio": "",
  "Dra. Adelaida Martínez": "",
  "Dr. Diogenes Ledesma": "",
  // — Nefrología Pediátrica —
  "Dra. Celia González": "",
  // — Neumología —
  "Dra. Anabell Rojas": "",
  "Dr. Franklyn Barrera": "",
  "Dr. Miguel Martínez": "",
  "Dra. Altagracia Méndez": "",
  // — Neumología Pediátrica —
  "Dra. Glenis José": "",
  "Dra. Matos": "",
  // — Neurocirugía —
  "Dra. Nujerling Vargas": "",
  "Dra. Carmen Damazo": "",
  "Dr. William Cueto": "",
  "Dr. José Luis Novas": "",
  "Dr. Jose Isidro Ruiz": "",
  // — Neurocirugía Pediátrica —
  "Dra. Zorinel Adames": "",
  // — Neurología —
  "Dr.Enoch De los Ríos": "",
  "Dra. Ralussen Jiménez": "",
  "Dra. Abigail Jean": "",
  // — Neurología Pediátrica —
  "Dra. Crismarlin Valerio": "",
  // — Nutrición —
  "Dr. Ramon Alcequiez": "",
  "Dra. Emely Matos": "",
  // — Odontología —
  "Dr. Tomy": "",
  "Dr. Francisco Ortega": "",
  "Dra. Marisol Drullar": "",
  // — Oftalmología —
  "Dra. Alida Sánchez": "",
  // — Ortopedia —
  "Dr. Benjamín Estévez": "",
  "Dr. Yeffry Torres": "",
  "Dr. Jefferson Gonzalez": "",
  "Dr. Gerson Cuevas": "",
  "Dr. Stalin Echavarría": "",
  "Dr. Gregoris Méndez": "",
  "Dr. Israel de la Cruz": "",
  "Dr. Yankel Montero": "",
  "Dr. Figuereo Donato": "",
  "Dr. José Gabriel González": "",
  "Dr. Emerson Rodríguez Molina": "",
  "Dr. Fernando Pujols": "",
  "Dr. José Alberto Vargas": "",
  // — Otorrinolaringología —
  "Dr. Orlando Morato": "",
  "Dra. Esther Valdera": "",
  "Dra. Brenda Díaz": "",
  "Dra. Laura Garris": "",
  "Dr. Jose Barreto": "",
  // — Pediatría —
  "Dr. Pelagio Cruz": "",
  "Dra. Jennifer Castillo": "",
  "Dra. Montes de Oca": "",
  "Dra. Molly Espinosa": "",
  "Dra. Fany Martínez": "",
  // — Psicología —
  "Lic. Anyely Camacho": "",
  "Lic. Iris Marte Rodríguez": "",
  "Lic. Widalys Arvelo": "",
  "Lic. María Yesenia Reynoso": "",
  // — Psiquiatría —
  "Dra. Alma Brito": "",
  "Dra. Cristina Cruz": "",
  "Dra. Katia Perdomo": "",
  // — Rehabilitación —
  "Centro Dra. Rosa Lockuard": "",
  // — Reumatología —
  "Dra. Rorayma Jiménez": "",
  // — Urología —
  "Dr. José Paulino": "",
  "Dr. Nahum Toribio": "",
  "Dr. Luis Alejandro": "",
  "Dr. Raymundo Cruz": "",
  "Dr. Juan Cabrera": "",
  "Dr. De los Santos": "",
  "Dra. Anly Leyba": "",
  // — Urología Pediátrica —
  "Dra. Glennys Frías": ""
};