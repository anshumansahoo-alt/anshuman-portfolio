alert("JavaScript connected successfully!");
console.log("script.js connected");

// Only one submit handler
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault(); // stop form from reloading page

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });

    const text = await res.text(); // server sends plain text
    alert(text); // ✅ Contact message saved!
    document.getElementById("contactForm").reset(); // reset form

  } catch (err) {
    console.error(err);
    alert("❌ Error connecting to server");
  }
});
