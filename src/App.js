import axios from "axios";
import React from "react";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpenned, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    //todo сделать try catch + promise.all
    async function fechData() {
      try {
        setIsLoading(true);
        const [cartRespons, favoritesRespons, itemsRespons] = await Promise.all(
          [
            axios.get("https://638fb6284bfe20f70ad8481f.mockapi.io/cart"),
            axios.get("https://638fb6284bfe20f70ad8481f.mockapi.io/favorites"),
            axios.get("https://638fb6284bfe20f70ad8481f.mockapi.io/items"),
          ]
        );

        setIsLoading(false);

        setFavorites(favoritesRespons.data);
        setCartItems(cartRespons.data);
        setItems(itemsRespons.data);
      } catch (error) {
        alert("Ошибка при запросе данных :(");
        console.error(error);
      }
    }

    fechData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://638fb6284bfe20f70ad8481f.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://638fb6284bfe20f70ad8481f.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => prev.map(item => { 
          if(item.parantId === data.parantId){
            return{
              ...item,
              id: data.id
            };
          }
          return item;
        }));
      }
    } catch (error) {
      alert("Ошибка при добавление в корзину :(");
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://638fb6284bfe20f70ad8481f.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.parentId) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка при удалении из корзины :(");
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((fabObj) => Number(fabObj.id) === Number(obj.id))) {
        axios.delete(
          `https://638fb6284bfe20f70ad8481f.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://638fb6284bfe20f70ad8481f.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("не удолось добавить в фавориты");
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpenned}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route>
            <Route
              path="/"
              exact
              element={
                <Home
                  items={items}
                  cartItems={cartItems}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onChangeSearchInput={onChangeSearchInput}
                  onAddToFavorite={onAddToFavorite}
                  onAddToCart={onAddToCart}
                  isLoading={isLoading}
                />
              }
            />
            <Route path="/favorites" exact element={<Favorites />} />
            <Route path="/orders" exact element={<Orders />} />
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

// git add .
// git commit -m "Урок №2"
// git push origin master

// git pull origin master для скачивание
