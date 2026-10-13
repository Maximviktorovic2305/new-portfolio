import { LEGAL_ROUTES } from "@/shared/config";
import styles from "./Legal.module.css";
export function ConsentFields() {
  return (
    <div className={styles.consentChecks}>
      <label>
        <input type="checkbox" name="acceptTerms" required />
        <span>
          Принимаю{" "}
          <a href={LEGAL_ROUTES.terms} target="_blank" rel="noopener noreferrer">
            условия использования
          </a>
          .
        </span>
      </label>
      <label>
        <input type="checkbox" name="acceptDataProcessing" required />
        <span>
          Даю{" "}
          <a href={LEGAL_ROUTES.consent} target="_blank" rel="noopener noreferrer">
            согласие на обработку персональных данных
          </a>
          .{" "}
          <a href={LEGAL_ROUTES.privacy} target="_blank" rel="noopener noreferrer">
            Политика конфиденциальности
          </a>
          .
        </span>
      </label>
    </div>
  );
}
