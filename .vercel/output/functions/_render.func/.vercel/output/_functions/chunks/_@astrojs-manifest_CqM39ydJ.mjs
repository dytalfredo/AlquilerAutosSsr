import 'cookie';
import 'kleur/colors';
import { parse } from 'devalue';
import { D as DEFAULT_404_COMPONENT } from './astro/server_DA6BkT0p.mjs';
import 'clsx';
import { escape } from 'html-escaper';
import { compile } from 'path-to-regexp';

const ACTION_QUERY_PARAMS = {
  actionName: "_astroAction",
  actionPayload: "_astroActionPayload",
  actionRedirect: "_astroActionRedirect"
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
const statusToCodeMap = Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);
class ActionError extends Error {
  type = "AstroActionError";
  code = "INTERNAL_SERVER_ERROR";
  status = 500;
  constructor(params) {
    super(params.message);
    this.code = params.code;
    this.status = ActionError.codeToStatus(params.code);
    if (params.stack) {
      this.stack = params.stack;
    }
  }
  static codeToStatus(code) {
    return codeToStatusMap[code];
  }
  static statusToCode(status) {
    return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
  }
  static fromJson(body) {
    if (isInputError(body)) {
      return new ActionInputError(body.issues);
    }
    if (isActionError(body)) {
      return new ActionError(body);
    }
    return new ActionError({
      code: "INTERNAL_SERVER_ERROR"
    });
  }
}
function isActionError(error) {
  return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
  return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
class ActionInputError extends ActionError {
  type = "AstroActionInputError";
  // We don't expose all ZodError properties.
  // Not all properties will serialize from server to client,
  // and we don't want to import the full ZodError object into the client.
  issues;
  fields;
  constructor(issues) {
    super({
      message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
      code: "BAD_REQUEST"
    });
    this.issues = issues;
    this.fields = {};
    for (const issue of issues) {
      if (issue.path.length > 0) {
        const key = issue.path[0].toString();
        this.fields[key] ??= [];
        this.fields[key]?.push(issue.message);
      }
    }
  }
}
function getActionQueryString(name) {
  const searchParams = new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name });
  return `?${searchParams.toString()}`;
}
function deserializeActionResult(res) {
  if (res.type === "error") {
    return { error: ActionError.fromJson(JSON.parse(res.body)), data: void 0 };
  }
  if (res.type === "empty") {
    return { data: void 0, error: void 0 };
  }
  return {
    data: parse(res.body, {
      URL: (href) => new URL(href)
    }),
    error: void 0
  };
}

function template({
  title,
  pathname,
  statusCode = 404,
  tabTitle,
  body
}) {
  return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>${tabTitle}</title>
		<style>
			:root {
				--gray-10: hsl(258, 7%, 10%);
				--gray-20: hsl(258, 7%, 20%);
				--gray-30: hsl(258, 7%, 30%);
				--gray-40: hsl(258, 7%, 40%);
				--gray-50: hsl(258, 7%, 50%);
				--gray-60: hsl(258, 7%, 60%);
				--gray-70: hsl(258, 7%, 70%);
				--gray-80: hsl(258, 7%, 80%);
				--gray-90: hsl(258, 7%, 90%);
				--black: #13151A;
				--accent-light: #E0CCFA;
			}

			* {
				box-sizing: border-box;
			}

			html {
				background: var(--black);
				color-scheme: dark;
				accent-color: var(--accent-light);
			}

			body {
				background-color: var(--gray-10);
				color: var(--gray-80);
				font-family: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace;
				line-height: 1.5;
				margin: 0;
			}

			a {
				color: var(--accent-light);
			}

			.center {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100vh;
				width: 100vw;
			}

			h1 {
				margin-bottom: 8px;
				color: white;
				font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
				font-weight: 700;
				margin-top: 1rem;
				margin-bottom: 0;
			}

			.statusCode {
				color: var(--accent-light);
			}

			.astro-icon {
				height: 124px;
				width: 124px;
			}

			pre, code {
				padding: 2px 8px;
				background: rgba(0,0,0, 0.25);
				border: 1px solid rgba(255,255,255, 0.25);
				border-radius: 4px;
				font-size: 1.2em;
				margin-top: 0;
				max-width: 60em;
			}
		</style>
	</head>
	<body>
		<main class="center">
			<svg class="astro-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="80" viewBox="0 0 64 80" fill="none"> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="white"/> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="url(#paint0_linear_738_686)"/> <path d="M0 51.6401C0 51.6401 10.6488 46.4654 21.3274 46.4654L29.3786 21.6102C29.6801 20.4082 30.5602 19.5913 31.5538 19.5913C32.5474 19.5913 33.4275 20.4082 33.7289 21.6102L41.7802 46.4654C54.4274 46.4654 63.1076 51.6401 63.1076 51.6401C63.1076 51.6401 45.0197 2.48776 44.9843 2.38914C44.4652 0.935933 43.5888 0 42.4073 0H20.7022C19.5206 0 18.6796 0.935933 18.1251 2.38914C18.086 2.4859 0 51.6401 0 51.6401Z" fill="white"/> <defs> <linearGradient id="paint0_linear_738_686" x1="31.554" y1="75.4423" x2="39.7462" y2="48.376" gradientUnits="userSpaceOnUse"> <stop stop-color="#D83333"/> <stop offset="1" stop-color="#F041FF"/> </linearGradient> </defs> </svg>
			<h1>${statusCode ? `<span class="statusCode">${statusCode}: </span> ` : ""}<span class="statusMessage">${title}</span></h1>
			${body || `
				<pre>Path: ${escape(pathname)}</pre>
			`}
			</main>
	</body>
</html>`;
}

const DEFAULT_404_ROUTE = {
  component: DEFAULT_404_COMPONENT,
  generate: () => "",
  params: [],
  pattern: /\/404/,
  prerender: false,
  pathname: "/404",
  segments: [[{ content: "404", dynamic: false, spread: false }]],
  type: "page",
  route: "/404",
  fallbackRoutes: [],
  isIndex: false
};
function ensure404Route(manifest) {
  if (!manifest.routes.some((route) => route.route === "/404")) {
    manifest.routes.push(DEFAULT_404_ROUTE);
  }
  return manifest;
}
async function default404Page({ pathname }) {
  return new Response(
    template({
      statusCode: 404,
      title: "Not found",
      tabTitle: "404: Not Found",
      pathname
    }),
    { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
default404Page.isAstroComponentFactory = true;
const default404Instance = {
  default: default404Page
};

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/register","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/register\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/register.ts","pathname":"/api/auth/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signin","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signin\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signin.ts","pathname":"/api/auth/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signout.ts","pathname":"/api/auth/signout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"inline","content":"@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"},{"type":"inline","content":"h3[data-astro-cid-73vdfurv]{font-family:Abril Fatface,cursive;text-shadow:4px 4px 2px rgba(0,0,0,.6)}p[data-astro-cid-73vdfurv]{text-shadow:4px 4px 2px rgba(0,0,0,.6)}\nh2[data-astro-cid-ao2taogh]{text-shadow:4px 4px 2px rgba(4,39,20,.6)}\n"}],"routeData":{"route":"/certificacion-ielts","isIndex":false,"type":"page","pattern":"^\\/certificacion-ielts\\/?$","segments":[[{"content":"certificacion-ielts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/certificacion-ielts.astro","pathname":"/certificacion-ielts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"inline","content":".video-docker[data-astro-cid-eqeukv4r] video[data-astro-cid-eqeukv4r]{top:50%;left:50%;transform:translate(-50%,-50%)}\n"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"},{"type":"inline","content":"@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"}],"routeData":{"route":"/cursos-de-ingles-general-extranjero","isIndex":false,"type":"page","pattern":"^\\/cursos-de-ingles-general-extranjero\\/?$","segments":[[{"content":"cursos-de-ingles-general-extranjero","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cursos-de-ingles-general-extranjero.astro","pathname":"/cursos-de-ingles-general-extranjero","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"},{"type":"inline","content":"@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"}],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"inline","content":"@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"},{"type":"inline","content":"h3[data-astro-cid-73vdfurv]{font-family:Abril Fatface,cursive;text-shadow:4px 4px 2px rgba(0,0,0,.6)}p[data-astro-cid-73vdfurv]{text-shadow:4px 4px 2px rgba(0,0,0,.6)}\nh2[data-astro-cid-ca2tnvpp],h2[data-astro-cid-jrdiesot]{text-shadow:4px 4px 2px rgba(4,39,20,.6)}\n"}],"routeData":{"route":"/entrenamientovocacional","isIndex":false,"type":"page","pattern":"^\\/entrenamientovocacional\\/?$","segments":[[{"content":"entrenamientovocacional","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/entrenamientovocacional.astro","pathname":"/entrenamientovocacional","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"},{"type":"inline","content":"@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"}],"routeData":{"route":"/envioexitoso","isIndex":false,"type":"page","pattern":"^\\/envioexitoso\\/?$","segments":[[{"content":"envioexitoso","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/envioexitoso.astro","pathname":"/envioexitoso","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"inline","content":"h1[data-astro-cid-2jpcakol]{font-family:Abril Fatface,system-ui}h3[data-astro-cid-6ak2i5kk]{font-family:Abril Fatface,cursive;text-shadow:4px 4px 2px rgba(0,0,0,.6)}p[data-astro-cid-6ak2i5kk]{text-shadow:4px 4px 2px rgba(0,0,0,.6)}\n@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"}],"routeData":{"route":"/estudiaenaustralia","isIndex":false,"type":"page","pattern":"^\\/estudiaenaustralia\\/?$","segments":[[{"content":"estudiaenaustralia","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/estudiaenaustralia.astro","pathname":"/estudiaenaustralia","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"inline","content":"h1[data-astro-cid-2jpcakol]{font-family:Abril Fatface,system-ui}h3[data-astro-cid-6ak2i5kk]{font-family:Abril Fatface,cursive;text-shadow:4px 4px 2px rgba(0,0,0,.6)}p[data-astro-cid-6ak2i5kk]{text-shadow:4px 4px 2px rgba(0,0,0,.6)}\n@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"}],"routeData":{"route":"/estudiaencanada","isIndex":false,"type":"page","pattern":"^\\/estudiaencanada\\/?$","segments":[[{"content":"estudiaencanada","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/estudiaencanada.astro","pathname":"/estudiaencanada","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"inline","content":"h1[data-astro-cid-2jpcakol]{font-family:Abril Fatface,system-ui}h3[data-astro-cid-6ak2i5kk]{font-family:Abril Fatface,cursive;text-shadow:4px 4px 2px rgba(0,0,0,.6)}p[data-astro-cid-6ak2i5kk]{text-shadow:4px 4px 2px rgba(0,0,0,.6)}\n@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"}],"routeData":{"route":"/estudiaeninglaterra","isIndex":false,"type":"page","pattern":"^\\/estudiaeninglaterra\\/?$","segments":[[{"content":"estudiaeninglaterra","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/estudiaeninglaterra.astro","pathname":"/estudiaeninglaterra","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"inline","content":"h1[data-astro-cid-2jpcakol]{font-family:Abril Fatface,system-ui}h3[data-astro-cid-6ak2i5kk]{font-family:Abril Fatface,cursive;text-shadow:4px 4px 2px rgba(0,0,0,.6)}p[data-astro-cid-6ak2i5kk]{text-shadow:4px 4px 2px rgba(0,0,0,.6)}\n@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"}],"routeData":{"route":"/estudiaenirlanda","isIndex":false,"type":"page","pattern":"^\\/estudiaenirlanda\\/?$","segments":[[{"content":"estudiaenirlanda","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/estudiaenirlanda.astro","pathname":"/estudiaenirlanda","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"inline","content":"h1[data-astro-cid-2jpcakol]{font-family:Abril Fatface,system-ui}h3[data-astro-cid-6ak2i5kk]{font-family:Abril Fatface,cursive;text-shadow:4px 4px 2px rgba(0,0,0,.6)}p[data-astro-cid-6ak2i5kk]{text-shadow:4px 4px 2px rgba(0,0,0,.6)}\n@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"}],"routeData":{"route":"/estudiaennuevazelanda","isIndex":false,"type":"page","pattern":"^\\/estudiaennuevazelanda\\/?$","segments":[[{"content":"estudiaennuevazelanda","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/estudiaennuevazelanda.astro","pathname":"/estudiaennuevazelanda","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"inline","content":"@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"},{"type":"inline","content":"h3[data-astro-cid-73vdfurv]{font-family:Abril Fatface,cursive;text-shadow:4px 4px 2px rgba(0,0,0,.6)}p[data-astro-cid-73vdfurv]{text-shadow:4px 4px 2px rgba(0,0,0,.6)}\n"}],"routeData":{"route":"/maestrias-en-el-extranjero","isIndex":false,"type":"page","pattern":"^\\/maestrias-en-el-extranjero\\/?$","segments":[[{"content":"maestrias-en-el-extranjero","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/maestrias-en-el-extranjero.astro","pathname":"/maestrias-en-el-extranjero","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"inline","content":"@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"},{"type":"inline","content":"h3[data-astro-cid-73vdfurv]{font-family:Abril Fatface,cursive;text-shadow:4px 4px 2px rgba(0,0,0,.6)}p[data-astro-cid-73vdfurv]{text-shadow:4px 4px 2px rgba(0,0,0,.6)}\nh2[data-astro-cid-n7sx7tzl]{text-shadow:4px 4px 2px rgba(4,39,20,.6)}\n"}],"routeData":{"route":"/preparacion-tesol-caracteristicas","isIndex":false,"type":"page","pattern":"^\\/preparacion-tesol-caracteristicas\\/?$","segments":[[{"content":"preparacion-tesol-caracteristicas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/preparacion-tesol-caracteristicas.astro","pathname":"/preparacion-tesol-caracteristicas","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"inline","content":"@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"},{"type":"inline","content":"h3[data-astro-cid-73vdfurv]{font-family:Abril Fatface,cursive;text-shadow:4px 4px 2px rgba(0,0,0,.6)}p[data-astro-cid-73vdfurv]{text-shadow:4px 4px 2px rgba(0,0,0,.6)}\nh2[data-astro-cid-kbhyd2ym]{text-shadow:4px 4px 2px rgba(4,39,20,.6)}\n"}],"routeData":{"route":"/preparacioncertificaciontoefl","isIndex":false,"type":"page","pattern":"^\\/preparacioncertificaciontoefl\\/?$","segments":[[{"content":"preparacioncertificaciontoefl","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/preparacioncertificaciontoefl.astro","pathname":"/preparacioncertificaciontoefl","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"},{"type":"inline","content":"@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"}],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.hvMbqiPw.js"}],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"},{"type":"inline","content":"@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"}],"routeData":{"route":"/signin","isIndex":false,"type":"page","pattern":"^\\/signin\\/?$","segments":[[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signin.astro","pathname":"/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certificacion-ielts.CjkOaws0.css"},{"type":"inline","content":".bento[data-astro-cid-3oes6hcg]{font-family:Vujahday Script,cursive;position:absolute;z-index:2;top:.5rem;left:1rem;text-shadow:;overflow:hidden;display:flex;justify-content:center;align-items:center}.bento1[data-astro-cid-2cozxc7f]{background-image:url(roadtodream.jpg)}.bento5[data-astro-cid-2cozxc7f]{background-image:url(8.jpg)}h3[data-astro-cid-2cozxc7f],h2[data-astro-cid-2cozxc7f]{font-family:Abril Fatface,system-ui;letter-spacing:.2rem;color:#fff}@keyframes anim{0%{opacity:0;transform:translate(-100px)}to{opacity:1;transform:translate(0)}}@keyframes animR{0%{opacity:0;transform:translate(100px)}to{opacity:1;transform:translate(0)}}.animation[data-astro-cid-2cozxc7f]{animation:anim linear;animation-timeline:view();animation-range:entry 0% cover 30%}.animationR[data-astro-cid-2cozxc7f]{animation:animR linear;animation-timeline:view();animation-range:entry 0% cover 30%}.backgroundCircle[data-astro-cid-2cozxc7f]:before{content:\"\";position:absolute;top:0;left:-15%;width:30%;border-radius:50%;z-index:-1;height:100%;background-color:rgb(53 83 20 / var(--tw-bg-opacity))}.backgroundCircle2[data-astro-cid-2cozxc7f]:before{content:\"\";position:absolute;top:0;right:-15%;width:30%;border-radius:50%;z-index:-1;height:100%;background-color:#164e63}.clic[data-astro-cid-2cozxc7f]{clip-path:polygon(0 11%,100% 0,100% 30%,100% 87%,0 100%,0 100%,0% 30%)}@keyframes bounce{0%,20%,50%,80%,to{transform:translateY(0)}40%{transform:translateY(-30px)}60%{transform:translateY(-15px)}}@media (max-width: 768px){.animar[data-astro-cid-xtm5hu6o]:before{content:\"Estudiar\";position:relative;left:calc(50vw - 115px)}}h1[data-astro-cid-xtm5hu6o]{display:flex;position:relative;justify-content:center;font-family:Abril Fatface,system-ui;text-shadow:4px 4px 2px rgba(4,39,20,.6)}.point[data-astro-cid-xtm5hu6o]{content:\"\";visibility:hidden;padding-left:18px;padding-right:16px;max-width:80%}.animar[data-astro-cid-xtm5hu6o]:before{content:\"Estudiar\";position:absolute;opacity:0;animation:animate infinite 10s;padding-left:10px;padding-right:14px}@keyframes animate{0%{content:\"Estudiar\";opacity:0;transform:translate(-20px)}5%,30%{content:\"Estudiar\";opacity:1;transform:translate(0)}34.9%{content:\"Estudiar\";opacity:0;transform:translate(20px)}35%{content:\"Trabajar\";opacity:0;transform:translate(-20px)}40%,65%{content:\"Trabajar\";opacity:1;transform:translate(0)}69.5%{content:\"Trabajar\";opacity:0;transform:translate(20px)}70%{content:\"Cambiar\";opacity:0;transform:translate(-20px)}75%,95%{content:\"Cambiar\";opacity:1;transform:translate(0)}99.5%{content:\"Cambiar\";opacity:0;transform:translate(20px)}}.hero[data-astro-cid-falnkxit]{font-family:Lato,serif;background-image:url(herovisa2.jpg)}p[data-astro-cid-falnkxit]{font-family:Lato,sans-serif}h1[data-astro-cid-falnkxit]{font-family:Abril Fatface,system-ui;text-shadow:4px 4px 2px rgba(4,39,20,.6)}span[data-astro-cid-falnkxit]{font-family:Abril Fatface,system-ui;text-shadow:4px 4px 2px rgba(0,0,0,.6)}@media not all and (min-width: 768px){.hero[data-astro-cid-falnkxit]{background-image:url(herovisamobil.jpg)}}@keyframes appear{0%{opacity:0;scale:.5}to{opacity:1;scale:1}}@keyframes anim2{0%{opacity:0;transform:translateY(-200px)}to{opacity:1;transform:translateY(0)}}.blockAnimation[data-astro-cid-j7pv25f6]{animation:appear linear;animation-timeline:view();animation-range:entry 0% cover 40%}.blockAnimation2[data-astro-cid-j7pv25f6]{animation:anim2 linear;animation-timeline:view();animation-range:entry 0% cover 30%}\n@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Abril Fatface;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2) format(\"woff2\"),url(/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n"},{"type":"external","src":"/_astro/certificacion-ielts.BCBNzTOw.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://latamstudyvisa.com/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/certificacion-ielts.astro",{"propagation":"none","containsHead":true}],["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/cursos-de-ingles-general-extranjero.astro",{"propagation":"none","containsHead":true}],["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/entrenamientovocacional.astro",{"propagation":"none","containsHead":true}],["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/envioexitoso.astro",{"propagation":"none","containsHead":true}],["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/estudiaenaustralia.astro",{"propagation":"none","containsHead":true}],["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/estudiaencanada.astro",{"propagation":"none","containsHead":true}],["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/estudiaeninglaterra.astro",{"propagation":"none","containsHead":true}],["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/estudiaenirlanda.astro",{"propagation":"none","containsHead":true}],["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/estudiaennuevazelanda.astro",{"propagation":"none","containsHead":true}],["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/maestrias-en-el-extranjero.astro",{"propagation":"none","containsHead":true}],["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/preparacion-tesol-caracteristicas.astro",{"propagation":"none","containsHead":true}],["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/preparacioncertificaciontoefl.astro",{"propagation":"none","containsHead":true}],["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/register.astro",{"propagation":"none","containsHead":true}],["C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/src/pages/signin.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/auth/register@_@ts":"pages/api/auth/register.astro.mjs","\u0000@astro-page:src/pages/api/auth/signin@_@ts":"pages/api/auth/signin.astro.mjs","\u0000@astro-page:src/pages/api/auth/signout@_@ts":"pages/api/auth/signout.astro.mjs","\u0000@astro-page:src/pages/certificacion-ielts@_@astro":"pages/certificacion-ielts.astro.mjs","\u0000@astro-page:src/pages/cursos-de-ingles-general-extranjero@_@astro":"pages/cursos-de-ingles-general-extranjero.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/entrenamientovocacional@_@astro":"pages/entrenamientovocacional.astro.mjs","\u0000@astro-page:src/pages/envioexitoso@_@astro":"pages/envioexitoso.astro.mjs","\u0000@astro-page:src/pages/estudiaenaustralia@_@astro":"pages/estudiaenaustralia.astro.mjs","\u0000@astro-page:src/pages/estudiaencanada@_@astro":"pages/estudiaencanada.astro.mjs","\u0000@astro-page:src/pages/estudiaeninglaterra@_@astro":"pages/estudiaeninglaterra.astro.mjs","\u0000@astro-page:src/pages/estudiaenirlanda@_@astro":"pages/estudiaenirlanda.astro.mjs","\u0000@astro-page:src/pages/estudiaennuevazelanda@_@astro":"pages/estudiaennuevazelanda.astro.mjs","\u0000@astro-page:src/pages/maestrias-en-el-extranjero@_@astro":"pages/maestrias-en-el-extranjero.astro.mjs","\u0000@astro-page:src/pages/preparacion-tesol-caracteristicas@_@astro":"pages/preparacion-tesol-caracteristicas.astro.mjs","\u0000@astro-page:src/pages/preparacioncertificaciontoefl@_@astro":"pages/preparacioncertificaciontoefl.astro.mjs","\u0000@astro-page:src/pages/register@_@astro":"pages/register.astro.mjs","\u0000@astro-page:src/pages/signin@_@astro":"pages/signin.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","C:/Users/dytal/OneDrive/Documentos/Darlyn/AstroPageDarlyn/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_Bfk7QUuD.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.hvMbqiPw.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/abril-fatface-latin-ext-400-normal.C5FI7UIy.woff2","/_astro/abril-fatface-latin-400-normal.Bld6cQVQ.woff2","/_astro/lato-latin-400-normal.BEhtfm5r.woff2","/_astro/lato-latin-ext-400-normal.C8eBZ-j2.woff2","/_astro/abril-fatface-latin-ext-400-normal.CIwJmCNm.woff","/_astro/abril-fatface-latin-400-normal.Ma3PFmLR.woff","/_astro/lato-latin-400-normal.B11PyLys.woff","/_astro/certificacion-ielts.CjkOaws0.css","/_astro/certificacion-ielts.BCBNzTOw.css","/2.jpg","/3.jpg","/5.jpg","/8.jpg","/australiastudy.jpg","/canada-flag.svg","/estudiaencanada.jpg","/estudiaeninglaterra.jpg","/favicon.svg","/herovisa.jpg","/herovisa2.jpg","/herovisamobil.jpg","/irlandastudy.jpg","/latamstudyvisa.mp4","/LogoLatamStudyVisa.svg","/maestrias-en-el-extranjero.jpg","/nuevazelandastudy.jpg","/paisaje-isla-sur-archipielago.jpg","/pamelatestimonio.jpg","/preparacion_ingles.jpg","/preparacion_toefl.jpg","/roadtodream.jpg","/sisepuedeaprenderingles.jpg","/talleresvet.webp","/talleresvocacionales.jpg","/visaaustralia.jpg","/visaaustralia2.jpg","/visairlanda.jpg","/visanuevazelanda.jpg","/volcantongariro.webp","/opengraph/certificaciones-internacionales.jpg","/opengraph/cursos_vet.jpg","/opengraph/Estudia-en-canada.jpg","/opengraph/Estudia-en-inglaterra.jpg","/opengraph/Estudia-en-irlanda.jpg","/opengraph/Estudia-en-nueva-zelanda.jpg","/opengraph/Estudia-y-trebaja-en-australia.jpg","/opengraph/openGraph-Estudia-Ingles.jpg","/opengraph/preparacion-tofel.jpg","/_astro/hoisted.hvMbqiPw.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"experimentalEnvGetSecretEnabled":false});

export { DEFAULT_404_ROUTE as D, default404Instance as a, deserializeActionResult as d, ensure404Route as e, getActionQueryString as g, manifest as m };
