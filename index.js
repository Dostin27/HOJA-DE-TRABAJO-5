const express = require('express');
const app = express();
const port = 3000;
// 1. Definición de datos
let ciudadanos = [];

app.use(express.json());
// 2. Creación de Ciudadanos
app.post('/api/registro/ciudadanos', (req, res) => {
  var { dpi, nombres, apellidos, fechaNacimiento, estadoCivil } = req.body;

  ciudadanos.push({
    dpi,
    nombres,
    apellidos,
    fechaNacimiento,
    estadoCivil
  });

  res.json({ respuesta: 'Registro con éxito' });
});

// 3. Actualización de Ciudadanos
app.patch('/api/registro/ciudadanos/:dpi', (req, res) => {
  var dpiBuscar = req.params.dpi;
  var { nombres, apellidos, fechaNacimiento, estadoCivil } = req.body;

  const ciudadanoIndex = ciudadanos.findIndex(ciudadano => ciudadano.dpi == dpiBuscar);

  if (ciudadanoIndex === -1) {
    return res.json({ error: 'No se encontró el ciudadano' });
  }

  if (nombres) ciudadanos[ciudadanoIndex].nombres = nombres;
  if (apellidos) ciudadanos[ciudadanoIndex].apellidos = apellidos;
  if (fechaNacimiento) ciudadanos[ciudadanoIndex].fechaNacimiento = fechaNacimiento;
  if (estadoCivil) ciudadanos[ciudadanoIndex].estadoCivil = estadoCivil;

  res.json({ respuesta: 'Cambios realizados con éxito' });
});

// 4. Eliminar Ciudadano

app.delete('/api/registro/ciudadanos/:dpi', (req, res) => {
  var dpiBuscar = req.params.dpi;

  const ciudadanoIndex = ciudadanos.findIndex(ciudadano => ciudadano.dpi == dpiBuscar);

  if (ciudadanoIndex === -1) {
    return res.json({ error: 'No se encontró el ciudadano' });
  }

  ciudadanos.splice(ciudadanoIndex, 1);

  res.json({ respuesta: 'Ciudadano eliminado con éxito' });
});

// 5. Búsqueda de Ciudadano por DPI
app.get('/api/registro/ciudadanos/:dpi', (req, res) => {
  var dpiBuscar = req.params.dpi;
  var encontrado = [];
  ciudadanos.forEach((ciudadanos) => {
    if (ciudadanos.dpi == dpiBuscar) {
      encontrado.push(ciudadanos);
    }
  });

  if (encontrado.length === 0) {
    res.json({ error: 'No se encontró el ciudadano' });
  }

  res.json(encontrado);
});


// 6. Listado completo de Ciudadanos
app.get('/api/registro/ciudadanos', (req, res) => {
  res.json(ciudadanos);
});

app.listen(port, () => {
  console.log(`Se está ejecutando en localhost, puerto: ${port}`);
});