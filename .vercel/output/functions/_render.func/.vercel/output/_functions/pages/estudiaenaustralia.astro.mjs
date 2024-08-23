/* empty css                                               */
import { a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DA6BkT0p.mjs';
import 'kleur/colors';
import { $ as $$HeroSeccionCountry, a as $$FeatureCountry } from '../chunks/HeroSeccionCountry_iRFmymim.mjs';
import { $ as $$FormularioContacto } from '../chunks/FormularioContacto_BXCuHMfB.mjs';
import { $ as $$Layout } from '../chunks/Layout_BG82bTLs.mjs';
export { renderers } from '../renderers.mjs';

const $$Estudiaenaustralia = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Cursos de ingl\xE9s en Australia | Aseroria profesional y garantizada", "url_canonical": "https://latamstudyvisa.com/estudiaenaustralia/", "og_title": "Cursos de ingl\xE9s en Australia | Aseroria profesional y garantizada", "og_descrip": "\xBFQuieres estudiar y trabajar en Australia? | \xA1Estamos listos para ayudarte a conseguirlo!", "og_img": "/opengraph/Estudia-y-trebaja-en-australia.jpg", "og_img_alt": "Mapa de Australia digital, con un boton para conocer los requisitos para estudiar en australia" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="bg-white"> ${renderComponent($$result2, "HeroSeccionCountry", $$HeroSeccionCountry, { "src": "/australiastudy.jpg", "title": "Australia", "sub": "Donde el Ingl\xE9s se Fusiona con Aventuras Inolvidables" })} ${renderComponent($$result2, "FeatureCountry", $$FeatureCountry, { "title": "Australia", ",": true, "sub": "Estudiar idiomas en Australia es una experiencia fascinante. Aqu\xED tienes tres puntos destacados:", ",": true, "sTitle1": "Inmersi\xF3n ling\xFC\xEDstica y cultural", ",": true, "text1": "En Australia, no solo aprender\xE1s ingl\xE9s, sino que tambi\xE9n vivir\xE1s una inmersi\xF3n completa en la cultura australiana. Desde las playas de Gold Coast hasta las ciudades vibrantes como S\xEDdney y Melbourne, tendr\xE1s la oportunidad de practicar el idioma en situaciones reales.", ",": true, "sTitle2": "Variedad de cursos", ",": true, "text2": "Australia ofrece una amplia gama de cursos de ingl\xE9s para satisfacer diferentes necesidades. Puedes elegir entre: mejorar tus habilidades comunicativas diarias, prep\xE1rate para estudiar en instituciones australianas. Enfocarte en contextos profesionales o acad\xE9micos espec\xEDficos y prepararte para ex\xE1menes como el IELTS, TOEFL, TOEIC u otros.", ",": true, "sTitle3": "Visa de estudiante y aventura", ",": true, "text3": "Australia permite trabajar mientras estudias, lo que brinda una experiencia completa. Adem\xE1s, su entorno natural espectacular te invita a explorar y vivir aventuras \xFAnicas." })} ${renderComponent($$result2, "FormularioContacto", $$FormularioContacto, { "title": "\xBFQuieres Estudiar y trabajar en Australia?" })} </main> ` })}`;
}, "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/estudiaenaustralia.astro", void 0);

const $$file = "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/estudiaenaustralia.astro";
const $$url = "/estudiaenaustralia";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Estudiaenaustralia,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
