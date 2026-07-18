import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import AlertBadge from "../components/AlertBadge";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import SocioForm from "../components/forms/SocioForm";
import { IconSearch, IconChevronRight, IconPlus, IconPencil, IconTrash } from "../components/icons";
import { useData } from "../context/DataContext";
import { socioNecesitaSeguimiento } from "../data/selectors";
import { formatFecha } from "../lib/date";

const PAGE_SIZE = 12;
const FECHA_CORTA = { day: "2-digit", month: "short", year: "numeric" };

export default function Socios() {
  const navigate = useNavigate();
  const { socios, empresas, addSocio, updateSocio, deleteSocio } = useData();

  const [query, setQuery] = useState("");
  const [tipo, setTipo] = useState("todos");
  const [estado, setEstado] = useState("todos");
  const [soloAlertas, setSoloAlertas] = useState(false);
  const [page, setPage] = useState(1);

  // null = closed, { mode: "create" } | { mode: "edit", socio }
  const [formState, setFormState] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const totalAlertas = useMemo(
    () => socios.filter(socioNecesitaSeguimiento).length,
    [socios],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return socios.filter((s) => {
      if (q && !s.nombre.toLowerCase().includes(q)) return false;
      if (tipo !== "todos" && s.tipo !== tipo) return false;
      if (estado !== "todos" && s.estado !== estado) return false;
      if (soloAlertas && !socioNecesitaSeguimiento(s)) return false;
      return true;
    });
  }, [socios, query, tipo, estado, soloAlertas]);

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function updateFilter(setter) {
    return (e) => {
      setter(e.target.value);
      setPage(1);
    };
  }

  function handleFormSubmit(values) {
    if (formState.mode === "create") {
      addSocio(values);
    } else {
      updateSocio(formState.socio.id, values);
    }
    setFormState(null);
  }

  function handleConfirmDelete() {
    deleteSocio(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <div>
      <PageHeader
        title="Socios"
        description={`${socios.length.toLocaleString("es-ES")} socios registrados`}
        actions={
          <button
            type="button"
            onClick={() => setFormState({ mode: "create" })}
            className="inline-flex items-center gap-2 rounded-[3px] bg-gradient-to-br from-brand-light to-brand-dark px-4 py-2.5 text-sm font-bold text-white shadow-card hover:opacity-90"
          >
            <IconPlus width={16} height={16} />
            Agregar socio
          </button>
        }
      />

      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={updateFilter(setQuery)}
              placeholder="Buscar socio por nombre…"
              className="w-full rounded-[3px] border border-border-gray py-2.5 pl-10 pr-3 text-sm text-text-dark outline-none focus:border-brand-light"
            />
          </div>

          <select
            value={tipo}
            onChange={updateFilter(setTipo)}
            className="rounded-[3px] border border-border-gray py-2.5 px-3 text-sm text-text-dark outline-none focus:border-brand-light"
          >
            <option value="todos">Todos los tipos</option>
            <option value="Particular">Particular</option>
            <option value="Empresa">Empresa</option>
          </select>

          <select
            value={estado}
            onChange={updateFilter(setEstado)}
            className="rounded-[3px] border border-border-gray py-2.5 px-3 text-sm text-text-dark outline-none focus:border-brand-light"
          >
            <option value="todos">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="pendiente">Pendiente</option>
            <option value="baja">Baja</option>
          </select>

          <label className="flex items-center gap-2 text-sm font-medium text-text-body">
            <input
              type="checkbox"
              checked={soloAlertas}
              onChange={(e) => {
                setSoloAlertas(e.target.checked);
                setPage(1);
              }}
              className="h-4 w-4 rounded border-border-gray accent-brand-dark"
            />
            Solo con alertas ({totalAlertas})
          </label>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-gray text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
                <th className="py-3 pr-4">Nombre</th>
                <th className="py-3 pr-4">Tipo</th>
                <th className="py-3 pr-4">Empresa afiliada</th>
                <th className="py-3 pr-4">Estado</th>
                <th className="py-3 pr-4">Fecha de alta</th>
                <th className="py-3 pr-4" />
                <th className="py-3" />
              </tr>
            </thead>
            <tbody>
              {pageItems.map((socio) => (
                <tr
                  key={socio.id}
                  onClick={() => navigate(`/socios/${socio.id}`)}
                  className="cursor-pointer border-b border-border-gray last:border-0 hover:bg-surface-tint"
                >
                  <td className="py-3 pr-4 font-semibold text-text-dark">
                    {socio.nombre}
                  </td>
                  <td className="py-3 pr-4 text-text-body">{socio.tipo}</td>
                  <td className="py-3 pr-4 text-text-body">
                    {socio.empresaAfiliada ?? (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <StatusBadge status={socio.estado} />
                      {socioNecesitaSeguimiento(socio) && (
                        <AlertBadge
                          label="Seguimiento"
                          title={
                            socio.pago.estado === "vencido"
                              ? "Pago de cuota vencido"
                              : "Inactivo desde hace tiempo"
                          }
                        />
                      )}
                    </div>
                  </td>
                  <td className="tabular-nums py-3 pr-4 text-text-body">
                    {formatFecha(socio.fechaAlta, FECHA_CORTA)}
                  </td>
                  <td className="py-3 pr-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setFormState({ mode: "edit", socio })}
                        className="rounded-[3px] p-1.5 text-text-muted hover:bg-surface-tint hover:text-brand-dark"
                        aria-label={`Editar a ${socio.nombre}`}
                      >
                        <IconPencil width={16} height={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(socio)}
                        className="rounded-[3px] p-1.5 text-text-muted hover:bg-status-critical-bg hover:text-status-critical-text"
                        aria-label={`Eliminar a ${socio.nombre}`}
                      >
                        <IconTrash width={16} height={16} />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 text-text-muted">
                    <IconChevronRight />
                  </td>
                </tr>
              ))}

              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-text-muted">
                    No hay socios que coincidan con estos filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex items-center justify-between text-sm text-text-muted">
          <span>
            Mostrando {pageItems.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}
            –{(currentPage - 1) * PAGE_SIZE + pageItems.length} de {filtered.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-[3px] border border-border-gray px-3 py-1.5 font-semibold text-text-body disabled:opacity-40 enabled:hover:bg-surface-tint"
            >
              Anterior
            </button>
            <span className="px-1 text-text-body">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-[3px] border border-border-gray px-3 py-1.5 font-semibold text-text-body disabled:opacity-40 enabled:hover:bg-surface-tint"
            >
              Siguiente
            </button>
          </div>
        </div>
      </Card>

      <Modal
        open={formState !== null}
        onClose={() => setFormState(null)}
        title={formState?.mode === "edit" ? "Editar socio" : "Agregar socio"}
      >
        {formState && (
          <SocioForm
            socio={formState.mode === "edit" ? formState.socio : null}
            empresas={empresas}
            onSubmit={handleFormSubmit}
            onCancel={() => setFormState(null)}
          />
        )}
      </Modal>

      <ConfirmModal
        open={deleteTarget !== null}
        title="Eliminar socio"
        message={
          deleteTarget && `¿Seguro que quieres eliminar a ${deleteTarget.nombre}? Esta acción no se puede deshacer.`
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
