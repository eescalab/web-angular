import { ModelProducto } from './model_producto';
import { ModelUsuario } from './model_usuario';

export interface ModelOrden {
  usuario?: ModelUsuario;
  _id?: string;
  total?: number;
  productos?: ProductoElement[];
  fecha_orden?: Date;
  __v?: number;
}

export interface ProductoElement {
  _id?: string;
  cantidad?: number;
  producto?: ModelProducto;
}


