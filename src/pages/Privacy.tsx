import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/northvave/Navbar";
import { Footer } from "@/components/northvave/Footer";
import { useSiteContent } from "@/hooks/useSiteContent";

const splitParagraphs = (text: string) =>
  text
    .split(/\n{2,}/g)
    .map((p) => p.trim())
    .filter(Boolean);

const Privacy = () => {
  const { t } = useSiteContent();

  useEffect(() => {
    document.title = t("privacy.meta_title", "Privacy Policy — NorthVave");
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      t("privacy.meta_description", "Read NorthVave's Privacy Policy.")
    );
    if (!meta.parentNode) document.head.appendChild(meta);
  }, [t]);

  const body = t(
    "privacy.body",
    "Add your Privacy Policy text in Admin → Site Text under the key `privacy.body`."
  );
  const paragraphs = useMemo(() => splitParagraphs(body), [body]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-28">
        <div className="mb-6">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to site
          </Link>
        </div>
        <header className="mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
            {t("privacy.eyebrow", "// Legal")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-gradient">
              {t("privacy.title", "Privacy Policy")}
            </span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("privacy.updated_at", "Last updated:")}
            {" "}
            {t("privacy.updated_at_value", "May 4, 2026")}
          </p>
        </header>

        <article className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl sm:p-10">
          <div className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-a:text-primary">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;

