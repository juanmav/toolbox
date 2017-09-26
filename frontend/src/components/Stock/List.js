import React from 'react';


/**
 * Un listado basico se puede agregar o quitar items a un producto del stock
 * faltaria dar de alta un nuevo registro de stock para un producto nuevo.
 * Pero no es pedido.
 * */

export default class StockList extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    load = () => {
        this.setState({loading : true});
        fetch('http://127.0.0.1:4000/stocks/')
            .then(response => response.json())
            .then(items => {
                this.setState({
                    items,
                    loading: false
                })
            })
    };

    componentDidMount(){
        this.load();
    }

    update = (item) => {
        this.setState({loading: true});
        fetch('http://127.0.0.1:4000/stocks/'+ item.id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method : 'PUT',
            body: JSON.stringify(item)
        })
            .then( data => {
                this.load();
            });
    };

    onPlus = (item) => {
        console.log(item);
        item.quantity = item.quantity + 1;
        this.update(item);
    };

    onMinus = (item) => {
        console.log(item);
        if (item.quantity > 0){
            item.quantity = item.quantity - 1;
            this.update(item);
        }
    };

    render(){
        return(
            this.state.items ?
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>cantidad</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.items.map( (i, index) => {
                            return(
                                <tr key={index}>
                                    <td>{i.id}</td>
                                    <td>{i.product.name}</td>
                                    <td>{i.quantity}</td>
                                    <td>
                                        <button disabled={ this.state.loading } onClick={()=> this.onPlus(i)}>+</button>
                                        <button disabled={ this.state.loading } onClick={()=> this.onMinus(i)}>-</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                :
                <div>
                    'Cargando....'
                </div>
        )
    }
}