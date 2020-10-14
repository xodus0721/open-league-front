import React from 'react';
import styled from 'styled-components';

import ProfileCardText from '../atoms/ProfileCardText';

interface IProps {
  name: string;
  email: string;
  index: number;
  deleteFriend: Function;
}

const Card = styled.div`
  border: 3px solid black;
  width: 300px;
  margin: 0.5em 0.3125em;
  &:hover {
    cursor: pointer;
  }
`;

const ProfileCard = ({
  name, email, index, deleteFriend,
}: IProps) => {
  const handleOnDoubleClick = () => {
    deleteFriend(index);
  };
  return (
    <Card onDoubleClick={handleOnDoubleClick}>
      <ProfileCardText>{name}</ProfileCardText>
      <ProfileCardText>{email}</ProfileCardText>
    </Card>
  );
};

export default ProfileCard;
