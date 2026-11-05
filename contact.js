(function () {
  const contact = {
    email: "info@primestar.pt",
    cellphone: "+351 913 569 125",
  };

  const emailLink = document.getElementById("contactEmailLink");
  const phoneLink = document.getElementById("contactPhoneLink");

  emailLink.href = `mailto:${contact.email}`;
  emailLink.textContent = contact.email;
  phoneLink.href = `tel:${contact.cellphone.replace(/[^\d+]/g, "")}`;
  phoneLink.textContent = `${contact.cellphone}*`;

  const whatsappLink = document.getElementById("contactWhatsAppLink");
  whatsappLink.href = `https://wa.me/${contact.cellphone.replace(/\D/g, "")}`;

  const instagramLink = document.querySelector(".footer-instagram");

  if (instagramLink) {
    instagramLink.setAttribute("aria-label", "Instagram da PrimeStar");
    instagramLink.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>`;
  }

  document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const value = (id) => document.getElementById(id).value;
    const body = [
      `Nome: ${value("contactName")}`,
      `Email: ${value("contactEmail")}`,
      `Telefone: ${value("contactPhone")}`,
      "",
      value("contactMessage"),
    ].join("\n");
    const query = new URLSearchParams({
      subject: "Pedido de contacto — Website PrimeStar",
      body,
    });

    window.location.href = `mailto:${contact.email}?${query}`;
  });
})();
