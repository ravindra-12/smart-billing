import DownloadApkPromo from "../DownloadApkPromo";
import { FeaturesPage } from "../LandingPages";

export default function FeaturesRoute() {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <FeaturesPage />
      <DownloadApkPromo />
    </div>
  );
}
