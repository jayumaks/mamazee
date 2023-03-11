import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import SEO from '../../SEO/SEO';
import Loading from '../utils/Loading';
import ProductItem from '../utils/productItem/ProductItem';

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [isLogged] = state.userAPI.isLogged;
  const [detailProduct, setDetailProduct] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return <Loading />;

  return (
    <>
      <SEO title='Details' />
      <div className='detail'>
        <img src={detailProduct.images.url} alt='' />
        <div className='box-detail'>
          <div className='row'>
            <h2>{detailProduct.title}</h2>
            {/* <h6>#id: {detailProduct.product_id}</h6> */}
          </div>
          <span>₦ {detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Sold: {detailProduct.sold}</p>

          {!isLogged ? (
            <div className='carte' onClick={() => addCart(detailProduct)}>
              Buy Now
            </div>
          ) : (
            <Link
              to='/cart'
              className='carte'
              onClick={() => addCart(detailProduct)}
            >
              Buy Now
            </Link>
          )}
        </div>
      </div>

      <div className='related'>
        <h2>Related products</h2>
        <div className='products'>
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
