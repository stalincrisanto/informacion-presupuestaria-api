// Función para formatear las claves según el estándar requerido
export const formatKey = (key: string): string => {
  const keyMap: Record<string, string> = {
    TIPO_CEDULA: "TIPO_CEDULA",
    PERIODO: "PERIODO",
    ANIO: "ANIO",
    COD_PROG: "COD_PROG",
    PROGRAMA: "PROGRAMA",
    COD_PROY: "COD_PROY",
    PROYECTO: "PROYECTO",
    COD_ACTIVIDAD: "COD_ACTIVIDAD",
    ACTIVIDAD: "ACTIVIDAD",
    COD_OBRA: "COD_OBRA",
    OBRA: "OBRA",
    COD_TAREA: "COD_TAREA",
    TAREA: "TAREA",
    COD_FUENTE: "COD_FUENTE",
    PARTIDA: "PARTIDA",
    "ASIGNACION INICIAL": "ASIGNACION",
    REFORMAS: "REFORMAS",
    CODIFICADO: "CODIFICADO",
    CERTIFICADO: "CERTIFICACION",
    COMPROMETIDO: "COMPROMISOS",
    DEVENGADO: "DEVENGADO",
    PAGADO: "PAGADO",
  };

  return keyMap[key.trim()] || key;
};

// Función para convertir valores al formato correcto
export const parseValue = (value: any, key: string): any => {
  if (typeof value === "string") {
    const trimmedValue = value.trim();

    // Manejar valores "N/A" o "No Aplica"
    if (
      trimmedValue.toUpperCase() === "N/A" ||
      trimmedValue.toUpperCase() === "NO APLICA"
    ) {
      return "N/A";
    }

    // Manejar valores como " -   " o "-" (convertirlos a 0.00)
    if (trimmedValue === "-" || trimmedValue === "") {
      return 0.0;
    }

    // Convertir números con formato europeo
    if (/^-?\d{1,3}(\.\d{3})*,\d{2}$/.test(trimmedValue)) {
      return parseFloat(trimmedValue.replace(/\./g, "").replace(",", "."));
    }
  }

  // Convertir campos numéricos específicos
  if (
    ["TIPO_CEDULA", "PERIODO", "ANIO", "COD_FUENTE", "PARTIDA"].includes(key)
  ) {
    const num = parseFloat(value);
    return isNaN(num) ? value : num;
  }

  return value;
};
