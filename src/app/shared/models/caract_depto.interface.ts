




export interface deptoInterface{
  name?: string;
  id?: string;
  nuevo_usado?: string;
  mt_utiles?: string;
  contructora?: string;
  dormitorio?: string;
  baños?: string;
  cocina_americana?: boolean;
  calefaccion?: any[];
  estar?: boolean;
  logia?: boolean;
  antiguedad?: string;
  gastos_comunas?: string;
  orientacion?: any[];
  bodega?: string;
  piso?: string;
  niveles?: string;
  terraza?: string;
  terraza_sup?: boolean;
  patio?: boolean;
  homeOfice?: boolean;
  comunidad?: any[];
  subtasks?: deptoInterface[];
}

export class equipamiento {
  comun: ['gimnacalefacio', 'zona_juegos', 'quincho', 'bicicletero', 'area_verde', 'picina'];
}

export class calefa {
  tipoCalefa: ['loza_radiante', 'radiador_ind', 'caldera_ind', 'caldera_edif'];
}

export class orienta {
  vista: ['NP', 'NO', 'SO', 'SP'];
}
