import { Button, Input, Dropdown, Menu, Space, Card, Pagination, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DownOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import './style/_customerPage.scss';
import { GetCustomers } from '../../services/CustomerService';
import { errorDialog } from '../../utils/modals';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
// import fakeData from './fakeData';

const originColumns = {
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
    limit: 10,
  });
  // eslint-disable-next-line no-use-before-define
  const [visibleColumns, setVisibleColumns] = useState({ ...originColumns });
  const [filterColumns, setFilterColumns] = useState(['name', 'email', 'numberOrder', 'address']);
  const [totalColumn, setTotalColumn] = useState(4);
  const [ordering, setOrdering] = useState({
    orderingName: '',
    sequence: '',
  });
  const typingTimeoutRef = useRef(null);
  const fetchAllCustomers = async (page) => {
    try {
      const offset = page * pagination.limit - pagination.limit;
      setLoading(true);
      const results = await GetCustomers(
        offset,
        pagination.limit,
        searchName,
        ordering.orderingName,
      );

      if (results.status === 200) {
        const originResults = results.data.results.map((cur) => {
          const { first_line, second_line, city, state } = cur;
          const address = `${first_line} ${second_line} ${city} ${state}`;
          return { ...cur, address };
        });
        setCustomers([...originResults]);
        setPagination({ ...pagination, count: results.data.count, current_page: page });
      } else {
        errorDialog('An error occurred. Please check again !');
      }
      setLoading(false);
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
  }, [visibleColumns, totalColumn]);

  useEffect(() => {
    if (!loading) {
      fetchAllCustomers(pagination.current_page);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      setPagination((pre) => ({ ...pre, current_page: 1 }));
      fetchAllCustomers(1);
    }
  }, [searchName, ordering]);

  const onChangePage = (e) => {
    if (!loading) {
      fetchAllCustomers(e);
    }
  };

  const onChangeSearch = (e) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      console.log(e.target.value);
      setSearchName(e.target.value);
    }, 500);
  };

  const onClickMenuItems = async ({ key }) => {
    const cloneVisible = { ...visibleColumns };
    const keyValueArr = Object.entries(cloneVisible);
    for (const [keyOfObject, valueOfObject] of keyValueArr) {
      if (keyOfObject === key) {
        cloneVisible[key].isVisible = !cloneVisible[key].isVisible;
        if (cloneVisible[key].isVisible === true) {
          setTotalColumn((pre) => pre + 1);
        } else {
          setTotalColumn((pre) => pre - 1);
        }
      }
    }
    setVisibleColumns({ ...cloneVisible });
  };

  const handelClickSort = (newOrdering) => {
    if (newOrdering.orderingName === 'address') {
      newOrdering.orderingName = 'first_line';
    }
    setOrdering({ ...newOrdering });
    console.log('newOrdering', newOrdering);
  };

  return (
    <div>
      <Card className="card-customer" title={`List customers ${pagination.count}`}>
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
            <div className="grid grid-cols-12 gap-x-0.5 p-2">
              <div className={`col-span-12 grid grid-cols-${totalColumn} gap-1`}>
                {filterColumns.map((cur, index) => (
                  <div
                    // col-span-${visibleColumns[cur].weight}
                    className="col-span-1 flex whitespace-pre-wrap break-normal"
                  >
                    <p className="font-medium">{visibleColumns[cur].displayName}</p>
                    <div className="arrow-up-down">
                      <button
                        className={`arrow-up ${
                          cur === ordering.orderingName && ordering.sequence === 'up'
                            ? 'active-sort'
                            : 'deactive'
                        }`}
                        onClick={() => {
                          handelClickSort({
                            orderingName: cur,
                            sequence: 'up',
                          });
                        }}
                      >
                        <ArrowUpOutlined />
                      </button>
                      <button
                        className={`arrow-down ${
                          cur === ordering.orderingName && ordering.sequence === 'down'
                            ? 'active-sort'
                            : 'deactive'
                        }`}
                        onClick={() => {
                          handelClickSort({
                            orderingName: cur,
                            sequence: 'down',
                          });
                        }}
                      >
                        <ArrowDownOutlined />
                      </button>
                    </div>
                  </div>
                ))}
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
                    className="grid grid-cols-12 gap-x-0.5 p-2 border-t even:bg-slate-100"
                  >
                    <div
                      className={`col-span-12 grid grid-cols-${totalColumn} gap-x-0.5 items-begin`}
                    >
                      {/* eslint-disable-next-line array-callback-return */}
                      {filterColumns.map((cur) => (
                        <div key={cur} className="whitespace-pre-wrap break-words">
                          {item[cur]}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-content-between p-6">
              <div>
                Show to{' '}
                {`${pagination.current_page * pagination.limit - pagination.limit + 1} to
              ${
                pagination.current_page === Math.ceil(pagination.count / pagination.limit)
                  ? pagination.count
                  : pagination.current_page * pagination.limit
              }`}
              </div>
              <div>
                <Pagination
                  defaultPageSize={pagination.limit}
                  defaultCurrent={1}
                  current={pagination.current_page}
                  total={pagination.count}
                  onChange={onChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CustomersPage;
