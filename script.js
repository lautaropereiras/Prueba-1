// Menú móvil
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => menu.classList.remove("open"))
);

// Año automático en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Al tocar "Consultar" en una tarjeta, se preselecciona el servicio en el formulario
document.querySelectorAll("[data-servicio]").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("servicio").value = link.dataset.servicio;
  });
});

// Formulario de contacto
// Por ahora abre el correo del usuario con el mensaje armado (funciona sin servidor).
// Más adelante podés reemplazarlo por Formspree, EmailJS o una API propia.
const EMAIL_DESTINO = "lautaropereiras1705@gmail.com"; // <-- cambiá esto por tu email real

const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const servicio = document.getElementById("servicio").value;
  const mensaje = document.getElementById("mensaje").value.trim();

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!nombre || !mensaje || !emailValido) {
    msg.textContent = "Completá todos los campos con un email válido.";
    msg.className = "form-msg error";
    return;
  }

  const asunto = encodeURIComponent(`Consulta: ${servicio}`);
  const cuerpo = encodeURIComponent(
    `Nombre: ${nombre}\nEmail: ${email}\nServicio: ${servicio}\n\n${mensaje}`
  );

  window.location.href = `mailto:${EMAIL_DESTINO}?subject=${asunto}&body=${cuerpo}`;

  msg.textContent = "¡Gracias! Se abrió tu correo para enviar la consulta.";
  msg.className = "form-msg ok";
  form.reset();
});