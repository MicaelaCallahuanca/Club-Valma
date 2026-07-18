import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import AlertBadge from "../components/AlertBadge";
import { PIPELINE } from "../data/mockData";
import { formatFecha } from "../lib/date";

const DIAS_ALERTA = 7;
const FECHA_CORTA = { day: "2-digit", month: "short" };

const ETAPAS = [
  { id: "Lead", accent: "border-l-status-neutral-dot", chip: "bg-status-neutral-bg text-status-neutral-text" },
  { id: "Contactado", accent: "border-l-brand-light", chip: "bg-brand-light/10 text-brand-dark" },
  { id: "Socio activo", accent: "border-l-status-good-dot", chip: "bg-status-good-bg text-status-good-text" },
];

export default function Pipeline() {
  const [leads, setLeads] = useState(PIPELINE);

  function avanzar(id) {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== id) return lead;
        const idx = ETAPAS.findIndex((e) => e.id === lead.etapa);
        const next = ETAPAS[Math.min(idx + 1, ETAPAS.length - 1)];
        // Avanzar de etapa reinicia el contador de días estancado.
        return { ...lead, etapa: next.id, diasEnEtapa: 0 };
      }),
    );
  }

  return (
    <div>
      <PageHeader
        title="Pipeline comercial"
        description="Proceso de captación de nuevos socios y empresas afiliadas."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {ETAPAS.map((etapa) => {
          const items = leads.filter((l) => l.etapa === etapa.id);
          return (
            <div key={etapa.id}>
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-sm font-bold text-text-dark">{etapa.id}</h2>
                <span className="tabular-nums rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-text-muted shadow-card">
                  {items.length}
                </span>
              </div>

              <div className="space-y-3">
                {items.map((lead) => {
                  const isLast = etapa.id === ETAPAS[ETAPAS.length - 1].id;
                  return (
                    <Card
                      key={lead.id}
                      className={`border-l-4 p-4 ${etapa.accent}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-text-dark">
                          {lead.nombre}
                        </p>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${etapa.chip}`}
                        >
                          {lead.tipo}
                        </span>
                      </div>
                      {lead.sector !== "—" && (
                        <p className="mt-1 text-xs text-text-muted">{lead.sector}</p>
                      )}
                      <div className="mt-3 flex items-center justify-between text-xs text-text-muted">
                        <span>{lead.agente}</span>
                        <span className="tabular-nums">{formatFecha(lead.fechaContacto, FECHA_CORTA)}</span>
                      </div>

                      {lead.diasEnEtapa > DIAS_ALERTA && (
                        <div className="mt-2.5">
                          <AlertBadge
                            label={`${lead.diasEnEtapa} días sin avanzar`}
                            title={`Lleva ${lead.diasEnEtapa} días en "${etapa.id}" sin pasar a la siguiente etapa`}
                          />
                        </div>
                      )}

                      {!isLast && (
                        <button
                          type="button"
                          onClick={() => avanzar(lead.id)}
                          className="mt-3 w-full rounded-[3px] border border-border-gray py-1.5 text-xs font-semibold text-brand-dark transition-colors hover:bg-surface-tint"
                        >
                          Avanzar a siguiente etapa →
                        </button>
                      )}
                    </Card>
                  );
                })}

                {items.length === 0 && (
                  <p className="rounded-[3px] border border-dashed border-border-gray p-4 text-center text-xs text-text-muted">
                    Sin registros en esta etapa
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
