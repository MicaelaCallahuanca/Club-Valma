import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import SocioForm from "../components/forms/SocioForm";
import { IconArrowLeft, IconAlertTriangle, IconPencil, IconTrash } from "../components/icons";
import { useData } from "../context/DataContext";
import { getSocioById, getOfertaById, socioNecesitaSeguimiento } from "../data/selectors";
import { formatFecha, formatFechaHora } from "../lib/date";

function formatMoneda(valor) {
  return valor.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "€";
}

// Small categorical tag per interaction channel — same visual language as
// the offer category chips, not the status palette (this isn't a state).
const TIPO_INTERACCION_STYLE = {
  Llamada: "bg-brand-light/10 text-brand-dark",
  Email: "bg-accent-light/20 text-accent-dark",
  Nota: "bg-surface-gray text-text-body",
};

export default function SocioDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { socios, empresas, ofertas, updateSocio, deleteSocio } = useData();
  const socio = getSocioById(socios, id);

  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  if (!socio) {
    return (
      <div>
        <button
          type="button"
          onClick={() => navigate("/socios")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark"
        >
          <IconArrowLeft /> Volver a socios
        </button>
        <Card className="p-10 text-center text-text-muted">
          No se ha encontrado este socio.
        </Card>
      </div>
    );
  }

  function handleFormSubmit(values) {
    updateSocio(socio.id, values);
    setEditing(false);
  }

  function handleConfirmDelete() {
    deleteSocio(socio.id);
    setConfirmingDelete(false);
    navigate("/socios");
  }

  const initials = socio.nombre
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate("/socios")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark hover:text-brand-light"
        >
          <IconArrowLeft /> Volver a socios
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-1.5 rounded-[3px] border border-border-gray px-3 py-1.5 text-sm font-semibold text-text-body hover:bg-surface-tint"
          >
            <IconPencil width={16} height={16} /> Editar
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className="inline-flex items-center gap-1.5 rounded-[3px] border border-border-gray px-3 py-1.5 text-sm font-semibold text-status-critical-text hover:bg-status-critical-bg"
          >
            <IconTrash width={16} height={16} /> Eliminar
          </button>
        </div>
      </div>

      {socioNecesitaSeguimiento(socio) && (
        <div className="mb-4 flex items-center gap-2 rounded-[3px] bg-status-critical-bg px-4 py-3 text-sm font-semibold text-status-critical-text">
          <IconAlertTriangle width={16} height={16} />
          {socio.pago.estado === "vencido"
            ? "Este socio tiene el pago de la cuota vencido."
            : "Este socio lleva mucho tiempo sin interactuar con el club."}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-light to-brand-dark text-lg font-black text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-black text-text-dark">
                {socio.nombre}
              </h1>
              <p className="text-sm text-text-muted">{socio.id}</p>
            </div>
          </div>

          <dl className="mt-6 space-y-4 border-t border-border-gray pt-5 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-text-muted">Estado</dt>
              <dd>
                <StatusBadge status={socio.estado} />
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-text-muted">Tipo</dt>
              <dd className="font-semibold text-text-dark">{socio.tipo}</dd>
            </div>
            {socio.empresaAfiliada && (
              <div className="flex items-center justify-between gap-3">
                <dt className="text-text-muted">Empresa afiliada</dt>
                <dd className="truncate text-right font-semibold text-text-dark">
                  {socio.empresaAfiliada}
                </dd>
              </div>
            )}
            <div className="flex items-center justify-between">
              <dt className="text-text-muted">Fecha de alta</dt>
              <dd className="font-semibold text-text-dark">
                {formatFecha(socio.fechaAlta)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-text-muted">Email</dt>
              <dd className="truncate font-semibold text-text-dark">
                {socio.email}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-text-muted">Teléfono</dt>
              <dd className="font-semibold text-text-dark">{socio.telefono}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-border-gray pt-4">
              <dt className="text-text-muted">Última actualización</dt>
              <dd className="text-right text-xs text-text-muted">
                {formatFechaHora(socio.ultimaActualizacion)}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h2 className="text-sm font-bold text-text-dark">
            Cuota y estado de pago
          </h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-text-muted">Estado de pago</dt>
              <dd>
                <StatusBadge status={socio.pago.estado} />
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-text-muted">
                {socio.pago.estado === "vencido" ? "Venció el" : "Próximo cobro"}
              </dt>
              <dd className="font-semibold text-text-dark">
                {formatFecha(socio.pago.proximoCobro)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-text-muted">Cuota mensual</dt>
              <dd className="tabular-nums font-semibold text-text-dark">
                {formatMoneda(socio.pago.cuota)}
              </dd>
            </div>
          </dl>
        </Card>
        </div>

        <div className="space-y-4 lg:col-span-2">
        <Card className="p-6">
          <h2 className="text-sm font-bold text-text-dark">
            Historial de ofertas canjeadas
          </h2>
          <p className="mt-0.5 text-xs text-text-muted">
            {socio.ofertasCanjeadas.length === 0
              ? "Este socio todavía no ha canjeado ninguna oferta."
              : `${socio.ofertasCanjeadas.length} canjes en total`}
          </p>

          {socio.ofertasCanjeadas.length > 0 && (
            <ul className="mt-5 divide-y divide-border-gray">
              {socio.ofertasCanjeadas.map((canje, i) => {
                const oferta = getOfertaById(ofertas, canje.ofertaId);
                if (!oferta) return null;
                return (
                  <li key={i} className="flex items-center justify-between gap-4 py-3.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-text-dark">
                        {oferta.titulo}
                      </p>
                      <p className="text-xs text-text-muted">
                        {oferta.categoria} · {oferta.proveedor}
                      </p>
                    </div>
                    <span className="tabular-nums shrink-0 text-xs text-text-muted">
                      {formatFecha(canje.fecha)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-sm font-bold text-text-dark">
            Historial de interacciones
          </h2>
          <p className="mt-0.5 text-xs text-text-muted">
            {socio.interacciones.length === 0
              ? "Todavía no se ha registrado ningún contacto con este socio."
              : "Últimos contactos registrados con este socio"}
          </p>

          <ul className="mt-5 divide-y divide-border-gray">
            {socio.interacciones.map((interaccion, i) => (
              <li key={i} className="flex items-start justify-between gap-4 py-3.5">
                <div className="min-w-0">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${TIPO_INTERACCION_STYLE[interaccion.tipo]}`}
                  >
                    {interaccion.tipo}
                  </span>
                  <p className="mt-1.5 text-sm text-text-body">{interaccion.texto}</p>
                </div>
                <span className="tabular-nums shrink-0 text-xs text-text-muted">
                  {formatFecha(interaccion.fecha)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
        </div>
      </div>

      {socio.empresaId && (
        <p className="mt-4 text-sm text-text-body">
          Ver ficha de la empresa afiliada en{" "}
          <Link to="/empresas" className="font-semibold text-brand-dark hover:text-brand-light">
            Empresas afiliadas →
          </Link>
        </p>
      )}

      <Modal open={editing} onClose={() => setEditing(false)} title="Editar socio">
        <SocioForm
          socio={socio}
          empresas={empresas}
          onSubmit={handleFormSubmit}
          onCancel={() => setEditing(false)}
        />
      </Modal>

      <ConfirmModal
        open={confirmingDelete}
        title="Eliminar socio"
        message={`¿Seguro que quieres eliminar a ${socio.nombre}? Esta acción no se puede deshacer.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmingDelete(false)}
      />
    </div>
  );
}
