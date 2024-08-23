/* empty css                                               */
import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DA6BkT0p.mjs';
import 'kleur/colors';
import { a as app } from '../chunks/server_CbEjGiK_.mjs';
import { getAuth } from 'firebase-admin/auth';
import { $ as $$Layout } from '../chunks/Layout_BG82bTLs.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://latamstudyvisa.com/");
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const auth = getAuth(app);
  if (!Astro2.cookies.has("__session")) {
    return Astro2.redirect("/signin");
  }
  const sessionCookie = Astro2.cookies.get("__session").value;
  const decodedCookie = await auth.verifySessionCookie(sessionCookie);
  const user = await auth.getUser(decodedCookie.uid);
  if (!user) {
    return Astro2.redirect("/signin");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "dashboard" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Bienvenido ${user.displayName}</h1> <p>Nos alegra verte aquí</p> <form action="/api/auth/signout"> <button type="submit">Cerrar sesión</button> </form> ` })}`;
}, "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/dashboard.astro", void 0);

const $$file = "C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Dashboard,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
