import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import Badge from "../components/Badge";

const StatsPage = () => {
    const { code } = useParams();
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        setLoading(true);
        setNotFound(false);

        // simulate API
        const t = setTimeout(() => {
            if (code === "missing") {
                setNotFound(true);
                setData(null);
            } else {
                setData({
                    code,
                    url: "https://example.com/docs/tiny-link",
                    clicks: 42,
                    lastClicked: "2025-11-21T09:10:00Z",
                    createdAt: "2025-11-18T15:00:00Z",
                    todayClicks: 3,
                    weekClicks: 18,
                });
            }
            setLoading(false);
        }, 600);

        return () => clearTimeout(t);
    }, [code]);
    return (
        <>
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-lg font-semibold tracking-tight">
                            Link stats
                        </h1>
                        <p className="text-sm text-slate-400">
                            Detailed stats for <span className="font-mono">{code}</span>
                        </p>
                    </div>
                    <Link to="/">
                        <Button className="text-xs px-2.5 py-1">← Back to dashboard</Button>
                    </Link>
                </div>

                {loading && (
                    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300">
                        Fetching stats…
                    </div>
                )}

                {!loading && notFound && (
                    <div className="space-y-3 rounded-xl border border-rose-800 bg-rose-950/40 p-4 text-sm">
                        <p className="font-medium text-rose-100">
                            No link found for code <span className="font-mono">{code}</span>.
                        </p>
                        <p className="text-xs text-rose-200/80">
                            Ensure the code is correct or create a new TinyLink from the
                            dashboard.
                        </p>
                        <Link to="/">
                            <Button className="mt-1 text-xs px-2.5 py-1">Go to dashboard</Button>
                        </Link>
                    </div>
                )}

                {!loading && data && (
                    <>
                        <section className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
                            <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <div className="mb-1 flex items-center gap-2">
                                            <Badge>Code</Badge>
                                            <span className="font-mono text-sm text-indigo-300">
                                                {data.code}
                                            </span>
                                        </div>
                                        <a
                                            href={data.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            title={data.url}
                                            className="block max-w-full truncate text-xs text-slate-200 hover:text-indigo-300"
                                        >
                                            {data.url}
                                        </a>
                                    </div>
                                    <div className="text-right text-[11px] text-slate-400">
                                        <p>Created</p>
                                        <p className="font-medium text-slate-200">
                                            {new Date(data.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                                    <StatCard label="Total clicks" value={data.clicks} />
                                    <StatCard
                                        label="Today's clicks"
                                        value={data.todayClicks}
                                    />
                                    <StatCard
                                        label="Last 7 days"
                                        value={data.weekClicks}
                                    />
                                </div>

                                <div className="mt-4 rounded-md border border-slate-800 bg-slate-950/60 px-3 py-2 text-[11px] text-slate-400">
                                    Last clicked:{" "}
                                    <span className="font-medium text-slate-200">
                                        {new Date(data.lastClicked).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-300">
                                <h2 className="mb-2 text-sm font-medium text-slate-100">
                                    Notes
                                </h2>
                                <ul className="list-disc space-y-1 pl-4">
                                    <li>This page corresponds to <code>/api/links/:code</code>.</li>
                                    <li>
                                        In the real app, each redirect to <code>/{code}</code>{" "}
                                        increments the click counter and updates the last-clicked
                                        time.
                                    </li>
                                    <li>
                                        You can extend this with charts (e.g. daily clicks) using a
                                        simple line chart component.
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </>
    )
}

export default StatsPage

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2.5">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="text-lg font-semibold text-slate-50">{value}</p>
    </div>
  );
}
