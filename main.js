// Animación de cambio de formulario
let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");

// Cambiar entre login y registro
function changeForm(e) {
  switchCtn.classList.add("is-gx");
  setTimeout(()=>switchCtn.classList.remove("is-gx"), 1500)
  switchCtn.classList.toggle("is-txr");
  switchCircle[0].classList.toggle("is-txr");
  switchCircle[1].classList.toggle("is-txr");
  switchC1.classList.toggle("is-hidden");
  switchC2.classList.toggle("is-hidden");
  aContainer.classList.toggle("is-txl");
  bContainer.classList.toggle("is-txl");
  bContainer.classList.toggle("is-z200");
  setTimeout(() => { renderCaptcha('register-captcha'); renderCaptcha('login-captcha'); }, 400);
}
switchBtn.forEach(btn => btn.addEventListener("click", changeForm));

// ---- CAPTCHA ----
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function generateCaptcha() {
  const a = randomInt(1, 20), b = randomInt(1, 20);
  return { question: `¿Cuánto es ${a} + ${b}?`, answer: (a + b).toString() };
}
let captchaRegister = generateCaptcha(), captchaLogin = generateCaptcha();
function renderCaptcha(id) {
  if (id === 'register-captcha') {
    captchaRegister = generateCaptcha();
    document.getElementById(id).textContent = captchaRegister.question;
  } else {
    captchaLogin = generateCaptcha();
    document.getElementById(id).textContent = captchaLogin.question;
  }
}
window.onload = function() {
  renderCaptcha('register-captcha');
  renderCaptcha('login-captcha');
};
// ---- Registro/Login LocalStorage + Verificación ----
let users = JSON.parse(localStorage.getItem('users') || '{}');
function saveUsers() { localStorage.setItem('users', JSON.stringify(users)); }
function showVerifyModal(email, code) {
  currentEmail = email; currentCode = code;
  document.getElementById('verificationCode').value = '';
  document.getElementById('verifyModal').style.display = 'block';
}
let currentEmail = "", currentCode = "";
document.getElementById('closeVerify').onclick = () => {
  document.getElementById('verifyModal').style.display = 'none';
};
window.onclick = function(event) {
  if (event.target == document.getElementById('verifyModal')) document.getElementById('verifyModal').style.display = 'none';
};
// Registro
document.getElementById('a-form').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const pass = document.getElementById('regPass').value;
  const captcha = document.getElementById('regCaptcha').value.trim();
  if (captcha !== captchaRegister.answer) { alert('CAPTCHA incorrecto'); renderCaptcha('register-captcha'); return; }
  if (users[email]) { alert('Este correo ya está registrado'); return; }
  const code = randomInt(100000, 999999).toString();
  users[email] = { name, password: pass, verified: false, code };
  saveUsers();
  setTimeout(() => {
    showVerifyModal(email, code);
    alert(`(DEMO) Código enviado a ${email}.\nEn producción aquí se enviaría el correo desde alejandro_ballesteros_ruiz@alumni.cristoreyva.com`);
  }, 500);
};
// Login
document.getElementById('b-form').onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pass = document.getElementById('loginPass').value;
  const captcha = document.getElementById('loginCaptcha').value.trim();
  if (captcha !== captchaLogin.answer) { alert('CAPTCHA incorrecto'); renderCaptcha('login-captcha'); return; }
  const user = users[email];
  if (!user) { alert('Usuario no registrado'); return; }
  if (user.password !== pass) { alert('Contraseña incorrecta'); return; }
  if (!user.verified) { showVerifyModal(email, user.code); alert('Por favor verifica tu correo'); return; }
  alert('¡Inicio de sesión exitoso!');
};
// Modal verificación
document.getElementById('verifyBtn').onclick = function() {
  const inputCode = document.getElementById('verificationCode').value.trim();
  if (inputCode === currentCode) {
    users[currentEmail].verified = true; saveUsers();
    document.getElementById('verifyModal').style.display = 'none';
    alert('¡Correo verificado exitosamente! Ya puedes iniciar sesión.');
  } else { alert('Código incorrecto'); }
};
// UX: enter para forms, reseteos
document.querySelectorAll(".submit").forEach(btn => btn.addEventListener("click", e => e.preventDefault()));
