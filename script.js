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

// ---------------------------------------------------------------
// Formulario de contacto con Web3Forms
// 1) Entrá a https://web3forms.com, poné tu email y copiá la "Access Key"
//    que te llega por correo.
// 2) Pegala acá abajo reemplazando el texto de ejemplo.
// ---------------------------------------------------------------
const ACCESS_KEY = "fa_a110f3d8ba500d0423df35c2195c230f0d5403f7676769989d5a94b5b714f930";

const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");
const submitBtn = form.querySelector("button[type='submit']");

form.addEventListener("submit", async (e) => {
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

  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";
  msg.textContent = "";
  msg.className = "form-msg";

  try {
    const respuesta = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `Nueva consulta: ${servicio}`,
        from_name: "Web - Estudio",
        name: nombre,
        email: email, // se usa como "responder a" para contestarle directo al cliente
        servicio: servicio,
        message: mensaje,
      }),
    });

    const datos = await respuesta.json();

    if (respuesta.ok && datos.success) {
      msg.textContent = "¡Gracias! Recibimos tu consulta y te respondemos pronto.";
      msg.className = "form-msg ok";
      form.reset();
    } else {
      throw new Error(datos.message || "Error al enviar");
    }
  } catch (error) {
    msg.textContent = "No pudimos enviar tu consulta. Probá de nuevo en unos minutos.";
    msg.className = "form-msg error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar consulta";
  }
});