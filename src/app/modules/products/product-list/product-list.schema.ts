export class ProductListSchema {
    public columns = [
        { headerName: 'Id', field: 'id', hide: true },
        { headerName: 'Logo', field: 'logo', isImage: true },
        { headerName: 'Nombre del producto', field: 'name' },
        { headerName: 'Descripción', field: 'description' },
        { headerName: 'Fecha de liberación', field: 'date_release', formatDate: true },
        { headerName: 'Fecha de reestructuración', field: 'date_revision', formatDate: true },
    ];
}