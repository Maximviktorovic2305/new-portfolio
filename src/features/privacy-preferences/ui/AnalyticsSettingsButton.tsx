"use client";
import { openPrivacySettings } from "@/shared/lib/privacy-choice";
import styles from "@/shared/ui/legal/Legal.module.css";

export function AnalyticsSettingsButton() {
  return (
    <button type="button" className={styles.privacyChoice} onClick={openPrivacySettings}>
      Настройки аналитики
    </button>
  );
}
