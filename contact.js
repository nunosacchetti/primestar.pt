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
