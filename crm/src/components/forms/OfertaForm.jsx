import { useState } from "react";
import { labelClass, inputClass } from "./fieldStyles";
import { CATEGORIAS, HOY_ISO } from "../../data/mockData";

function blankValues() {
  return {
    titulo: "",
    categoria: CATEGORIAS[0],
    proveedor: "",
    condicion: "",
    descuento: "",
    vigencia: "activa",
    fechaInicio: HOY_ISO,
    ingresoMes: "",
  };
}

export default function OfertaForm({ oferta, onSubmit, onCancel }) {
  const [values, setValues] = useState(() =>
    oferta
      ? {
          titulo: oferta.titulo,
          categoria: oferta.categoria,
          proveedor: oferta.proveedor,
          condicion: oferta.condicion,
          descuento: oferta.descuento,
          vigencia: oferta.vigencia,
          fechaInicio: oferta.fechaInicio,
          ingresoMes: String(oferta.ingresoMes),
        }
      : blankValues(),
  );

  function set(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      titulo: values.titulo.trim(),
      categoria: values.categoria,
      proveedor: values.proveedor.trim(),
      condicion: values.condicion.trim(),
      descuento: values.descuento.trim(),
      vigencia: values.vigencia,
      fechaInicio: values.fechaInicio,
      ingresoMes: Math.max(Number(values.ingresoMes) || 0, 0),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className={labelClass}>Título de la oferta</span>
        <input
          type="text"
          required
          value={values.titulo}
          onChange={set("titulo")}
          className={inputClass}
          placeholder="Ej. Seguro de salud"
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className={labelClass}>Categoría</span>
          <select value={values.categoria} onChange={set("categoria")} className={inputClass}>
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className={labelClass}>Proveedor</span>
          <input
            type="text"
            required
            value={values.proveedor}
            onChange={set("proveedor")}
            className={inputClass}
            placeholder="Nombre del proveedor"
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Condiciones</span>
        <input
          type="text"
          required
          value={values.condicion}
          onChange={set("condicion")}
          className={inputClass}
          placeholder="Ej. Desde 34,90€/mes, sin carencias"
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className={labelClass}>Descuento para socios</span>
          <input
            type="text"
            required
            value={values.descuento}
            onChange={set("descuento")}
            className={inputClass}
            placeholder="Ej. -30% socios"
          />
        </label>

        <label className="block">
          <span className={labelClass}>Vigencia</span>
          <select value={values.vigencia} onChange={set("vigencia")} className={inputClass}>
            <option value="activa">Activa</option>
            <option value="pausada">Pausada</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className={labelClass}>Vigente desde</span>
          <input
            type="date"
            required
            value={values.fechaInicio}
            onChange={set("fechaInicio")}
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className={labelClass}>Ingreso generado este mes (€)</span>
          <input
            type="number"
            min="0"
            step="1"
            value={values.ingresoMes}
            onChange={set("ingresoMes")}
            className={inputClass}
            placeholder="0"
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
