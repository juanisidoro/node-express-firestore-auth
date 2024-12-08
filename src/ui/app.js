const API_BASE_URL = "http://localhost:3000/auth"; // URL del backend

// Manejar login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Login failed:", result); // Imprimir detalles del error
      throw new Error("Login failed");
    }

    // Guardar tokens y redirigir al dashboard
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
    localStorage.setItem("email", email); // Guardar email para mostrar en el dashboard
    window.location.href = "dashboard.html";
  } catch (error) {
    document.getElementById("loginError").style.display = "block";
    console.error("Error during login:", error);
  }
});

// Manejar registro
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Registration failed:", result); // Imprimir detalles del error
      throw new Error("Registration failed");
    }

    // Guardar tokens y redirigir al dashboard
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
    localStorage.setItem("email", email); // Guardar email para mostrar en el dashboard
    window.location.href = "dashboard.html";
  } catch (error) {
    document.getElementById("registerError").style.display = "block";
    console.error("Error during registration:", error);
  }
});

// Manejar dashboard
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("dashboard.html")) {
    const accessToken = localStorage.getItem("accessToken");
    const email = localStorage.getItem("email");

    if (!accessToken || !email) {
      // Mostrar contenido de "no logueado"
      document.getElementById("notLoggedInContent").style.display = "block";
      document.getElementById("loginButton").addEventListener("click", () => {
        window.location.href = "login.html";
      });
      document.getElementById("registerButton").addEventListener("click", () => {
        window.location.href = "register.html";
      });
      return;
    }

    // Mostrar contenido de "logueado"
    document.getElementById("loggedInContent").style.display = "block";
    document.getElementById("userInfo").innerHTML = `
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Access Token:</strong> ${accessToken.substring(0, 20)}...</p>
    `;

    // Botón de logout
    document.getElementById("logoutButton").addEventListener("click", () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("email");
      window.location.href = "login.html";
    });
  }
});


// Manejar logout
document.getElementById("logoutButton")?.addEventListener("click", () => {
  // Eliminar tokens y redirigir al login
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("email");
  window.location.href = "login.html";
});
