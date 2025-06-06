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
  const [products, setProducts] = useState([
    {
      "name": "Cheese Burger",
      "price": 500,
      "category": 2,
      "quantity": 0,
      "id": "2"
    },
    {
      "id": "3",
      "name": "Chicken Burger",
      "price": 450,
      "quantity": 0,
      "category": "1"
    },
    {
      "id": "4",
      "name": "Spicy Chicken Burger",
      "price": 480,
      "quantity": 0,
      "category": "1"
    },
    {
      "id": "5",
      "name": "Bacon Burger",
      "price": 600,
      "quantity": 0,
      "category": "1"
    },
    {
      "id": "6",
      "name": "Veggie Burger",
      "price": 400,
      "quantity": 0,
      "category": "1"
    },
    {
      "id": "7",
      "name": "Double Beef Burger",
      "price": 700,
      "quantity": 0,
      "category": "1"
    },
    {
      "id": "8",
      "name": "Fish Burger",
      "price": 500,
      "quantity": 0,
      "category": "1"
    },
    {
      "id": "9",
      "name": "Mushroom Swiss Burger",
      "price": 550,
      "quantity": 0,
      "category": "1"
    },
    {
      "id": "10",
      "name": "BBQ Burger",
      "price": 580,
      "quantity": 0,
      "category": "1"
    },
    {
      "id": "12",
      "name": "Sparkling Water (500ml)",
      "price": 35,
      "quantity": 0,
      "category": "2"
    },
    {
      "id": "13",
      "name": "Large Water (1L)",
      "price": 40,
      "quantity": 0,
      "category": "2"
    },
    {
      "id": "14",
      "name": "Small Fries",
      "price": 150,
      "quantity": 0,
      "category": "3"
    },
    {
      "id": "15",
      "name": "Medium Fries",
      "price": 200,
      "quantity": 0,
      "category": "3"
    },
    {
      "id": "16",
      "name": "Large Fries",
      "price": 250,
      "quantity": 0,
      "category": "3"
    },
    {
      "id": "17",
      "name": "Cheese Fries",
      "price": 300,
      "quantity": 0,
      "category": "3"
    },
    {
      "id": "18",
      "name": "Bacon Cheese Fries",
      "price": 350,
      "quantity": 0,
      "category": "3"
    },
    {
      "id": "19",
      "name": "Sweet Potato Fries",
      "price": 280,
      "quantity": 0,
      "category": "3"
    },
    {
      "id": "20",
      "name": "Chicken Nuggets (6pcs)",
      "price": 300,
      "quantity": 0,
      "category": "4"
    },
    {
      "id": "21",
      "name": "Chicken Wings (6pcs)",
      "price": 400,
      "quantity": 0,
      "category": "4"
    },
    {
      "id": "22",
      "name": "Fried Chicken (2pcs)",
      "price": 450,
      "quantity": 0,
      "category": "4"
    },
    {
      "id": "23",
      "name": "Grilled Chicken",
      "price": 500,
      "quantity": 0,
      "category": "4"
    },
    {
      "id": "24",
      "name": "Chicken Wrap",
      "price": 350,
      "quantity": 0,
      "category": "4"
    },
    {
      "id": "25",
      "name": "Chicken Salad",
      "price": 400,
      "quantity": 0,
      "category": "4"
    },
    {
      "id": "26",
      "name": "Chicken Sandwich",
      "price": 380,
      "quantity": 0,
      "category": "4"
    },
    {
      "id": "27",
      "name": "Chicken Tenders (4pcs)",
      "price": 350,
      "quantity": 0,
      "category": "4"
    },
    {
      "id": "28",
      "name": "Spicy Chicken Sandwich",
      "price": 420,
      "quantity": 0,
      "category": "4"
    },
    {
      "id": "29",
      "name": "Chicken Quesadilla",
      "price": 450,
      "quantity": 0,
      "category": "4"
    },
    {
      "id": "30",
      "name": "Beef Steak (200g)",
      "price": 800,
      "quantity": 0,
      "category": "5"
    },
    {
      "id": "31",
      "name": "Pork Chop",
      "price": 700,
      "quantity": 0,
      "category": "5"
    },
    {
      "id": "32",
      "name": "Lamb Chops",
      "price": 900,
      "quantity": 0,
      "category": "5"
    },
    {
      "id": "33",
      "name": "Grilled Salmon",
      "price": 850,
      "quantity": 0,
      "category": "5"
    },
    {
      "id": "34",
      "name": "Fried Rice",
      "price": 300,
      "quantity": 0,
      "category": "6"
    },
    {
      "id": "35",
      "name": "Chicken Fried Rice",
      "price": 350,
      "quantity": 0,
      "category": "6"
    },
    {
      "id": "36",
      "name": "Beef Fried Rice",
      "price": 400,
      "quantity": 0,
      "category": "6"
    },
    {
      "id": "37",
      "name": "Shrimp Fried Rice",
      "price": 450,
      "quantity": 0,
      "category": "6"
    },
    {
      "id": "38",
      "name": "Vegetable Fried Rice",
      "price": 320,
      "quantity": 0,
      "category": "6"
    },
    {
      "id": "39",
      "name": "Egg Fried Rice",
      "price": 280,
      "quantity": 0,
      "category": "6"
    },
    {
      "id": "40",
      "name": "Pineapple Fried Rice",
      "price": 380,
      "quantity": 0,
      "category": "6"
    },
    {
      "id": "41",
      "name": "Kimchi Fried Rice",
      "price": 370,
      "quantity": 0,
      "category": "6"
    },
    {
      "id": "42",
      "name": "Coca-Cola (330ml)",
      "price": 30,
      "quantity": 0,
      "category": "7"
    },
    {
      "id": "43",
      "name": "Pepsi (330ml)",
      "price": 30,
      "quantity": 0,
      "category": "7"
    },
    {
      "id": "44",
      "name": "Sprite (330ml)",
      "price": 30,
      "quantity": 0,
      "category": "7"
    },
    {
      "id": "45",
      "name": "Fanta (330ml)",
      "price": 30,
      "quantity": 0,
      "category": "7"
    },
    {
      "id": "46",
      "name": "Iced Tea (330ml)",
      "price": 35,
      "quantity": 0,
      "category": "7"
    },
    {
      "id": "47",
      "name": "Lemonade (330ml)",
      "price": 35,
      "quantity": 0,
      "category": "7"
    },
    {
      "id": "48",
      "name": "Orange Juice (330ml)",
      "price": 40,
      "quantity": 0,
      "category": "7"
    },
    {
      "id": "49",
      "name": "Apple Juice (330ml)",
      "price": 40,
      "quantity": 0,
      "category": "7"
    },
    {
      "id": "50",
      "name": "Mango Juice (330ml)",
      "price": 45,
      "quantity": 0,
      "category": "7"
    },
    {
      "id": "51",
      "name": "Chocolate Ice Cream",
      "price": 120,
      "quantity": 0,
      "category": "8"
    },
    {
      "id": "52",
      "name": "Vanilla Ice Cream",
      "price": 120,
      "quantity": 0,
      "category": "8"
    },
    {
      "id": "53",
      "name": "Strawberry Ice Cream",
      "price": 120,
      "quantity": 0,
      "category": "8"
    },
    {
      "id": "54",
      "name": "Mint Chocolate Chip Ice Cream",
      "price": 150,
      "quantity": 0,
      "category": "8"
    },
    {
      "id": "55",
      "name": "Cookies and Cream Ice Cream",
      "price": 150,
      "quantity": 0,
      "category": "8"
    },
    {
      "id": "56",
      "name": "Coffee Ice Cream",
      "price": 140,
      "quantity": 0,
      "category": "8"
    },
    {
      "id": "57",
      "name": "Pistachio Ice Cream",
      "price": 160,
      "quantity": 0,
      "category": "8"
    },
    {
      "id": "58",
      "name": "Rocky Road Ice Cream",
      "price": 150,
      "quantity": 0,
      "category": "8"
    },
    {
      "id": "59",
      "name": "Butter Pecan Ice Cream",
      "price": 160,
      "quantity": 0,
      "category": "8"
    },
    {
      "id": "60",
      "name": "Neapolitan Ice Cream",
      "price": 140,
      "quantity": 0,
      "category": "8"
    },
    {
      "id": "61",
      "name": "Caesar Salad",
      "price": 350,
      "quantity": 0,
      "category": "9"
    },
    {
      "id": "62",
      "name": "Greek Salad",
      "price": 320,
      "quantity": 0,
      "category": "9"
    },
    {
      "id": "65",
      "name": "Chicken Caesar Salad",
      "price": 450,
      "quantity": 0,
      "category": "9"
    },
    {
      "id": "66",
      "name": "Tuna Salad",
      "price": 420,
      "quantity": 0,
      "category": "9"
    },
    {
      "id": "67",
      "name": "Shrimp Salad",
      "price": 480,
      "quantity": 0,
      "category": "9"
    },
    {
      "id": "68",
      "name": "Fruit Salad",
      "price": 250,
      "quantity": 0,
      "category": "9"
    },
    {
      "id": "69",
      "name": "Pasta Salad",
      "price": 300,
      "quantity": 0,
      "category": "9"
    },
    {
      "id": "70",
      "name": "Quinoa Salad",
      "price": 350,
      "quantity": 0,
      "category": "9"
    },
    {
      "id": "71",
      "name": "Garlic Bread",
      "price": 120,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "72",
      "name": "Cheese Garlic Bread",
      "price": 150,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "73",
      "name": "Bruschetta",
      "price": 180,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "74",
      "name": "Mozzarella Sticks (6pcs)",
      "price": 250,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "75",
      "name": "Onion Rings",
      "price": 200,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "76",
      "name": "Nachos",
      "price": 220,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "77",
      "name": "Cheese Nachos",
      "price": 280,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "78",
      "name": "Chicken Quesadilla",
      "price": 350,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "79",
      "name": "Beef Quesadilla",
      "price": 380,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "80",
      "name": "Vegetable Quesadilla",
      "price": 320,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "81",
      "name": "Chicken Soup",
      "price": 200,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "82",
      "name": "Tomato Soup",
      "price": 180,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "83",
      "name": "Mushroom Soup",
      "price": 190,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "84",
      "name": "Vegetable Soup",
      "price": 170,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "85",
      "name": "French Onion Soup",
      "price": 220,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "86",
      "name": "Clam Chowder",
      "price": 240,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "87"
    },
    {
      "id": "88",
      "name": "Lentil Soup",
      "price": 190,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "89",
      "name": "Chicken Noodle Soup",
      "price": 210,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "90",
      "name": "Beef Stew",
      "price": 350,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "91",
      "name": "Chocolate Cake",
      "price": 250,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "92",
      "name": "Cheesecake",
      "price": 280,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "93",
      "name": "Apple Pie",
      "price": 220,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "94",
      "name": "Brownie",
      "price": 150,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "95",
      "name": "Tiramisu",
      "price": 300,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "96",
      "name": "Red Velvet Cake",
      "price": 270,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "97",
      "name": "Carrot Cake",
      "price": 260,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "98",
      "name": "Chocolate Mousse",
      "price": 200,
      "quantity": 0,
      "category": "10"
    },
    {
      "id": "99",
      "name": "Panna Cotta",
      "price": 240,
      "quantity": 0,
      "category": "10"
    }]);
  const [categories, setCategories] = useState([
    {
      "name": "All",
      "id": "0"
    },
    {
      "name": "Burgers",
      "id": "1"
    },
    {
      "name": "Waters",
      "id": "2"
    },
    {
      "name": "Fries",
      "id": "3"
    },
    {
      "name": "Chicken",
      "id": "4"
    },
    {
      "name": "Meat",
      "id": "5"
    },
    {
      "name": "Rice",
      "id": "6"
    },
    {
      "name": "Drinks",
      "id": "7"
    },
    {
      "name": "Ice Cream",
      "id": "8"
    },
    {
      "name": "Salads",
      "id": "9"
    },
    {
      "name": "Sides & Desserts",
      "id": "10"
    }
  ]);

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
            path="/"
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
