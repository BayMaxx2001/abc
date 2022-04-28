import { Button, Tabs, Select, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faShippingFast, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { GetStores } from 'src/services/StoreService';
import { GetOrders } from 'src/services/OrderService';
import { useEffect, useState } from 'react';
import OrderTabPane from './components/OrderTabPane';

const { TabPane } = Tabs;
const { Option } = Select;

const OrderPage = () => {
  const [stores, setStores] = useState([]);
  const [orders, setOrders] = useState([]);
  const [storeSelected, setStoreSelected] = useState('');
  const [status, setStatus] = useState(0);

  const handleChangeStore = (value) => setStoreSelected(value);

  const fetchOrders = async (store_name, status) => {
    try {
      const results = await GetOrders(store_name, status);
      if (results.status === 200) {
        setOrders(results.data.results);
      } else {
        message.error('An error occurred. Please check again !', 2);
      }
    } catch (error) {
      message.error('An error occurred. Please check again !', 2);
    }
  };

  const fetchAllStore = async () => {
    try {
      const results = await GetStores(0, 100);
      if (results.status === 200) {
        setStores(results.data.results);
      } else {
        message.error('An error occurred. Please check again !', 2);
      }
    } catch (error) {
      message.error('An error occurred. Please check again !', 2);
    }
  };

  const handleRefresh = () => {
    fetchAllStore();
    fetchOrders(storeSelected, status);
  };

  useEffect(() => {
    fetchAllStore();
  }, []);

  useEffect(() => {
    fetchOrders(storeSelected, status);
  }, [storeSelected, status]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex-1 grid grid-cols-3 gap-4">
          <div className="flex p-2 shadow rounded bg-white">
            <div className="bg-[#17a2b8] flex items-center p-4 rounded-md">
              <FontAwesomeIcon icon={faClock} className="text-white text-[24px]" />
            </div>
            <div className="flex flex-col justify-between ml-4 py-2">
              <p>Total Order</p>
              <p className="text-bold">3164</p>
            </div>
          </div>

          <div className="flex p-2 shadow rounded bg-white">
            <div className="bg-[#dc3545] flex items-center p-4 rounded-md">
              <FontAwesomeIcon icon={faShippingFast} className="text-white text-[24px]" />
            </div>
            <div className="flex flex-col justify-between ml-4 py-2">
              <p>Unshipped Orders</p>
              <p className="text-bold">18</p>
            </div>
          </div>

          <div className="flex p-2 shadow rounded bg-white">
            <div className="bg-[#28a745] flex items-center p-4 rounded-md">
              <FontAwesomeIcon icon={faShoppingCart} className="text-white text-[24px]" />
            </div>
            <div className="flex flex-col justify-between ml-4 py-2">
              <p>New Order</p>
              <p className="text-bold">0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="space-x-2">
          <Select
            size="large"
            style={{ width: 200 }}
            defaultValue="All Stores"
            onChange={handleChangeStore}
          >
            <Option value="">All Stores</Option>
            {stores.map((item, index) => (
              <Option key={index} value={item.store_name}>
                {item.store_name}
              </Option>
            ))}
          </Select>
          <Button size="large" icon={<ReloadOutlined />} onClick={handleRefresh}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="mt-3">
        <Tabs
          defaultActiveKey="0"
          onChange={(e) => {
            setStatus(e);
          }}
        >
          <TabPane tab="Unfulfilled Orders" key="0">
            <OrderTabPane orders={orders} />
          </TabPane>
          <TabPane tab="Completed Orders" key="1">
            <OrderTabPane orders={orders} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default OrderPage;
