// src/services/api.js

export async function submitFormData(formData) {
    const response = await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error submitting data");
    }
    return data;
  }