/* empty css                                               */
import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DA6BkT0p.mjs';
import 'kleur/colors';
import { a as app } from '../chunks/server_CbEjGiK_.mjs';
import { getAuth } from 'firebase-admin/auth';
import { $ as $$Layout } from '../chunks/Layout_BG82bTLs.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://latamstudyvisa.com/");
const $$Signin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Signin;
  const auth = getAuth(app);
  if (Astro2.cookies.has("__session")) {
    const sessionCookie = Astro2.cookies.get("__session").value;
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
    if (decodedCookie) {
      return Astro2.redirect("/dashboard");
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Iniciar sesi\xF3n" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Iniciar sesión</h1> <p>¿Eres nuevo aquí? <a href="/register">Crear una cuenta</a></p> <form action="/api/auth/signin" method="post"> <label for="email" for="email">Correo electrónico</label> <input type="email" name="email" id="email"> <label for="password">Contraseña</label> <input type="password" name="password" id="password"> <button type="submit">Iniciar sesión</button> </form> ` })} `;
}, "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/signin.astro", void 0);

const $$file = "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/signin.astro";
const $$url = "/signin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Signin,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
