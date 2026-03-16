import path from "path";
import fs from "fs";
import type { IEmailModel } from "@/application/models/common/iEmail.model";

export class EmailUtil implements IEmailModel {
  EmailTemplate(
    templateName: string,
    replacements: Record<string, string>[],
  ): string {
    const htmlPath = path.join(__dirname, `../emails/${templateName}.html`);
    let template = fs.readFileSync(htmlPath, "utf8");

    replacements.forEach((replacement) => {
      Object.keys(replacement).forEach((key) => {
        const regex = new RegExp(`\\[${key}\\]`, "g");
        template = template.replace(regex, replacement[key]);
      });
    });

    return template;
  }
}
