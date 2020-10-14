import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import React, { SetStateAction, useEffect, useState } from 'react';

import ProfileList from '../components/organisms/ProfileList';
import refresh from '../middlewares/refresh';

const Friends = () => {
  const [status, setStatus] = useState('');
  const [friendName, setFriendName] = useState('');
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    getFriendsList();
  }, []);

  const inputName = (e: { target: { value: SetStateAction<string> } }) => {
    setFriendName(e.target.value);
  };

  const addFriend = async () => {
    try {
      const result = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/friend/${friendName.replace('#', '|')}`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        },
      );
      setStatus(result.data);
    } catch (error) {
      switch (error.response.status) {
        case 401:
          {
            const result = await refresh();
            switch (result) {
              case 200:
                break;
              case 401:
                Router.push('/logout');
                break;
              default:
                break;
            }
          }
          break;
        case 404:
        case 409:
          setStatus(error.response.data);
          break;
        default:
          break;
      }
    }
  };

  const deleteFriend = async (index: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/friend/${friendsList[index]._id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        },
      );
      setStatus('친구 삭제 완료');
    } catch (error) {
      switch (error.response.status) {
        case 401:
          {
            const result = await refresh();
            switch (result) {
              case 200:
                break;
              case 401:
                Router.push('/logout');
                break;
              default:
                break;
            }
          }
          break;
        case 404:
        case 409:
          setStatus(error.response.data);
          break;
        default:
          break;
      }
    }
  };

  const getFriendsList = async () => {
    try {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/friend`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      if (result.status === 200) {
        setFriendsList(result.data);
        if (result.data.length === 0) setStatus('친구 목록이 없습니다.');
      }
    } catch (error) {
      switch (error.response.status) {
        case 401:
          {
            const result = await refresh();
            switch (result) {
              case 200:
                break;
              case 401:
                Router.push('/logout');
                break;
              default:
                break;
            }
          }
          break;
        case 404:
          setStatus('친구 목록이 없습니다.');
          break;
        case 409:
          setStatus(error.response.data);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div>
      <h1>Add Friends</h1>
      <input type="text" onChange={inputName} />
      <button type="button" onClick={addFriend}>
        add
      </button>
      <div>{status}</div>
      <br />
      <h1>Friends List</h1>
      {friendsList.length !== 0 ? (
        <ProfileList friendsData={friendsList} deleteFriend={deleteFriend} />
      ) : (
        <br />
      )}
    </div>
  );
};

export default Friends;
