/* empty css                                               */
import { a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DA6BkT0p.mjs';
import 'kleur/colors';
import { $ as $$HeroSeccionCountry, a as $$FeatureCountry } from '../chunks/HeroSeccionCountry_iRFmymim.mjs';
import { $ as $$FormularioContacto } from '../chunks/FormularioContacto_BXCuHMfB.mjs';
import { $ as $$Layout } from '../chunks/Layout_BG82bTLs.mjs';
export { renderers } from '../renderers.mjs';

const $$Estudiaennuevazelanda = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Cursos de ingl\xE9s en Nueva Zelanda | Aseroria profesional y garantizada", "url_canonical": "https://latamstudyvisa.com/estudiaennuevazelanda/", "og_title": "Cursos de ingl\xE9s en Nueva Zelanda | Aseroria profesional y garantizada", "og_descrip": "\xBFQuieres estudiar y trabajar en Nueva Zelanda? | \xA1Estamos listos para ayudarte a conseguirlo!", "og_img": "/opengraph/Estudia-en-nueva-zelanda.jpg", "og_img_alt": "Estudia en Nueva Zelanda con Latam Study Visa" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="bg-white"> ${renderComponent($$result2, "HeroSeccionCountry", $$HeroSeccionCountry, { "src": "/nuevazelandastudy.jpg", "title": "Nueva Zelanda", "sub": "Donde la Educaci\xF3n se Fusiona con la Naturaleza" })} ${renderComponent($$result2, "FeatureCountry", $$FeatureCountry, { "title": "Nueva Zelanda", ",": true, "sub": "Estudiar idiomas en Nueva Zelanda es una experiencia fascinante. Aqu\xED tienes tres puntos destacados:", ",": true, "sTitle1": "Calidad educativa", ",": true, "text1": "Nueva Zelanda ofrece una educaci\xF3n de alta calidad. Escuelas como New Zealand Language Centre1 brindan una variedad de cursos, desde ingl\xE9s general hasta preparaci\xF3n para ex\xE1menes como Cambridge y IELTS. Adem\xE1s, la metodolog\xEDa de ense\xF1anza es efectiva y adaptada a diferentes niveles.", ",": true, "sTitle2": "Entorno natural espectacular", ",": true, "text2": "Imagina estudiar rodeado de paisajes impresionantes: monta\xF1as, playas, lagos y bosques. Nueva Zelanda es un para\xEDso para los amantes de la naturaleza. Puedes combinar tus clases con actividades al aire libre y explorar la belleza kiwi.", ",": true, "sTitle3": "Cultura diversa y acogedora", ",": true, "text3": "Los neozelandeses, conocidos como \u201Ckiwis\u201D, son amigables y hospitalarios. Tendr\xE1s la oportunidad de sumergirte en su cultura, aprender sobre la herencia maor\xED y participar en festivales y eventos locales." })} ${renderComponent($$result2, "FormularioContacto", $$FormularioContacto, { "title": "\xBFQuieres Estudiar y trabajar en Nueva Zelanda?" })} </main> ` })}`;
}, "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/estudiaennuevazelanda.astro", void 0);

const $$file = "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/estudiaennuevazelanda.astro";
const $$url = "/estudiaennuevazelanda";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Estudiaennuevazelanda,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
