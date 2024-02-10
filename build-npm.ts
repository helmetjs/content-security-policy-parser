import { build, emptyDir } from "https://deno.land/x/dnt@0.40.0/mod.ts";

await emptyDir("./dist/npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./dist/npm",
  shims: { deno: "dev" },
  typeCheck: "both",
  package: {
    name: "content-security-policy-parser",
    author: "Evan Hahn <me@evanhahn.com> (https://evanhahn.com)",
    description: "Parse Content Security Policy directives.",
    version: "0.6.0",
    license: "MIT",
    keywords: ["security", "content", "security", "policy", "csp", "parser"],
    homepage: "https://github.com/helmetjs/content-security-policy-parser",
    repository: {
      type: "git",
      url: "git://github.com/helmetjs/content-security-policy-parser.git",
    },
    bugs: {
      url: "https://github.com/helmetjs/content-security-policy-parser/issues",
      email: "me@evanhahn.com",
    },
    engines: {
      node: ">=18.0.0",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "./dist/npm/LICENSE");
    Deno.copyFileSync("README.md", "./dist/npm/README.md");
    Deno.copyFileSync("CHANGELOG.md", "./dist/npm/CHANGELOG.md");
  },
});
