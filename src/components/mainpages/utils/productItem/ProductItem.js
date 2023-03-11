import React from 'react'
import BtnRender from './BtnRender'

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {

    return (
        <div className="product_card">
            <div className="card-top">
                {
                    isAdmin && <input type="checkbox" checked={product.checked}
                        onChange={() => handleCheck(product._id)} className="checkbox" />
                }
                <img src={product.images.url} alt="" className="product-image" />
            </div>

            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>₦{product.price.toLocaleString()}</span>
                {/* <p>{product.description}</p> */}
            </div>


            <BtnRender product={product} deleteProduct={deleteProduct} />
        </div>
    )
}

export default ProductItem