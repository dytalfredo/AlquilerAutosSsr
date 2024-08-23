import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from './astro/server_DA6BkT0p.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */
/* empty css                                       */
/* empty css                                       */

const $$Astro = createAstro("https://latamstudyvisa.com/");
const $$HeroCurse = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeroCurse;
  const { title, src, sub } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative max-h-[400px] overflow-hidden flex items-center justify-center max-sm:h-[300px]" data-astro-cid-73vdfurv> <!-- Imagen de fondo con superposición degradada --> <div class="absolute inset-0 bg-gradient-to-b from-lime-900 to-transparent opacity-70" data-astro-cid-73vdfurv></div> <img${addAttribute(src, "src")} alt="Imagen de fondo" class="w-full h-full object-cover" data-astro-cid-73vdfurv> <!-- Contenido centrado --> <div class="absolute transform text-white text-center z-10" data-astro-cid-73vdfurv> <h3 class="text-6xl max-md:text-2xl font-bold mb-4 tracking-widest" data-astro-cid-73vdfurv> ${title} </h3> <p class="text-lg" data-astro-cid-73vdfurv>${sub}</p> </div> </div> `;
}, "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/components/HeroCurse.astro", void 0);

export { $$HeroCurse as $ };
