import React from 'react';
import { UserType } from '../types/types';
import { List, DeleteButton, ListItem } from '../styles/List';

const UserList = (props: any) => {
    return (
        <List>
            {props.users.map((user: UserType) => {
                return (
                    <ListItem key={user._id}>
                        {user.name}{' '}
                        <DeleteButton
                            onClick={() => props.deleteUser(user._id)}
                        >
                            x
                        </DeleteButton>
                    </ListItem>
                );
            })}
        </List>
    );
};
export default UserList;
