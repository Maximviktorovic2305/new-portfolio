import { LEGAL_ROUTES } from "@/shared/config";
import styles from "./Legal.module.css";
export function LegalLinks() {
  return (
    <nav className={styles.legalLinks} aria-label="Правовые документы">
      <a href={LEGAL_ROUTES.privacy}>Конфиденциальность</a>
      <a href={LEGAL_ROUTES.cookies}>Cookie</a>
      <a href={LEGAL_ROUTES.terms}>Условия</a>
      <a href={LEGAL_ROUTES.consent}>Согласие на данные</a>
    </nav>
  );
}
