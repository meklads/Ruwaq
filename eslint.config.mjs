import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

/**
 * `next lint` (Next 14) cannot run ESLint 9, so CI runs ESLint directly with the flat Next config.
 * Two React Compiler rules shipped with this config version are advisory for a React 18 app and are
 * reported as warnings, not build failures, until the existing components are reworked.
 */
export default [
  ...nextCoreWebVitals,
  { ignores: [".next/**", "node_modules/**", "public/**", "data/**", "next-env.d.ts"] },
  { rules: { "react-hooks/set-state-in-effect": "warn", "react-hooks/purity": "warn" } },
];
