import items from '../Datos/data.json' with {type:"json"}

console.log(items)
const cuerpoTabla = document.querySelector('#cuerpoItems');
// const consultar = document.querySelector('#consultarCarrito');
const cuerpoCarrito = document.querySelector('#carrito');
const buscarItem = document.querySelector('#buscar')
const pagar = document.querySelector('#pagar');
let carrito = [];

// Generar las tablas

const cargarTabla = () => {
    let categoria = "";
    items.map((item) => {
        if(item.categoria != categoria){
            categoria = item.categoria
            const titular = document.createElement('h3')
            titular.className = "text-light col-md-12"
            titular.textContent = categoria.toUpperCase();
            cuerpoTabla.append(titular)
        }

        console.log(item)
        const itemAgregar = document.createElement('div')
        itemAgregar.className = "col-md-4 tarjetaItem"
        const producto = `
                        <div class="card mb-4 box-shadow">
                            <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="${item.imgLink}" data-holder-rendered="true">
                            <div class="card-body">
                                <h3 class="card-text text-dark">${item.itemName}</h3>
                                <p class="card-text text-dark">${item.descripcion}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-dark carrito" onclick="agregarCarrito(${item.id})">🛒</button>
                                    </div>
                                    <div class="text-dark">
                                        <small>$ ${item.precio}</small>
                                    </div>
                                </div>
                            </div>
                    </div>`

        itemAgregar.innerHTML = producto;
        cuerpoTabla.append(itemAgregar);
    })
}

// Agregar y quitar items

window.agregarCarrito = (id) => {
    let index = items.findIndex((item) => item.id == id);
    carrito.push(items[index]);
    console.log(carrito)
    actualizarCarrito();
}

const actualizarCarrito = () => {
    cuerpoCarrito.innerHTML = "";
    if(carrito.length > 0){
        carrito.map((item) => {
            let contenedorItem = document.createElement('div');
            let textoItem = "";
            textoItem = `
        <p>
            ${item.itemName} - ${item.precio}  -  <button onclick="quitarItem(${item.id})">Quitar</button>
        </p>
`
            contenedorItem.innerHTML = textoItem;
            cuerpoCarrito.append(contenedorItem);
        })
    }
    console.log(carrito)
    console.log("actualizado");

}

window.quitarItem = (id) => {
    let carritoNuevo = [];
    let flag = true;
    carrito.map((item) => {
        if(item.id != id){
            carritoNuevo.push(item)
        }else if(!flag){
            carritoNuevo.push(item)
        }else{
            flag = false;
            console.log("borrado")
        }
    })
    console.log(carritoNuevo);
    carrito = carritoNuevo;
    actualizarCarrito();
}

//Pagar carrito y vaciarlo

pagar.addEventListener("click", function(e){
    if(carrito.length != 0){
        let texto = "";
        let precio = 0;
        carrito.map((item) => {
            texto += item.itemName + " - " +item.precio + "\n";
            precio += item.precio;
        })
        texto += "Total a pagar: " + precio;
        if(window.confirm(texto)){
            carrito = []
            actualizarCarrito()
        }
    }
})

const buscarProducto = (e) => {
    let index = items.findIndex((item) => item.itemName.toLowerCase() == e.target.value.toLowerCase());
    console.log(index)
    if(index > -1 && window.confirm(`Se encontró producto, agregar? ${e.target.value}`)){
        console.log(items[index])
        carrito.push(items[index]);
        actualizarCarrito()
    }
}

buscarItem.addEventListener("input", buscarProducto)

cargarTabla()