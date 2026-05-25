import { Navbar } from "@/components/navbar";

type AppFrameProps = {
  children: React.ReactNode;
};

export function AppFrame({ children }: AppFrameProps) {
  return (
    <div className="page-shell">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
