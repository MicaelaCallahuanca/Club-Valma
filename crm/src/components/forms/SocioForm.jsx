import { useState } from "react";
import { labelClass, inputClass } from "./fieldStyles";
import { HOY_ISO } from "../../data/mockData";

function blankValues() {
  return {
    nombre: "",
    tipo: "Particular",
    empresaId: "",
    estado: "activo",
    fechaAlta: HOY_ISO,
    email: "",
    telefono: "",
  };
}

export default function SocioForm({ socio, empresas, onSubmit, onCancel }) {
  const [values, setValues] = useState(() =>
    socio
      ? {
          nombre: socio.nombre,
          tipo: socio.tipo,
          empresaId: socio.empresaId ?? "",
          estado: socio.estado,
          fechaAlta: socio.fechaAlta,
          email: socio.email,
          telefono: socio.telefono,
        }
      : blankValues(),
  );

  function set(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const empresa = empresas.find((emp) => emp.id === values.empresaId);
    onSubmit({
      nombre: values.nombre.trim(),
      tipo: values.tipo,
      empresaId: values.tipo === "Empresa" ? values.empresaId || null : null,
      empresaAfiliada: values.tipo === "Empresa" ? (empresa?.nombre ?? null) : null,
      estado: values.estado,
      fechaAlta: values.fechaAlta,
      email: values.email.trim(),
      telefono: values.telefono.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className={labelClass}>Nombre</span>
        <input
          type="text"
          required
          value={values.nombre}
          onChange={set("nombre")}
          className={inputClass}
          placeholder="Nombre y apellidos"
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className={labelClass}>Tipo</span>
          <select value={values.tipo} onChange={set("tipo")} className={inputClass}>
            <option value="Particular">Particular</option>
            <option value="Empresa">Empresa</option>
          </select>
        </label>

        <label className="block">
          <span className={labelClass}>Estado</span>
          <select value={values.estado} onChange={set("estado")} className={inputClass}>
            <option value="activo">Activo</option>
            <option value="pendiente">Pendiente</option>
            <option value="baja">Baja</option>
          </select>
        </label>
      </div>

      {values.tipo === "Empresa" && (
        <label className="block">
          <span className={labelClass}>Empresa afiliada</span>
          <select value={values.empresaId} onChange={set("empresaId")} className={inputClass}>
            <option value="">Sin empresa asociada</option>
            {empresas.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.nombre}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="block">
        <span className={labelClass}>Fecha de alta</span>
        <input
          type="date"
          required
          value={values.fechaAlta}
          onChange={set("fechaAlta")}
          className={inputClass}
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className={labelClass}>Email</span>
          <input
            type="email"
            required
            value={values.email}
            onChange={set("email")}
            className={inputClass}
            placeholder="socio@ejemplo.com"
          />
        </label>

        <label className="block">
          <span className={labelClass}>Teléfono</span>
          <input
            type="tel"
            required
            value={values.telefono}
            onChange={set("telefono")}
            className={inputClass}
            placeholder="600000000"
          />
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-[3px] border border-border-gray px-4 py-2 text-sm font-semibold text-text-body hover:bg-surface-tint"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-[3px] bg-gradient-to-br from-brand-light to-brand-dark px-5 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
