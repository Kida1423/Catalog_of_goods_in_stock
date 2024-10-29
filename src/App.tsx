import { useState } from 'react';
import ListOfItem from './component/ListOfItem';
import InputForm from './component/InputTovar';
import Modal from './component/Modal';
import './App.css';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface AddProductProps {
  name: string;
  price: number;
  stock: number;
}
function App() {
  const [products, setProducts] = useState<ProductProps[]>([
    { id: 1, name: 'phone', price: 5000, stock: 100 },
    { id: 2, name: 'laptop', price: 10000, stock: 50 },
    { id: 3, name: 'airpods', price: 3000, stock: 10 },
    { id: 4, name: 'watch', price: 3500, stock: 30 }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<AddProductProps | null>(null);
  const [counters, setCounters] = useState<{ [key: string]: number }>({});

  const addItem = (item: AddProductProps) => {
    if (item.name === '') {
      return alert('Введите название товара');
    }

    const existingProduct = products.find(
      (elem) => item.name.toLowerCase() === elem.name.toLowerCase()
    );

    if (existingProduct) {
      setPendingItem(item);
      setIsModalOpen(true);
      return;
    }

    const updatedProducts = [...products, { ...item, id: products.length + 1 }];
    setProducts(updatedProducts);
    setCounters((prev) => ({ ...prev, [item.name]: 1 }));
  };

  const handleModalConfirm = () => {
    if (pendingItem) {
      const updatedProducts = products.map((elem) => {
        if (elem.name.toLowerCase() === pendingItem.name.toLowerCase()) {
          return {
            ...elem,
            price: pendingItem.price,
            stock: parseInt(`${pendingItem.stock}`) + parseInt(`${elem.stock}`)
          };
        }
        return elem;
      });
      setProducts(updatedProducts);
    }
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    if (pendingItem) {
      const currentCount = counters[pendingItem.name] || 1;
      const newName = `${pendingItem.name} ${currentCount}`;
      setCounters((prev) => ({ ...prev, [pendingItem.name]: currentCount + 1 }));

      const newProduct: ProductProps = {
        ...pendingItem,
        name: newName,
        id: products.length + 1,
      };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }
    setIsModalOpen(false);
    setPendingItem(null);
  };

  const minusStock = (index: number) => {
    const updatedProducts = products.map((elem, idx) => {
      if (idx === index) {
        return {
          ...elem,
          stock: elem.stock - 1,
        };
      }
      return elem;
    });
    setProducts(updatedProducts);
  };

  return (
    <>
      <ListOfItem products={products} minusStockFunction={minusStock} />
      <InputForm addItemFunction={addItem} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        message={`Товар "${pendingItem?.name}" уже существует. Вы хотите заменить его?`}
      />
    </>
  );
}

export default App;
