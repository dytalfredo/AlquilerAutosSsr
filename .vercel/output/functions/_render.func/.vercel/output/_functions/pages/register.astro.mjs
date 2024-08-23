/* empty css                                               */
import { a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DA6BkT0p.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BG82bTLs.mjs';
export { renderers } from '../renderers.mjs';

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Registro" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Registro</h1> <p>¿Ya tienes una cuenta? <a href="/signin">Iniciar sesión</a></p> <form action="/api/auth/register" method="post"> <label for="name">Nombre</label> <input type="text" name="name" id="name"> <label for="email" for="email">Correo electrónico</label> <input type="email" name="email" id="email"> <label for="password">Contraseña</label> <input type="password" name="password" id="password"> <button type="submit">Iniciar sesión</button> </form> ` })}`;
}, "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/register.astro", void 0);

const $$file = "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Register,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
