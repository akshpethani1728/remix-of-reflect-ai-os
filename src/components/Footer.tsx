import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative pb-10 pt-16">
      <div className="mx-auto h-px w-[80%] bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto mt-10 px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <Logo className="size-8" />
              <span className="text-base font-semibold">Reflect</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Visibility Through Automation. Helping local businesses grow online.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-10 text-xs">
            <div>
              <div className="mb-3 font-medium text-foreground">Product</div>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#services" className="transition-colors hover:text-foreground">Services</a></li>
                <li><a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a></li>
              </ul>
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">Company</div>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="transition-colors hover:text-foreground">About</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Customers</a></li>
              </ul>
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">Connect</div>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="transition-colors hover:text-foreground">Instagram</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-5 text-[10px] text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Reflect. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
