import Error from '@/components/error';
import React from 'react';

const NotFound: React.FC = () => {
    return (
        <Error
            errorCode={404}
            errorTitle='Something&apos;s missing.'
            errorText='Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.'
            errorAction={{
                text: 'Back to Homepage',
                type: 'link',
                path: '/'
            }}
        />
    )
};

export default NotFound;