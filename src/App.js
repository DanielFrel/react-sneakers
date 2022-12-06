import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

const arr = [
  {
    title: "Мужские Кроссовки Nike Air Max 270",
    price: 12999,
    imageUrl: "/img/sneakers/1.jpg",
  },
  {
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 8499,
    imageUrl: "/img/sneakers/2.jpg",
  },
  {
    title: "Кроссовки Puma X Aka Boku Future Rider",
    price: 8999,
    imageUrl: "/img/sneakers/3.jpg",
  },
];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск... " />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {arr.map((obj) => (
            <Card 
            title={obj.title} 
            price={obj.price} 
            imageUrl={obj.imageUrl} 
            onClick={()=> console.log(obj)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

// git add .
// git commit -m "Урок №2"
// git push origin master

// git pull origin master для скачивание
