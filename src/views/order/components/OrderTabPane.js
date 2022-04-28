import React from 'react';
import { Tag } from 'antd';

function OrderTabPane({ orders }) {
  return (
    <div className="shadow rounded bg-white">
      <div className="grid grid-cols-9 gap-x-0.5 justify-center p-2">
        <div className="col-span-5 grid grid-cols-6 gap-x-0.5">
          <div className="col-span-1">
            <p className="px-4 py-2 font-medium">Store</p>
          </div>
          <div className="col-span-1">
            <p className="px-4 py-2 font-medium">Order ID</p>
          </div>
          <div className="col-span-1">
            <p className="px-4 py-2 font-medium">Order date</p>
          </div>
          <div className="col-span-1">
            <p className="px-4 py-2 font-medium">Amount</p>
          </div>
          <div className="col-span-1">
            <p className="px-4 py-2 font-medium">Status</p>
          </div>
          <div className="col-span-1">
            <p className="px-4 py-2 font-medium">Qty</p>
          </div>
        </div>
        <div className="col-span-1">
          <p className="px-4 py-2 font-medium">Shipping method</p>
        </div>
        <div className="col-span-2">
          <p className="px-4 py-2 font-medium">Item name</p>
        </div>
        <div className="col-span-1">
          <p className="px-4 py-2 font-medium">Recipient</p>
        </div>
      </div>
      <div>
        {orders.map((item, index) => {
          const status = item.is_shipped ? 1 : 0;
          const shipping_method = item.shipping_method === 'Unknow' ? 'None' : item.shipping_method;
          const item_name = item.item_name === 'Unknow' ? 'None' : item.item_name;
          return (
            <div
              key={index}
              className="grid grid-cols-9 gap-x-0.5 p-2 border-t justify-center items-center even:bg-slate-100"
            >
              <div className="col-span-5 grid grid-cols-6 gap-x-0.5 text-center items-center">
                <div className="col-span-1 whitespace-pre-wrap break-all">{item.store}</div>
                <div className="col-span-1 whitespace-pre-wrap break-all">{item.id}</div>
                <div className="col-span-1 whitespace-pre-wrap break-all">
                  {item.create_timestamp}
                </div>
                <div className="text-center col-span-1 whitespace-pre-wrap break-all">
                  {item.total_price}
                </div>
                <div className="text-center col-span-1">
                  <Tag color={status === 0 ? 'processing' : 'success'}>
                    {status === 0 ? 'Pending' : 'Shipped'}
                  </Tag>
                </div>
                <div className="text-center col-span-1">{item.quantity}</div>
              </div>
              <div className="text-center col-span-1">{shipping_method}</div>
              <div className="col-span-2 whitespace-pre-wrap break-all">{item_name}</div>
              <div className="text-center col-span-1 whitespace-pre-wrap break-all">
                {item.buyer_user_id}
              </div>
              {/* <div className="flex justify-center col-span-1">
                <div className="mr-2">
                  <button className="w-[30px] h-[30px] bg-[#28a745] hover:opacity-80 rounded">
                    <FontAwesomeIcon icon={faEdit} className="text-white text-[14px]" />
                  </button>
                </div>
                <div>
                  <button className="w-[30px] h-[30px] bg-[#dc3545] hover:opacity-80 rounded">
                    <FontAwesomeIcon icon={faTrashAlt} className="text-white text-[14px]" />
                  </button>
                </div>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderTabPane;
