import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import OfertaForm from "../components/forms/OfertaForm";
import { IconPlus, IconPencil, IconTrash } from "../components/icons";
import { useData } from "../context/DataContext";
import { CATEGORIAS } from "../data/mockData";
import { formatFecha, formatFechaHora } from "../lib/date";

const FECHA_CORTA = { day: "2-digit", month: "short", year: "numeric" };

function formatEuros(valor) {
  return valor.toLocaleString("es-ES") + "€";
}

export default function Ofertas() {
  const { ofertas, addOferta, updateOferta, deleteOferta } = useData();
  const [categoria, setCategoria] = useState("Todas");

  const [formState, setFormState] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtradas = ofertas.filter(
    (o) => categoria === "Todas" || o.categoria === categoria,
  );

  function handleFormSubmit(values) {
    if (formState.mode === "create") {
      addOferta(values);
    } else {
      updateOferta(formState.oferta.id, values);
    }
    setFormState(null);
  }

  function handleConfirmDelete() {
    deleteOferta(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <div>
      <PageHeader
        title="Catálogo de ofertas"
        description="Condiciones negociadas vigentes, por proveedor y categoría."
        actions={
          <button
            type="button"
            onClick={() => setFormState({ mode: "create" })}
            className="inline-flex items-center gap-2 rounded-[3px] bg-gradient-to-br from-brand-light to-brand-dark px-4 py-2.5 text-sm font-bold text-white shadow-card hover:opacity-90"
          >
            <IconPlus width={16} height={16} />
            Agregar oferta
          </button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {["Todas", ...CATEGORIAS].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategoria(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              categoria === cat
                ? "bg-gradient-to-br from-brand-light to-brand-dark text-white"
                : "bg-white text-text-body shadow-card hover:text-brand-dark"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtradas.map((oferta) => (
          <Card key={oferta.id} className="flex flex-col p-6">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-brand-dark">
                {oferta.categoria}
              </span>
              <div className="flex items-center gap-1">
                <StatusBadge status={oferta.vigencia} />
                <button
                  type="button"
                  onClick={() => setFormState({ mode: "edit", oferta })}
                  className="rounded-[3px] p-1 text-text-muted hover:bg-surface-tint hover:text-brand-dark"
                  aria-label={`Editar ${oferta.titulo}`}
                >
                  <IconPencil width={15} height={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(oferta)}
                  className="rounded-[3px] p-1 text-text-muted hover:bg-status-critical-bg hover:text-status-critical-text"
                  aria-label={`Eliminar ${oferta.titulo}`}
                >
                  <IconTrash width={15} height={15} />
                </button>
              </div>
            </div>

            <h2 className="mt-2 text-lg font-bold text-text-dark">{oferta.titulo}</h2>
            <p className="text-xs text-text-muted">{oferta.proveedor}</p>

            <p className="mt-3 flex-1 text-sm text-text-body">{oferta.condicion}</p>

            <div className="mt-5 flex items-center justify-between border-t border-border-gray pt-4">
              <span className="rounded-full bg-surface-tint px-2.5 py-1 text-xs font-bold text-brand-dark">
                {oferta.descuento}
              </span>
              <span className="text-xs text-text-muted">
                Desde {formatFecha(oferta.fechaInicio, FECHA_CORTA)}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-text-muted">Ingreso generado este mes</span>
              <span className="tabular-nums font-bold text-text-dark">
                {oferta.ingresoMes > 0 ? formatEuros(oferta.ingresoMes) : "—"}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-text-muted">Última actualización</span>
              <span className="tabular-nums text-text-muted">
                {formatFechaHora(oferta.ultimaActualizacion)}
              </span>
            </div>
          </Card>
        ))}

        {filtradas.length === 0 && (
          <p className="col-span-full py-10 text-center text-text-muted">
            No hay ofertas en esta categoría.
          </p>
        )}
      </div>

      <Modal
        open={formState !== null}
        onClose={() => setFormState(null)}
        title={formState?.mode === "edit" ? "Editar oferta" : "Agregar oferta"}
      >
        {formState && (
          <OfertaForm
            oferta={formState.mode === "edit" ? formState.oferta : null}
            onSubmit={handleFormSubmit}
            onCancel={() => setFormState(null)}
          />
        )}
      </Modal>

      <ConfirmModal
        open={deleteTarget !== null}
        title="Eliminar oferta"
        message={
          deleteTarget &&
          `¿Seguro que quieres eliminar "${deleteTarget.titulo}"? Esta acción no se puede deshacer.`
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
