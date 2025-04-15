(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswTimer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswTimer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

    // @code.start: LswTimer API | @$section: LswTimer API » LswTimer classes and functions
    // exported to LswTimer
  const Timeformat_utils = {};

  Timeformat_utils.formatHour = function (horaInput, minutoInput) {
    const hora = ("" + horaInput).padStart(2, '0');
    const minuto = ("" + minutoInput).padStart(2, '0');
    return `${hora}:${minuto}`;
  };

  Timeformat_utils.formatDatestringFromDate = function (dateObject, setUntilDay = false, setMeridian = false, setSeconds = false, setOnlyHour = false) {
    if(typeof dateObject === "undefined") {
      return undefined;
    }
    const anio = ("" + (dateObject.getFullYear() ?? 0)).padStart(4, '0');
    const mes = ("" + ((dateObject.getMonth() ?? 0) + 1)).padStart(2, '0');
    const dia = ("" + (dateObject.getDate() ?? 0)).padStart(2, '0');
    if(setUntilDay) {
      return `${anio}/${mes}/${dia}`;
    }
    const hora = ("" + (dateObject.getHours() ?? 0)).padStart(2, '0');
    const minuto = ("" + (dateObject.getMinutes() ?? 0)).padStart(2, '0');
    const segundo = setSeconds ? ("" + (dateObject.getSeconds() ?? 0)).padStart(2, '0') : false;
    const laHora = `${hora}:${minuto}${typeof segundo !== "boolean" ? (':' + segundo) : ''}${setMeridian ? hora >= 12 ? 'pm' : 'am' : ''}`;
    if(setOnlyHour) {
      return laHora;
    }
    return `${anio}/${mes}/${dia} ${laHora}`;
  };

  Timeformat_utils.getDateFromMomentoText = function (momentoText, setMeridian = false) {
    const momentoBrute = Timeformat_parser.parse(momentoText)[0];
    console.log(momentoBrute);
    const date = new Date();
    console.log(1, date);
    if(momentoBrute.anio) {
      date.setFullYear(momentoBrute.anio);
      if(momentoBrute.mes === 0) {
        throw new Error("Cannot set «mes» to «0» in momento text on «LswTimer.utils.getDateFromMomentoText»");
      }
      date.setMonth((momentoBrute.mes-1) || 0);
      date.setDate(momentoBrute.dia || 0);
    }
    date.setHours(momentoBrute.hora || 0);
    date.setMinutes(momentoBrute.minuto || 0);
    date.setSeconds(momentoBrute.segundo || 0);
    date.setMilliseconds(0);
    console.log("Z", date);
    return date;
  };
  
  Timeformat_utils.formatDatetimeFromMomento = function (momentoBrute, setMeridian = false) {
    const momento = Timeformat_utils.toPlainObject(momentoBrute);
    const anio = ("" + (momento.anio ?? 0)).padStart(4, '0');
    const mes = ("" + (momento.mes ?? 0)).padStart(2, '0');
    const dia = ("" + (momento.dia ?? 0)).padStart(2, '0');
    const hora = ("" + (momento.hora ?? 0)).padStart(2, '0');
    const minuto = ("" + (momento.minuto ?? 0)).padStart(2, '0');
    return `${anio}/${mes}/${dia} ${hora}:${minuto}${setMeridian ? hora >= 12 ? 'pm' : 'am' : ''}`;
  };

  Timeformat_utils.formatHourFromMomento = function (momentoBrute, setMeridian = false) {
    const momento = Timeformat_utils.toPlainObject(momentoBrute);
    const hora = ("" + (momento.hora ?? 0)).padStart(2, '0');
    const minuto = ("" + (momento.minuto ?? 0)).padStart(2, '0');
    return `${hora}:${minuto}${setMeridian ? hora >= 12 ? 'pm' : 'am' : ''}`;
  };

  Timeformat_utils.formatHourFromMomentoCode = function (momentoCode, setMeridian = false) {
    const momentoBruteList = Timeformat_parser.parse(momentoCode);
    const momentoBrute = momentoBruteList[0];
    const momento = Timeformat_utils.toPlainObject(momentoBrute);
    const hora = ("" + (momento.hora ?? 0)).padStart(2, '0');
    const minuto = ("" + (momento.minuto ?? 0)).padStart(2, '0');
    return `${hora}:${minuto}${setMeridian ? hora >= 12 ? 'pm' : 'am' : ''}`;
  };

  Timeformat_utils.addDuracionToMomento = function (momentoBrute, duracion) {
    const momentoFinal = {};
    const duracionParsed = Timeformat_parser.parse(duracion)[0];
    const props = ["anio", "mes", "dia", "hora", "minuto", "segundo"];
    const propsInDuracion = ["anios", "meses", "dias", "horas", "minutos", "segundos"];
    for (let index = 0; index < props.length; index++) {
      const prop = props[index];
      const propInDuracion = propsInDuracion[index];
      const base = momentoBrute[prop] ?? 0;
      const aggregated = duracionParsed[propInDuracion] ?? 0;
      momentoFinal[prop] = base + aggregated;
    }
    return momentoFinal;
  };

  Timeformat_utils.toPlainObject = function (obj) {
    const seen = new WeakSet();
    return JSON.parse(JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) return undefined; // Ignora referencias circulares
        seen.add(value);
      }
      return value;
    }));
  };

  Timeformat_utils.isDurationOrThrow = function (text) {
    const errorMessage = "It must be a duration only, like 0y 0mon 0d 0h 0min 0s 0ms";
    try {
      const ast = Timeformat_parser.parse(text);
      const mainExpression = ast[0];
      if (mainExpression.tipo !== "Duracion") {
        throw new Error(`Expression of type «${mainExpression.tipo}» is not valid. ${errorMessage}`);
      }
    } catch (error) {
      console.log(text);
      throw new Error(errorMessage);
    }
    return true;
  };

  Timeformat_utils.isDatetimeOrThrow = function (text) {
    const errorMessage = "It must be a datetime only, like 2025/01/01 00:00";
    try {
      const ast = Timeformat_parser.parse(text);
      const mainExpression = ast[0];
      if (mainExpression.tipo !== "FechaHora") {
        throw new Error(errorMessage);
      }
    } catch (error) {
      throw new Error(errorMessage);
    }
    return true;
  };

  Timeformat_utils.isDateOrThrow = function (text) {
    const errorMessage = "It must be a date only, like 2025/01/01";
    try {
      const ast = Timeformat_parser.parse(text);
      const mainExpression = ast[0];
      if (mainExpression.tipo !== "SoloFecha") {
        throw new Error(errorMessage);
      }
    } catch (error) {
      throw new Error(errorMessage);
    }
    return true;
  };

  Timeformat_utils.isHourOrThrow = function (text) {
    const errorMessage = "It must be an hour only, like 00:00 or 23:00";
    try {
      const ast = Timeformat_parser.parse(text);
      const mainExpression = ast[0];
      if (mainExpression.tipo === "Hora") {
        throw new Error(errorMessage);
      }
    } catch (error) {
      throw new Error(errorMessage);
    }
    return true;
  };

  Timeformat_utils.formatDateToSpanish = function(date) {
    const anio = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const weekday = date.getDay();
    const diaSemana = (() => {
      if(weekday === 0) return "Domingo";
      if(weekday === 1) return "Lunes";
      if(weekday === 2) return "Martes";
      if(weekday === 3) return "Miércoles";
      if(weekday === 4) return "Jueves";
      if(weekday === 5) return "Viernes";
      if(weekday === 6) return "Sábado";
    })();
    const mes = (() => {
      if(month === 0) return "Enero";
      if(month === 1) return "Febrero";
      if(month === 2) return "Marzo";
      if(month === 3) return "Abril";
      if(month === 4) return "Mayo";
      if(month === 5) return "Junio";
      if(month === 6) return "Julio";
      if(month === 7) return "Agosto";
      if(month === 8) return "Septiembre";
      if(month === 9) return "Octubre";
      if(month === 10) return "Noviembre";
      if(month === 11) return "Diciembre";
    })();
    return `${diaSemana}, ${day} de ${mes} del ${anio}`;
  }

  Timeformat_utils.formatMomentoObjectToMomentoString = function(momento) {
    let out = "";
    const { anio = false, mes = false, dia = false, hora = false, minuto = false, segundo = false, milisegundo = false } = momento;
    if(anio !== false) {
      out += ("" + anio).padStart(4, '0');
      out += "/";
    }
    if(mes !== false) {
      out += ("" + mes).padStart(2, '0');
      out += "/";
    }
    if(dia !== false) {
      out += ("" + dia).padStart(2, '0');
      out += " ";
    }
    if(hora !== false) {
      out += ("" + hora).padStart(2, '0');
      out += ":";
    }
    if(minuto !== false) {
      out += ("" + minuto).padStart(2, '0');
      out += ":";
    }
    if(segundo !== false) {
      out += ("" + segundo).padStart(2, '0');
      out += ".";
    }
    if(milisegundo !== false) {
      out += ("" + milisegundo).padStart(3, '0');
    }
    return out.trim();
  }

  return {
    parser: Timeformat_parser,
    utils: Timeformat_utils
  };
  // @code.end: LswTimer API

});
