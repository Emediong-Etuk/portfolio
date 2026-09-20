/**
 * Opens Gmail's web compose UI with the recipient pre-filled, instead of
 * relying on the visitor having a local mail client configured for mailto:.
 */
export function gmailComposeUrl(email: string, subject?: string) {
  const params = new URLSearchParams({ view: "cm", fs: "1", to: email });
  if (subject) params.set("su", subject);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
