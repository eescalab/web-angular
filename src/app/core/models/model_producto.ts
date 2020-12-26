// To parse this data:
//
//   import { Convert, ModelProducto } from "./file";
//
//   const modelProducto = Convert.toModelProducto(json);

export interface ModelProducto {
  vendidos?: number;
  disponible?: boolean;
  _id?: string;
  producto_nombre?: string;
  descripcion?: string;
  precio?: number;
  stock?: number;

}
