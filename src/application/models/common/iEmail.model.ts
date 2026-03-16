export interface IEmailModel {
  EmailTemplate(
    templateName: string,
    replacements: Record<string, string>[],
  ): string;
}
