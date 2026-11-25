import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, ".next", "standalone");
const staticSrcDir = path.join(rootDir, ".next", "static");
const publicSrcDir = path.join(rootDir, "public");
const deployDir = path.join(rootDir, "deploy");

if (!fs.existsSync(standaloneDir)) {
  console.error(
    "Missing .next/standalone. Run `next build` with `output: 'standalone'` first."
  );
  process.exit(1);
}

fs.rmSync(deployDir, { recursive: true, force: true });
fs.mkdirSync(deployDir, { recursive: true });

// 1. Copy Next.js standalone server + minimal node_modules + .next/server
fs.cpSync(standaloneDir, deployDir, { recursive: true });

// 2. Copy static chunks (.next/static -> deploy/.next/static)
if (fs.existsSync(staticSrcDir)) {
  fs.cpSync(staticSrcDir, path.join(deployDir, ".next", "static"), {
    recursive: true,
  });
}

// 3. Copy public assets (public -> deploy/public)
if (fs.existsSync(publicSrcDir)) {
  fs.cpSync(publicSrcDir, path.join(deployDir, "public"), { recursive: true });
}

// 4. Copy IIS-safe server.js (overwriting Next's default standalone server.js)
fs.copyFileSync(
  path.join(rootDir, "server.js"),
  path.join(deployDir, "server.js")
);

// 5. Copy IIS web.config
fs.copyFileSync(
  path.join(rootDir, "web.config"),
  path.join(deployDir, "web.config")
);

console.log("MonsterASP.NET production bundle prepared in ./deploy");
