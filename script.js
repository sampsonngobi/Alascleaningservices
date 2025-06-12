// Set minimum date for booking to today

const dateInput = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);


const footerYear = document.getElementById("footer-year")
const date = new Date().getFullYear()
footerYear.innerHTML = date;

const form = document.getElementById("bookingForm");
const confirmationMessage = document.getElementById("confirmationMessage");
const compWhatsappNumber = "5561995870614"

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Simple form validation
  if (!form.checkValidity()) {
    alert("Please fill out all required fields.");
    return;
  }

  const formData = new FormData(form);
  const data = {
    date: formData.get("date"),
    time: formData.get("time"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    service: formData.get("service"),
    notes: formData.get("notes") || "",
  };

  console.log("Booking Data:", data);


  const message = `
  📅 *New Cleaning Booking Request* 📅

*Service:* ${data.service}
*Date:* ${data.date}
*Time:* ${data.time}

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
🏠 *Address:* ${data.address}

📝 *Notes:* ${data.notes}
  `;

  const encodedMessage = encodeURIComponent(message.trim());
  const whatsappURL = `https://wa.me/${compWhatsappNumber}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");


  // Show confirmation message
  confirmationMessage.style.display = "block";

  // Reset form
  form.reset();

  // Hide confirmation after a few seconds
  setTimeout(() => {
    confirmationMessage.style.display = "none";
  }, 5000);

  // Here you could add code to:
  // - Send this data to a backend API
  // - Integrate with email services or WhatsApp
  // Example: fetch("/api/booking", { method: "POST", body: JSON.stringify(data) });
});
