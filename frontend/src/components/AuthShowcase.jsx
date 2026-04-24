export default function AuthShowcase({ title, subtitle }) {
  return (
    <aside className="auth-showcase-bg animate-fade-up animate-gradient-pan relative hidden overflow-hidden rounded-3xl p-10 text-white lg:flex lg:min-h-[640px] lg:flex-col lg:justify-between">
      <div className="animate-float-slow absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div className="animate-float-slow absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/90">Agentforce</p>
        <h2 className="mt-6 max-w-sm text-4xl font-semibold leading-[1.15] tracking-tight">{title}</h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/90">{subtitle}</p>
      </div>

      <div className="relative z-10 space-y-5">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur transition hover:translate-y-[-2px] hover:bg-white/15">
          <p className="text-xs uppercase tracking-[0.2em] text-white/90">Intelligent Routing</p>
          <p className="mt-2 text-sm leading-relaxed">Auto-categorize tickets into Billing, Technical, General, or Escalate.</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur transition hover:translate-y-[-2px] hover:bg-white/15">
          <p className="text-xs uppercase tracking-[0.2em] text-white/90">Live Operations</p>
          <p className="mt-2 text-sm leading-relaxed">Monitor workload, SLA trends, and resolution performance in one place.</p>
        </div>
      </div>
    </aside>
  );
}
