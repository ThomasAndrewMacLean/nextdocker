import React from 'react';
import router from 'next/router';
import { auth } from '../firebase';
import Layout from '../components/Layout';

const withAuth = Component => {
    // eslint-disable-next-line react/display-name
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                status: 'LOADING'
            };
        }
        componentDidMount() {
            auth.onAuthStateChanged(authUser => {
                if (authUser) {
                    this.setState({
                        status: 'SIGNED_IN'
                    });
                } else {
                    router.push('/');
                }
            });
        }
        renderContent() {
            const { status } = this.state;
            if (status == 'LOADING') {
                return <h1>Loading ......</h1>;
            } else if (status == 'SIGNED_IN') {
                return <Component {...this.props} />;
            }
        }
        render() {
            return <Layout>{this.renderContent()}</Layout>;
        }
    };
};
export default withAuth;
