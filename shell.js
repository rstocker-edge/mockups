// Shared app shell for the Taurus mockups. Load right after the Tailwind CDN script.
tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] },
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const active = body.dataset.nav;
  const crumbs = JSON.parse(body.dataset.crumbs || "[]");

  const navItems = [
    { key: "dashboard", label: "Dashboard", href: "#", icon: "fa-gauge" },
    { key: "events", label: "Events", href: "event-groups.html", icon: "fa-calendar-days" },
    { key: "templates", label: "Event Templates", href: "#", icon: "fa-layer-group" },
    { key: "inventory", label: "Inventory", href: "#", icon: "fa-warehouse" },
  ];

  const navLinks = navItems
    .map((item) => {
      const isActive = item.key === active;
      return `
        <a href="${item.href}"
           class="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition
                  ${isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}"
           ${isActive ? 'aria-current="page"' : ""}>
          <i class="fa-solid ${item.icon} text-xs opacity-70"></i>${item.label}
        </a>`;
    })
    .join("");

  const crumbHtml = crumbs
    .map((c, i) => {
      const last = i === crumbs.length - 1;
      const sep = i > 0 ? '<i class="fa-solid fa-chevron-right text-[10px] text-slate-300"></i>' : "";
      const node = last
        ? `<span class="font-medium text-slate-700" aria-current="page">${c.label}</span>`
        : `<a href="${c.href || "#"}" class="text-slate-500 hover:text-slate-800">${c.label}</a>`;
      return `${sep}${node}`;
    })
    .join("");

  const header = document.createElement("header");
  header.innerHTML = `
    <div class="bg-slate-900">
      <div class="mx-auto flex h-14 max-w-7xl items-center gap-6 px-6">
        <a href="index.html" class="flex items-center gap-2 text-white">
          <span class="grid h-7 w-7 place-items-center rounded-md bg-blue-600 text-xs font-bold">EP</span>
          <span class="text-sm font-semibold tracking-tight">Auction Admin</span>
        </a>
        <nav class="hidden items-center gap-1 md:flex">${navLinks}</nav>
        <div class="ml-auto flex items-center gap-3">
          <a href="index.html" class="rounded-full bg-fuchsia-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-fuchsia-500">MOCKUP · all pages</a>
          <button class="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/10">
            <i class="fa-solid fa-building text-xs text-slate-400"></i>
            Acme Auto Auction
            <i class="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
          </button>
          <span class="grid h-8 w-8 place-items-center rounded-full bg-slate-700 text-xs font-semibold text-white">RS</span>
        </div>
      </div>
    </div>
    ${
      crumbs.length
        ? `<div class="border-b border-slate-200 bg-white">
             <nav class="mx-auto flex h-10 max-w-7xl items-center gap-2 px-6 text-sm" aria-label="Breadcrumb">${crumbHtml}</nav>
           </div>`
        : ""
    }
  `;
  body.prepend(header);

  const laneHeader = document.getElementById("lane-header");
  if (laneHeader) renderLaneHeader(laneHeader, laneHeader.dataset.tab);
});

function renderLaneHeader(el, activeTab) {
  const tabs = [
    { key: "settings", label: "Settings", href: "lane-settings.html", icon: "fa-sliders" },
    { key: "add", label: "Add vehicles", href: "#", icon: "fa-plus" },
    { key: "inventory", label: "Inventory", href: "lane-inventory.html", icon: "fa-car", count: 48 },
    { key: "bids", label: "Bid monitor", href: "bid-monitor.html", icon: "fa-gavel" },
    { key: "live", label: "Live monitor", href: "#", icon: "fa-tower-broadcast" },
  ];

  const tabHtml = tabs
    .map((t) => {
      const on = t.key === activeTab;
      return `
        <a href="${t.href}" class="inline-flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-medium
             ${on ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"}"
           ${on ? 'aria-current="page"' : ""}>
          <i class="fa-solid ${t.icon} text-xs"></i>${t.label}
          ${t.count ? `<span class="rounded-full ${on ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"} px-1.5 py-0.5 text-[11px] tabular-nums">${t.count}</span>` : ""}
        </a>`;
    })
    .join("");

  el.innerHTML = `
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p class="text-sm text-slate-500">
          <a href="lanes.html" class="hover:text-slate-800">Fall Fleet Remarketing</a> · Tue, Oct 6 · 9:00 AM – 2:00 PM CDT
        </p>
        <div class="mt-1 flex items-center gap-3">
          <h1 class="text-2xl font-semibold tracking-tight">Lane A — Fleet Returns</h1>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></span>Live
          </span>
        </div>
      </div>
      <div class="text-right">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20"
              title="October 6, 2026 11:44 AM CDT">
          <i class="fa-solid fa-check text-[10px]"></i>Synced with bid engine · 4 min ago
        </span>
      </div>
    </div>
    <nav class="mt-6 flex gap-6 overflow-x-auto border-b border-slate-200">${tabHtml}</nav>
  `;
}
