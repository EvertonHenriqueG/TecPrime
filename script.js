document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-servico");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navbar = document.querySelector(".navbar");
  const telefoneInput = document.getElementById("telefone");

  const numeroWhatsApp = "5581989423690";

  // MENU MOBILE: abre/fecha
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const isOpen = navLinks.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Fecha menu ao clicar em link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Fecha menu ao clicar fora
  document.addEventListener("click", (event) => {
    const clickedOutside =
      !navLinks.contains(event.target) && !menuToggle.contains(event.target);

    if (clickedOutside) {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Sombra na navbar ao rolar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  });

  // Máscara simples no telefone: (xx) xxxxx-xxxx
  telefoneInput.addEventListener("input", () => {
    let v = telefoneInput.value;
    v = v.replace(/\D/g, "");
    v = v.slice(0, 11);

    if (v.length >= 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    if (v.length >= 10) v = `${v.slice(0, 10)}-${v.slice(10)}`;

    telefoneInput.value = v;
  });

  // Animação "reveal" ao aparecer na rolagem
  const reveals = document.querySelectorAll(".section, .card, footer");
  reveals.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => io.observe(el));

  // Envio do formulário pro WhatsApp
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const servico = document.getElementById("servico").value.trim();
    const detalhes = document.getElementById("detalhes").value.trim();

    if (!nome || !telefone || !servico) {
      alert("Por favor, preencha Nome, Telefone e selecione um serviço.");
      return;
    }

    const mensagem =
      `Olá, meu nome é *${nome}*.\n` +
      `📱 Telefone: ${telefone}\n` +
      `📌 Serviço desejado: ${servico}\n` +
      `📝 Detalhes: ${detalhes || "Não informados"}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  });
});
