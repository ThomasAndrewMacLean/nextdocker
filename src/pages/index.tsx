import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import fetch from 'isomorphic-unfetch';
import UserList from '../components/UserList';
import { UserType } from '../types/types';
import { Title } from '../styles/Header';
import { Form, SubmitButton, TextInput } from '../styles/Form';
import { Button, SecondaryButton } from '../styles/Button';
import Layout from '../components/Layout';
import { auth, firebase } from '../firebase';
import Link from 'next/link';

const IndexPage: NextPage = (props: any) => {
    const [title, setTitle] = useState<string>('Hello Bothrs');
    const [users, setUsers] = useState<UserType[]>(props.users);
    const [newUserName, setNewUserName] = useState<string>('');

    useEffect(() => {
        setTitle('Hello Bothrs 👋');
    }, []);

    const addUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(`${document.location.origin}/api/user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: { name: newUserName } })
        })
            .then(res => res.json())
            .then(x => {
                setUsers(oldNewUsers => [...oldNewUsers, x]);
            });
        setNewUserName('');
    };

    const changeName = (e: any) => {
        setNewUserName(e.target.value);
    };

    const deleteUser = (_id: string) => {
        fetch(`${document.location.origin}/api/user`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id })
        })
            .then(res => res.json())
            .then(x => {
                console.log(x);
                setUsers(oldNewUsers => [
                    ...oldNewUsers.filter(x => x._id !== _id)
                ]);
            });
    };

    const handleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(provider)
            .then(() => {
                alert('You are signed In');
            })
            .catch((err: any) => {
                alert('OOps something went wrong check your console');
                console.log(err);
            });
    };
    const handleLogout = () => {
        auth.signOut()
            .then(function() {
                alert('Logout successful');
            })
            .catch(function(error: any) {
                alert('OOps something went wrong check your console');
                console.log(error);
            });
    };

    return (
        <Layout>
            <Title>{title}</Title>
            <UserList deleteUser={deleteUser} users={users} />

            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                repellendus esse aspernatur accusantium exercitationem? Libero
                nostrum maxime dolores harum aliquid, expedita accusantium atque
                ab placeat voluptatibus iste autem esse eaque.
            </p>

            <Form onSubmit={addUser}>
                <label htmlFor="name">Name</label>
                <TextInput
                    value={newUserName}
                    onChange={changeName}
                    type="text"
                    name="name"
                    id="userName"
                    required
                />
                <SubmitButton type="submit" value="Add" />
            </Form>

            <Button onClick={handleSignIn}>Sign In using google</Button>
            <SecondaryButton onClick={handleLogout}>Logout</SecondaryButton>

            <Link href="/admin">
                <a>
                    <h3>Go to Admin&rarr;</h3>
                </a>
            </Link>
        </Layout>
    );
};

IndexPage.getInitialProps = async function({
    req
}): Promise<{ users: UserType[] }> {
    let backendUrl = req
        ? `http://${req.headers.host}/api/user`
        : `${document.location.origin}/api/user`;

    const res = await fetch(backendUrl);
    const data = await res.json();

    return {
        users: data
    };
};

export default IndexPage;
