import { Button, Table, Input, Dropdown, Menu, Space, Card, Tag, Pagination, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import './style/_customerPage.scss';
import { GetCustomers } from '../../services/CustomerService';
import { errorDialog } from '../../utils/modals';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
// import fakeData from './fakeData';

// const originColumns = [
//   {
//     name: 'Name',
//     weight: 1,
//     isVisible: true,
//   },
//   {
//     name: 'Email',
//     weight: 2,
//     isVisible: true,
//   },
//   {
//     name: 'Number Order',
//     weight: 1,
//     isVisible: true,
//   },
//   {
//     name: 'Address',
//     weight: 3,
//     isVisible: true,
//   },
// ];

const originColumns = {
  totalColumn: 4,
  name: {
    displayName: 'Name',
    isVisible: true,
  },
  email: {
    displayName: 'Email',
    isVisible: true,
  },
  numberOrder: {
    displayName: 'Number Order',
    isVisible: true,
  },
  address: {
    displayName: 'Address',
    isVisible: true,
  },
};

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [pagination, setPagination] = useState({
    count: 0,
    current_page: 1,
    limit: 7,
  });
  // eslint-disable-next-line no-use-before-define
  const [visibleColumns, setVisibleColumns] = useState({ ...originColumns });
  const [filterColumns, setFilterColumns] = useState(['name', 'email', 'numberOrder', 'address']);
  const searchCustomersName = async () => {
    // const results = await GetCustomers(search);
  };
  const fetchAllCustomers = async (page) => {
    try {
      const offset = page * pagination.limit - pagination.limit;
      setLoading(true);
      const results = await GetCustomers(offset, pagination.limit, searchName);
      setLoading(false);
      if (results.status === 200) {
        const originResults = results.data.results.map((cur) => {
          const { first_line, second_line, city, state } = cur;
          const address = `${first_line} ${second_line} ${city} ${state}`;
          return { ...cur, address };
        });
        // setCustomers(results.data.results);
        setCustomers([...originResults]);
        setPagination({ ...pagination, count: results.data.count, current_page: page });
      } else {
        errorDialog('An error occurred. Please check again !');
      }
    } catch (error) {
      errorDialog('An error occurred. Please check again !');
    }
  };
  useEffect(() => {
    const keyValueArr = Object.entries(visibleColumns);
    const keyArr = keyValueArr.reduce((acc, cur) => {
      const [key, value] = cur;
      if (value.isVisible === true) {
        acc = [...acc, key];
      }
      return acc;
    }, []);
    setFilterColumns([...keyArr]);
  }, [visibleColumns]);
  useEffect(() => {
    fetchAllCustomers(pagination.current_page);
  }, []);

  useEffect(() => {
    fetchAllCustomers(pagination.current_page);
  }, [searchName]);

  const onChangePage = (e) => {
    fetchAllCustomers(e);
  };

  const onChangeSearch = (e) => {
    // console.log('onChangeSearch', e.target.value);
    setSearchName(e.target.value);
  };

  const onClickMenuItems = ({ key }) => {
    console.log(`key is: ${key}`);
    const cloneVisible = { ...visibleColumns };
    const keyValueArr = Object.entries(cloneVisible);
    console.log('before cloneVisible:', cloneVisible);
    for (const [keyOfObject, valueOfObject] of keyValueArr) {
      if (keyOfObject === key) {
        cloneVisible[key].isVisible = !cloneVisible[key].isVisible;
        if (cloneVisible[key].isVisible === true) {
          cloneVisible.totalColumn += 1;
        } else {
          cloneVisible.totalColumn -= 1;
        }
      }
    }
    console.log('after cloneVisible:', cloneVisible);

    setVisibleColumns({ ...cloneVisible });
  };

  return (
    <div>
      <Card className="card-customer" title="List customers">
        <div className="flex justify-between">
          <p className="font-medium text-2xl">Customers</p>
        </div>
        <div className="mt-6 flex justify-between">
          <div>
            <Button className="btn-group">Copy</Button>
            <Button className="btn-group">CSV</Button>
            <Button className="btn-group">Excel</Button>
            <Button className="btn-group">PDF</Button>
            <Button className="btn-group">Print</Button>
            <Dropdown
              overlay={
                <Menu onClick={onClickMenuItems}>
                  {Object.entries(originColumns).map((cur) => {
                    const [key, value] = cur;
                    return (
                      <Menu.Item
                        key={key}
                        className={`${visibleColumns[key].isVisible ? 'colum-active' : ''}`}
                      >
                        {value.displayName}
                      </Menu.Item>
                    );
                  })}
                </Menu>
              }
              placement="bottom"
              trigger={['click']}
            >
              <Space>
                <Button className="btn-group">
                  Columns Visibility
                  <DownOutlined />
                </Button>
              </Space>
            </Dropdown>
          </div>
          <div className="search-box">
            <label>Search:</label>
            <Input placeholder="Search by name" onChange={onChangeSearch} />
          </div>
        </div>
        <div className="mt-3">
          <div className="shadow rounded bg-white divide-y">
            <div className="grid grid-cols-12 gap-x-0.5 justify-center items-end p-2">
              <div
                className={`col-span-12 grid grid-cols-${visibleColumns.totalColumn} text-center items-start`}
              >
                {filterColumns.map((cur, index) => {
                  if (index === visibleColumns.totalColumn - 1) {
                    return (
                      // <div
                      //   // col-span-${visibleColumns[cur].weight}
                      //   className={`col-span-1 col-end-${
                      //     visibleColumns.totalColumn + 1
                      //   } text-center`}
                      // >
                      <div
                        // col-span-${visibleColumns[cur].weight}
                        className="col-span-1 text-center whitespace-pre-wrap break-normal"
                      >
                        <p className="font-medium">{visibleColumns[cur].displayName}</p>
                      </div>
                    );
                  }
                  return (
                    <div
                      // col-span-${visibleColumns[cur].weight}
                      className="col-span-1 text-center whitespace-pre-wrap break-normal"
                    >
                      <p className="font-medium">{visibleColumns[cur].displayName}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* eslint-disable-next-line no-nested-ternary */}
            {loading === true ? (
              <div className="flex justify-center items-center h-60">
                <Spin indicator={antIcon} />
              </div>
            ) : customers.length === 0 ? (
              <div className="flex justify-center items-center h-60">No Data</div>
            ) : (
              <div>
                {customers.map((item, index) => (
                  <div
                    key={index}
                     className="grid grid-cols-12 gap-x-0.5 p-2 border-t justify-center items-center even:bg-slate-100"
                  >
                    <div
                      className={`col-span-12 grid grid-cols-${visibleColumns.totalColumn} gap-x-0.5 text-center items-begin`}
                    >
                      {/* eslint-disable-next-line array-callback-return */}
                      {filterColumns.map((cur, index) => {
                        if (index === visibleColumns.totalColumn - 1) {
                          return (
                            <div
                              className={`col-span-1 col-end-${
                                visibleColumns.totalColumn + 1
                              } text-center whitespace-pre-wrap break-words`}
                            >
                              {item[cur]}
                            </div>
                          );
                        }
                        return (
                          <div className="col-span-1 text-center whitespace-pre-wrap break-words">
                            {item[cur]}
                          </div>
                        );
                      })}
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
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CustomersPage;
