import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import StatTile from "../components/StatTile";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";
import RankedBarList from "../components/charts/RankedBarList";
import { useData } from "../context/DataContext";
import {
  getDashboardStats,
  getAltasPorMes,
  getOfertasMasCanjeadas,
  getEmpresasConEmpleados,
  getIngresoPorProveedor,
} from "../data/selectors";

function formatEuros(valor) {
  return valor.toLocaleString("es-ES") + "€";
}

export default function Dashboard() {
  const { socios, empresas, ofertas } = useData();

  const stats = getDashboardStats(socios, empresas);
  const altasPorMes = getAltasPorMes(socios, 6);
  const topOfertas = getOfertasMasCanjeadas(socios, ofertas, 5).map((entry) => ({
    label: entry.oferta.titulo,
    count: entry.count,
  }));
  const topEmpresas = getEmpresasConEmpleados(empresas, socios).slice(0, 5);
  const tasaActividad = stats.totalSocios === 0 ? 0 : Math.round((stats.sociosActivos / stats.totalSocios) * 100);

  const ingresoPorProveedor = getIngresoPorProveedor(ofertas);
  const ingresoTotal = ingresoPorProveedor.reduce((sum, p) => sum + p.total, 0);
  const ingresoItems = ingresoPorProveedor.map((p) => ({
    label: p.proveedor,
    count: p.total,
  }));

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Resumen general del club — datos de ejemplo para el prototipo."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Total socios"
          value={stats.totalSocios.toLocaleString("es-ES")}
          helper={`${stats.sociosActivos.toLocaleString("es-ES")} activos`}
        />
        <StatTile
          label="Altas este mes"
          value={`+${stats.altasDelMes}`}
          helper="julio 2026"
        />
        <StatTile
          label="Empresas afiliadas"
          value={stats.empresasAfiliadas}
          helper="pymes asociadas"
        />
        <StatTile
          label="Tasa de actividad"
          value={`${tasaActividad}%`}
          helper="socios activos sobre el total"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="p-6 lg:col-span-3">
          <h2 className="text-sm font-bold text-text-dark">
            Altas de socios · últimos 6 meses
          </h2>
          <p className="mt-0.5 text-xs text-text-muted">
            Nuevos socios registrados cada mes
          </p>
          <div className="mt-6">
            <MonthlyBarChart data={altasPorMes} />
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h2 className="text-sm font-bold text-text-dark">
            Ofertas más canjeadas
          </h2>
          <p className="mt-0.5 text-xs text-text-muted">
            Total de canjes por oferta, todo el histórico
          </p>
          <div className="mt-6">
            <RankedBarList items={topOfertas} />
          </div>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-sm font-bold text-text-dark">
              Ingreso estimado por proveedor
            </h2>
            <span className="tabular-nums text-xs font-bold text-text-muted">
              {formatEuros(ingresoTotal)} total
            </span>
          </div>
          <p className="mt-0.5 text-xs text-text-muted">
            Ingreso de intermediación generado este mes, por proveedor
          </p>
          <div className="mt-6">
            <RankedBarList items={ingresoItems} formatValue={formatEuros} />
          </div>
        </Card>

        <Card className="p-6 lg:col-span-3">
          <h2 className="text-sm font-bold text-text-dark">
            Empresas con más empleados afiliados
          </h2>
          <p className="mt-0.5 text-xs text-text-muted">
            Top 5 pymes por número de socios dados de alta
          </p>
          <ul className="mt-5 divide-y divide-border-gray">
            {topEmpresas.map((empresa) => (
              <li
                key={empresa.id}
                className="flex items-center justify-between gap-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text-dark">
                    {empresa.nombre}
                  </p>
                  <p className="text-xs text-text-muted">{empresa.sector}</p>
                </div>
                <span className="tabular-nums shrink-0 rounded-full bg-surface-tint px-3 py-1 text-sm font-bold text-brand-dark">
                  {empresa.empleados} empleados
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
