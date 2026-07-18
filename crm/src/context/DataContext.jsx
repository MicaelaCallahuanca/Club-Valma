import { createContext, useContext, useReducer } from "react";
import { SOCIOS as SEED_SOCIOS, EMPRESAS as SEED_EMPRESAS, OFERTAS as SEED_OFERTAS } from "../data/mockData";

// Local-only CRUD state for the CRM prototype — no backend yet. Everything
// here resets on page refresh, by design (see the brief this shipped
// against). Socios/Empresas/Ofertas live here instead of as static
// mockData exports so every page (including the Dashboard, which only
// reads) reacts to edits made anywhere else in the app.

function newId(prefix) {
  const random = (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`).slice(0, 8);
  return `${prefix}-${random}`;
}

function nowIso() {
  return new Date().toISOString();
}

const initialState = {
  // Seed data starts with ultimaActualizacion: null — "never edited since
  // the prototype loaded" is a more honest default than backfilling a fake
  // timestamp for records nobody has actually touched yet.
  socios: SEED_SOCIOS.map((s) => ({ ...s, ultimaActualizacion: null })),
  empresas: SEED_EMPRESAS.map((e) => ({ ...e, ultimaActualizacion: null })),
  ofertas: SEED_OFERTAS.map((o) => ({ ...o, ultimaActualizacion: null })),
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_SOCIO": {
      const socio = {
        id: newId("soc"),
        ofertasCanjeadas: [],
        interacciones: [],
        pago: { estado: "al_dia", proximoCobro: null, cuota: 4.9 },
        inactivoLargo: false,
        ...action.payload,
        ultimaActualizacion: nowIso(),
      };
      return { ...state, socios: [socio, ...state.socios] };
    }
    case "UPDATE_SOCIO": {
      return {
        ...state,
        socios: state.socios.map((s) =>
          s.id === action.id ? { ...s, ...action.changes, ultimaActualizacion: nowIso() } : s,
        ),
      };
    }
    case "DELETE_SOCIO": {
      return { ...state, socios: state.socios.filter((s) => s.id !== action.id) };
    }

    case "ADD_EMPRESA": {
      const empresa = { id: newId("emp"), ...action.payload, ultimaActualizacion: nowIso() };
      return { ...state, empresas: [empresa, ...state.empresas] };
    }
    case "UPDATE_EMPRESA": {
      return {
        ...state,
        empresas: state.empresas.map((e) =>
          e.id === action.id ? { ...e, ...action.changes, ultimaActualizacion: nowIso() } : e,
        ),
      };
    }
    case "DELETE_EMPRESA": {
      return { ...state, empresas: state.empresas.filter((e) => e.id !== action.id) };
    }

    case "ADD_OFERTA": {
      const oferta = { id: newId("of"), ...action.payload, ultimaActualizacion: nowIso() };
      return { ...state, ofertas: [oferta, ...state.ofertas] };
    }
    case "UPDATE_OFERTA": {
      return {
        ...state,
        ofertas: state.ofertas.map((o) =>
          o.id === action.id ? { ...o, ...action.changes, ultimaActualizacion: nowIso() } : o,
        ),
      };
    }
    case "DELETE_OFERTA": {
      return { ...state, ofertas: state.ofertas.filter((o) => o.id !== action.id) };
    }

    default:
      return state;
  }
}

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    socios: state.socios,
    empresas: state.empresas,
    ofertas: state.ofertas,
    addSocio: (payload) => dispatch({ type: "ADD_SOCIO", payload }),
    updateSocio: (id, changes) => dispatch({ type: "UPDATE_SOCIO", id, changes }),
    deleteSocio: (id) => dispatch({ type: "DELETE_SOCIO", id }),
    addEmpresa: (payload) => dispatch({ type: "ADD_EMPRESA", payload }),
    updateEmpresa: (id, changes) => dispatch({ type: "UPDATE_EMPRESA", id, changes }),
    deleteEmpresa: (id) => dispatch({ type: "DELETE_EMPRESA", id }),
    addOferta: (payload) => dispatch({ type: "ADD_OFERTA", payload }),
    updateOferta: (id, changes) => dispatch({ type: "UPDATE_OFERTA", id, changes }),
    deleteOferta: (id) => dispatch({ type: "DELETE_OFERTA", id }),
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData debe usarse dentro de <DataProvider>");
  return ctx;
}
