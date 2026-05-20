import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative pb-12 pt-20">
      <div className="mx-auto h-px w-[80%] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container mx-auto mt-12 px-6">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <Logo className="size-7" />
              <span className="font-display text-lg font-semibold">Reflect</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Visibility Through Automation. The AI operating system for local businesses.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 text-sm md:grid-cols-3">
            <Col title="Product" items={["Services", "System", "Pricing"]} />
            <Col title="Company" items={["About", "Customers", "Careers"]} />
            <Col title="Connect" items={["Instagram", "LinkedIn", "WhatsApp"]} />
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Reflect. All rights reserved.</div>
          <div>Crafted in the future.</div>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-foreground">{title}</div>
      <ul className="mt-4 space-y-2 text-muted-foreground">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="transition-colors hover:text-primary">{i}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
