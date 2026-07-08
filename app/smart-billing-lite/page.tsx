import LandingPages from "../LandingPages";
import { getHomeMeta } from "../../lib/strapi";

export default async function SmartBillingLiteRoute() {
  const homeMeta = await getHomeMeta();
  return <LandingPages homeMeta={homeMeta} />;
}
