import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderComponent } from './astro/server_DA6BkT0p.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://latamstudyvisa.com/");
const $$CardTravel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CardTravel;
  const { title, link, img, studies } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-center items-center max-w-1/3"> <div class="p-4 bg-white rounded-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500"> <img class="w-60 object-cover rounded-t-md"${addAttribute(img, "src")} alt="visa estudiantil en el extranjero"> <div class=""> <h3 class="text-base font-bold text-gray-800">${title}</h3> <div class="mb-2 flex justify-between"> <button class="block text-xs font-regular text-gray-800 cursor-auto">${studies} estudiantes</button> <button class="text-lg block font-semibold py-2 px-6 text-white bg-lime-950 hover:text-lime-950 hover:bg-lime-500 border-solid border-2 border-lime-900 rounded-full shadow hover:shadow-md transition duration-300 tracking-wider"><a${addAttribute(link, "href")}>Leer más...</a></button> </div> </div> </div> </div>`;
}, "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/components/CardTravel.astro", void 0);

const $$TravelsCards = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex max-md:flex-col max-w-[80%] m-auto"> <div class="flex-grow mt-10 -rotate-6"> ${renderComponent($$result, "CardTravel", $$CardTravel, { "title": "Australia", ",": true, "link": "/estudiaenaustralia", ",": true, "img": "/visaaustralia2.jpg", ",": true, "studies": "57" })} <!-- Contenido de la primera tarjeta --> </div> <div class="flex-grow rotate-3"> ${renderComponent($$result, "CardTravel", $$CardTravel, { "title": "Nueva Zelanda", ",": true, "link": "/estudiaennuevazelanda", ",": true, "img": "/visanuevazelanda.jpg", ",": true, "studies": "150" })} <!-- Contenido de la segunda tarjeta --> </div> <div class="flex-grow mt-10 rotate-6 max-md:mt-4 max-md:-rotate-6"> ${renderComponent($$result, "CardTravel", $$CardTravel, { "title": "Irlanda", ",": true, "link": "/estudiaenirlanda", ",": true, "img": "/visairlanda.jpg", ",": true, "studies": "100" })} <!-- Contenido de la tercera tarjeta --> </div> </div>`;
}, "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/components/TravelsCards.astro", void 0);

export { $$TravelsCards as $ };
