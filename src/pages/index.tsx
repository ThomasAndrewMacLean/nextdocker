import * as React from 'react';
import { NextPage } from 'next';

const IndexPage: NextPage = () => {
    return (
        <>
            <h1>Hello Bothrs 👋</h1>
            <style jsx global>{`
                body {
                    background: #000;
                    font: 18px menlo;
                    color: #fff;
                    width: 80%;
                    max-width: 750px;
                    margin: auto;
                }
                a {
                    color: inherit;
                }
            `}</style>
        </>
    );
};

export default IndexPage;
