import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Badge from "../components/Badge";

const HealthPage = () => {

    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null); // { ok, version, uptime }
    const [error, setError] = useState(null);

    function simulateFetch() {
        setLoading(true);
        setError(null);

        setTimeout(() => {
            // 1 in 5 chance of error for UI demo
            const fail = Math.random() < 0.2;
            if (fail) {
                setError("Unable to reach health endpoint.");
                setStatus(null);
            } else {
                setStatus({
                    ok: true,
                    version: "1.0",
                    uptime: "2 days 4 hours 15 minutes",
                    lastChecked: new Date().toISOString(),
                });
            }
            setLoading(false);
        }, 600);
    }

    useEffect(() => {
        simulateFetch();
    }, []);


    return (
        <>
            <div className="space-y-4">
                <div>
                    <h1 className="text-lg font-semibold tracking-tight">
                        System health
                    </h1>
                    <p className="text-sm text-slate-400">
                        UI representation of <span className="font-mono">GET /healthz</span>.
                    </p>
                </div>

                <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                    {loading && (
                        <p className="text-sm text-slate-300">Checking system health…</p>
                    )}

                    {!loading && error && (
                        <div className="space-y-3">
                            <div className="rounded-md border border-rose-800 bg-rose-950/40 px-3 py-2 text-sm text-rose-100">
                                {error}
                            </div>
                            <Button onClick={simulateFetch} className="text-xs px-2.5 py-1">
                                Retry
                            </Button>
                        </div>
                    )}

                    {!loading && status && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Badge color={status.ok ? "green" : "red"}>
                                        {status.ok ? "OK" : "DOWN"}
                                    </Badge>
                                    <span className="text-sm text-slate-300">
                                        Application is{" "}
                                        {status.ok ? "healthy and responding." : "not healthy."}
                                    </span>
                                </div>
                                <div className="text-right text-[11px] text-slate-400">
                                    <p>Version</p>
                                    <p className="font-mono text-slate-200">{status.version}</p>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs text-slate-300">
                                    <p className="text-[11px] text-slate-400">Uptime</p>
                                    <p className="font-medium text-slate-50">{status.uptime}</p>
                                </div>
                                <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs text-slate-300">
                                    <p className="text-[11px] text-slate-400">Last checked</p>
                                    <p className="font-medium text-slate-50">
                                        {new Date(status.lastChecked).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button
                                    onClick={simulateFetch}
                                    className="text-xs px-2.5 py-1"
                                >
                                    Refresh
                                </Button>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </>
    )
}

export default HealthPage
