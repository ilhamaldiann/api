const express = require('express');
const tf = require('@tensorflow/tfjs'); // Ubah sesuai dengan nama pustaka TensorFlow.js yang digunakan

const app = express();
const port = 3000; 

// Daftar model TFLite
const modelList = [
  { name: 'hum_avg', path: '/model/hum_avg/hum_avg.tflite' },
  { name: 'rain_rate', path: '/model/rain_rate/rain_rate.tflite' },
  { name: 'temp_max', path: '/model/temp_max/temp_max.tflite' },
  { name: 'temp_min', path: '/model/temp_min/temp_min.tflite'},
  { name: 'temp_avg', path: '/model/temp_avg/model.json'},
  { name: 'windspeed', path: '/model/windspeed_avg/windspeed_avg.tflite'}
];

// Definisikan endpoint API untuk mendapatkan daftar model TFLite
app.get('/models', (req, res) => {
  // Buat daftar model yang akan dikirimkan sebagai respons
  const models = modelList.map((model) => ({
    name: model.name,
    path: model.path,
  }));

  // Kirimkan daftar model sebagai respons
  res.json({ models });
});

// Definisikan endpoint API untuk mendapatkan model TFLite berdasarkan nama
app.get('/model/:name', (req, res) => {
  const modelName = req.params.name;

  // Cari model berdasarkan nama
  const model = modelList.find((m) => m.name === modelName);

  if (model) {
    // Baca model TFLite dari penyimpanan
    const tfliteModel = readModelFromStorage(model.path);

    // Kirimkan model TFLite sebagai respons
    res.json({ model: tfliteModel });
  } else {
    // Jika model tidak ditemukan, kirimkan respons model tidak ditemukan
    res.status(404).json({ error: 'Model not found' });
  }
});

// Fungsi untuk membaca model TFLite dari penyimpanan
function readModelFromStorage(modelPath) {
  // Implementasikan logika untuk membaca model TFLite dari penyimpanan yang digunakan
  // Misalnya, menggunakan Firebase Storage atau Cloud Storage API

  // Contoh: Membaca model TFLite dari file lokal
  const tfliteModel = tf.loadTFLiteModel(modelPath);

  return tfliteModel;
}

app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});
