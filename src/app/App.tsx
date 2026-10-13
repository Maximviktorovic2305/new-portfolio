import { AuthorSupportButton } from "@/features/author-support";
import { PrivacyPreferences } from "@/features/privacy-preferences";
import { LegalPage } from "@/pages/legal";
import { LEGAL_ROUTES, type LegalDocument } from "@/shared/config";
import { MotionConfig } from "motion/react";
import { HomePage } from "@/pages/home";
import { ThemeProvider } from "@/shared/config";
import { YandexMetrika } from "@/shared/ui";

export default function App({
  pathname = typeof window === "undefined" ? "/" : window.location.pathname,
}: { pathname?: string } = {}) {
  const document = (Object.entries(LEGAL_ROUTES) as [LegalDocument, string][]).find(
    ([, route]) => route === pathname,
  )?.[0];
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        {document ? <LegalPage document={document} /> : <HomePage />}
        <AuthorSupportButton />
        <PrivacyPreferences />
        <YandexMetrika />
      </MotionConfig>
    </ThemeProvider>
  );
}
