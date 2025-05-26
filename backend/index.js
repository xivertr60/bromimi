const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('./models/User');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// --- Configuración SMTP ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER, // alejandro_ballesteros_ruiz@alumni.cristoreyva.com
    pass: process.env.SMTP_PASS,
  },
});

// --- Registro ---
app.post('/api/register', async (req, res) => {
  const { email, password, captchaToken } = req.body;
  // Validar CAPTCHA (Google reCAPTCHA)
  const captchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`, { method: 'post' });
  const captchaData = await captchaRes.json();
  if (!captchaData.success) return res.status(400).json({ message: 'Captcha inválido' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Usuario ya registrado' });

  const hash = await bcrypt.hash(password, 10);
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const user = new User({ email, password: hash, verified: false, verificationCode: code });
  await user.save();

  // Enviar correo con el código
  await transporter.sendMail({
    from: '"Alejandro Ballesteros" <alejandro_ballesteros_ruiz@alumni.cristoreyva.com>',
    to: email,
    subject: 'Código de verificación',
    text: `Tu código de verificación es: ${code}`,
  });

  res.json({ ok: true });
});

// --- Verificar código recibido ---
app.post('/api/verify', async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  if (user.verified) return res.json({ ok: true, verified: true });
  if (user.verificationCode !== code) return res.status(400).json({ message: 'Código incorrecto' });

  user.verified = true;
  await user.save();
  res.json({ ok: true, verified: true });
});

// --- Login ---
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  if (!user.verified) return res.status(403).json({ message: 'Usuario no verificado' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Contraseña incorrecta' });

  res.json({ ok: true, email: user.email });
});

mongoose.connect(process.env.MONGO_URI, () => {
  console.log('Conectado a MongoDB');
  app.listen(4000, () => console.log('Servidor en puerto 4000'));
});
