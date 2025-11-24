
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";





const DashboardPage = () => {
    const [links, setLinks] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    const [url, setUrl] = useState("");
    const [code, setCode] = useState("");
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // simulate loading links
    useEffect(() => {
        setLoading(true);
        setLoadError(null);
        const t = setTimeout(() => {
            // pretend this came from API
            setLinks(mockLinks);
            setFiltered(mockLinks);
            setLoading(false);
        }, 700);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const q = search.toLowerCase();
        const res = links.filter(
            (l) =>
                l.code.toLowerCase().includes(q) ||
                l.url.toLowerCase().includes(q)
        );
        setFiltered(res);
    }, [search, links]);

    function validateUrl(value) {
        try {
            // basic URL validation using URL constructor
            // this is enough for UI demo
            // eslint-disable-next-line no-new
            new URL(value);
            return true;
        } catch {
            return false;
        }
    }

    function handleCreate(e) {
        e.preventDefault();
        setFormError("");
        setFormSuccess("");

        if (!url.trim()) {
            setFormError("Please enter a URL.");
            return;
        }
        if (!validateUrl(url.trim())) {
            setFormError("Please enter a valid URL (include http/https).");
            return;
        }
        if (code && !/^[A-Za-z0-9]{6,8}$/.test(code)) {
            setFormError("Code must be 6–8 characters (A–Z, a–z, 0–9).");
            return;
        }

        // collision check (UI only)
        if (code && links.some((l) => l.code === code)) {
            setFormError("This code already exists. Please choose another.");
            return;
        }

        setSubmitting(true);

        setTimeout(() => {
            const newLink = {
                code: code || "random1", // simulate backend-generated
                url: url.trim(),
                clicks: 0,
                lastClicked: "—",
            };
            const updated = [newLink, ...links];
            setLinks(updated);
            setUrl("");
            setCode("");
            setFormSuccess("Link created successfully.");
            setSubmitting(false);
        }, 600);
    }

    function handleDelete(codeToDelete) {
        if (!window.confirm("Delete this link?")) return;
        const updated = links.filter((l) => l.code !== codeToDelete);
        setLinks(updated);
    }

    function handleCopy(shortUrl) {
        navigator.clipboard
            .writeText(shortUrl)
            .catch(() => {
                // ignore for now
            });
    }
    const mockLinks = [
        {
            code: "docs12",
            url: "https://example.com/docs/getting-started-with-tiny-link-assignment",
            clicks: 42,
            lastClicked: "2025-11-20T12:30:00Z",
        },
        {
            code: "login88",
            url: "https://app.example.com/login",
            clicks: 5,
            lastClicked: "2025-11-21T09:10:00Z",
        },
    ];


    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight">
                            Dashboard
                        </h1>
                        <p className="text-sm text-slate-400">
                            Create, view and manage your TinyLinks.
                        </p>
                    </div>
                    <p className="text-xs text-slate-500">
                        Codes must follow <code>[A-Za-z0-9]&#123;6,8&#125;</code>.
                    </p>
                </div>

                <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.8fr)]">
                    {/* Create link card */}
                    <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 shadow-sm">
                        <h2 className="mb-3 text-sm font-medium text-slate-100">
                            Create a short link
                        </h2>
                        {formError && (
                            <div className="mb-3 rounded-md border border-rose-700 bg-rose-900/40 px-3 py-2 text-xs text-rose-100">
                                {formError}
                            </div>
                        )}
                        {formSuccess && (
                            <div className="mb-3 rounded-md border border-emerald-700 bg-emerald-900/40 px-3 py-2 text-xs text-emerald-100">
                                {formSuccess}
                            </div>
                        )}

                        <form onSubmit={handleCreate} className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-200">
                                    Target URL<span className="text-rose-400">*</span>
                                </label>
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://example.com/very/long/link"
                                    className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                />
                                <p className="text-[11px] text-slate-500">
                                    We’ll redirect <span className="font-mono">/code</span> to
                                    this URL.
                                </p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-200">
                                    Custom code (optional)
                                </label>
                                <div className="flex items-center gap-1 text-sm">
                                    <span className="inline-flex items-center rounded-l-md border border-slate-700 bg-slate-900 px-2 text-slate-500">
                                        yoursite.com/
                                    </span>
                                    <input
                                        type="text"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="docs12"
                                        className="flex-1 rounded-r-md border border-l-0 border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>
                                <p className="text-[11px] text-slate-500">
                                    6–8 characters, letters and numbers only. Must be unique.
                                </p>
                            </div>

                            <div className="pt-2">
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? "Creating…" : "Create link"}
                                </Button>
                            </div>
                        </form>
                    </section>

                    {/* Links table */}
                    <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 shadow-sm">
                        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="text-sm font-medium text-slate-100">
                                Your links
                            </h2>
                            <div className="relative w-full sm:w-64">
                                <input
                                    type="text"
                                    placeholder="Search by code or URL"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-md border border-slate-700 bg-slate-900 pl-8 pr-3 py-1.5 text-xs text-slate-50 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                />
                                <span className="pointer-events-none absolute left-2 top-1.5 text-xs text-slate-500">
                                    🔍
                                </span>
                            </div>
                        </div>

                        {loading && (
                            <div className="space-y-2 text-sm text-slate-400">
                                <div className="h-8 w-full animate-pulse rounded-md bg-slate-800/70" />
                                <div className="h-8 w-full animate-pulse rounded-md bg-slate-800/70" />
                                <div className="h-8 w-full animate-pulse rounded-md bg-slate-800/70" />
                            </div>
                        )}

                        {loadError && !loading && (
                            <div className="rounded-md border border-rose-700 bg-rose-900/40 px-3 py-2 text-xs text-rose-100">
                                Couldn&apos;t load links.
                            </div>
                        )}

                        {!loading && !loadError && filtered.length === 0 && (
                            <div className="rounded-md border border-dashed border-slate-700 bg-slate-900/40 px-4 py-6 text-center text-sm text-slate-400">
                                <p className="font-medium text-slate-200">
                                    No links yet.
                                </p>
                                <p className="text-xs text-slate-500">
                                    Create your first TinyLink using the form on the left.
                                </p>
                            </div>
                        )}

                        {!loading && !loadError && filtered.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse text-xs">
                                    <thead className="border-b border-slate-800 text-[11px] uppercase tracking-wide text-slate-500">
                                        <tr>
                                            <th className="py-2 pr-3 text-left">Code</th>
                                            <th className="px-3 py-2 text-left">Target URL</th>
                                            <th className="px-3 py-2 text-right">Clicks</th>
                                            <th className="px-3 py-2 text-left">Last clicked</th>
                                            <th className="px-3 py-2 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map((link) => {
                                            const shortUrl = `https://yourapp.com/${link.code}`;
                                            return (
                                                <tr
                                                    key={link.code}
                                                    className="border-b border-slate-800/70 last:border-none"
                                                >
                                                    <td className="py-2 pr-3 align-middle">
                                                        <Link
                                                            to={`/code/${link.code}`}
                                                            className="font-mono text-xs text-indigo-300 hover:underline"
                                                        >
                                                            {link.code}
                                                        </Link>
                                                    </td>
                                                    <td className="max-w-xs px-3 py-2 align-middle">
                                                        <a
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="block truncate text-[11px] text-slate-200 hover:text-indigo-300"
                                                            title={link.url}
                                                        >
                                                            {link.url}
                                                        </a>
                                                    </td>
                                                    <td className="px-3 py-2 text-right align-middle text-xs text-slate-200">
                                                        {link.clicks}
                                                    </td>
                                                    <td className="px-3 py-2 align-middle text-[11px] text-slate-400">
                                                        {link.lastClicked === "—"
                                                            ? "Never"
                                                            : new Date(
                                                                link.lastClicked
                                                            ).toLocaleString()}
                                                    </td>
                                                    <td className="px-3 py-2 text-right align-middle">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleCopy(shortUrl)}
                                                                className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 hover:bg-slate-800"
                                                            >
                                                                Copy
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(link.code)}
                                                                className="rounded-md border border-rose-800 bg-rose-950 px-2 py-1 text-[11px] text-rose-300 hover:bg-rose-900/70"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </>
    )
}

export default DashboardPage
