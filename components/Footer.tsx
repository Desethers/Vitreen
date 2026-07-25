"use client";

const footerColumns = [
  {
    title: "Platform",
    links: [
      { label: "Gallery OS", href: "/products/overview" },
      { label: "Artwork Management", href: "/products/archive" },
      { label: "Gallery Websites", href: "/products/publishing" },
      { label: "Private Viewing Rooms", href: "/products/viewing-rooms" },
      { label: "Gallery Assistant", href: "/products/custom-operations" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For Art Galleries", href: "/solutions/galleries" },
      { label: "For Artists", href: "/solutions/artists" },
      { label: "For Art Advisors & Dealers", href: "/solutions/advisors" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "#contact", opensContact: true },
    ],
  },
] as const;

function openContact() {
  window.dispatchEvent(new CustomEvent("open-contact-modal"));
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#111110] text-white">
      <div className="px-4 md:px-6">
        <div className="mx-auto max-w-7xl py-14 md:py-20">
          <div className="grid gap-14 md:grid-cols-[minmax(240px,1fr)_minmax(0,1.5fr)] md:gap-20 lg:gap-28">
            <div>
              <a href="/" className="font-display text-[18px] tracking-[-0.025em] text-white">
                Vitreen
              </a>
              <p className="mt-5 max-w-[23rem] text-[14px] leading-[1.65] text-[#ADADAA]">
                Connected websites and sales tools for art galleries, artists and advisors.
              </p>
            </div>

            <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 sm:gap-8">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-[12px] font-medium text-[#6B6A67]">{column.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={
                            "opensContact" in link && link.opensContact ? openContact : undefined
                          }
                          className="text-[14px] leading-snug text-[#D5D5D2] transition-colors duration-200 hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="mt-16 flex flex-col gap-3 pt-6 text-[12px] text-[#6B6A67] sm:flex-row sm:items-center sm:justify-between md:mt-20">
            <p>© 2026 Vitreen</p>
            <p>Paris, France</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
