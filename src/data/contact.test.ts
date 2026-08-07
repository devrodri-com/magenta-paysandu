import { describe, expect, it } from "vitest";
import { MAILTO_PRESUPUESTO } from "./contact";

describe("MAILTO_PRESUPUESTO", () => {
  it("codifica el texto normal una sola vez", () => {
    const url = new URL(MAILTO_PRESUPUESTO);
    const body = url.searchParams.get("body");

    expect(MAILTO_PRESUPUESTO).not.toContain("%250D");
    expect(MAILTO_PRESUPUESTO).not.toContain("%2520");
    expect(body).toContain("Hola Magenta!\n\n");
    expect(body).toContain("- Producto:");
    expect(body).not.toContain("%0A");
  });
});
