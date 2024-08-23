import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from './astro/server_DA6BkT0p.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                      */
/* empty css                         */
/* empty css                                       */

const $$Astro$1 = createAstro("https://latamstudyvisa.com/");
const $$FeatureCountry = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FeatureCountry;
  const { title, sub, sTitle1, sTitle2, sTitle3, text1, text2, text3 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="min-h-screen p-4" data-astro-cid-2jpcakol> <div class="container mx-auto pt-12 pb-20" data-astro-cid-2jpcakol> <h1 class="text-4xl font-bold text-gray-800 text-center mb-8" data-astro-cid-2jpcakol>
¿Por qué estudiar y trabajar en ${title}?
</h1> <p class="text-gray-700 text-lg text-center mb-12" data-astro-cid-2jpcakol> ${sub} </p> <div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-astro-cid-2jpcakol> <div class="bg-white rounded-lg shadow-lg p-8" data-astro-cid-2jpcakol> <h2 class="text-xl font-bold text-gray-800 mb-4 tracking-wider" data-astro-cid-2jpcakol> ${sTitle1} </h2> <p class="text-gray-700" data-astro-cid-2jpcakol> ${text1} </p> </div> <div class="bg-white rounded-lg shadow-lg p-8" data-astro-cid-2jpcakol> <h2 class="text-xl font-bold text-gray-800 mb-4 tracking-wider" data-astro-cid-2jpcakol> ${sTitle2} </h2> <p class="text-gray-700" data-astro-cid-2jpcakol> ${text2} </p> </div> <div class="bg-white rounded-lg shadow-lg p-8" data-astro-cid-2jpcakol> <h2 class="text-xl font-bold text-gray-800 mb-4 tracking-wider" data-astro-cid-2jpcakol> ${sTitle3} </h2> <p class="text-gray-700" data-astro-cid-2jpcakol> ${text3} </p> </div> </div> </div> </div> `;
}, "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/components/FeatureCountry.astro", void 0);

const $$Astro = createAstro("https://latamstudyvisa.com/");
const $$HeroSeccionCountry = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeroSeccionCountry;
  const { title, src, sub } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative h-screen flex items-center justify-center max-md:h-[350px]" data-astro-cid-6ak2i5kk> <!-- Imagen de fondo con superposición degradada --> <div class="absolute inset-0 bg-gradient-to-b from-lime-900 to-transparent opacity-70" data-astro-cid-6ak2i5kk></div> <img${addAttribute(src, "src")} alt="Imagen de fondo" class="w-full h-full object-cover bg-top" data-astro-cid-6ak2i5kk> <!-- Contenido centrado --> <div class="absolute transform text-white text-center z-10" data-astro-cid-6ak2i5kk> <h3 class="text-6xl max-md:text-3xl font-bold mb-4 tracking-widest" data-astro-cid-6ak2i5kk>
Estudiar en ${title} </h3> <p class="text-lg" data-astro-cid-6ak2i5kk>${sub}</p> </div> </div> `;
}, "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/components/HeroSeccionCountry.astro", void 0);

export { $$HeroSeccionCountry as $, $$FeatureCountry as a };
