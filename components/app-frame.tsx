import { Navbar } from "@/components/navbar";
import type { SiteConfig } from "@/lib/site-config";

type AppFrameProps = {
  children: React.ReactNode;
  config: SiteConfig;
};

export function AppFrame({ children, config }: AppFrameProps) {
  return (
    <div className="page-shell">
      <Navbar config={config} />
      <main>{children}</main>
    </div>
  );
}
