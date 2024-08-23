/* empty css                                               */
import { a as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent } from '../chunks/astro/server_DA6BkT0p.mjs';
import 'kleur/colors';
import { $ as $$HeroCurse } from '../chunks/HeroCurse_VeE0Bba5.mjs';
import { $ as $$FormularioContacto } from '../chunks/FormularioContacto_BXCuHMfB.mjs';
import { $ as $$Layout } from '../chunks/Layout_BG82bTLs.mjs';
import { $ as $$ListElement } from '../chunks/ListElement_BKx6ARTR.mjs';
/* empty css                                                      */
import { $ as $$WhyLarge } from '../chunks/WhyLarge_KHA_VFkr.mjs';
export { renderers } from '../renderers.mjs';

const $$MaestriaSeccion = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="bg-lime-900 text-white" data-astro-cid-esuauqqs> <div class="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16" data-astro-cid-esuauqqs> <div class="max-w-xl mx-auto" data-astro-cid-esuauqqs> <h2 class="text-3xl font-bold sm:text-4xl text-pretty tracking-wider" data-astro-cid-esuauqqs>
¿Beneficios de cursar una maestría en el extranjero?
</h2> <p class="mt-4 text-gray-50 text-center text-balance" data-astro-cid-esuauqqs>
A diferencia de la visa de estudiante para cursos de inglés o
                VET (Cursos de Educación y Capacitación Vocacional), obtendrás
                beneficios adicionales. Entre ellos:
</p> </div> <div class="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3" data-astro-cid-esuauqqs> ${renderComponent($$result, "ListElement", $$ListElement, { "title": "Educaci\xF3n gratuita para los hijos incluidos en la visa.", "data-astro-cid-esuauqqs": true })} ${renderComponent($$result, "ListElement", $$ListElement, { "title": "Posibilidad de que tu pareja trabaje a tiempo completo.", "data-astro-cid-esuauqqs": true })} ${renderComponent($$result, "ListElement", $$ListElement, { "title": "Acceso a mejores oportunidades laborales.", "data-astro-cid-esuauqqs": true })} </div> </div> </section> `;
}, "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/components/MaestriaSeccion.astro", void 0);

const $$MaestriasEnElExtranjero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Estudia y trabaja en Irlanda desde Argentina" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="bg-white"> ${renderComponent($$result2, "HeroCurse", $$HeroCurse, { "src": "/maestrias-en-el-extranjero.jpg", "title": "Maestr\xEDas en el extranjero", "sub": "Las maestr\xEDas en Australia y Nueva Zelanda te abrir\xE1n las puertas a un sinf\xEDn de oportunidades." })} <div class="mt-16">${renderComponent($$result2, "MaestriaSeccion", $$MaestriaSeccion, {})}</div> ${renderComponent($$result2, "WhyLarge", $$WhyLarge, { "title": "Requisitos para Aplicar a una Maestr\xEDa." }, { "default": ($$result3) => renderTemplate` <ul class="text-center flex flex-col gap-8 text-xl mt-8"> <li>Poseer un título académico en alguna carrera.</li> <li>
Tener el nivel de inglés necesario para asistir a las clases
<strong>(el nivel requerido varía en cada país).</strong> </li> <li>
Obtener la admisión y aceptación en el programa de maestría
                    de tu elección.
</li> <li>Cumplir con los requisitos de algún proceso migratorio.</li> </ul> ` })} ${renderComponent($$result2, "WhyLarge", $$WhyLarge, { "title": " \xBFCu\xE1ndo Puedo Comenzar una Maestr\xEDa?" }, { "default": ($$result3) => renderTemplate` <ul class="text-center flex flex-col gap-8 text-xl mt-8"> <li>
Las fechas de inicio de las maestrías varían según la
                    institución. Debes inscribirte y aplicar a la visa de
                    estudiante. Una vez aprobada la visa, podrás comenzar tu
                    aventura académica en las fechas disponibles de cada
                    institución.
</li> </ul> ` })} ${renderComponent($$result2, "FormularioContacto", $$FormularioContacto, { "title": "\xBFQuieres Realizar Una Maestr\xEDa En El Extranjero?" })} </main> ` })}`;
}, "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/maestrias-en-el-extranjero.astro", void 0);

const $$file = "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/maestrias-en-el-extranjero.astro";
const $$url = "/maestrias-en-el-extranjero";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$MaestriasEnElExtranjero,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
