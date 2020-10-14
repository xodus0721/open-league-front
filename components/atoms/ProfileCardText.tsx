import React from 'react';
import styled from 'styled-components';

interface IProps {
  children: string;
}

const Text = styled.div``;

const ProfileCardText = ({ children }: IProps) => <Text>{children}</Text>;

export default ProfileCardText;
