/* empty css                                               */
import { a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DA6BkT0p.mjs';
import 'kleur/colors';
import { $ as $$HeroSeccionCountry, a as $$FeatureCountry } from '../chunks/HeroSeccionCountry_iRFmymim.mjs';
import { $ as $$FormularioContacto } from '../chunks/FormularioContacto_BXCuHMfB.mjs';
import { $ as $$Layout } from '../chunks/Layout_BG82bTLs.mjs';
export { renderers } from '../renderers.mjs';

const $$Estudiaenirlanda = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Cursos de ingl\xE9s en Irlanda | Aseroria profesional y garantizada", "url_canonical": "https://latamstudyvisa.com/estudiaenirlanda/", "og_title": "Cursos de ingl\xE9s en Irlanda | Aseroria profesional y garantizada", "og_descrip": "\xBFQuieres estudiar y trabajar en Irlanda? | \xA1Estamos listos para ayudarte a conseguirlo!", "og_img": "/opengraph/Estudia-en-irlanda.jpg", "og_img_alt": "Estudia en Irlanda con Latam Study Visa" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="bg-white"> ${renderComponent($$result2, "HeroSeccionCountry", $$HeroSeccionCountry, { "src": "/irlandastudy.jpg", "title": "Irlanda", "sub": "Descubre la Magia del Ingl\xE9s en Irlanda" })} ${renderComponent($$result2, "FeatureCountry", $$FeatureCountry, { "title": "Irland", ",": true, "sub": "Estudiar idiomas en Irlanda es una experiencia enriquecedora. Aqu\xED tienes tres puntos destacados:", ",": true, "sTitle1": "Inmersi\xF3n ling\xFC\xEDstica", ",": true, "text1": "En Irlanda, estar\xE1s rodeado de hablantes nativos de ingl\xE9s. Esto te brinda la oportunidad de practicar constantemente y mejorar tus habilidades ling\xFC\xEDsticas. Adem\xE1s, podr\xE1s aprender expresiones y modismos locales que no encontrar\xEDas en un aula tradicional.", ",": true, "sTitle2": "Calidad de vida", ",": true, "text2": "Irlanda es conocida por su belleza natural, desde los acantilados de Moher hasta los lagos de Killarney. Adem\xE1s, la gente es amigable y acogedora. Puedes disfrutar de actividades al aire libre, como senderismo, ciclismo y exploraci\xF3n de castillos hist\xF3ricos.", ",": true, "sTitle3": "Educaci\xF3n de calidad", ",": true, "text3": "Los institutos de idiomas en Irlanda ofrecen programas de alta calidad. Adem\xE1s de las escuelas que mencion\xE9 previamente, tambi\xE9n puedes considerar el Dublin City University Language Services y el Galway Cultural Institute. Estas instituciones se centran en la ense\xF1anza efectiva del ingl\xE9s y ofrecen una variedad de cursos adaptados a diferentes niveles y necesidades." })} ${renderComponent($$result2, "FormularioContacto", $$FormularioContacto, { "title": "\xBFQuieres Estudiar y trabajar en Irlanda?" })} </main> ` })}`;
}, "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/estudiaenirlanda.astro", void 0);

const $$file = "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/estudiaenirlanda.astro";
const $$url = "/estudiaenirlanda";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Estudiaenirlanda,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
