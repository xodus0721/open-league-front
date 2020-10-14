import React from 'react';
import styled from 'styled-components';

import ProfileCard from '../molecules/ProfileCard';

interface IPropitem {
  name: string;
  email: string;
  friend: string;
}

interface IProps {
  friendsData: IPropitem[];
  deleteFriend: Function;
}

const CardContainer = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  border: 3px solid black;
`;

const ProfileList = ({ friendsData, deleteFriend }: IProps) => (
  <CardContainer>
    {friendsData.map((data, i) => (
      <ProfileCard
        name={data.name}
        email={data.email}
        deleteFriend={deleteFriend}
        index={i}
        key={data.friend}
      />
    ))}
  </CardContainer>
);

export default ProfileList;
