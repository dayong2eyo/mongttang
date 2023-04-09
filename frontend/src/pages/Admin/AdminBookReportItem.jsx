import React, { useState } from 'react';
import FormatDate from 'utils/FormatDate';

import tw, { styled, css } from 'twin.macro';

import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';

import Button from 'components/common/Button';

const ButtonContainer = styled.div`
  ${tw`flex justify-end items-center px-1 py-1`}
`;

function AdminBookReportItem({ bookId, title, category, artist, content }) {
  const deleteHandler = () => {
    const delete_book_admin = async () => {
      try {
        const { data } = await authApi.delete(
          requests.DELETE_BOOK_ADMIN(bookId),
        );
        return console.log(data);
      } catch (error) {
        throw error;
      }
    };
    delete_book_admin();
  };
  const showHandler = () => {
    const delete_book_admin = async () => {
      try {
        const { data } = await authApi.patch(
          requests.DELETE_BOOK_ADMIN(bookId),
        );
        return console.log(data);
      } catch (error) {
        throw error;
      }
    };
    delete_book_admin();
  };

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <tr>
        <td className="px-6 py-4 whitespace-pre-wrap w-1/6 text-sm font-medium text-gray-900">
          {title}
        </td>
        <td className="px-6 py-4 whitespace-pre-wrap w-1/6 text-sm text-gray-500">
          {artist}
        </td>
        <td className="px-6 py-4 whitespace-pre-wrap w-1/6">{category}</td>
        <td className="px-6 py-4 whitespace-pre-wrap w-2/6 text-sm text-gray-500">
          {content}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <ButtonContainer>
            <div className="mx-1">
              <Button
                title="보이기"
                buttonType="black"
                className=""
                onClick={showHandler}
              />
            </div>
            <div>
              <Button
                title="삭제"
                buttonType="black"
                className=""
                onClick={deleteHandler}
              />
            </div>
          </ButtonContainer>
        </td>
      </tr>
    </tbody>
  );
}

export default AdminBookReportItem;
