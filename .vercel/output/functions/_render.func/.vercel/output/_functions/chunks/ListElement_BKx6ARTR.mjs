import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead } from './astro/server_DA6BkT0p.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                                       */

const $$Astro = createAstro("https://latamstudyvisa.com/");
const $$ListElement = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ListElement;
  const { title, text } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex items-start gap-4" data-astro-cid-oolknwom> <span class="shrink-0 rounded-lg bg-lime-700 p-4 shadow-sm" data-astro-cid-oolknwom> <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-oolknwom> <path d="M12 14l9-5-9-5-9 5 9 5z" data-astro-cid-oolknwom></path> <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" data-astro-cid-oolknwom></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" data-astro-cid-oolknwom></path> </svg> </span> <div data-astro-cid-oolknwom> <h3 class="text-lg font-bold tracking-[0.2rem]" data-astro-cid-oolknwom>${title}</h3> <p class="mt-1 text-sm text-gray-100 text-clip" data-astro-cid-oolknwom> ${text} </p> </div> </div> `;
}, "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/components/ListElement.astro", void 0);

export { $$ListElement as $ };
