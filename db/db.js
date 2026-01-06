const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
  });
