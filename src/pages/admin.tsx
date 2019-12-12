import React from 'react';
import withAuth from '../helpers/withAuth';
import { auth } from '../firebase';

import Layout from '../components/Layout';
import Link from 'next/Link';

class Admin extends React.Component {
    render() {
        var user = auth.currentUser;

        return (
            <Layout>
                <h1>Dashboard Page: {user && user.displayName}</h1>
                <p>You can't go into this page if you are not authenticated.</p>

                <Link href="/">
                    <a>
                        <h3>Go Home&rarr;</h3>
                    </a>
                </Link>
            </Layout>
        );
    }
}
export default withAuth(Admin);
