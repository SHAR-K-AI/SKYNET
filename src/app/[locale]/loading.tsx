import React from 'react';
import Spinner from "@/components/Spinner";

const Loading: React.FC = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Spinner />
        </div>
    );
};

export default Loading;
