import { useEffect, useState } from 'react';
import ArrowUp from '../assets/arrow_drop_up_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg';
import ArrowDown from '../assets/arrow_drop_down_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface ListOfItemProps {
  products: ProductProps[];
  minusStockFunction: (index: number) => void;
}

function ListOfItem({ products, minusStockFunction }: ListOfItemProps) {
  const [sortType, setSortType] = useState<string | null>(null);
  const [sortParam, setSortParam] = useState<string | null>(null);
  const [sortedProducts, setSortedProducts] = useState([...products]);

  function sortingFunction(param: string, type: string) {
    if (sortType === type) {
      setSortType(null);
      setSortParam(null);
      setSortedProducts([...products]);
    } else {
      if (type === 'down') {
        setSortType('down');
        setSortParam(param);
        setSortedProducts(
          [...products].sort((a, b: ProductProps) => {
            if (a[param] < b[param]) return -1;
            if (a[param] > b[param]) return 1;
            return 0;
          })
        );
      } else if (type === 'up') {
        setSortType('up');
        setSortParam(param);
        setSortedProducts(
          [...products].sort((a, b) => {
            if (param === "stock") {
              if (String(a.stock) === "Not available" && String(b.stock) !== "Not available") return 1;
              if (String(a.stock) !== "Not available" && String(b.stock) === "Not available") return -1;
            }
            if (a[param] < b[param]) return 1;
            if (a[param] > b[param]) return -1;
            return 0;
          })
        );
      }
    }
  }
  
  

  useEffect(() => {
    if (products) {
      setSortedProducts([...products]);

      if (sortParam && sortType) {
        sortingFunction(sortParam, sortType);
      }
    }
  }, [products]);

  return (
    <div className="catalog">
      <table>
        <thead>
          <tr>
            <th>
              Name{' '}
              <a href="#" onClick={() => sortingFunction('name', 'down')}>
                <img src={ArrowUp} alt="" />
              </a>
            </th>
            <th>
              Price$
              <div className="arrows">
                <a href="#" onClick={() => sortingFunction('price', 'up')}>
                  <img src={ArrowUp} alt="" />
                </a>
                <a href="#" onClick={() => sortingFunction('price', 'down')}>
                  <img src={ArrowDown} alt="" />
                </a>
              </div>
            </th>
            <th>
              Stock{' '}
              <a href="#" onClick={() => sortingFunction('stock', 'down')}>
                <img src={ArrowDown} alt="" />
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((item, idx) => (
            <tr key={`item-${item.id}`}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <p>{item.stock > 0 ? item.stock : 'Not available'}</p>{' '}
                {item.stock > 0 && (
                  <a href="#">
                    <p onClick={() => minusStockFunction(idx)}>-</p>
                  </a>
                )}
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListOfItem;
