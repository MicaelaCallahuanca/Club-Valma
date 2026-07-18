import { useState } from "react";
import { labelClass, inputClass } from "./fieldStyles";
import { HOY_ISO } from "../../data/mockData";

function blankValues() {
  return { nombre: "", sector: "", fechaAfiliacion: HOY_ISO, contacto: "" };
}

export default function EmpresaForm({ empresa, onSubmit, onCancel }) {
  const [values, setValues] = useState(() =>
    empresa
      ? {
          nombre: empresa.nombre,
          sector: empresa.sector,
          fechaAfiliacion: empresa.fechaAfiliacion,
          contacto: empresa.contacto,
        }
      : blankValues(),
  );

  function set(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      nombre: values.nombre.trim(),
      sector: values.sector.trim(),
      fechaAfiliacion: values.fechaAfiliacion,
      contacto: values.contacto.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className={labelClass}>Nombre de la empresa</span>
        <input
          type="text"
          required
          value={values.nombre}
          onChange={set("nombre")}
          className={inputClass}
          placeholder="Razón social"
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className={labelClass}>Sector</span>
          <input
            type="text"
            required
            value={values.sector}
            onChange={set("sector")}
            className={inputClass}
            placeholder="Ej. Retail"
          />
        </label>

        <label className="block">
          <span className={labelClass}>Afiliada desde</span>
          <input
            type="date"
            required
            value={values.fechaAfiliacion}
            onChange={set("fechaAfiliacion")}
            className={inputClass}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Persona de contacto</span>
        <input
          type="text"
          required
          value={values.contacto}
          onChange={set("contacto")}
          className={inputClass}
          placeholder="Nombre y apellidos"
        />
      </label>

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
