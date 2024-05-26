import React, { Component } from 'react';
import ProductCard from './ProductCard';
import '../assets/css/GridProduct.css';

export default class GridProduct extends Component {
    render() {
        return (
            <div>
                <h3 className="heading text-decoration-none">Shopping</h3>
                <div className="container">
                    <div className="row product">
                        <ProductCard name="Apple Watch Series 3" price="$550.00" imageUrl="https://raw.githubusercontent.com/rxhack/productImage/main/1.jpg" />
                        <ProductCard name="Beat Solo3 Wearless" price="$159.99" imageUrl="https://raw.githubusercontent.com/rxhack/productImage/main/2.jpg" />
                        <ProductCard name="Apple MacBook" price="$2249.00" imageUrl="https://raw.githubusercontent.com/rxhack/productImage/main/3.jpg" />
                        <ProductCard name="Apple MacBook" price="$2249.00" imageUrl="https://raw.githubusercontent.com/rxhack/productImage/main/3.jpg" />
                        <ProductCard name="Apple MacBook" price="$2249.00" imageUrl="https://raw.githubusercontent.com/rxhack/productImage/main/3.jpg" />
                        <ProductCard name="Apple MacBook" price="$2249.00" imageUrl="https://raw.githubusercontent.com/rxhack/productImage/main/3.jpg" />
                        
                    </div>
                </div>
            </div>
        );
    }
}
