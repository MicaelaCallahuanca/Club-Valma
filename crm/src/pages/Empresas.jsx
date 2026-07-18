import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import EmpresaForm from "../components/forms/EmpresaForm";
import { IconSearch, IconPlus, IconPencil, IconTrash } from "../components/icons";
import { useData } from "../context/DataContext";
import { getEmpresasConEmpleados } from "../data/selectors";
import { formatFecha, formatFechaHora } from "../lib/date";

const FECHA_CORTA = { day: "2-digit", month: "short", year: "numeric" };

export default function Empresas() {
  const { socios, empresas: rawEmpresas, addEmpresa, updateEmpresa, deleteEmpresa } = useData();
  const [query, setQuery] = useState("");

  const [formState, setFormState] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const empresas = useMemo(
    () => getEmpresasConEmpleados(rawEmpresas, socios),
    [rawEmpresas, socios],
  );

  const filtered = empresas.filter((e) =>
    e.nombre.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const maxEmpleados = Math.max(...empresas.map((e) => e.empleados), 1);

  function handleFormSubmit(values) {
    if (formState.mode === "create") {
      addEmpresa(values);
    } else {
      updateEmpresa(formState.empresa.id, values);
    }
    setFormState(null);
  }

  function handleConfirmDelete() {
    deleteEmpresa(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <div>
      <PageHeader
        title="Empresas afiliadas"
        description={`${empresas.length} pymes asociadas al club`}
        actions={
          <button
            type="button"
            onClick={() => setFormState({ mode: "create" })}
            className="inline-flex items-center gap-2 rounded-[3px] bg-gradient-to-br from-brand-light to-brand-dark px-4 py-2.5 text-sm font-bold text-white shadow-card hover:opacity-90"
          >
            <IconPlus width={16} height={16} />
            Agregar empresa
          </button>
        }
      />

      <Card className="p-5">
        <div className="relative max-w-sm">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar empresa…"
            className="w-full rounded-[3px] border border-border-gray py-2.5 pl-10 pr-3 text-sm text-text-dark outline-none focus:border-brand-light"
          />
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-gray text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
                <th className="py-3 pr-4">Empresa</th>
                <th className="py-3 pr-4">Sector</th>
                <th className="py-3 pr-4">Afiliada desde</th>
                <th className="py-3 pr-4">Contacto</th>
                <th className="py-3 pr-4">Empleados dados de alta</th>
                <th className="py-3 pr-4">Última actualización</th>
                <th className="py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((empresa) => (
                <tr
                  key={empresa.id}
                  className="border-b border-border-gray last:border-0"
                >
                  <td className="py-3.5 pr-4 font-semibold text-text-dark">
                    {empresa.nombre}
                  </td>
                  <td className="py-3.5 pr-4 text-text-body">{empresa.sector}</td>
                  <td className="tabular-nums py-3.5 pr-4 text-text-body">
                    {formatFecha(empresa.fechaAfiliacion, FECHA_CORTA)}
                  </td>
                  <td className="py-3.5 pr-4 text-text-body">{empresa.contacto}</td>
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-[4px] bg-surface-gray">
                        <div
                          className="h-full rounded-[4px] bg-gradient-to-r from-brand-light to-brand-dark"
                          style={{
                            width: `${Math.max((empresa.empleados / maxEmpleados) * 100, 4)}%`,
                          }}
                        />
                      </div>
                      <span className="tabular-nums text-sm font-bold text-text-dark">
                        {empresa.empleados}
                      </span>
                    </div>
                  </td>
                  <td className="tabular-nums py-3.5 pr-4 text-xs text-text-muted">
                    {formatFechaHora(empresa.ultimaActualizacion)}
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setFormState({ mode: "edit", empresa })}
                        className="rounded-[3px] p-1.5 text-text-muted hover:bg-surface-tint hover:text-brand-dark"
                        aria-label={`Editar ${empresa.nombre}`}
                      >
                        <IconPencil width={16} height={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(empresa)}
                        className="rounded-[3px] p-1.5 text-text-muted hover:bg-status-critical-bg hover:text-status-critical-text"
                        aria-label={`Eliminar ${empresa.nombre}`}
                      >
                        <IconTrash width={16} height={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-text-muted">
                    No hay empresas que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={formState !== null}
        onClose={() => setFormState(null)}
        title={formState?.mode === "edit" ? "Editar empresa" : "Agregar empresa"}
      >
        {formState && (
          <EmpresaForm
            empresa={formState.mode === "edit" ? formState.empresa : null}
            onSubmit={handleFormSubmit}
            onCancel={() => setFormState(null)}
          />
        )}
      </Modal>

      <ConfirmModal
        open={deleteTarget !== null}
        title="Eliminar empresa"
        message={
          deleteTarget &&
          (deleteTarget.empleados > 0
            ? `¿Seguro que quieres eliminar ${deleteTarget.nombre}? Tiene ${deleteTarget.empleados} socio(s) afiliados — sus fichas no se eliminarán, pero quedarán sin empresa asociada. Esta acción no se puede deshacer.`
            : `¿Seguro que quieres eliminar ${deleteTarget.nombre}? Esta acción no se puede deshacer.`)
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
