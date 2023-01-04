export class Producto {
    public codigo: string;
    public producto: string;
    public stock: number;
    public precio: number;
    constructor(
        codigo: string,
        producto: string,
        stock: number,
        precio: number,
    ) {
        this.codigo = codigo;
        this.producto = producto;
        this.stock = stock;
        this.precio = precio;
    }
}
