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

  const form = document.getElementById("contactForm");
  const notice = document.getElementById("contactNotice");
  const submit = form.querySelector('button[type="submit"]');
  const endpoint = "https://script.google.com/macros/s/AKfycbzPfWlyb9cIrK7qyr55Z0qDND2wJP-l4K5efMvwjwH3iUaB2ifyxDCprRFbPRqjIUCFjg/exec";

  async function sendContactRequest(event) {
    event.preventDefault();
    if (submit.disabled) return;

    submit.disabled = true;
    notice.textContent = "A enviar o seu pedido…";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new URLSearchParams(new FormData(form)),
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok || (await response.json()).ok !== true) {
        throw new Error("O serviço não confirmou o envio.");
      }
      form.reset();
      notice.textContent = "Pedido enviado. Obrigado pelo seu contacto.";
    } catch {
      notice.textContent = "Não foi possível confirmar o envio. Pode contactar-nos em " + contact.email + ".";
    } finally {
      submit.disabled = false;
    }
  }

  form.addEventListener("submit", sendContactRequest);
})();
