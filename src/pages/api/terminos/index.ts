import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import fs from 'fs';
import Papa from 'papaparse';

const file = fs.readFileSync('./public/base-de-datos.csv', 'utf8');
const data = Papa.parse(file, {
    header: true,
    dynamicTyping: true
}).data;


export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  if (!formData) {
    console.error("No se ha enviado ningún formulario");
    return new Response("Formulario Basio", {
        status: 400,
    });}
    console.error("Formulario enviado con exito" + formData.values);
    const palabras: string[] = [formData?.get("palabra1")?.toString() ?? "", formData?.get("palabra2")?.toString() ?? ""];
    const id = formData.get("id")?.toString();
    const nombre = formData.get("nombre")?.toString();
    const definicion = formData.get("definicion")?.toString();
    const area = formData.get("area")?.toString();
    const etimologia = formData.get("etimologia")?.toString();
    const fecha = formData.get("fecha")?.toString();

    if (!palabras || !id || !nombre || !definicion || !area || !etimologia || !fecha) {
        console.log(palabras, id, nombre, definicion, area, etimologia, fecha  )
        return new Response("Faltan campos obligatorios", {
          status: 400,
        });
      }

  try {
    const db = getFirestore(app);
    const terminosRef = db.collection("terminos");
    console.log(terminosRef)
/*     const data ={
      nombre:nombre,
      definicion:definicion,
      area:area,
      etimologia:etimologia,
      fecha:fecha,
      palabras:palabras
    } */
   data.forEach((row, index)=>{
    db.collection('terminos').doc(String(index)).set(row)
        .then(() => {
            console.log(`Documento ${index} agregado exitosamente.`);
        })
        .catch((error) => {
            console.error(`Error agregando documento ${index}: `, error);
        });
   })
    await db.collection('terminos').doc(id).set(data);
  } catch (error) {
    return new Response("Algo salió mal", {
      status: 500,
    });
  }
  return redirect("/dashboard");
};