import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead } from './astro/server_DA6BkT0p.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://latamstudyvisa.com/");
const $$WhatIs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$WhatIs;
  const { title, src, sub } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="p-8 mt-10" id="siguiente-seccion"> <h2 class="text-4xl text-gray-800 font-semibold text-center mb-4 tracking-wide">
¿Que es el ${title}?
</h2> <p class="text-xl text-gray-700 text-center mt-4"> ${sub} </p> </section>`;
}, "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/components/WhatIs.astro", void 0);

export { $$WhatIs as $ };
