import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { Button, Pagination, Tag, Form, Input } from 'antd';
import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { GetStores, CreateStore, EditStore, DelStore } from 'src/services/StoreService';
import moment from 'moment';
import { showDeleteConfirmDialg, infoDialog, successDialog, errorDialog } from 'src/utils/modals';
import AddStoreModal from './components/AddStoreModal';
import EditStoreModal from './components/EditStoreModal';

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    current_page: 1,
    limit: 20,
  });
  const [visibleAddStore, setVisibleAddStore] = useState(false);
  const [visibleEditStore, setVisibleEditStore] = useState(false);
  const [storeSeleted, setStorSelected] = useState(null);

  const fetchAllStore = async (page) => {
    try {
      const offset = page * pagination.limit - pagination.limit;
      const results = await GetStores(offset, pagination.limit);
      if (results.status === 200) {
        setStores(results.data.results);
        setPagination({ ...pagination, count: results.data.count, current_page: page });
      } else {
        errorDialog('An error occurred. Please check again !');
      }
    } catch (error) {
      errorDialog('An error occurred. Please check again !');
    }
  };

  const addNewStore = async (data) => {
    try {
      const results = await CreateStore(data);
      if (results.status === 201) {
        successDialog('Added new store success!', () => fetchAllStore(1));
      } else {
        errorDialog('An error occurred. Please check again !');
      }
    } catch (error) {
      errorDialog('An error occurred. Please check again !');
    }
  };

  const editStore = async (id, data) => {
    try {
      const results = await EditStore(id, data);
      if (results.status === 200) {
        successDialog('Updated this store success!', () => fetchAllStore(1));
      } else {
        errorDialog('An error occurred. Please check again !');
      }
    } catch (error) {
      errorDialog('An error occurred. Please check again !');
    }
  };

  const delStore = async (id) => {
    try {
      const results = await DelStore(id);
      if (results.status === 204) {
        successDialog('Deleted this store success!', () => fetchAllStore(1));
      } else {
        errorDialog('An error occurred. Please check again !');
      }
    } catch (error) {
      errorDialog('An error occurred. Please check again !');
    }
  };

  useEffect(() => {
    fetchAllStore(pagination.current_page);
  }, []);

  const onChangePage = (e) => {
    fetchAllStore(e);
  };

  const onHandleRefresh = () => {
    fetchAllStore(1);
  };

  const onHandleSubmitAddStore = (values) => {
    console.log(values);
    addNewStore(values);
    setVisibleAddStore(!visibleAddStore);
  };

  const onHandleSubmitEditStore = (values) => {
    console.log(values);
    editStore(storeSeleted.id, values);
    setVisibleEditStore(!visibleEditStore);
  };

  const showDeleteConfirm = (id) => {
    showDeleteConfirmDialg('Are you sure delete this store?', null, () => delStore(id), null);
  };

  const showPreview = (item) => {
    const title = `Store ${item.store_name}`;
    const content = (
      <div>
        <Form
          name="formAddstore"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          autoComplete="off"
          layout="vertical"
          initialValues={item}
        >
          <Form.Item label="Store Name" name="store_name">
            <Input size="large" allowClear />
          </Form.Item>
          <Form.Item label="API key" name="store_api_key">
            <Input.Password size="large" allowClear />
          </Form.Item>
          <Form.Item label="Shared Secret" name="share_secret_key">
            <Input.Password size="large" allowClear />
          </Form.Item>
        </Form>
      </div>
    );
    infoDialog(title, content);
  };

  return (
    <div>
      <div className="mt-6 flex justify-between">
        <p className="font-medium text-2xl">Stores</p>
        <div className="space-x-2">
          <Button size="large" icon={<ReloadOutlined />} onClick={onHandleRefresh}>
            Refresh
          </Button>
          <Button size="large" icon={<PlusOutlined />} onClick={() => setVisibleAddStore(true)}>
            Add new store
          </Button>
        </div>
      </div>

      <div className="mt-3">
        <div className="shadow rounded bg-white divide-y">
          <div className="grid grid-cols-12 gap-x-0.5 justify-center items-end p-2">
            <div className="col-span-10 grid grid-cols-9 cc text-center items-end">
              <div className="col-span-1 text-center whitespace-pre-wrap break-normal">
                <p className="font-medium">Store Name</p>
              </div>
              <div className="col-span-1 text-center whitespace-pre-wrap break-normal">
                <p className="font-medium">Owner</p>
              </div>
              <div className="col-span-1 text-center whitespace-pre-wrap break-normal">
                <p className="font-medium">Transactions</p>
              </div>
              <div className="col-span-1 text-center whitespace-pre-wrap break-normal">
                <p className="font-medium">Listings</p>
              </div>
              <div className="col-span-1 text-center whitespace-pre-wrap break-normal">
                <p className="font-medium">Favorites</p>
              </div>
              <div className="col-span-1 text-center whitespace-pre-wrap break-normal">
                <p className="font-medium">Review Count</p>
              </div>
              <div className="col-span-1 text-center whitespace-pre-wrap break-normal">
                <p className="font-medium">Review Rate</p>
              </div>
              <div className="col-span-1 text-center whitespace-pre-wrap break-normal">
                <p className="font-medium">Created date</p>
              </div>
              <div className="col-span-1 text-center whitespace-pre-wrap break-normal">
                <p className="font-medium">Status</p>
              </div>
            </div>
            <div className="col-span-2 text-center">
              <p className="font-medium">Action</p>
            </div>
          </div>
          {stores.length === 0 ? (
            <div className="flex justify-center items-center h-60">No Data</div>
          ) : (
            <div>
              {stores.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-x-0.5 p-2 border-t justify-center items-center even:bg-slate-100"
                >
                  <div className="col-span-10 grid grid-cols-9 gap-x-0.5 text-center items-center">
                    <div className="col-span-1 text-center whitespace-pre-wrap break-words">
                      {item.store_name}
                    </div>
                    <div className="col-span-1 text-center whitespace-pre-wrap break-words">
                      {item.user}
                    </div>
                    <div className="col-span-1 text-center whitespace-pre-wrap break-all">
                      {item.transaction_sold_count}
                    </div>
                    <div className="col-span-1 text-center whitespace-pre-wrap break-all">
                      {item.listing_active_count}
                    </div>
                    <div className="col-span-1 text-center whitespace-pre-wrap break-all">
                      {item.num_favorers}
                    </div>
                    <div className="col-span-1 text-center whitespace-pre-wrap break-all">
                      {item.review_count}
                    </div>
                    <div className="col-span-1 text-center whitespace-pre-wrap break-all">
                      {item.review_average}
                    </div>
                    <div className="col-span-1 text-center whitespace-pre-wrap break-words">
                      {moment.unix(item.create_date).format('YYYY-MM-DD')}
                    </div>
                    <div className="col-span-1 text-center whitespace-pre-wrap break-all">
                      <Tag color={item.activate ? 'red' : 'blue'}>
                        {item.activate ? 'Activated' : 'Unactived'}
                      </Tag>
                    </div>
                  </div>
                  <div className="flex justify-center col-span-2">
                    <div className="mr-2">
                      <button
                        className="w-[30px] h-[30px] bg-[#308be0] hover:opacity-80 rounded"
                        onClick={() => showPreview(item)}
                      >
                        <FontAwesomeIcon icon={faEye} className="text-white text-[14px]" />
                      </button>
                    </div>
                    <div className="mr-2">
                      <button
                        className="w-[30px] h-[30px] bg-[#28a745] hover:opacity-80 rounded"
                        onClick={() => {
                          setVisibleEditStore(true);
                          setStorSelected(item);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} className="text-white text-[14px]" />
                      </button>
                    </div>
                    <div>
                      <button
                        className="w-[30px] h-[30px] bg-[#dc3545] hover:opacity-80 rounded"
                        onClick={() => showDeleteConfirm(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} className="text-white text-[14px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end p-6">
            <Pagination
              showTotal={(total) => `Total ${total} items`}
              defaultPageSize={pagination.limit}
              defaultCurrent={1}
              current={pagination.current_page}
              total={pagination.count}
              onChange={onChangePage}
            />
          </div>
          <AddStoreModal
            visible={visibleAddStore}
            onSubmit={onHandleSubmitAddStore}
            onClose={() => setVisibleAddStore(!visibleAddStore)}
          />
          <EditStoreModal
            visible={visibleEditStore}
            onSubmit={onHandleSubmitEditStore}
            onClose={() => setVisibleEditStore(!visibleEditStore)}
            defaultValues={storeSeleted}
          />
        </div>
      </div>
    </div>
  );
};

export default StoresPage;
