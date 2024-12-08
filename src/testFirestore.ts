import db from "./config/firestore";

const testFirestore = async () => {
  try {
    const docRef = db.collection("test3").doc("example3");
    await docRef.set({ message: "Hello Firestore!" });
    console.log("Documento creado correctamente.");
  } catch (error) {
    console.error("Error al conectar con Firestore:", error);
  }
};

testFirestore();
