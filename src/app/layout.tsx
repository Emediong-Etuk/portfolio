import type { Metadata } from "next";
import "./globals.css";
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getProfile } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    icons: { icon: profile.avatarUrl },
    openGraph: {
      title: `${profile.name} — ${profile.role}`,
      description: profile.tagline,
      images: [profile.avatarUrl],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="noise-bg flex min-h-screen flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Nav githubUrl={profile.githubUrl} />
          <main className="flex-1">{children}</main>
          <Footer
            githubUrl={profile.githubUrl}
            contactEmail={profile.contactEmail}
            name={profile.name}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
