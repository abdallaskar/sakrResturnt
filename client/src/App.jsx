import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import Cart from './components/Cart';
import About from './pages/About';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Error from './pages/Error';
import Navbar, { UserProvider } from './components/Navbar';
import MenuList from './pages/MenuList';
import Game from './components/Game';
import Admin from './pages/Admin';
import CreateProduct from './pages/CreateProduct';
import AboutResturnt from './pages/AboutResturnt';
import { ToastContainer, toast } from 'react-toastify';
import Lab from './components/Lab';
import Login from './pages/Login';
import Basic from './pages/FormicLogin';
import HomePage from './pages/Cars';
import Register from './pages/Register';


export default function App() {
  // ========================= Initial Data =========================
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // ========================= navgatie  =========================
  const navigate = useNavigate();
  // use effect for one time when project start to get data from data base
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await fetch('http://localhost:3000/products');
        const categoriesRes = await fetch('http://localhost:3000/categories');

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error(' request failed');
        }
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchData();
  }, []);

  // ========================= States =========================
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // ========================= filter products depednt on search and filteration =========================
  const filteredProducts = products.filter((element) => {
    const matchesCategory = selectedCategory === '0' ? element : element.category === selectedCategory;
    const matchesSearch = element?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '');
    return matchesCategory && matchesSearch;
  });
  // ========================= calculate all pagnations  =========================
  const itemsPerPage = 8;
  const numberOfPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startPaginte = (currentPage - 1) * itemsPerPage;
  const endPaginte = currentPage * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startPaginte, endPaginte);

  // ========================= Handlers =========================
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleCartItem = (product) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      return exists ? prevItems.filter((item) => item.id !== product.id) : [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const increment = (product) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decrement = (product) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === product.id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item))
    );
  };
  const handledeletproductCart = (product) => {
    let updatedCartItems = [...cartItems];

    const index = cartItems.findIndex((element) => {
      return element.id === product.id;
    });
    updatedCartItems.splice(index, 1);

    setCartItems(updatedCartItems);
  };

  const resetCart = () => {
    setCartItems(cartItems.map((item) => ({ ...item, quantity: 0 })));
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const deletProductHandler = async (product) => {
    let updatedProudcts = [...products];
    const index = products.findIndex((element) => {
      return element.id === product.id;
    });
    updatedProudcts.splice(index, 1);
    setProducts(updatedProudcts);
    // delet it using delet request
    try {
      const response = await fetch(`http://localhost:3000/products/${product.id}`, {
        method: 'DELETE',
      });
      const deletedData = await response.json();
      console.log('this item deleted', deletedData);
      toast.success('Product Deleted successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const addAndEditProduct = (product = null) => {
    // edit mode if handler pass prdocut & create mode if handler not pass any think
    if (product) {
      setEditingProduct(product);
      setIsEditMode(true);
    } else {
      setEditingProduct(null);
      setIsEditMode(false);
    }

    navigate('product/id');
  };

  // Updated createAndupdateProduct function
  const createAndupdateProduct = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = {
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      category: parseInt(formData.get('category')),
      quantity: 0,
    };

    try {
      let response;
      let result;
      // Editing mode to update data
      if (isEditMode && editingProduct) {
        response = await fetch(`http://localhost:3000/products/${editingProduct.id}`, {
          method: 'PUT',
          body: JSON.stringify(productData),
        });
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        result = await response.json();

        setProducts((prevProducts) =>
          prevProducts.map((product) => (product.id === editingProduct.id ? result : product))
        );
        toast.success('Product Updated successfully!');
      } // Create mode to add new product
      else {
        response = await fetch('http://localhost:3000/products', {
          method: 'POST',
          body: JSON.stringify(productData),
        });
        if (!response.ok) {
          throw new Error('Failed to create product');
        }
        result = await response.json();

        setProducts((prevProducts) => [...prevProducts, result]);

        toast.success('Product Added successfully!');
      }

      // Reset edit mode and navigate back
      setEditingProduct(null);
      setIsEditMode(false);
      navigate('/admin');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // ========================= UI =========================
  return (
    <>
      <ToastContainer />
      <UserProvider>
        <Navbar CartItems={cartItems} handleSearchChange={handleSearchChange} searchQuery={searchQuery} />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/cart"
            element={
              <Cart
                resetHandler={resetCart}
                incHandler={increment}
                decHandler={decrement}
                CartItems={cartItems}
                handledeletproductCart={handledeletproductCart}
              />
            }
          />
          <Route path="/game" element={<Game />} />
          <Route
            path="/menu"
            element={
              <MenuList
                paginatedProducts={paginatedProducts}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                onToggleCartItem={toggleCartItem}
                numberOfPages={numberOfPages}
                currentPage={currentPage}
                onPageChange={handlePagination}
                cartItems={cartItems}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <Admin
                products={products}
                categories={categories}
                deletProductHandler={deletProductHandler}
                addAndEditProduct={addAndEditProduct}
              />
            }
          />
          <Route
            path="product/id"
            element={
              <CreateProduct
                categories={categories}
                createAndupdateProduct={createAndupdateProduct}
                isEditMode={isEditMode}
                editingProduct={editingProduct}
              />
            }></Route>
          <Route path="/about" element={<About />}>
            <Route path="us" element={<AboutUs />} />
            <Route path="company" element={<AboutResturnt />} />
          </Route>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Error />} />

          <Route path="/form" element={<Basic />} />
          <Route path="/free" element={<HomePage />} />
        </Routes>
      </UserProvider>
    </>
  );
}
