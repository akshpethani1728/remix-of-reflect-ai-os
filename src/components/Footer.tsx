import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative pb-8 pt-16">
      <div className="mx-auto h-px w-[85%] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container mx-auto mt-12 px-6">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <Logo className="size-8" />
              <span className="text-base font-semibold tracking-tight">Reflect</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Visibility Through Automation. Helping local businesses grow online.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-12 text-xs">
            <div>
              <div className="mb-4 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground">Product</div>
              <ul className="space-y-2.5 text-muted-foreground">
                <li><a href="#services" className="transition-colors hover:text-foreground">Services</a></li>
                <li><a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a></li>
              </ul>
            </div>
            <div>
              <div className="mb-4 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground">Company</div>
              <ul className="space-y-2.5 text-muted-foreground">
                <li><a href="#" className="transition-colors hover:text-foreground">About</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Customers</a></li>
              </ul>
            </div>
            <div>
              <div className="mb-4 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground">Connect</div>
              <ul className="space-y-2.5 text-muted-foreground">
                <li><a href="#" className="transition-colors hover:text-foreground">Instagram</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border/50 pt-5 text-[9px] text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Reflect. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
