// Derived/query functions over the CRM's live collections. These used to
// close over the static SOCIOS/EMPRESAS/OFERTAS arrays in mockData.js, but
// now that those collections live in DataContext (so CRUD edits actually
// stick and the Dashboard reacts to them), every function here takes the
// current collection as an argument instead — plain, parameterized
// selectors rather than functions with implicit global state.

import { parseLocalDate } from "../lib/date";

// Kept in sync with mockData's fictional "today" (2026-07-18) so month-level
// aggregates (altas este mes, etc.) agree with how the seed data was built.
const HOY = new Date(2026, 6, 18);

export function getEmpresasConEmpleados(empresas, socios) {
  return empresas
    .map((empresa) => ({
      ...empresa,
      empleados: socios.filter((s) => s.empresaId === empresa.id).length,
      empleadosActivos: socios.filter((s) => s.empresaId === empresa.id && s.estado === "activo").length,
    }))
    .sort((a, b) => b.empleados - a.empleados);
}

export function getAltasPorMes(socios, numMeses = 6) {
  const meses = [];
  for (let i = numMeses - 1; i >= 0; i--) {
    const d = new Date(HOY.getFullYear(), HOY.getMonth() - i, 1);
    meses.push({ year: d.getFullYear(), month: d.getMonth(), label: d.toLocaleDateString("es-ES", { month: "short" }) });
  }
  return meses.map(({ year, month, label }) => {
    const count = socios.filter((s) => {
      const d = parseLocalDate(s.fechaAlta);
      return d.getFullYear() === year && d.getMonth() === month;
    }).length;
    return { label: label.replace(".", ""), count };
  });
}

export function getOfertasMasCanjeadas(socios, ofertas, top = 5) {
  const counts = new Map();
  for (const socio of socios) {
    for (const canje of socio.ofertasCanjeadas) {
      counts.set(canje.ofertaId, (counts.get(canje.ofertaId) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([ofertaId, count]) => ({ oferta: ofertas.find((o) => o.id === ofertaId), count }))
    .filter((entry) => entry.oferta)
    .sort((a, b) => b.count - a.count)
    .slice(0, top);
}

export function getDashboardStats(socios, empresas) {
  const altasDelMes = socios.filter((s) => {
    const d = parseLocalDate(s.fechaAlta);
    return d.getFullYear() === HOY.getFullYear() && d.getMonth() === HOY.getMonth();
  }).length;
  return {
    totalSocios: socios.length,
    sociosActivos: socios.filter((s) => s.estado === "activo").length,
    altasDelMes,
    empresasAfiliadas: empresas.length,
    totalCanjes: socios.reduce((sum, s) => sum + s.ofertasCanjeadas.length, 0),
  };
}

export function getSocioById(socios, id) {
  return socios.find((s) => s.id === id) || null;
}

export function getOfertaById(ofertas, id) {
  return ofertas.find((o) => o.id === id) || null;
}

// Ingreso estimado por proveedor este mes — suma de ingresoMes de todas las
// ofertas de ese proveedor (una oferta pausada aporta 0).
export function getIngresoPorProveedor(ofertas) {
  const totals = new Map();
  for (const oferta of ofertas) {
    totals.set(oferta.proveedor, (totals.get(oferta.proveedor) || 0) + oferta.ingresoMes);
  }
  return [...totals.entries()]
    .map(([proveedor, total]) => ({ proveedor, total }))
    .sort((a, b) => b.total - a.total);
}

// Un socio necesita seguimiento si tiene el pago vencido o lleva mucho
// tiempo sin interactuar con el club — la señal que dispara el badge de
// alerta en la lista de socios.
export function socioNecesitaSeguimiento(socio) {
  return socio.pago?.estado === "vencido" || socio.inactivoLargo;
}
