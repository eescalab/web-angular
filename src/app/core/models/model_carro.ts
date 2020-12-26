
export interface ModelCarro {
  items?: Item[];
  unidades?: number;
  total?: number;
}

export interface Item {
  _id?: string;
  producto_nombre?: string;
  descripcion?: string;
  precio?: number;
  stock?: number;
  categoria_nombre?: string;
  imagenUrl?: string;
  imagenUrlId?: string;
  __v?: number;
  productId?: string;
  cantidad?: number;
  total?: number;
}