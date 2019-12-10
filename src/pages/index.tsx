import * as React from 'react';
import { NextPage } from 'next';
import { Title } from '../styles/Header';

const IndexPage: NextPage = () => {
    return (
        <>
            <Title>Hello Bothrs 👋</Title>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                dignissimos blanditiis officiis mollitia commodi nulla tempore
                sequi adipisci, et sed officia necessitatibus quod dolores unde,
                distinctio alias aperiam impedit earum!
            </p>
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
