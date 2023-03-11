import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import { useHistory, useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SEO from '../../SEO/SEO';
const endpoint = process.env.REACT_APP_API;
const token = localStorage.getItem('token');

const initialState = {
  product_id: '',
  title: '',
  price: '',
  description: '',
  // content: '',
  category: '',
  _id: '',
};

function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;

  const history = useHistory();
  const param = useParams();

  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;

  // The UseEffect section
  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  // The section of the handle upload
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return toast.error("You're not an admin");
      const file = e.target.files[0];

      if (!file) return toast.error('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return toast.error('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return toast.error('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      const res = await axios.post(endpoint + '/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // The section of the handle destroy
  const handleDestroy = async () => {
    try {
      if (!isAdmin) return toast.error("You're not an admin");
      setLoading(true);
      await axios.post(
        endpoint + '/api/destroy',
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // The section of the handlechange input
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // The section of the handlesubmie
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return toast.error("You're not an admin");
      if (!images) return toast.warning('No Image Upload');

      if (onEdit) {
        await axios.put(
          endpoint + `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          endpoint + '/api/products',
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      history.push('/');
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? 'block' : 'none',
  };

  return (
    <div className='create_product'>
      <SEO title='Create Product' />
      <ToastContainer className='toaster' />
      <div className='upload'>
        <input type='file' name='file' id='file_up' onChange={handleUpload} />
        {loading ? (
          <div id='file_img'>
            <Loading />
          </div>
        ) : (
          <div id='file_img' style={styleUpload}>
            <img src={images ? images.url : ''} alt='' />
            <FaTrash onClick={handleDestroy} className='span' />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className='row'>
          <label htmlFor='product_id'>Product ID</label>
          <input
            type='text'
            name='product_id'
            id='product_id'
            required
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>

        <div className='row'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className='row'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            name='price'
            id='price'
            required
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className='row'>
          <label htmlFor='description'>Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            required
            value={product.description}
            rows='5'
            onChange={handleChangeInput}
            className='text'
          />
        </div>

        {/* <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                        value={product.content} rows="7" onChange={handleChangeInput} />
                </div> */}

        <div className='row'>
          <label htmlFor='categories'>Categories: </label>
          <select
            className='select'
            name='category'
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value=''>Please select a category</option>
            {categories.map((category) => {
              return (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <button type='submit'>{onEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default CreateProduct;
