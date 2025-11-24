import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { API_BASE_URL } from "../config/api";

const StatsPage = () => {
    const { code } = useParams();
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState("");
    const [link, setLink] = useState(null);

     useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setNotFound(false);
      setError("");
      try {
        const res = await fetch(`${API_BASE_URL}/api/links/${code}`);

        if (res.status === 404) {
          setNotFound(true);
          setLink(null);
          setLoading(false);
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch stats");
        }

        const json = await res.json();
        const data = json.data?.[0];
        if (!data) {
          setNotFound(true);
        } else {
          setLink(data);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching stats.");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
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
          <Button className="text-xs px-2.5 py-1">
            ← Back to dashboard
          </Button>
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
            <Button className="mt-1 text-xs px-2.5 py-1">
              Go to dashboard
            </Button>
          </Link>
        </div>
      )}

      {!loading && !notFound && error && (
        <div className="rounded-xl border border-rose-800 bg-rose-950/40 p-4 text-sm text-rose-100">
          {error}
        </div>
      )}

      {!loading && !notFound && !error && link && (
        <>
          <section className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
            <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Badge>Code</Badge>
                    <span className="font-mono text-sm text-indigo-300">
                      {link.code}
                    </span>
                  </div>
                  <a
                    href={link.long_url}
                    target="_blank"
                    rel="noreferrer"
                    title={link.long_url}
                    className="block max-w-full truncate text-xs text-slate-200 hover:text-indigo-300"
                  >
                    {link.long_url}
                  </a>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <p>Created</p>
                  <p className="font-medium text-slate-200">
                    {link.created_at
                      ? new Date(link.created_at).toLocaleString()
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <StatCard label="Total clicks" value={link.clicks ?? 0} />
                <StatCard
                  label="Last clicked"
                  value={
                    link.last_clicked
                      ? new Date(link.last_clicked).toLocaleString()
                      : "Never"
                  }
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-300">
              <h2 className="mb-2 text-sm font-medium text-slate-100">
                Notes
              </h2>
              <ul className="list-disc space-y-1 pl-4">
                
                <li>
                  Each redirect to <code>/{code}</code> increments the click
                  counter and updates the last-clicked time.
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
      <p className="text-sm font-semibold text-slate-50">{value}</p>
    </div>
  );
}
